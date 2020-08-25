import React, { Component } from 'react';
import { StyleSheet, SafeAreaView} from 'react-native';
import LoginPage from './LoginPage';

import AsyncStorage from '@react-native-community/async-storage';


class LoginScreen extends Component {

    state = {  
        input:''
    }

    render() {
        return (
            <SafeAreaView style={styles.containerSafeView}>
                <LoginPage/>
            </SafeAreaView> 
        );
    }
}


const styles = StyleSheet.create({
    containerSafeView: {
        flex: 1,
        backgroundColor: 'pink'
    },
});

export default LoginScreen;