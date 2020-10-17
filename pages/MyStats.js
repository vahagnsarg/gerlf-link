import React, { Component, useContext } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, RefreshControl, FlatList, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import HandicapHistoryTable from '../components/HandicapHistoryTable';
import RoundsTableHeader from '../components/RoundsTableHeader';
import TopStatsGrid from '../components/TopStatsGrid';
import HandicapChart from '../components/HandicapChart';
import { getHandicap } from '../API/API';
import { bestRound, worstRound, averageRound, neededRound } from '../Utils/Utils';

import colors from '../config/colors';

class MyStats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handicapNumber: '',
            handicapDetails: {
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
            handicapHistory: [],
            status: 'offline',
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
                //First load of page

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

        console.log('refreshed');
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
        if(!this.props.showTopStats && !this.props.showChart){
            stickyHeader = 0
        }
        if((this.props.showTopStats && !this.props.showChart) || (!this.props.showTopStats && this.props.showChart)){
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
                                this.props.showTopStats 
                                ?<TopStatsGrid 
                                    lastRoundScore={lastRoundScore} 
                                    bestRound={bestRound(this.state.handicapHistory)} 
                                    averageRound={averageRound(this.state.handicapHistory)} 
                                    neededRound={neededRound(this.state.handicapHistory)}
                                /> 
                                : null
                            }

                            {
                                this.props.showChart 
                                ? <HandicapChart data={this.state.handicapHistory} />
                                : null
                            }

                            <View style={{paddingLeft: 10, paddingRight: 10}}>
                                <RoundsTableHeader/>
                            </View>

                            <View style={{padding: 10}}>
                                <HandicapHistoryTable 
                                    data={this.state.handicapHistory} 
                                    bestRound={bestRound(this.state.handicapHistory)}
                                    worstRound={worstRound(this.state.handicapHistory)}
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