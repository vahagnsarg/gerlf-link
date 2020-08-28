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
import MyStats from '../pages/MyStats';
import Friends from '../pages/Friends';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Screen from '../components/Screen';

import { Ionicons } from '@expo/vector-icons'; 
import colors from '../config/colors';

const Tab = createMaterialBottomTabNavigator();
const FriendStack = createStackNavigator();


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
            name="FriendsStackScreen"
            component={FriendsScreen}
            options={({ navigation, route }) => ({
                title: 'Friends',
                headerStyle: {
                    backgroundColor: colors.primary,
                },
                headerTintColor: colors.headingTextColor,
                headerTitleStyle: {
                fontWeight: 'bold',
                },
            })
            }
        />
        </FriendStack.Navigator>
    );
}


export function tabNavigator() {
    return( 
        <Tab.Navigator initialRouteName="Home"
            activeColor= {colors.headingTextColor}
            inactiveColor="black"
            barStyle={{ backgroundColor: colors.primary }}>
            <Tab.Screen 
                name="My Stats" 
                component={MyStatsScreen}
                options={{
                    tabBarLabel: 'My Stats',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="ios-stats" size={24} color={color} />
                    ),
                }}
                />
            <Tab.Screen 
                name="Friends" 
                component={FriendsStackScreen}
                options={{
                    tabBarLabel: 'Friends',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="ios-people" size={24} color={color} />
                    ),
                }}/>
        </Tab.Navigator>
    )
}