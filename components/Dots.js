import React, {} from 'react';
import { View, Text, StyleSheet} from 'react-native';

function Dots( { history } ){
    
    //const historyReverse = this.props.history.reverse();
    
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
                {dots}
            </View>
    )


}

const styles = StyleSheet.create({
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
        backgroundColor: 'orange',
        marginLeft: 3
    }
})

export default Dots;