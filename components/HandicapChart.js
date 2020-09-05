import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
import {
    LineChart,
} from "react-native-chart-kit";

import colors from '../config/colors';


export default function HandicapChart( {data} ){

    let label = [];
    let handicapLines = [];
    let playedToLine = [];

    data.map((round, index) => {
        if(!round.isOutOfMaxRound){
            playedToLine.push(round.slopedPlayedTo)
            handicapLines.push(round.newHandicap)
            label.push(index.toString())
        }
    })

    return(
        <View>
            <LineChart
                data={{
                    labels: label.reverse(),
                    datasets: [
                        {
                        data: handicapLines.reverse(),
                        },
                        {
                        data: playedToLine.reverse(),
                        color: (opacity = 1) => `rgba(234, 168, 0, ${opacity})`,
                        }
                    ]
                }}
                width={Dimensions.get("window").width - 10} 
                height={220}
                withInnerLines= {false}
                withVerticalLabels= {false}
                chartConfig={{
                    decimalPlaces: 0,
                    backgroundColor: colors.primary,
                    backgroundGradientFrom: colors.primary,
                    backgroundGradientTo: colors.primary,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "4",
                        strokeWidth: "2",
                        stroke: colors.secondary,
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        </View>
    )
}