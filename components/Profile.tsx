import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ToastAndroid } from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from "axios";
import GereralStats from "./GeneralStats";
import Geolocation from 'react-native-geolocation-service';

export default function Profile() {
    const navigation = useNavigation();
    const route = useRoute();
    const { authToken, userEmail, userPassword } = route.params;

    const [userData, setUserData] = useState<any>(null);
    const [placesCount, setPlacesCount] = useState<number>(5);
    const [latitude, setLatitude] = useState<number>(0.0);
    const [longitude, setLongitude] = useState<number>(0.0);

    const getCurrentLocation = async () => {
        Geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            },
            (error) => {
                console.error('Error getting user coordinates:', error);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    };

    const handleCircularButtonPress = async () => {
        try {
            await getCurrentLocation();
            
            const response = await axios.post(
                'https://api.apptask.thekaspertech.com/api/users/addCoordinates',
                {
                    coordinates: {
                        latitude: latitude,
                        longitude: longitude,
                    }
                },
                {
                    headers: {
                        'x-auth-token': authToken,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                ToastAndroid.showWithGravity(
                    'Coordinates added Successfully',
                    ToastAndroid.LONG,
                    ToastAndroid.TOP
                  );
                setPlacesCount(placesCount + 1);
            }


        } catch (error) {
            ToastAndroid.showWithGravity(
                'Error adding Coordinates',
                ToastAndroid.LONG,
                ToastAndroid.TOP
              );
            console.error('Error adding coordinates:', error);
        }
    };

    useEffect(() => {
        
        // getMobileLocationPermission();
        const handleTokenChecking = async () => {
            try {
                const res = await axios.post('https://api.apptask.thekaspertech.com/api/users/tokenIsValid', {
                    headers: {
                        'x-auth-token': authToken,
                        'Content-Type': 'application/json',
                    },
                });

                if (res.status === 200) {
                    navigation.navigate('Profile'); 
                } else {
                    navigation.navigate('Home');
                }
            } catch (error) {
                console.error('Error checking token validity:', error);
                navigation.navigate('Home'); 
            }
        };

        handleTokenChecking();

        try {
            const data = {
                email: userEmail,
                password: userPassword,
            };

            const url = `https://api.apptask.thekaspertech.com/api/users/`;

            axios.get(url, {
                headers: {
                    'x-auth-token': authToken,
                    'Content-Type': 'application/json',
                },
                data: data,
            }).then(response => {
                setUserData(response.data);
            }).catch(error => {
                console.error('Error fetching user data:', error);
            });
        } catch (error) {
            console.error(error);
        }
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView>
                {userData && (
                    <>
                        <Image source={{ uri: userData.image_url }} style={styles.profileImage} />
                        <View style={styles.infoContainer}>
                            <Text style={styles.nameText}>{userData.name}</Text>
                            <View style={styles.infoBox}>
                                <View style={styles.infoBox}>
                                    <View style={styles.infoRow}>
                                        <Text style={styles.infoTextUnderlined}>{userData.email}</Text>
                                        <Text style={styles.infoLabel}>Email</Text>
                                    </View>
                                    <View style={styles.infoRow}>
                                        <Text style={styles.infoText}>{userData.age}</Text>
                                        <Text style={styles.infoLabel}>Age</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <Text style={styles.text}>General Statistics</Text>
                        <GereralStats
                            iconImage={userData.image_url}
                            middleText='Places Visited'
                            number={placesCount}
                        />
                        <GereralStats
                            iconImage={userData.image_url}
                            middleText='Hours Travelled'
                            number={18}
                        />
                        <GereralStats
                            iconImage={userData.image_url}
                            middleText='Surveys Completed'
                            number={9}
                        />
                        <Text style={styles.scrollHelp}></Text>
                    </>
                )}
            </ScrollView>
            <View style={styles.whiteRectangle} />
            <TouchableOpacity style={styles.circularButton} onPress={handleCircularButtonPress}>
                <Text style={styles.circularButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 30,
        position: 'relative',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    infoContainer: {
        alignItems: 'center',
    },
    nameText: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
    },
    infoRow: {
        marginRight: 20,
    },
    infoBox: {
        flexDirection: 'row',
        padding: 20,
        borderRadius: 12,
        marginTop: 10,
        backgroundColor: '#fff',
        width: '90%',  
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
    infoLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    infoText: {
        fontSize: 22,
        color: '#333',
    },
    infoTextUnderlined: {
        fontSize: 22,
        textDecorationLine: 'underline',
        color: '#333',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 20,
        textAlign: 'left',
        marginLeft: 32,
    },
    circularButton: {
        position: 'absolute',
        bottom: 30,
        right: '50%',
        backgroundColor: '#fa7f05',
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        transform: [{ translateX: 30 }],
        zIndex: 1,
        marginBottom: -20,
    },
    circularButtonText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },
    whiteRectangle: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,  
        backgroundColor: '#fff',
    },
    scrollHelp: {
        marginBottom: '20%',
    }
});