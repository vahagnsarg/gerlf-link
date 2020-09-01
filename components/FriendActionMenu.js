import React, {useState} from 'react';
import { 
    StyleSheet, 
    View, 
    TouchableOpacity, 
    Alert, 
    Animated, 
    Modal,
    Text
} from 'react-native';
import EditFriend from './EditFriend'
import { FontAwesome , AntDesign} from '@expo/vector-icons'; 

import colors from '../config/colors';


function FriendActionMenu( { progress, dragX, deleteFriend, item, name, index, golf_id, editFriend} ){

    const [showModal, updateShowModal] = React.useState(false);

    const scale = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
        });

    return(
        <>
        <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
            <TouchableOpacity 
                style={styles.edit}
                onPress={() => {updateShowModal(true)}}>
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
                            onPress: () => {deleteFriend(index)}
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
        <Modal visible={showModal} animationType="slide">
            <View style={styles.modalStyle}>
                <EditFriend 
                    editFriend={editFriend} 
                    name={name} 
                    golf_id={golf_id}
                    index={index}
                    close={() => updateShowModal(false)}
                />
            </View>
        </Modal>
        </>
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
    },
    modalStyle:{
        backgroundColor: colors.primary, 
        flex:1
    }
})


export default FriendActionMenu;