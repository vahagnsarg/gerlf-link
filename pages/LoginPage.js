import React, { Component, useContext } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    Button, 
    KeyboardAvoidingView, 
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import { AuthContext } from '../components/Context';


const LoginPage = () => {

    const { login } = React.useContext(AuthContext);

    const [input, setInput] = React.useState('');

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView 
                style={styles.mainContainer}   
                behavior={Platform.OS == "ios" ? "padding" : "height"}>
                <View style={styles.container}>
                    <Text style={styles.heading}>Enter Your GA</Text>
                    <TextInput 
                    style={styles.textInput}
                    keyboardType="numeric"
                    onChangeText={value => setInput(value)} ></TextInput>
                    <Button 
                    title='Submit' 
                    onPress={() => {login(input)}}
                    style={styles.button}
                    />
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    textInput: { 
        height: 40,
        width: "80%",
        borderWidth: 2,
        borderColor: 'orange',
        borderRadius: 10,
        textAlign: "center",
        fontSize: 20,
        fontWeight: '300',
    },

    button:{
        padding: 20,
    },

    heading:{
        fontWeight: '500',
        fontSize: 30,
        padding:15
    },

    mainContainer: { 
        flex:1,
    },

    container: { 
        flex:1,
        alignItems: "center",
        justifyContent:'center'
    },

});

export default LoginPage;