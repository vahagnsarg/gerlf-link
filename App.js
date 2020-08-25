import React, { useEffect, useState, useMemo} from 'react';
import { StyleSheet, ActivityIndicator, View, SafeAreaView, Alert} from 'react-native';
import MyStats from './pages/MyStats';
import Friends from './pages/Friends';
import LoginScreen from './pages/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from './components/Context';


function HomeScreen() {
  return (
    <SafeAreaView style={styles.containerSafeView}>
      <MyStats/>
    </SafeAreaView> 
  );
}

function FriendsScreen() {
  return (
    <SafeAreaView style={styles.containerSafeView}>
      <Friends/>
    </SafeAreaView> 
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
                setIsLoading(false);
              }
              
            }
        );
    }
  }));

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('golf_id')
      if(value !== null) {
        setGolfId(value);
      }
    } catch(e) {
      // error reading value
      console.log(e);
    }
  }

  useEffect(() => {

    getData;

    setTimeout(() => {
      setIsLoading(false);
    }, 1000)
  }, []);

  if( isLoading ){
    return(
      <View style={styles.loadView}>
          <ActivityIndicator size="large" color="orange" />
      </View>
    )
  }

  return (
    <View style={styles.containerFullScreen}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          { golfId !== null  ? (
              <Tab.Navigator initialRouteName="Home"
                activeColor= 'green'
                inactiveColor="black"
                barStyle={{ backgroundColor: 'pink' }}>
                  <Tab.Screen name="Home" component={HomeScreen}/>
                  <Tab.Screen name="Friends" component={FriendsScreen}/>
                </Tab.Navigator>
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
    backgroundColor: 'pink',
  },

  containerSafeView: {
    flex: 1,
    backgroundColor: 'pink'
  },

  loadView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
},
});
