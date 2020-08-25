import React from 'react';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


class MainApp extends Component {
    state = {  }

    render() {
        return (
            <View>
                <Text>LOGIN HERE</Text>
                <Input></Input>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerFullScreen: {
        flex: 1,
        backgroundColor: 'pink',
    },

    containerSafeView: {
        flex: 1,
        backgroundColor: 'pink'
    },
});


export default MainApp;