import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity} from 'react-native';
import { CurrentRenderContext } from '@react-navigation/native';

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

        const date = new Date(round.dateHeld).toLocaleDateString();

        let textStyle = 'inTopScore'
        if(round.isOutOfMaxRound){
            textStyle = 'outOfMaxRound'
        }

        let newHandicap = <Text style={styles[textStyle]}>{round.newHandicap}</Text>
        if(round.top8ScoreFlag){
            newHandicap = (
                <View style={styles.top8Score}>
                    <Text>{round.newHandicap}</Text>
                </View>
            )       
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
            <View style={{alignSelf: 'stretch'}}>
                <TouchableOpacity style={styles.row} onPress={()=> {
                    this.showMoreInformation()
                    }}>
                        <View style={styles.columnMain}>
                            <Text style={styles[textStyle]}>{round.location}</Text>
                            <Text style={styles[textStyle]}>{round.competitionType}</Text>
                            <Text style={styles[textStyle]}>{date}</Text>
                        </View>
                        <View style={styles.columnData}>
                            <Text style={styles[textStyle]}>{round.handicappingScore}</Text>
                        </View>
                        <View style={styles.columnData}>
                            <Text style={styles[textStyle]}>{round.dailyHandicap}</Text>
                        </View>
                        <View style={styles.columnData}>
                            <Text style={styles[textStyle]}>{round.playedTo}</Text>
                        </View>
                        <View style={styles.columnData}>
                            {newHandicap}
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
        backgroundColor: 'orange',
        borderRadius: 50,
        borderStyle: "solid",
        borderColor: 'orange',
        justifyContent: "center",
        alignItems: 'center', 
    },

    headingText:{
        fontWeight:'800'
    },

    outOfMaxRound: {
        fontWeight: "100"
    },

    inTopScore:{

    },

})

export default HandicapHistoryItem;