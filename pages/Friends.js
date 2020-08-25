import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Friend from '../components/Friend';
import DeleteItemAction from '../components/DeleteItemAction'

import colors from '../config/colors';


const friends = [
    {
        id: 1,
        name: 'Jernnnn',
        handicap: '36'
    },
    {
        id: 2,
        name: 'Ellernnnn',
        handicap: '7'
    }
];

function Friends(props) {
        return (
            <FlatList 
            data={friends}
            keyExtractor={friend => friend.id.toString()}
            renderItem={({ item }) => 
                <Friend 
                name={item.name}
                handicap={item.handicap}
                renderRightActions={() => <DeleteItemAction /> }
                />
            }
            style={styles.mainContainer}
            ItemSeparatorComponent={() => 
                <View style={{ width:"100%", height: 1, backgroundColor: 'black'}} />
            }/>
        )
}

const styles = StyleSheet.create({
    mainContainer:{

    },
})

export default Friends;