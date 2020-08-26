import React, { Component, useState, useEffect, useLayoutEffect} from 'react';
import { StyleSheet, 
    Text, 
    View, 
    ActivityIndicator, 
    FlatList, 
    Button,
    Modal,
    RefreshControl
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Friend from '../components/Friend';
import DeleteItemAction from '../components/DeleteItemAction';
import AddFriend from '../components/AddFriend'
import { Feather } from '@expo/vector-icons'; 

import colors from '../config/colors';

function Friends( {navigation}) {

    const [modalVisible, setModalVisible] = React.useState(false);
    const [friends, setFriends] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{paddingRight: 10}}>
                    <Feather 
                        name="plus" 
                        size={30} 
                        color="black"
                        borderRadius={5}
                        onPress={() => {setModalVisible(true)}}
                    />
                </View>
            ),
        });
    }, [navigation]);

    const getFriends = async () => {
        try {
            await AsyncStorage.getItem('friends_list', (errs,result) => {
                if (!errs) {
                    if (result !== null) {
                        const data = JSON.parse(result)
                        setFriends(data)
                    }
                }
            })

        } catch(e) {
          // error reading value
            console.log(e); 
        }
    }
    
    function addFriend(name, golf_id){

        const friendsList = [...friends]
    
        const order = friendsList.length + 1;
        friendsList.push({
            order: order,
            name: name,
            handicap: 'N/A',
            golf_id: golf_id,
            data: {}
        });
        
        setFriends(friendsList);
        storeFriends(friendsList);
    }
    
    const storeFriends = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('friends_list', jsonValue)
        } catch (e) {
            console.log(e)
        }
    }

    function refreshFriendsListScroll(){
        setRefreshing(true)

        let that = this;
        setTimeout(function(){
            //that.handicapEndPoint()
            setRefreshing(false)
        }, 2000);
    }

    useEffect(() => {

        getFriends();

    }, []);   

    return (
            <>
                <View style={styles.mainContainer}>
                    <FlatList 
                    data={friends}
                    keyExtractor={friend => friend.order.toString()}
                    renderItem={({ item }) => 
                        <Friend 
                        name={item.name}
                        handicap={item.handicap}
                        golf_id={item.golf_id}
                        data={item.data}
                        renderRightActions={() => <DeleteItemAction /> }
                        />
                    }
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshFriendsListScroll}/>}
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