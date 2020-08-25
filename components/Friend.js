import React from 'react';
import { View, StyleSheet, Text } from 'react-native'
import FriendsListDetail from './FriendListDetail';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import colors from '../config/colors';

function Friend({ name, history , handicap, renderRightActions}){
    return(
        <Swipeable renderRightActions={renderRightActions}>
            <View style={styles.container}>
                <View style={styles.information}>
                    <Text style={styles.name}>{name}</Text>
                    <FriendsListDetail />
                </View>
                <View style={styles.handicap}>
                    <Text>{handicap}</Text>
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

    name: {
        textAlign: "center"
    }, 
})

export default Friend