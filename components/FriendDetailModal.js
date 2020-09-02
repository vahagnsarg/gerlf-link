import React , { useEffect , useState }from 'react';
import {  
    StyleSheet, 
    View, 
    Text ,
    TouchableOpacity,
    Modal,
    ScrollView
} from 'react-native'
import HandicapHistoryTable from './HandicapHistoryTable'

import { Appbar } from 'react-native-paper';
import colors from '../config/colors';

export default function FriendDetailModal( {name, golf_id, data, closeAction, handicapError, dataEmpty, modifiedWithoutRefresh} ){

    if(handicapError || dataEmpty || modifiedWithoutRefresh){
        return(
            <>
                <Appbar.Header style={{backgroundColor: colors.primary}}>
                    <Appbar.BackAction onPress={closeAction} />
                    <Appbar.Content title={name} subtitle={golf_id} />
                </Appbar.Header>

                <View>
                    <Text>Nope Sorry, Cant do it</Text>
                </View>
            </>
        )
    }

    function bestRound(data){
        const rounds = data.handicapHistory;
        let highestRound = '0';

        for(let x in rounds){
            if(rounds[x].isOutOfMaxRound){
                continue;
            }
            if(rounds[x].handicappingScore > highestRound && rounds[x].handicappingScore !== 'N/A'){
                highestRound = rounds[x].handicappingScore;
            }
        }
        return highestRound;
    }

    function worstRound(data){
        const rounds = data.handicapHistory;
        let lowestRound = 100;

        for(let x in rounds){
            if(rounds[x].isOutOfMaxRound){
                continue;
            }
            if(rounds[x].handicappingScore < lowestRound && rounds[x].handicappingScore !== 'N/A'){
                lowestRound = rounds[x].handicappingScore;
            }
        }

        return lowestRound;
    }


    return(
        <>
            <Appbar.Header style={{backgroundColor: colors.primary}}>
                <Appbar.BackAction onPress={closeAction} />
                <Appbar.Content title={name} subtitle={golf_id} />
            </Appbar.Header>

            <ScrollView
                contentContainerStyle={{}}>
                <View style={{padding:10, paddingBottom:40}}>
                    <HandicapHistoryTable 
                    data={data.handicapHistory}
                    bestRound={bestRound(data)}
                    worstRound={worstRound(data)}/>
                </View>
            </ScrollView>
        </>
    )
}