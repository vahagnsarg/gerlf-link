import React from 'react';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import colors from '../config/colors';


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
        backgroundColor: colors.primary,
    },

    containerSafeView: {
        flex: 1,
        backgroundColor: colors.primary,
    },
});


export default MainApp;