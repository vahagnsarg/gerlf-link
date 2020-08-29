import React , { useEffect , useState}from 'react';
import { View, StyleSheet, Text } from 'react-native'
import FriendsListDetail from './FriendListDetail';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import colors from '../config/colors';

function Friend({ name, data, dataEmpty , handicap, handicapError, renderRightActions, golf_id}){

    return(
        <Swipeable renderRightActions={renderRightActions}>
            <View style={styles.container}>
                <View style={styles.information}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.golf_id}>{golf_id}</Text>
                    <FriendsListDetail style={styles.detail} data={data} handicapError={handicapError} dataEmpty={dataEmpty}/>
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
        height: 80,
        alignItems: "center"
    },

    information: {
        flex: 5
    },

    handicap: {
        flex: 1
    },

    handicapText:{
        fontWeight: 'bold', 
        fontSize: 25
    },

    name: {
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 20
    }, 

    golf_id: {
        textAlign: "center",
        fontSize: 10
    }, 

    detail: {
        alignItems:"center",
        alignContent:"center",
        alignSelf:"center",
        textAlign: "center"
    }
})

export default Friend