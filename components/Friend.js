import React , { useEffect , useState }from 'react';
import {  
    StyleSheet, 
    View, 
    Text ,
    TouchableOpacity,
    Modal
} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import FriendActionMenu from '../components/FriendActionMenu';
import { Appbar } from 'react-native-paper';
import colors from '../config/colors';
import FriendDetailModal from './FriendDetailModal';



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

function Dots( { history } ){
    
    let dots = history.map(function(round, index){

        if(round.isOutOfMaxRound){
            return null;
        }

        let top8 = false
        if(round.top8ScoreFlag){
            top8 = true;
        }

        const styleDot = (top8) ? 'highlightDot' : 'normalDot'
        return <View style={styles[styleDot]} key={index}/>;
    });

    return(
            <View style={{flexDirection: "row", justifyContent: "center"}}>
                {dots.reverse()}
            </View>
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
        index
    }){

        const [openMoreInformation, setOpenMoreInformation] = React.useState(false)

    return( 
        <>
        <TouchableOpacity onPress={() => setOpenMoreInformation(true)} activeOpacity={1}>
            <Swipeable 
                renderRightActions={(progress, dragX) => 
                    <FriendActionMenu 
                        progress={progress} 
                        dragX={dragX} 
                        index={index}
                        name={name}
                        golf_id={golf_id}
                        deleteFriend={deleteFriend}
                        editFriend={editFriend}
                        /> 
                    }
            >
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
        </TouchableOpacity>
        <Modal visible={openMoreInformation} animationType="slide">
            <FriendDetailModal 
                name={name} 
                golf_id={golf_id} 
                data={data} 
                closeAction={() => setOpenMoreInformation(false)}
                handicapError={handicapError} 
                dataEmpty={dataEmpty} 
                modifiedWithoutRefresh={modifiedWithoutRefresh}
            />
        </Modal>
        </>
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
    },

    normalDot:{
        width: 10,
        height: 10,
        borderRadius: 50,
        backgroundColor: 'grey',
        marginLeft: 3
    },

    highlightDot:{
        width: 10,
        height: 10,
        borderRadius: 50,
        backgroundColor: colors.secondary,
        marginLeft: 3
    }
})

export default Friend