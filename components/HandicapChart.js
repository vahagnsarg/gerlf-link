import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
import {
    LineChart,
} from "react-native-chart-kit";

import colors from '../config/colors';


export default function HandicapChart( {data, screen} ){

    let label = [];
    let handicapLines = [];
    let playedToLine = [];

    data.map((round, index) => {
        if(!round.isOutOfMaxRound){
            
            let slopePlayedTo = round.slopedPlayedTo
            if(slopePlayedTo.includes('+')){
                slopePlayedTo = slopePlayedTo.replace('+', '-');
            }
            playedToLine.push(slopePlayedTo)

            let handicapGa = round.newHandicap
            if(handicapGa.includes('+')){
                handicapGa = handicapGa.replace('+', '-');
            }
            handicapLines.push(handicapGa)
            label.push(index.toString())
        }
    })



    let widthValue = Dimensions.get("window").width - 10;
    if(screen === 'modal'){
        widthValue = Dimensions.get("window").width - 20;
    }

    return(
        <>
            <LineChart
                data={{
                    labels: label.reverse(),
                    datasets: [
                        {
                        data: handicapLines.reverse(),
                        },
                        {
                        data: playedToLine.reverse(),
                        color: (opacity = 1) => `rgba(50, 76, 168, ${opacity})`,
                        }
                    ],
                    legend: ["GA", "Played to"]
                }}
                width={widthValue} 
                height={220}
                withInnerLines= {false}
                withVerticalLabels= {false}
                yLabelsOffset={20}
                chartConfig={{
                    fillShadowGradientOpacity: 200,
                    decimalPlaces: 0,
                    backgroundColor: colors.primary,
                    backgroundGradientFrom: colors.primary,
                    backgroundGradientTo: colors.primary,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    propsForDots: {
                        strokeWidth: "1",
                        stroke: colors.backgroundColor,
                    }
                }}
                bezier
                style={{
                    marginVertical: 2,
                    borderRadius: 5
                }}
            />
        </>
    )
}