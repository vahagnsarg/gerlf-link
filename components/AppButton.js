import React from 'react';
import {  
    StyleSheet, 
    View, 
    Text,
    TouchableOpacity
} from 'react-native'

import colors from '../config/colors';

export default function AppButton( { onPress, title} ){

    return(
        <TouchableOpacity onPress={onPress} style={styles.appButtonContainer} activeOpacity={0.8}>
            <Text style={styles.appButtonText}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    appButtonContainer: {
        elevation: 8,
        backgroundColor: colors.secondary,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        margin: 5
    },

    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase",
    }
})