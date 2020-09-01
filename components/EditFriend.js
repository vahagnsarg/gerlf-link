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

import AppTextInput from './AppTextInput'
import AppButton from './AppButton'

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

    editFriend = (index, name, golf_id) => {
        this.props.editFriend(index, name, golf_id);
        this.props.close();
    }

    closeModal = () => {
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

                            <AppTextInput title="Nickname" onChange= {this.setName} type='default' defaultValue={this.state.name}/>
                            <AppTextInput title="Golflink Number" onChange= {this.setGolfLink} type='numeric' defaultValue={this.state.golf_id} />

                            <View style={styles.buttonLayout}>
                                <AppButton title="Cancel" onPress={() => this.closeModal()} />
                                <AppButton 
                                    title="Save" 
                                    onPress={() => this.editFriend(this.props.index, this.state.name, this.state.golf_id)}
                                />
                            </View>
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
        borderColor: colors.secondary,
        borderRadius: 10,
        backgroundColor: 'white',
        textAlign: "center",
        fontSize: 20,
        fontWeight: '300',
    },

    buttonLayout: {
        flexDirection: 'row',
        
    }
})

export default AddFriend;