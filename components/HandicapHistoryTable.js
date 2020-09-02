import React, { Component } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import HandicapHistoryItem from './HandicapHistoryItem';

class HandicapHistoryTable extends Component {
    state = { 

    }

    render() {
        const data = this.props.data;

        let maxRoundCourt = 0;

        return (
            <View style={styles.table}>
                <View style={styles.row}>
                    <View style={styles.headingDetail}>
                        <Text style={styles.headingText} >round details</Text>
                    </View>
                    <View style={styles.headingScore}>
                        <Text style={styles.headingText}>score</Text>
                    </View>
                    <View style={styles.headingScore}>
                        <Text style={styles.headingText}>dh</Text>
                    </View>
                    <View style={styles.headingScore}>
                        <Text style={styles.headingText}>pt</Text>
                    </View>
                    <View style={styles.headingScore}>
                        <Text style={styles.headingText}>new ga</Text>
                </View>
            </View>
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
        flexDirection: 'row' 
    },

    headingText:{
        fontWeight:'bold'
    }
})

export default HandicapHistoryTable;