import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import HandicapHistoryItem from './HandicapHistoryItem';

class HandicapHistoryTable extends Component {
    state = { 

    }

    render() {
        const data = this.props.data;

        let maxRoundCourt = 0;

        return (
            <View style={styles.table}>
            {
                data.map((round, index) => { // This will render a row for each data element.
                    let firstMaxRound = null;
                    if(round.isOutOfMaxRound && maxRoundCourt === 0){
                        firstMaxRound = true;
                        maxRoundCourt++
                    }
                    return <HandicapHistoryItem
                        data={round} 
                        key={index} 
                        firstMaxRound={firstMaxRound}
                        bestRound={this.props.bestRound}
                        worstRound={this.props.worstRound}
                    />
                })
            }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    table:{ 
        alignItems: 'center', 
        justifyContent: "center",
    },

    headingDetail:{
        flex: 3, 
        alignSelf: 'stretch', 
        flexDirection: 'row',
        alignItems: 'center', 
    },

    headingScore:{
        flex: 1, 
        alignSelf: 'stretch', 
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center', 
    },
    
    row:{
        height: 50,
        alignSelf: 'stretch', 
        flexDirection: 'row',
    },

    headingText:{
        fontWeight:'bold'
    }
})

export default HandicapHistoryTable;