import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity} from 'react-native';
import { CurrentRenderContext } from '@react-navigation/native';

import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import colors from '../config/colors';

class HandicapHistoryItem extends Component {
    state = { 
        showMoreInformation: false
    }

    showMoreInformation = () =>{

        if(this.state.showMoreInformation === false){
            this.setState({showMoreInformation: true})
        }else{
            this.setState({showMoreInformation: false})
        }
    }



    render() {
        const round = this.props.data;

        const date = new Date(round.dateHeld).toDateString();

        let maxRound = this.props.firstMaxRound;
        let maxRoundLineBreak = null

        let textStyle = 'inTopScore'
        if(round.isOutOfMaxRound){
            if(maxRound){
                maxRoundLineBreak = (<View style={{ width:"100%", height: 1, backgroundColor: 'black'}} />)
            }
            textStyle = 'outOfMaxRound'
        }

        let top8Style = null;
        if(round.top8ScoreFlag){
            top8Style = 'top8Score';
        }

        let scoreStyle = '';
        let badIcon = null;
        if(round.handicappingScore < 26 && !round.isOutOfMaxRound){
            badIcon = <MaterialCommunityIcons name="emoticon-poop" size={24} color="black" />
            scoreStyle = 'badScoreStyle';
        }

        const showMoreInformationToggle = this.state.showMoreInformation;
        let moreInformationView = null
        if(showMoreInformationToggle){
            moreInformationView = (
                <View style={styles.table}>
                    <View style={styles.subRow}>
                        <View style={styles.columnData}>
                            <Text style={styles.headingText}>Par</Text>
                        </View>
                        <View style={styles.columnData}>
                            <Text style={styles.headingText}>Scratch</Text>
                        </View>
                        <View style={styles.columnData}>
                            <Text style={styles.headingText}>PCC</Text>
                        </View>
                        <View style={styles.columnData}>
                            <Text style={styles.headingText}>Slope</Text>
                        </View>
                    </View>

                    <View style={styles.subRow}>
                        <View style={styles.columnData}>
                            <Text>{round.par}</Text>
                        </View>
                        <View style={styles.columnData}>
                            <Text>{round.scratchRating}</Text>
                        </View>
                        <View style={styles.columnData}>
                            <Text>{round.pcc}</Text>
                        </View>
                        <View style={styles.columnData}>
                            <Text>{round.slopeRating}</Text>
                        </View>
                    </View>
                </View>
            ) 
        }

        return (
            <View style={{alignSelf: 'stretch', marginTop: 3}}>
                {maxRoundLineBreak}
                <TouchableOpacity style={styles.row} onPress={()=> {
                    this.showMoreInformation()
                    }}>
                        <View style={styles.columnMain}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{flex: 3}}>
                                    <Text style={styles[textStyle]}>{round.location}</Text>
                                    <Text style={[styles[textStyle], styles.roundTypeText]}>{round.competitionType}</Text>
                                    <Text style={[styles[textStyle], styles.dateText]}>{date}</Text>
                                </View>
                                <View style={{justifyContent: 'center', paddingLeft:30, flex: 1}}>
                                    {badIcon}
                                </View>
                            </View>
                        </View>
                        <View style={styles.columnData}>
                            <View style={styles[scoreStyle]}>
                                <Text style={styles[textStyle]}>{round.handicappingScore}</Text>
                            </View>
                        </View>
                        <View style={styles.columnData}>
                            <Text style={styles[textStyle]}>{round.dailyHandicap}</Text>
                        </View>
                        <View style={styles.columnData}>
                            <View style={styles[top8Style]}>
                                <Text style={styles[textStyle]}>{round.slopedPlayedTo}</Text>
                            </View>
                        </View>
                        <View style={styles.columnData}>
                            <Text style={styles[textStyle]}>{round.newHandicap}</Text>
                        </View>
                </TouchableOpacity>
                {moreInformationView}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    table:{ 
        alignItems: 'center', 
        justifyContent: "center",
    },

    subRow:{
        height: 30,
        alignSelf: 'stretch', 
        flexDirection: 'row',
    },

    row:{
        height: 60,
        alignSelf: 'stretch', 
        flexDirection: 'row',
    },

    columnMain:{ 
        flex: 3, 
        alignSelf: 'stretch',
        justifyContent: 'center', 
    },

    columnData:{ 
        flex: 1, 
        alignSelf: 'stretch',
        justifyContent: "center",
        alignItems: 'center', 
    },

    top8Score:{
        width:30,
        height:30,
        backgroundColor: colors.secondary,
        borderRadius: 50,
        borderStyle: "solid",
        borderColor: colors.secondary,
        justifyContent: "center",
        alignItems: 'center', 
    },

    headingText:{
        fontWeight:'bold'
    },

    outOfMaxRound: {
        color: 'gray'
    },

    inTopScore:{

    },

    roundTypeText:{
        fontSize: 10
    },

    dateText:{
        fontSize: 10
    },

    badScoreStyle:{
        width:30,
        height:30,
        backgroundColor: 'red',
        borderRadius: 50,
        borderStyle: "solid",
        borderColor: 'red',
        justifyContent: "center",
        alignItems: 'center', 
    }

})

export default HandicapHistoryItem;