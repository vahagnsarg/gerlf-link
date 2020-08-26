import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet} from 'react-native';

function FriendsListDetail( { data } ){

    const [dataEmpty, setDataEmpty] = React.useState(true)

    useEffect(() => {
        if(data !== undefined){
            if(data.hasOwnProperty('handicapHistory')){
                setDataEmpty(false);
            }
        }

    }, []);   

    return(
        <View>
            {
                dataEmpty ?  
                (
                    <View> 
                        <Text style={styles.text}>Please refresh to get data</Text>
                    </View>
                ) : 
                (
                    <View> 
                        <Text style={styles.text}>Yes data Homie</Text>
                    </View> 
                )
            }
        </View>
    )
}


const styles = StyleSheet.create({
    text: {
        textAlign: "center"
    }
})


export default FriendsListDetail;

