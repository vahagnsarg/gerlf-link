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

import { tabNavigator } from './navigation/TabScreens'
import { DrawerContent } from './navigation/DrawerContent'

import MyStats from './pages/MyStats';
import Friends from './pages/Friends';
import {LoginScreen} from './pages/LoginPage';
import { getHandicap } from './API/API';

import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from './components/Context';
import Screen from './components/Screen';

import colors from './config/colors';

const Drawer = createDrawerNavigator();
const LoginStack = createStackNavigator();


export default function App() {

  const [golfId, setGolfId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const authContext = React.useMemo(() => ({
    login: (value) => {
        getHandicap(value).then(response => {
                  if(response.ok){
                    return response.json()
                  }

                  Alert.alert('There was an erorr getting that GA number. Please try again')
              })
            .then(data => {
                if(data != undefined){
                  setGolfId(data);
                  storeData(value);
                  setIsLoading(false);
                }
            }
        ).catch(e => {
            Alert.alert('Seems like you offline')
        })
    },

    signOut: () =>{
        setGolfId(null);
        clearAppData();
        setIsLoading(false);
    }
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
