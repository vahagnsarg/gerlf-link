import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, RefreshControl, FlatList, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import HandicapHistoryTable from '../components/HandicapHistoryTable';
import RoundsTableHeader from '../components/RoundsTableHeader';
import TopStatsGrid from '../components/TopStatsGrid';
import HandicapChart from '../components/HandicapChart';
import { getHandicap } from '../API/API';

import colors from '../config/colors';
import global from '../config/global';



class MyStats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "handicapNumber": '',
            "handicapDetails": {
                capPoint: "",
                capPointDate: "",
                clubADGroup: "",
                clubId: "",
                clubName: "",
                exactHandicap: "",
                gender: "",
                golfLinkNo: "",
                golferAgeBand: "",
                golferId: "",
                handicapStatus: "",
                highCapPoint: "",
                homeClubState: "",
                homeCountry: "",
                isValidPlayer: "",
                locationId: "",
                noOfGLCupROunds: "",
                playerType: ""
            },
            "handicapHistory": [],
            "status": 'offline',
            refreshing: false
        };
    }

    storeData = async (json) => {
        try {
            const jsonValue = JSON.stringify(json)
            await AsyncStorage.setItem('myLocalDetails', jsonValue)
        } catch (e) {
            // saving error
        }
    }

    getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('myLocalDetails')
            if(jsonValue != null){
                const data = JSON.parse(jsonValue)
                let newState = {...this.state}
                newState.handicapNumber = data.handicapNumber;
                newState.handicapDetails = data.handicapDetails;
                newState.handicapHistory = data.handicapHistory;
                newState.status = 'online';

                this.setState(newState);
            }else{

                const handicapNumber = await AsyncStorage.getItem('golf_id')

                getHandicap(handicapNumber)
                    .then(response => response.json())
                    .then(data => {
                        let newState = {...this.state}
                        let localDetails = {};
                        newState.handicapNumber = data.handicapDetails.golfLinkNo;
                        newState.handicapDetails = data.handicapDetails;
                        newState.handicapHistory = data.handicapHistory;
                        newState.status = 'online';

                        localDetails.handicapNumber = data.handicapDetails.golfLinkNo;
                        localDetails.handicapDetails = data.handicapDetails;
                        localDetails.handicapHistory = data.handicapHistory;
                        
                        
                        this.setState(newState)
                        this.storeData(localDetails);
                    }
                );
            }
        } catch(e) {
          // error reading value
        }
    }

    refreshPage = () => {
        this.setState({refreshing: true});

        let that = this;
        setTimeout(function(){
            that.handicapEndPoint()
            that.setState({refreshing: false})
        }, 2000);

    }

    handicapEndPoint = () => {

        //let handicapNumber = '3010602055';
        let handicapNumber = this.state.handicapNumber 
        
            getHandicap(handicapNumber)
                .then(response => response.json())
                .then(data => {
                    let newState = {...this.state}
                    let localDetails = {};
                    newState.handicapNumber = data.handicapDetails.golfLinkNo;
                    newState.handicapDetails = data.handicapDetails;
                    newState.handicapHistory = data.handicapHistory;
                    newState.status = 'online';

                    localDetails.handicapNumber = data.handicapDetails.golfLinkNo;
                    localDetails.handicapDetails = data.handicapDetails;
                    localDetails.handicapHistory = data.handicapHistory;
                    
                    this.setState(newState)
                    this.storeData(localDetails);
                }
        );

        console.log('refreshed')
    }

    refreshData = () => {
        this.handicapEndPoint;

        return true
    }
        

    bestRound = () =>{
        const rounds = this.state.handicapHistory;
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

    worstRound = () =>{
        const rounds = this.state.handicapHistory;
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

    averageRound = () =>{
        const rounds = this.state.handicapHistory;
        let totalRoundScore = 0;
        let noOfRounds = 0;

        for(let x in rounds){
            if(rounds[x].isOutOfMaxRound){
                continue;
            }
            if(rounds[x].handicappingScore !== 'N/A'){
                totalRoundScore = totalRoundScore + parseInt(rounds[x].handicappingScore);
                noOfRounds++;
            }
        }
        let avereageScrore = Math.floor(totalRoundScore/noOfRounds);
        return avereageScrore;
    }

    neededRound = () => {
        const rounds = this.state.handicapHistory;
        let top8Score = 0;
        let lastRoundFlagged = {
            flagged: false,
            slopedPlayedTo: 0
        };

        for(let x in rounds){
            if(rounds[x].isOutOfMaxRound){
                continue;
            }
            if(rounds[x].top8ScoreFlag){
                top8Score = top8Score + parseInt(rounds[x].slopedPlayedTo);
            }

            if(x === 19 && rounds[x].top8ScoreFlag){
                lastRoundFlagged.flagged = true;
                lastRoundFlagged.slopedPlayedTo = rounds[x].slopedPlayedTo;
            }
        }

        if(lastRoundFlagged.flagged){
            return lastRoundFlagged.slopedPlayedTo;
        }else{
            //Caluclate this fucker
            return '0'
        }
    }

    componentDidMount = () => {
        
        this.getData();

    };

    render() {

        let lastRoundScore = ''
        if(this.state.handicapHistory.length > 0){
            lastRoundScore = this.state.handicapHistory[0].handicappingScore;
        }

        if(this.state.status === 'offline'){
            return (
                <View style={styles.loadView}>
                    <ActivityIndicator size="large" color={colors.secondary} />
                </View>
            )
        }

        let stickyHeader = 2;
        if(!global.showTopStats && !global.showChart){
            stickyHeader = 0
        }
        if((global.showTopStats && !global.showChart) || (!global.showTopStats && global.showChart)){
            stickyHeader = 1
        }

        return (
                <View style={styles.mainContainer}>
                    <View style={styles.container_top}>
                            <Text style={{fontWeight: '600'}}>{this.state.handicapDetails.golfLinkNo}</Text>
                            <Text>{this.state.handicapDetails.clubName}</Text> 

                            <View style={styles.officalGa}>
                                <View>
                                    <Text style={styles.officalGaHandicap}>{this.state.handicapDetails.exactHandicap}</Text>
                                </View>

                                <Text>Official GA</Text>
                            </View>
                    </View>
                    

                    <View style={styles.container_bottom}>
                        <ScrollView 
                            contentContainerStyle={{}}
                            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.refreshPage}/>}
                            stickyHeaderIndices={[stickyHeader]}
                            style={{width: Dimensions.get("window").width -10}}>
                            
                            {
                                global.showTopStats 
                                ?<TopStatsGrid 
                                    lastRoundScore={lastRoundScore} 
                                    bestRound={this.bestRound()} 
                                    averageRound={this.averageRound()} 
                                    neededRound={this.neededRound()}
                                /> 
                                : null
                            }

                            {
                                global.showChart 
                                ? <HandicapChart data={this.state.handicapHistory} />
                                : null
                            }

                            <View style={{paddingLeft: 10, paddingRight: 10}}>
                                <RoundsTableHeader/>
                            </View>

                            <View style={{padding: 10}}>
                                <HandicapHistoryTable 
                                    data={this.state.handicapHistory} 
                                    bestRound={this.bestRound()}
                                    worstRound={this.worstRound()}
                                    />
                            </View>

                        </ScrollView>
                    </View>
                </View>
            )
    }
    
}

const styles = StyleSheet.create({
    bodyContainer: {
        flex: 1,
        alignItems: "center"
    },
    
    mainContainer: {
        flex: 1,
        alignItems: "center",
        backgroundColor: colors.backgroundColor
    },

    container_top: {
        flex: 1,
        alignItems: "center",
        alignSelf:"stretch",
        paddingTop: 10,
        marginBottom: 5
    },

    container_bottom: {
        flex: 5,
        alignItems: "center",
    },

    scrollView: {
        flexDirection: "row",
        flexWrap: 'wrap',
        padding: 20
    },

    loadView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

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

    officalGa:{
        alignItems: "center",
    },

    officalGaHandicap:{
        fontSize: 60
    }
})

export default MyStats;