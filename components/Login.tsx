import React, { useState, useRef, useEffect } from "react";
import { View, Text, ImageBackground, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator, ToastAndroid } from "react-native";
import RBSheet from "@nonam4/react-native-bottom-sheet";
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from "axios";
import { PermissionsAndroid } from "react-native";

export default function Login() {
  const navigation = useNavigation();
  const route = useRoute();
  const { setAuthToken, setUserEmail, setUserPassword } = route.params;

  const refRBSheet = useRef<RBSheet | null>(null);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [spinner, setSpinner] = useState<boolean>(false);

  const getMobileLocationPermission = async () => {
    try {
        const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (result === 'granted') {
          console.info('Location permission granted');
          return true;
        } else {
          console.error('Location permission denied. Redirecting to home page.');
          return false;
        }
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
};

  const handleLogin = async () => {
    try {
      if (email === '') {
        ToastAndroid.showWithGravity(
          'enter valid email',
          ToastAndroid.LONG,
          ToastAndroid.TOP
        );
        return;
      }
      if (password.length < 5 || password === '') {
        ToastAndroid.showWithGravity(
          'enter valid password',
          ToastAndroid.LONG,
          ToastAndroid.TOP
        );
        return;
      }
      const data = {
        email: email,
        password: password,
      };
      setUserPassword(password);
      setSpinner(true);
      const res = await axios.post('https://api.apptask.thekaspertech.com/api/users/login', data);
      setAuthToken(res.data.token);
      setUserEmail(res.data.user.email);
      const permission = await getMobileLocationPermission();
      if (permission) {
        navigation.navigate('Profile');
      } else {
        navigation.navigate('Home');
      }
    } catch (error: any) {
      setSpinner(false);
      ToastAndroid.showWithGravity(
        'Something went wrong',
        ToastAndroid.LONG,
        ToastAndroid.TOP
      );
      if (error.response) {
        console.error('Server responded with non-2xx status:', error.response.status);
      } else if (error.request) {
        console.error('No response received from the server:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
    }
  };

  useEffect(() => {
    refRBSheet.current?.open();
  }, []);

  return (
    <ImageBackground
      source={require('./HomeImg.jpg')} 
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <RBSheet
          ref={refRBSheet}
          height={400} 
          closeOnDragDown={false}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent"
            },
            draggableIcon: {
              backgroundColor: "#e4ebe5"
            },
            container: {
              borderTopLeftRadius: 20, 
              borderTopRightRadius: 20, 
            }
          }}
        >
          <View>
            <View style={styles.headerContainer}>
              <Text style={styles.text}>Login</Text>
              <Image source={require('./profilePic.png')} style={styles.profileIcon} />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={'black'}
              onChangeText={email => setEmail(email)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={'black'}
              onChangeText={pswd => setPassword(pswd)}
            />
            {
              spinner ? 
              <ActivityIndicator size="large" color="#fa7f05" style={styles.spinner} /> :
                <TouchableOpacity
                style={styles.btn}
                onPress={handleLogin}
              >
                <Text style={styles.btnText}>Login</Text>
              </TouchableOpacity>
            }
          </View>
        </RBSheet>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    color: '#000000',
    marginLeft: 12,
    fontSize: 30,
    fontWeight: 'bold',
  },
  profileIcon: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
  btn: {
    backgroundColor: '#fa7f05',
    paddingVertical: 10,
    borderRadius: 18,
    marginTop: 30,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 22,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999999',
    width: '92%',
    height: 40,
    marginTop: 10,
    marginLeft: 12,
    marginVertical: 10,
    paddingHorizontal: 10,
    color: '#616362',
    borderRadius: 25,
  },
  spinner: {
    marginTop: 25,
  }
});