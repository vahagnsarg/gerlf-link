import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';

import colors from '../config/colors';

class HighlightedStat extends Component {
    state = {  }

    render() {

        let ptsText = <Text style={styles.ptsInformation}>PTS</Text>
        if(!this.props.showPoints){
            ptsText = null
        }

        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.title}>
                        <Text >{this.props.title}</Text>
                    </View>
                    <View style={{height: 120}}>
                        <Text style={styles.information}>{this.props.result}</Text>
                        {ptsText}
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 20,
        alignItems: 'center',
        height: 130,
    },

    content: {
        position: "absolute",
        width: '100%',
    },

    title: {
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 16,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        height: '30%',
        height: 30,
    },

    information: {
        fontSize: 60,
        textAlign: "center",
        paddingTop: 10,
    },

    ptsInformation: {
        textAlign: "center",
        fontWeight:"bold"
    },
})

export default HighlightedStat;