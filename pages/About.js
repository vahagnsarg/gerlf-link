import React from 'react';
import { 
    StyleSheet, 
    View,
    Text,
    Image,
    Platform,
    StatusBar,
} from 'react-native';

import colors from '../config/colors';

function Friends() {

    return (
        <View style={styles.mainContainer}>
            <Image source={require('../assets/gerlf_link_logo.png')} style={styles.image}/>
            <Text>
                Yeah so this is my Gerlf Link application. Please give me as much money as you can!! 
            </Text>
        </View>
        )
}

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor: colors.primary
    },

    image:{
        height: 150,
        width: 200,
        alignSelf:"center",
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    }
}) 

export default Friends;