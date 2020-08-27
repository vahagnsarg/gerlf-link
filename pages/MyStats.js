import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, RefreshControl, FlatList} from 'react-native';
import HighlightedStat from '../components/HighlightedStat';
import HandicapHistoryTable from '../components/HandicapHistoryTable';
import AsyncStorage from '@react-native-community/async-storage';



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

                fetch(`http:localhost:8080/api/v1/getHandicap?handicap=${handicapNumber}&months=0`)
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
        

        fetch(`http:localhost:8080/api/v1/getHandicap?handicap=${handicapNumber}&months=0`)
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
            if(x > 19){
                continue;
            }
            if(rounds[x].handicappingScore > highestRound && rounds[x].handicappingScore !== 'N/A'){
                highestRound = rounds[x].handicappingScore;
            }
        }
        return highestRound;
    }

    

    averageRound = () =>{
        const rounds = this.state.handicapHistory;
        let totalRoundScore = 0;
        let noOfRounds = 0;

        for(let x in rounds){
            if(x > 19){
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
            if(x > 19){
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

        let body = null
        if(this.state.status === 'offline'){
            return (
                <View style={styles.loadView}>
                    <ActivityIndicator size="large" color="orange" />
                </View>
            )
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
                            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.refreshPage}/>}>

                            <View style={styles.statsViewTop}>
                                <View style={styles.topStat}>
                                    <HighlightedStat title='Last Round' result={lastRoundScore}/>
                                </View>

                                <View style={styles.topStat}>
                                    <HighlightedStat title='Best Round' result={this.bestRound()}/>
                                </View>

                            </View>
                            <View style={styles.statsViewBottom}>
                                <View style={styles.topStat}>
                                    <HighlightedStat title='Average Round' result={this.averageRound()}/>
                                </View>

                                <View style={styles.topStat}>
                                    <HighlightedStat title='Play To needed' result={this.neededRound()}/>
                                </View>
                            </View>

                            <View style={{padding: 10}}>
                                <HandicapHistoryTable data={this.state.handicapHistory}/>
                            </View>

                        </ScrollView>
                    </View>
                </View>
            )

            

        // return (
        //     <View style={styles.bodyContainer}>
        //         {body}
        //     </View>
        // );
    }
    
}

const styles = StyleSheet.create({
    bodyContainer: {
        flex: 1,
        alignItems: "center"
    },
    
    mainContainer: {
        flex: 1,
        alignItems: "center"
    },

    container_top: {
        flex: 1,
        alignItems: "center",
        alignSelf:"stretch",
        paddingTop: 10
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