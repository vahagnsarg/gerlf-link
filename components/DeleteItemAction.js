import React from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, Animated } from 'react-native';
import { FontAwesome , AntDesign} from '@expo/vector-icons'; 

import colors from '../config/colors';


function DeleteItemAction( { progress, dragX, deleteFriend, item } ){

    const scale = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
        });

    return(
        <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
            <TouchableOpacity 
                style={styles.edit}
                onPress={() => {}}>
                    <AntDesign 
                        name='edit'
                        size={35}
                        color='blue'
                    />
            </TouchableOpacity>
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
                    <FontAwesome 
                        name='trash-o'
                        size={35}
                        color={colors.danger}
                    />
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    delete: {
        backgroundColor: "gray", 
        width: 70,
        justifyContent: "center",
        alignItems:'center'
    },
    edit: {
        backgroundColor: "gray", 
        width: 70,
        justifyContent: "center",
        alignItems:'center'
    },
    container:{
        flexDirection:'row',
        width: 140,
    }
})


export default DeleteItemAction;