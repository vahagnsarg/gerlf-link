import React from 'react';
import { View, StyleSheet, Text } from 'react-native'
import FriendsListDetail from './FriendListDetail';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import colors from '../config/colors';

function Friend({ name, data, golf_id , handicap, handicapError, renderRightActions}){
    return(
        <Swipeable renderRightActions={renderRightActions}>
            <View style={styles.container}>
                <View style={styles.information}>
                    <Text style={styles.name}>{name}</Text>
                    <FriendsListDetail style={styles.detail} data={data} handicapError={handicapError}/>
                </View>
                <View style={styles.handicap}>
                    <Text style={styles.handicapText}>{handicap}</Text>
                </View>
            </View>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 70,
        alignItems: "center"
    },

    information: {
        flex: 5
    },

    handicap: {
        flex: 1
    },

    handicapText:{
        fontWeight: '500', 
        fontSize: 25
    },

    name: {
        textAlign: "center",
        fontWeight: "600",
        fontSize: 20
    }, 

    detail: {
        alignItems:"center",
        alignContent:"center",
        alignSelf:"center",
        textAlign: "center"
    }
})

export default Friend