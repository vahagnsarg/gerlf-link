import React, { useContext } from 'react';
import { 
    StyleSheet, 
    ActivityIndicator, 
    View, 
    SafeAreaView, 
    Text,
    Platform,
    StatusBar,
    Image, Alert
} from 'react-native';

import { 
    createDrawerNavigator,
    DrawerItem
} from '@react-navigation/drawer';
import { AuthContext } from '../components/Context';

import { Drawer } from 'react-native-paper';

let initialRender = true; // <-- Add this

export function DrawerContent(props){

    if (initialRender) {
        // On the first render (when the drawer will flash, return null so 
        //  null will "flash")
        // Don't forget to set this flag to false or you're always going 
        // to have a ghost drawer
        initialRender = false;
        return null;
    }


    const { signOut } = React.useContext(AuthContext);

    return(
        <SafeAreaView>
                <Image source={require('../assets/gerlf_link_logo.png')} style={styles.image}/>
                <Drawer.Section>
                    <Drawer.Item
                        label='Home'
                        onPress={() => {props.navigation.navigate('My Stats')}}
                    />
                    <Drawer.Item
                        label='Give me money'
                        onPress={() => {}}
                    />
                    <Drawer.Item
                        label='About'
                        onPress={() => {}}
                    />
                </Drawer.Section>
                <Drawer.Section style={styles.bottomSection}>
                    <Drawer.Item 
                    label='Use new GolfLink'
                    onPress={() => {Alert.alert(
                        "Are you sure?",
                        "You will lose your current data",
                        [
                            {
                                text: "Oh no, Stop!",
                                style: "cancel"
                            },
                            { 
                                text: "Lets do it", 
                                onPress: () => {signOut()}
                            }
                        ],
                            { cancelable: true }
                        );}}/>
                </Drawer.Section>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    topSection:{

    },

    bottomSection:{

    },

    image:{
        height: 150,
        width: 200,
        alignSelf:"center",
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    }
})
