import React from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"

import colors from '../config/colors';

function DeleteItemAction( { deleteFriend, item } ){

    return(
        <TouchableOpacity 
            style={styles.delete}
            onPress={() => {Alert.alert(
                "Remove Friend",
                "Are you sure you want to remove this friend",
                [
                    {
                        text: "Oh no, Stop!",
                        style: "cancel"
                    },
                    { 
                        text: "Get rid of them", 
                        onPress: () => {deleteFriend(item.order)}
                    }
                ],
                    { cancelable: true }
                );}}>
                <MaterialCommunityIcons 
                    name='trash-can'
                    size={35}
                    color={colors.danger}
                />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    delete: {
        backgroundColor: "gray", 
        width: 70,
        justifyContent: "center",
        alignItems:'center'
    },
})


export default DeleteItemAction;