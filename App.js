import React, { useEffect, useState, useMemo} from 'react';
import { 
  StyleSheet, 
  ActivityIndicator, 
  View, 
  Alert,
  Platform,
  StatusBar,
} from 'react-native';

import { tabNavigator } from './navigation/TabScreens'
import { AboutScreen } from './navigation/AboutScreen'
import { DrawerContent } from './navigation/DrawerContent'

import { LoginScreen } from './pages/LoginPage';
import { getHandicap } from './API/API';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';


import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from './components/Context';

import colors from './config/colors';

const Drawer = createDrawerNavigator();

export default function App() {

  const [golfId, setGolfId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [showChart, setShowChart] = useState(true);
  const [showTopStats, setShowTopStats] =useState(true);
  const [showFriendID, setShowFriendID] = useState(true);

  const authContext = useMemo(() => ({
    login: (value) => {
        getHandicap(value)
          .then(response => {
              if(response.ok){
                return response.json()
              }

              if(response.error === 401){
                console.log('Something went wrong with the token');
              }

              Alert.alert('There was an erorr getting that GA number. Please try again')
          })
          .then(data => {
                if(data != undefined){
                  setGolfId(data);
                  storeGolfId(value);
                  setIsLoading(false);
                }
            }
          )
          .catch(e => {
              Alert.alert('Seems like you offline')
          })
    },

    signOut: () => {
        setGolfId(null);
        clearAppData();
        setIsLoading(false);
    },

    showChart,
    showTopStats,
    showFriendID,

    updateToggle: (toggle, value) => {
      switch(toggle){
        case 'setShowChart':
          setShowChart(value);
          storeChartToggle(value);
          break;
        case 'setShowTopStats':
          setShowTopStats(value);
          storeStateToggle(value);
          break;

        case 'setShowFriendID':
          setShowFriendID(value);
          storeFirendIdToggle(value);
          break;
      }

      //Store Async Here
  },
    
}));

  const clearAppData = async function() {
    try {
        const keys = await AsyncStorage.getAllKeys();
        await AsyncStorage.multiRemove(keys);
    } catch (error) {
        console.error('Error clearing app data.');
    }
  }

  const getData = async () => {
    try {
      const golf_id_value = await AsyncStorage.getItem('golf_id')
      console.log(golf_id_value)
      if(golf_id_value !== null) {
        setGolfId(golf_id_value);
      }

      const chart_toggle = await AsyncStorage.getItem('show_chart_toggle')
      if(chart_toggle !== null) {
        setShowChart(chart_toggle === 'true');
      }

      const stats_toggle = await AsyncStorage.getItem('show_stats_toggle')
      if(stats_toggle !== null) {
        setShowTopStats(stats_toggle === 'true');
      }

      const friend_id_toggle = await AsyncStorage.getItem('show_friend_id_toggle')
      if(friend_id_toggle !== null) {
        setShowFriendID(friend_id_toggle === 'true');
      }
    } catch(e) {
      // error reading value
      console.log(e);
    }
  }

  const storeGolfId = async (value) => {
    try {
      await AsyncStorage.setItem('golf_id', value)
    } catch (e) {
      console.log(e);
    }
  }

  const storeChartToggle = async (value) => {
    try {
      await AsyncStorage.setItem('show_chart_toggle', value.toString())
    } catch (e) {
      console.log(e);
    }
  }

  const storeStateToggle = async (value) => {
    try {
      await AsyncStorage.setItem('show_stats_toggle', value.toString())
    } catch (e) {
      console.log(e);
    }
  }

  const storeFirendIdToggle = async (value) => {
    try {
      await AsyncStorage.setItem('show_friend_id_toggle', value.toString())
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {

    getData();

    setTimeout(() => {
      setIsLoading(false);
    }, 1000)
  }, []);

  if( isLoading ){
    return(
      <View style={styles.loadView}>
          <ActivityIndicator size="large" color={colors.secondary}/>
      </View>
    )
  }

  return (
    <View style={styles.containerFullScreen}>
      <AuthContext.Provider value={authContext}>

        <NavigationContainer>
          { golfId !== null  ? (
              <Drawer.Navigator
              drawerType="slide"
              drawerStyle={{
                backgroundColor: colors.primary,
                width: 240,
              }}
              drawerContentOptions={{
                activeBackgroundColor: colors.secondary,
                activeTintColor: 'black',
              }}
              drawerContent={props => <DrawerContent {...props}/>}
              edgeWidth={150}
              >
                <Drawer.Screen name="MainScreen" component={tabNavigator} />
                <Drawer.Screen name="About" component={AboutScreen} />
              </Drawer.Navigator>
            
            ) : (
                <LoginScreen/>
            )
          } 
          </NavigationContainer>
        </AuthContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  containerFullScreen: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  containerSafeView: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  loadView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
});
