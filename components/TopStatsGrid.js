import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import colors from '../config/colors';
import HighlightedStat from './HighlightedStat';

export default function TopStatsGrid( {lastRoundScore, bestRound, averageRound, neededRound} ){

    return (
        <>
        <View style={styles.statsViewTop}>
            <View style={styles.topStat}>
                <HighlightedStat title='Last Round' result={lastRoundScore} showPoints={true}/>
            </View>

            <View style={styles.topStat}>
                <HighlightedStat title='Best Round' result={bestRound} showPoints={true}/>
            </View>

        </View>
        <View style={styles.statsViewBottom}>
            <View style={styles.topStat}>
                <HighlightedStat title='Average Round' result={averageRound} showPoints={true}/>
            </View>

            <View style={styles.topStat}>
                <HighlightedStat title='Play To Needed' result={neededRound} showPoints={false}/>
            </View>
        </View>
        </>
    )

}

const styles = StyleSheet.create({
    statsViewTop: {
        height: 170,
        flexDirection: "row",
        justifyContent:'center'
    },

    statsViewBottom: {
        height: 170,
        flexDirection: "row",
        justifyContent:'center'
    },

    topStat: {
        width: '40%',
        height: '40%',
        margin: 17,
    },
})