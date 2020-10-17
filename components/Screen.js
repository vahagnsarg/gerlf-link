import React from 'react';
import { 
    StyleSheet, 
    View, 
    SafeAreaView, 
    Platform,
    StatusBar
} from 'react-native';

import colors from '../config/colors';


function Screen(props){

    return(
        <SafeAreaView style={styles.containerSafeView}>
            {props.children}
        </SafeAreaView> 
    )
}

const styles = StyleSheet.create({
    containerSafeView: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
})

export default Screen;