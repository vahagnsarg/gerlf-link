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
import { Feather } from '@expo/vector-icons'; 

import Friend from '../components/Friend';
import AddFriend from '../components/AddFriend';
import { getHandicap } from '../API/API';

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
                        color= {colors.headingTextColor}
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

    function updateFriends(friends){
        setFriends(friends);
        storeFriends(friends);
    }
    
    function addFriend(name, golf_id){

        const friendsList = [...friends]
    
        const order = friendsList.length + 1;
        friendsList.push({
            order: order,
            name: name,
            handicap: 'N/A',
            golf_id: golf_id,
            handicapError: false,
            dataEmpty: true,
            modifiedWithoutRefresh: false,
            data: {}
        });
        
        setFriends([]);
        setFriends(friendsList);
        storeFriends(friendsList);
    }

    function deleteFriend(index){
        const friendsList = [...friends]

        const position = index
        friendsList.splice(position, 1);

        if (friendsList.length !== 0 ){
            var order = 1
            friendsList.map((x) => {
                x.order = order;
                order ++
                return x
            })
        }
        
        setFriends([]);
        setFriends(friendsList);
        storeFriends(friendsList);
    }

    function editFriend(index, name, golf_id){
        const friendsList = [...friends]

        const position = index;

        let friend = friendsList[position];

        friend.name = name;
        if(friend.golf_id != golf_id){
            friend.golf_id = golf_id;
            friend.modifiedWithoutRefresh = true;
            friend.dataEmpty = true;
            friend.handicapError = false;
        }

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

        const friendsList = friends;

        friendsList.map((friend) => {

            const handicapNumber = friend.golf_id;
            getHandicap(handicapNumber).then(response => {
                    if(!response.ok){
                        console.log('Reponse not OK in refresh for '+ friend.golf_id)
                        return;
                    }
                    return response.json()
                })
                .then(data => {
                        friend.data = data;
                        friend.dataEmpty = false;
                        friend.handicapError = false;
                        friend.modifiedWithoutRefresh = false;
                        friend.handicap = data.handicapDetails.exactHandicap;
                })
                .catch((e) => {
                    //console.log('Errr in refresh for '+ friend.golf_id)
                    friend.handicapError = true;
                })
        })

        console.log('Friends.js: Friends refreshed')
        setFriends(friendsList);

        setTimeout(function(){
            //that.handicapEndPoint()
            setRefreshing(false)
            storeFriends(friendsList);
        }, 2000);
    }

    useEffect(() => {

        getFriends();

    }, []);   

    return (
        <>
            { friends.length === 0 
                ? 
                (
                    <View>
                        <Text>Add your first Friend</Text>
                    </View>
                ) : 
                (
                    <View style={styles.mainContainer}>
                        <FlatList 
                        data={friends}
                        keyExtractor={friend => { return(friend.order.toString() + "#" + friend.golf_id.toString())}}
                        renderItem={({ item, index }) => 
                            <Friend 
                                {...item}
                                index={index}
                                deleteFriend={deleteFriend}
                                editFriend={editFriend}
                            />
                        }
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refreshFriendsListScroll}/>}
                        ItemSeparatorComponent={() => 
                            <View style={{ width:"100%", height: 1, backgroundColor: 'black'}} />
                        }
                        keyboardShouldPersistTaps='handled'/>
                    </View>
                )
            }
            <Modal visible={modalVisible} animationType='slide'>
                <View style={styles.modalStyle}>
                <AddFriend 
                    close = {() => setModalVisible(false)}
                    add = {addFriend}
                />
                </View>
            </Modal>
        </>
        )
}

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor: colors.backgroundColor
    },

    modalStyle:{
        backgroundColor: colors.primary, 
        flex:1
    }
})

export default Friends;