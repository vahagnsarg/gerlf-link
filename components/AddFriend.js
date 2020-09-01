import React, { Component } from 'react';
import { StyleSheet, 
    Text, 
    View, 
    Button, 
    KeyboardAvoidingView,  
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import Screen from './Screen'

import AppTextInput from './AppTextInput'
import AppButton from './AppButton'

import colors from '../config/colors';
import { color } from 'react-native-reanimated';



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

                            <AppTextInput title="Nickname" onChange= {this.setName} type='default'/>
                            <AppTextInput title="Golflink Number" onChange= {this.setGolfLink} type='numeric'/>

                            <View style={styles.buttonLayout}>
                                <AppButton title="Cancel" onPress={this.props.close} />

                                <AppButton 
                                    title="Add" 
                                    onPress={() => this.addFriend(this.state.name, this.state.golflink)}
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
        height: 60,
        width: "80%",
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        fontSize: 20,
        fontWeight: '300',
    },

    buttonLayout: {
        flexDirection: 'row',
        
    }
})

export default AddFriend;