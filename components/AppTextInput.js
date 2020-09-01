import React from 'react';
import {  
    StyleSheet, 
    TouchableOpacity
} from 'react-native'
import { TextInput } from 'react-native-paper';

import colors from '../config/colors';

export default function AppTextInput( { onChange, title, type, defaultValue} ){

    return(
        <TextInput
            label={title}
            style={styles.textInput}
            theme={{ colors: { primary: colors.secondary}}}
            selectionColor={colors.secondary}
            keyboardType={type}
            defaultValue={defaultValue}
            onChangeText={value => onChange(value)}
            mode='flat'   
        />
    )
}

const styles = StyleSheet.create({
    textInput: { 
        height: 60,
        width: "80%",
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        fontSize: 20,
        fontWeight: '300',
    },
})