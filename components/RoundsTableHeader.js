import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import colors from '../config/colors';

export default function RoundsTableHeader(){

    return (
            <View style={styles.row}>
                <View style={styles.headingDetail}>
                    <Text style={styles.headingText} >round details</Text>
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
    )

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
        flexDirection: 'row',
        backgroundColor: colors.backgroundColor
    },

    headingText:{
        fontWeight:'bold'
    }
})