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
        //fetch(`http:localhost:8080/api/v1/getHandicap?handicap=${value}&months=0`)
        fetch(`https://api.golf.org.au/golfau/v1/public/v3/handicaphistory?golfLinkNo=${value}&months=0`, {
                headers: { 
                        'Connection': 'keep-alive', 
                        'Pragma': 'no-cache', 
                        'Cache-Control': 'must-revalidate, private', 
                        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjRBRTNDMkI3NTgxMUZGODhBMUM5RUI2M0Y3QjY5NEZBRDg2NUQ0QkUiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJTdVBDdDFnUl80aWh5ZXRqOTdhVS10aGwxTDQifQ.eyJuYmYiOjE1OTc1MzU1NTMsImV4cCI6MTU5NzUzOTE1MywiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5nb2xmLm9yZy5hdSIsImF1ZCI6WyJodHRwczovL2lkZW50aXR5LmdvbGYub3JnLmF1L3Jlc291cmNlcyIsIkdBIEFQSSJdLCJjbGllbnRfaWQiOiJHQS5BUEkuQ0xJRU5UIiwic3ViIjoiMzcxOTAiLCJhdXRoX3RpbWUiOjE1OTE0ODI0NDMsImlkcCI6ImxvY2FsIiwiVXNlck5hbWUiOiJ2YWhhZ24uc2FyZ0BnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsInNjb3BlIjpbIkdBLkFQSSIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwYXNzd29yZCJdfQ.Qwq6b4de_hA_lDT3IJD_KHuRCtoVk_FWq914vkBVzorY7wb58fbxuRp0RUXQdp9PhSMFSsiZNbDOejNMENKWEO_dyEckUm3X3JDk6DGOnKqxjHwKVzuiKrn-7kL3nN5PwA-IGfMYAHPvQkbbkfV5z6BJ0wZQM06BCJYE2aas06cklbyNKoM2WZ2ZrgMFU9dFiHTX5onAYHkIgiGM7E1NxJq2Uu44stduDpldwqEFtCu_oFFyDYmEAs0NyGKCyqAXG2P0_AoQDw2wQzhIqNtmwqGiWhVQlSIAexNvIiqRKSk1FGRXEkqnlvaeUjnlgHWxO6R8gfgD6iGk04bMz_BmHw', 
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36', 
                        'Ocp-Apim-Subscription-Key': 'f3185ed69cb44f9895dcb826fb9c368a', 
                        'Expires': '-1', 
                        'Accept': '*/*', 
                        'Sec-Fetch-Site': 'same-site', 
                        'Sec-Fetch-Mode': 'cors',
                        'Sec-Fetch-Dest': 'empty',
                        "Access-Control-Allow-Origin":  "https://api.golf.org.au",
                        'Referer': `https://www.golf.org.au/handicap/?golfLinkNo=${value}`, 
                        'Accept-Encoding': 'gzip, deflate, br', 
                        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8'
                    }
                })
              .then(response => {
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
