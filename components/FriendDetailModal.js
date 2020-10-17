import React , { useEffect , useState, useContext }from 'react';
import {  
    StyleSheet, 
    View, 
    Text ,
    TouchableOpacity,
    Modal,
    ScrollView
} from 'react-native'
import { AuthContext } from '../components/Context';
import HandicapHistoryTable from './HandicapHistoryTable';
import RoundsTableHeader from './RoundsTableHeader'
import { bestRound, worstRound } from '../Utils/Utils';


import { Appbar } from 'react-native-paper';
import colors from '../config/colors';
import HandicapChart from './HandicapChart';

export default function FriendDetailModal( {name, golf_id, data, closeAction, handicapError, dataEmpty, modifiedWithoutRefresh} ){
    
    const { 
        showChart,
        showFriendID, 
    } = useContext(AuthContext);

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

    return(
        <>
            <Appbar.Header style={{backgroundColor: colors.primary}}>
                <Appbar.BackAction onPress={closeAction} />
                <Appbar.Content title={name} subtitle={golf_id} />
            </Appbar.Header>

            <ScrollView
                contentContainerStyle={{}}
                stickyHeaderIndices={showChart ? [1] : [0]}
                style={{backgroundColor: colors.backgroundColor}}
            >
                {
                    showChart 
                    ? <View style={{padding: 10}}>
                        <HandicapChart data={data.handicapHistory} screen='modal'/>
                    </View>
                    : null
                }

                <View style={{paddingLeft: 10, paddingRight: 10}}>
                    <RoundsTableHeader/>
                </View>
                <View style={{padding:10, paddingBottom:40}}>
                    <HandicapHistoryTable 
                        data={data.handicapHistory}
                        bestRound={bestRound(data.handicapHistory)}
                        worstRound={worstRound(data.handicapHistory)}
                    />
                </View>
            </ScrollView>
        </>
    )
}