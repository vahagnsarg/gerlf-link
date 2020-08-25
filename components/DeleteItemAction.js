import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons"

import colors from '../config/colors';

function DeleteItemAction(props){
    return(
        <View style={styles.delete}>
            <MaterialCommunityIcons 
                name='trash-can'
                size={35}
                color={'white'}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    delete: {
        backgroundColor: colors.danger, 
        width: 70,
        justifyContent: "center",
        alignItems:'center'
    },
})


export default DeleteItemAction;