import React, { useEffect, useState, useMemo} from 'react';
import { 
  StyleSheet, 
  ActivityIndicator, 
  View, 
  SafeAreaView, 
  Alert,
  Platform,
  StatusBar,
  Button
} from 'react-native';
import MyStats from './pages/MyStats';
import Friends from './pages/Friends';
import LoginPage from './pages/LoginPage';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from './components/Context';
import Screen from './components/Screen';

import colors from './config/colors';

const Tab = createMaterialBottomTabNavigator();
const FriendStack = createStackNavigator();
const Drawer = createDrawerNavigator();


function MyStatsScreen() {
  return (
    <Screen>
      <MyStats/>
    </Screen> 
  );
}

function FriendsScreen( {navigation} ) {
  return (
    <Screen>
      <Friends navigation={navigation}/>
    </Screen>
  );
}


function FriendsStackScreen() {
  return (
    <FriendStack.Navigator>
      <FriendStack.Screen
        name="A"
        component={FriendsScreen}
        options={({ navigation, route }) => ({
            title: 'Friends',
            headerStyle: {
              backgroundColor: colors.primary,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })
        }
      />
    </FriendStack.Navigator>
  );
}


const tabNavigator = () => {
        return( 
          <Tab.Navigator initialRouteName="Home"
                activeColor= 'red'
                inactiveColor="black"
                barStyle={{ backgroundColor: colors.primary }}>
            <Tab.Screen name="Home" component={MyStatsScreen}/>
            <Tab.Screen name="Friends" component={FriendsStackScreen}/>
          </Tab.Navigator>
        )
}

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
            <Drawer.Navigator
            drawerType="slide"
            drawerStyle={{
              backgroundColor: colors.primary,
              width: 240,
            }}
            drawerContentOptions={{
              activeBackgroundColor: 'orange',
              activeTintColor: 'black',
            }}
            
            >
              <Drawer.Screen name="Home" component={tabNavigator} />
              <Drawer.Screen name="About" component={tabNavigator} />
              <Drawer.Screen name="GIVE ME MONEY" component={tabNavigator} />
            </Drawer.Navigator>
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
