import React, { Component } from 'react';
import { StyleSheet, SafeAreaView} from 'react-native';
import LoginPage from './LoginPage';

import AsyncStorage from '@react-native-community/async-storage';

import colors from '../config/colors';



class LoginScreen extends Component {

    state = {  
        input:''
    }

    render() {
        return (
            <LoginPage/>
        );
    }
}


const styles = StyleSheet.create({
    containerSafeView: {
        flex: 1,
        backgroundColor: colors.primary
    },
});

export default LoginScreen;