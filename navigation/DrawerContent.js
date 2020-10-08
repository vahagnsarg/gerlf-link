import React, { useContext, useEffect, useState } from 'react';
import { 
    StyleSheet, 
    ActivityIndicator, 
    View, 
    SafeAreaView, 
    Text,
    Platform,
    StatusBar,
    Image, 
    Alert,
    Switch
} from 'react-native';;
import { Drawer } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../components/Context';

import global from '../config/global';

let initialRender = true;

export function DrawerContent(props){

    if (initialRender) {
        // On the first render (when the drawer will flash, return null so 
        //  null will "flash")
        // Don't forget to set this flag to false or you're always going 
        // to have a ghost drawer
        initialRender = false;
        return null;
    }


    const { signOut } = useContext(AuthContext);

    useEffect(() => {

        //Get tge latest Global Toggles form Async 

    }, []); 

    function updateToggle(toggle, value, globalVar){
        toggle(value);

        global[globalVar] = value;

        //Store Async Here
    }

    const [showChart, setShowChart] = useState(global.showChart);
    const [showTopStats, setShowTopStats] =useState(global.showTopStats);
    const [showFriendID, setShowFriendID] = useState(global.showFriendID);

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
                <Drawer.Section>
                    <View style={styles.toggleItem}>
                        <Drawer.Item
                            label='Show chart'
                            style={styles.toggleText}
                        />
                        <Switch value={showChart} onValueChange={value => updateToggle(setShowChart, value, 'showChart')}/>
                    </View>

                    <View style={styles.toggleItem}>
                        <Drawer.Item
                            label='Show top stats'
                            style={styles.toggleText}
                        />
                        <Switch value={showTopStats} onValueChange={value => updateToggle(setShowTopStats, value, 'showTopStats')}/>
                    </View>

                    <View style={styles.toggleItem}>
                        <Drawer.Item
                            label='Show friend ID'
                            style={styles.toggleText}
                        />
                        <Switch value={showFriendID} onValueChange={value => updateToggle(setShowFriendID, value, 'showFriendID')}/>
                    </View>

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
    
    toggleItem:{
        padding: 10,
        flexDirection: 'row',
        alignItems: "center",
    },

    toggleText:{
        width: 146.5    
    },

    toggleToggle:{
        flex: 4
    },

    image:{
        height: 150,
        width: 200,
        alignSelf:"center",
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    }
})
