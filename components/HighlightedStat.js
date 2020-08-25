import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';



class HighlightedStat extends Component {
    state = {  }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.title}>
                        <Text >{this.props.title}</Text>
                    </View>
                    <Text style={styles.information}>{this.props.result}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 5,
        alignItems: 'center',
        height:'100%',
    },

    content: {
        position: "absolute",
        width: '100%',
    },

    title: {
        borderBottomWidth: 1,
        borderColor: "black",
        backgroundColor: 'orange',
        alignItems: "center",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        height: '30%'
    },

    information: {
        fontSize: 60,
        textAlign: "center"
    },
})

export default HighlightedStat;