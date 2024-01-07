import React, { useState, useRef, useEffect } from "react";
import 
{ View, 
  Text, 
  ImageBackground, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  PermissionsAndroid, 
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import RBSheet from "@nonam4/react-native-bottom-sheet";
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";

export default function Signup() {
  const navigation = useNavigation();
  const refRBSheet = useRef<RBSheet | null>(null);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<string>('');
  const [spinner, setSpinner] = useState<boolean>(false);

  const handleCreateAccount = async () => {
  
    if (name === '') {
      ToastAndroid.showWithGravity(
        'name is required',
        ToastAndroid.LONG,
        ToastAndroid.TOP
      );
      return;
    }
    if (email === '') {
      ToastAndroid.showWithGravity(
        'email is required',
        ToastAndroid.LONG,
        ToastAndroid.TOP
      );
      return;
    }
    if (password.length < 5 || password === '') {
      ToastAndroid.showWithGravity(
        'minimum password length is 5',
        ToastAndroid.LONG,
        ToastAndroid.TOP
      );
      return;
    }
    if (age === '') {
      ToastAndroid.showWithGravity(
        'age is required',
        ToastAndroid.LONG,
        ToastAndroid.TOP
      );
      return;
    }
    if (profilePicture === '') {
      ToastAndroid.showWithGravity(
        'profile picture is required',
        ToastAndroid.LONG,
        ToastAndroid.TOP
      );
      return;
    }
  
    try {
      const data = new FormData();
      data.append('name', name);
      data.append('email', email);
      data.append('password', password);
      data.append('age', age);  
      data.append('profilePicture', {
        uri: profilePicture,
        type: 'image/jpeg',
        name: 'profile',
      });
      setSpinner(true);
      const res = await axios.post('https://api.apptask.thekaspertech.com/api/users/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.status === 200) {
        navigation.navigate('Login');
        if (name === '') {
          ToastAndroid.showWithGravity(
            'user registered successfully, please login',
            ToastAndroid.LONG,
            ToastAndroid.TOP
          );
        }
      }
    } catch (error: any) {
      setSpinner(false);
      ToastAndroid.showWithGravity(
        'something went wrong, maybe image is too large',
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
  
  const handleTakingPicture = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "App needs access to your camera",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
  
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const options = {
          mediaType: 'photo' as any,
        };
        launchCamera(options, (response: ImagePickerResponse) => {
          if (!response.didCancel) {
            const profilePictureUri = response.assets?.[0]?.uri;
            if (profilePictureUri) {
              setProfilePicture(profilePictureUri);
            }
          }
        });
      } else {
        ToastAndroid.showWithGravity(
          'camera permission denied',
          ToastAndroid.LONG,
          ToastAndroid.TOP
        );
        console.error("Camera permission denied");
      }
    } catch (error) {
      ToastAndroid.showWithGravity(
        'something went wrong',
        ToastAndroid.LONG,
        ToastAndroid.TOP
      );
      console.error('Error handling camera permission:', error);
    }
  };

  const handleUploadImage = async () => {
    try {
      const options = {
        mediaType: 'photo' as any,
      };

      launchImageLibrary(options, (response: ImagePickerResponse) => {
        if (!response.didCancel) {
          const profilePictureUri = response.assets?.[0]?.uri;

          if (profilePictureUri) {
            setProfilePicture(profilePictureUri);
          }
        }
      });
    } catch (error) {
      ToastAndroid.showWithGravity(
        'something went wrong',
        ToastAndroid.LONG,
        ToastAndroid.TOP
      );
      console.error('Error launching image picker:', error);
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
          height={550}
          closeOnDragDown={true}
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
            },
          }}
        >
          <View>
            <Text style={styles.text}>Signup</Text>
            <Text style={styles.textSmall}>Profile Picture</Text>
            <View style={styles.profileContainer}>
              {profilePicture ? (
                <Image source={{ uri: profilePicture }} style={styles.profileIcon} />
              ) : (
                <Image source={require('./profilePic.png')} style={styles.profileIcon} />
              )}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleTakingPicture}
                >
                  <Text style={styles.buttonText}>Take Picture</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { marginLeft: 10 }]}
                  onPress={handleUploadImage}
                >
                  <Text style={styles.buttonText}>Upload</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor={'black'}
              onChangeText={text => setName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={'black'}
              onChangeText={text => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={'black'}
              onChangeText={text => setPassword(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Age"
              placeholderTextColor={'black'}
              onChangeText={text => setAge(text)}
            />
            {
              spinner ? 
              <ActivityIndicator size="large" color="#fa7f05" style={styles.spinner} /> :
              <TouchableOpacity
                style={styles.btn}
                onPress={handleCreateAccount}
              >
                <Text style={styles.btnText}>Create Account</Text>
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
  text: {
    color: '#000000',
    fontSize: 30,
    marginLeft: 12,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  textSmall: {
    color: '#000000',
    fontSize: 18,
    marginLeft: 105,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -22,
  },
  profileIcon: {
    width: 80,
    height: 80,
    marginLeft: 4,
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#999999',
    paddingVertical: 10,
    borderRadius: 10,
    width: '40%', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  btn: {
    backgroundColor: '#fa7f05',
    paddingVertical: 10,
    borderRadius: 18,
    marginTop: 20,
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
    marginTop: 15,
  }
});