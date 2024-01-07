import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const GeneralStats = ({ iconImage, middleText, number }) => {
    return (
        <View style={styles.container}>
            <View style={styles.infoBox}>
                <Image source={{ uri: iconImage }} style={styles.icon} />
                <Text style={styles.middleText}>{middleText}</Text>
                <View style={styles.numBox}>
                    <Text style={styles.number}>{number}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 22,
        marginRight: 22,
    },
    infoBox: {
        flexDirection: 'row',
        padding: 15,
        borderRadius: 32,
        marginRight: 30,
        marginBottom: 10,
        backgroundColor: '#fff',
        width: '100%',  
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 0.2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        borderBottomWidth: 2,
        borderBottomColor: '#e0e0e0',
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 10,
        borderRadius: 15,
    },
    middleText: {
        flex: 1,
        fontSize: 18,
        color: '#333',
    },
    numBox: {
        borderRadius: 20,
        padding: 5,
        borderWidth: 1,           
        borderColor: 'black',      
        width: 80,
        height: 40,
        marginRight: 2,
        justifyContent: 'center',  
        alignItems: 'center',    
    },
    number: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
});

export default GeneralStats;