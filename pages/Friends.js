import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Friends extends Component {
    state = {  }
    render() {
        return (
            <View style={styles.mainContainer}>
                <Text>Friends List</Text>

                <View style={styles.friendsContainer}>
                    <Text>Friends</Text>
                </View>    
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        flexDirection: 'column-reverse',
        alignContent: "center",
        alignItems: "center",
    },

    friendsContainer:{
        flex:1,
        alignSelf: "stretch",
        backgroundColor: 'yellow',
    },
})

export default Friends;