import React, { Component } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import HandicapHistoryItem from './HandicapHistoryItem';

class HandicapHistoryTable extends Component {
    state = { 

    }

    render() {
        const data = this.props.data;

        return (
            <View style={styles.table}>
                <View style={styles.row}>
                    <View style={styles.headingDetail}>
                        <Text style={styles.headingText} >Round Details</Text>
                    </View>
                    <View style={styles.headingScore}>
                        <Text style={styles.headingText}>score</Text>
                    </View>
                    <View style={styles.headingScore}>
                        <Text style={styles.headingText}>dh</Text>
                    </View>
                    <View style={styles.headingScore}>
                        <Text style={styles.headingText}>pt</Text>
                    </View>
                    <View style={styles.headingScore}>
                        <Text style={styles.headingText}>new ga</Text>
                </View>
            </View>
            {
                data.map((round, index) => { // This will render a row for each data element.
                    return <HandicapHistoryItem
                        data={round} key={index}
                    />
                })
            }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    table:{ 
        alignItems: 'center', 
        justifyContent: "center",
    },

    headingDetail:{
        flex: 3, 
        alignSelf: 'stretch', 
        flexDirection: 'row',
        alignItems: 'center', 
    },

    headingScore:{
        flex: 1, 
        alignSelf: 'stretch', 
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center', 
    },
    
    row:{
        height: 50,
        alignSelf: 'stretch', 
        flexDirection: 'row' 
    },

    headingText:{
        fontWeight:'800'
    }
})

export default HandicapHistoryTable;