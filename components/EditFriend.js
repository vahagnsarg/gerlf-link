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

import Screen from './Screen'

import colors from '../config/colors';


class AddFriend extends Component {

    state = {
        name: this.props.name,
        golf_id: this.props.golf_id,
    };

    setName = (value) => {
        this.setState({name: value})
    }

    setGolfLink = (value) => {
        this.setState({golf_id: value})
    }

    editFriend = (order, name, golf_id) => {
        this.props.editFriend(order, name, golf_id);
        this.props.closeRow();
        this.props.close();
    }

    closeModal = () => {
        this.props.closeRow();
        this.props.close();
    }



    render() {

        return (
            <Screen>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView 
                    style={styles.mainContainer}   
                    behavior={Platform.OS == "ios" ? "padding" : "height"}>                
                            <Text style={{paddingBottom: 20}}>Edit friend Here plz</Text>

                            <Text>Nickname</Text>
                            <TextInput 
                                style={styles.textInput}
                                onChangeText={value => this.setName(value)}
                                defaultValue={this.state.name}
                            />

                            <Text>Golflink Number</Text>
                            <TextInput 
                                style={styles.textInput}
                                keyboardType="numeric"
                                onChangeText={value => this.setGolfLink(value)}
                                defaultValue={this.state.golf_id} 
                            />
                            <Button 
                                title="Save" 
                                onPress={() => this.editFriend(this.props.order, this.state.name, this.state.golf_id)}
                            />
                            <Button title="Close" onPress={() => this.closeModal()} />
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