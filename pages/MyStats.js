import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, RefreshControl, FlatList} from 'react-native';
import HighlightedStat from '../components/HighlightedStat';
import HandicapHistoryTable from '../components/HandicapHistoryTable';
import AsyncStorage from '@react-native-community/async-storage';
import colors from '../config/colors';



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

                //fetch(`http:localhost:8080/api/v1/getHandicap?handicap=${handicapNumber}&months=0`)
                fetch(`https://api.golf.org.au/golfau/v1/public/v3/handicaphistory?golfLinkNo=${handicapNumber}&months=0`, {
                    headers: { 
                            'Connection': 'keep-alive', 
                            'Pragma': 'no-cache', 
                            'Cache-Control': 'must-revalidate, private', 
                            'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjRBRTNDMkI3NTgxMUZGODhBMUM5RUI2M0Y3QjY5NEZBRDg2NUQ0QkUiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJTdVBDdDFnUl80aWh5ZXRqOTdhVS10aGwxTDQifQ.eyJuYmYiOjE1OTc1MzU1NTMsImV4cCI6MTU5NzUzOTE1MywiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5nb2xmLm9yZy5hdSIsImF1ZCI6WyJodHRwczovL2lkZW50aXR5LmdvbGYub3JnLmF1L3Jlc291cmNlcyIsIkdBIEFQSSJdLCJjbGllbnRfaWQiOiJHQS5BUEkuQ0xJRU5UIiwic3ViIjoiMzcxOTAiLCJhdXRoX3RpbWUiOjE1OTE0ODI0NDMsImlkcCI6ImxvY2FsIiwiVXNlck5hbWUiOiJ2YWhhZ24uc2FyZ0BnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsInNjb3BlIjpbIkdBLkFQSSIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwYXNzd29yZCJdfQ.Qwq6b4de_hA_lDT3IJD_KHuRCtoVk_FWq914vkBVzorY7wb58fbxuRp0RUXQdp9PhSMFSsiZNbDOejNMENKWEO_dyEckUm3X3JDk6DGOnKqxjHwKVzuiKrn-7kL3nN5PwA-IGfMYAHPvQkbbkfV5z6BJ0wZQM06BCJYE2aas06cklbyNKoM2WZ2ZrgMFU9dFiHTX5onAYHkIgiGM7E1NxJq2Uu44stduDpldwqEFtCu_oFFyDYmEAs0NyGKCyqAXG2P0_AoQDw2wQzhIqNtmwqGiWhVQlSIAexNvIiqRKSk1FGRXEkqnlvaeUjnlgHWxO6R8gfgD6iGk04bMz_BmHw', 
                            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36', 
                            'Ocp-Apim-Subscription-Key': 'f3185ed69cb44f9895dcb826fb9c368a', 
                            'Expires': '-1', 
                            'Accept': '*/*', 
                            'Sec-Fetch-Site': 'same-site', 
                            'Sec-Fetch-Mode': 'cors',
                            'Sec-Fetch-Dest': 'empty',
                            "Access-Control-Allow-Origin":  "https://api.golf.org.au",
                            'Referer': `https://www.golf.org.au/handicap/?golfLinkNo=${handicapNumber}`, 
                            'Accept-Encoding': 'gzip, deflate, br', 
                            'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8'
                        }
                    })
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
        

        //fetch(`http:localhost:8080/api/v1/getHandicap?handicap=${handicapNumber}&months=0`)
        fetch(`https://api.golf.org.au/golfau/v1/public/v3/handicaphistory?golfLinkNo=${handicapNumber}&months=0`, {
                headers: { 
                        'Connection': 'keep-alive', 
                        'Pragma': 'no-cache', 
                        'Cache-Control': 'must-revalidate, private', 
                        'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjRBRTNDMkI3NTgxMUZGODhBMUM5RUI2M0Y3QjY5NEZBRDg2NUQ0QkUiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJTdVBDdDFnUl80aWh5ZXRqOTdhVS10aGwxTDQifQ.eyJuYmYiOjE1OTc1MzU1NTMsImV4cCI6MTU5NzUzOTE1MywiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5nb2xmLm9yZy5hdSIsImF1ZCI6WyJodHRwczovL2lkZW50aXR5LmdvbGYub3JnLmF1L3Jlc291cmNlcyIsIkdBIEFQSSJdLCJjbGllbnRfaWQiOiJHQS5BUEkuQ0xJRU5UIiwic3ViIjoiMzcxOTAiLCJhdXRoX3RpbWUiOjE1OTE0ODI0NDMsImlkcCI6ImxvY2FsIiwiVXNlck5hbWUiOiJ2YWhhZ24uc2FyZ0BnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsInNjb3BlIjpbIkdBLkFQSSIsIm9mZmxpbmVfYWNjZXNzIl0sImFtciI6WyJwYXNzd29yZCJdfQ.Qwq6b4de_hA_lDT3IJD_KHuRCtoVk_FWq914vkBVzorY7wb58fbxuRp0RUXQdp9PhSMFSsiZNbDOejNMENKWEO_dyEckUm3X3JDk6DGOnKqxjHwKVzuiKrn-7kL3nN5PwA-IGfMYAHPvQkbbkfV5z6BJ0wZQM06BCJYE2aas06cklbyNKoM2WZ2ZrgMFU9dFiHTX5onAYHkIgiGM7E1NxJq2Uu44stduDpldwqEFtCu_oFFyDYmEAs0NyGKCyqAXG2P0_AoQDw2wQzhIqNtmwqGiWhVQlSIAexNvIiqRKSk1FGRXEkqnlvaeUjnlgHWxO6R8gfgD6iGk04bMz_BmHw', 
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36', 
                        'Ocp-Apim-Subscription-Key': 'f3185ed69cb44f9895dcb826fb9c368a', 
                        'Expires': '-1', 
                        'Accept': '*/*', 
                        'Sec-Fetch-Site': 'same-site', 
                        'Sec-Fetch-Mode': 'cors',
                        'Sec-Fetch-Dest': 'empty',
                        "Access-Control-Allow-Origin":  "https://api.golf.org.au",
                        'Referer': `https://www.golf.org.au/handicap/?golfLinkNo=${handicapNumber}`, 
                        'Accept-Encoding': 'gzip, deflate, br', 
                        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8'
                    }
                })
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
                    <ActivityIndicator size="large" color={colors.secondary} />
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
                                    <HighlightedStat title='Last Round' result={lastRoundScore} showPoints={true}/>
                                </View>

                                <View style={styles.topStat}>
                                    <HighlightedStat title='Best Round' result={this.bestRound()} showPoints={true}/>
                                </View>

                            </View>
                            <View style={styles.statsViewBottom}>
                                <View style={styles.topStat}>
                                    <HighlightedStat title='Average Round' result={this.averageRound()} showPoints={true}/>
                                </View>

                                <View style={styles.topStat}>
                                    <HighlightedStat title='Play To Needed' result={this.neededRound()} showPoints={false}/>
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