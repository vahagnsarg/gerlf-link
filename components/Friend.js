import React , { useEffect , useState }from 'react';
import {  
    StyleSheet, 
    View, 
    Text 
} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import FriendActionMenu from '../components/FriendActionMenu';

import Dots from './Dots'


function FriendsListDetail( { data, handicapError, dataFirstRefresh, dataEmpty, modifiedWithoutRefresh} ){
    

    if(handicapError){
        return(
            <View> 
                <Text style={styles.text}>Seems like the handicap does not exist</Text>
            </View>
        )
    }

    let dotsOveriew = null;
    if(!dataFirstRefresh && !handicapError && !modifiedWithoutRefresh){
        const history = data.handicapHistory;
        dotsOveriew = <Dots history={history} /> 
    }

    return(
        <>
            {
                (dataEmpty || modifiedWithoutRefresh) ? 
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




function Friend( { 
        name, 
        data,
        dataEmpty, 
        handicap, 
        handicapError, 
        renderRightActions, 
        golf_id, 
        modifiedWithoutRefresh, 
        deleteFriend, 
        editFriend, 
        order
    }){

    return(
        
        <Swipeable 
        renderRightActions={(progress, dragX) => 
            <FriendActionMenu 
                progress={progress} 
                dragX={dragX} 
                order={order} 
                name={name}
                golf_id={golf_id}
                deleteFriend={deleteFriend}
                editFriend={editFriend}
                /> 
            }>
            <View style={styles.container}>
                <View style={styles.information}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.golf_id}>{golf_id}</Text>
                    <FriendsListDetail 
                        style={styles.detail} 
                        data={data} 
                        handicapError={handicapError} 
                        dataEmpty={dataEmpty} 
                        modifiedWithoutRefresh={modifiedWithoutRefresh}
                    />
                </View>
                <View style={styles.handicap}>
                    <Text style={styles.handicapText}>{handicap}</Text>
                </View>
            </View>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 80,
        alignItems: "center"
    },

    information: {
        flex: 5
    },

    handicap: {
        flex: 1
    },

    handicapText:{
        fontWeight: 'bold', 
        fontSize: 25
    },

    name: {
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 20
    }, 

    golf_id: {
        textAlign: "center",
        fontSize: 10
    }, 

    detail: {
        alignItems:"center",
        alignContent:"center",
        alignSelf:"center",
        textAlign: "center"
    },

    text: {
        textAlign: "center"
    },

    dots: { 
        paddingTop: 10
    }
})

export default Friend