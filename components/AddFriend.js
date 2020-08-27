import React, { Component } from 'react';
import { StyleSheet, 
    Text, 
    View, 
    Button, 
    TextInput, 
    KeyboardAvoidingView,  
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Screen from './Screen'
import colors from '../config/colors';



class AddFriend extends Component {

    state = {
        name: '',
        golflink: '',
    };

    setName = (value) => {
        this.setState({name: value})
    }

    setGolfLink = (value) => {
        this.setState({golflink: value})
    }

    addFriend = (name, golfLink) => {
        this.props.add(name, golfLink);
        this.props.close();
    }



    render() {

        return (
            <Screen>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView 
                    style={styles.mainContainer}   
                    behavior={Platform.OS == "ios" ? "padding" : "height"}>                
                            <Text style={{paddingBottom: 20}}>Add friend Here plz</Text>

                            <Text>Nickname</Text>
                            <TextInput 
                                style={styles.textInput}
                                onChangeText={value => this.setName(value)} 
                            />

                            <Text>Golflink Number</Text>
                            <TextInput 
                                style={styles.textInput}
                                keyboardType="numeric"
                                onChangeText={value => this.setGolfLink(value)} 
                            />
                            <Button 
                                title="Add" 
                                onPress={() => this.addFriend(this.state.name, this.state.golflink)}
                            />
                            <Button title="Close" onPress={this.props.close} />
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </Screen>
            )
    }
    
}

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        alignItems: "center",
        paddingTop: 40,
    },

    textInput: { 
        height: 40,
        width: "80%",
        borderWidth: 2,
        borderColor: 'orange',
        borderRadius: 10,
        backgroundColor: 'white',
        textAlign: "center",
        fontSize: 20,
        fontWeight: '300',
    },
})

export default AddFriend;