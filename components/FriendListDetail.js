import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import Dots from './Dots'
import { createDrawerNavigator } from '@react-navigation/drawer';

function FriendsListDetail( { data, handicapError, dataFirstRefresh, dataEmpty} ){
    

    if(handicapError){
        return(
            <View> 
                <Text style={styles.text}>Seems like the handicap does not exist</Text>
            </View>
        )
    }

    let dotsOveriew = null;
    if(!dataFirstRefresh && !handicapError){
        const history = data.handicapHistory;
        dotsOveriew = <Dots history={history} /> 
    }

    return(
        <>
            {
                dataEmpty ? 
                    (
                        <View> 
                            <Text style={styles.text}>Please refresh to get data</Text>
                        </View>
                    ) 
                    : 
                    (
                        <View style={styles.dots}> 
                            {dotsOveriew}
                        </View> 
                    )
            }
        </>
    )
}


const styles = StyleSheet.create({
    text: {
        textAlign: "center"
    },

    dots: { 
        paddingTop: 10
    }
})


export default FriendsListDetail;

