import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet} from 'react-native';

function FriendsListDetail( { data, handicapError} ){

    const [dataEmpty, setDataEmpty] = React.useState(true)

    useEffect(() => {
        if(data.hasOwnProperty('handicapDetails')){
            console.log('handicapDetails')
            setDataEmpty(false);
        }

        console.log(dataEmpty)
    }, []);   

    

    if(handicapError){
        return(
            <View> 
                <Text style={styles.text}>Seems like the handicap does not exist</Text>
            </View>
        )
    }

    if(dataEmpty){
        return(
            <View> 
                <Text style={styles.text}>Please refresh to get data</Text>
            </View>
        )
    }

    return(
            <View> 
                <Text style={styles.text}>Yes data Homie</Text>
            </View> 
    )
}


const styles = StyleSheet.create({
    text: {
        textAlign: "center"
    }
})


export default FriendsListDetail;

