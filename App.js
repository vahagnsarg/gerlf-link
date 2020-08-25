import React, { useEffect, useState, useMemo} from 'react';
import { 
  StyleSheet, 
  ActivityIndicator, 
  View, 
  SafeAreaView, 
  Alert,
  Platform,
  StatusBar
} from 'react-native';
import MyStats from './pages/MyStats';
import Friends from './pages/Friends';
import LoginPage from './pages/LoginPage';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from './components/Context';
import Screen from './components/Screen';

import colors from './config/colors';


function HomeScreen() {
  return (
    <Screen>
      <MyStats/>
    </Screen> 
  );
}

function FriendsScreen() {
  return (
    <Screen>
      <Friends/>
    </Screen>
  );
}

const Tab = createMaterialBottomTabNavigator();

export default function App() {

  const [golfId, setGolfId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const authContext = React.useMemo(() => ({
    login: (value) => {
        fetch(`http:localhost:8080/api/v1/getHandicap?handicap=${value}&months=0`)
            .then(response => response.json())
            .then(data => {
              if(data.hasOwnProperty("status")){
                if(data.status !== 200){
                    Alert.alert('That dont work honey, try again')
                }
              }else{
                setGolfId(data);
                storeData(value);
                setIsLoading(false);
              }
              
            }
        ).catch(e => {
            Alert.alert('Seems like you offline')
        })
    }
}));

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('golf_id')
      console.log(value)
      if(value !== null) {
        setGolfId(value);
      }
    } catch(e) {
      // error reading value
      console.log(e);
    }
  }

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('golf_id', value)
    } catch (e) {
      // saving error
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
          <ActivityIndicator size="large" color="orange"/>
      </View>
    )
  }

  return (
    <View style={styles.containerFullScreen}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          { golfId !== null  ? (
              <Tab.Navigator initialRouteName="Home"
                activeColor= 'red'
                inactiveColor="black"
                barStyle={{ backgroundColor: colors.primary }}>
                  <Tab.Screen name="Home" component={HomeScreen}/>
                  <Tab.Screen name="Friends" component={FriendsScreen}/>
                </Tab.Navigator>
            ) : (
              <Screen>
                <LoginPage/>
              </Screen>
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
