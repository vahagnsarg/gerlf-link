import React, { useContext } from 'react';
import { 
    StyleSheet, 
    ActivityIndicator, 
    View, 
    SafeAreaView, 
    Text,
    Button,
    Image, Alert
} from 'react-native';

import { 
    createDrawerNavigator,
    DrawerItem
} from '@react-navigation/drawer';
import { AuthContext } from '../components/Context';

import { Drawer } from 'react-native-paper';

export function DrawerContent(props){

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
        alignSelf:"center"
    }
})
