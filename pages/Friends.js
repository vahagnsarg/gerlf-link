import React, { Component, useState } from 'react';
import { StyleSheet, 
    Text, 
    View, 
    ActivityIndicator, 
    FlatList, 
    Button,
    Modal
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Friend from '../components/Friend';
import DeleteItemAction from '../components/DeleteItemAction';
import AddFriend from '../components/AddFriend'



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

function addFriend(name, handicap){
    const id = friends.length + 1
    friends.push({
        id: id,
        name: name,
        handicap: handicap
    })
}

function Friends(props) {

    const [modalVisible, setModalVisible] = React.useState(false);

    return (
            <>
                <View style={styles.mainContainer}>
                    <Button 
                        title='Add new Friend' 
                        onPress={() => {setModalVisible(true)}}
                        style={styles.button}
                        />
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
                    ItemSeparatorComponent={() => 
                        <View style={{ width:"100%", height: 1, backgroundColor: 'black'}} />
                    }/>
                </View>
                <Modal visible={modalVisible} animationType='slide'>
                    <AddFriend 
                        close = {() => setModalVisible(false)}
                        add = {addFriend}
                    />
                </Modal>
            </>
        )
}

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1
    },
})

export default Friends;