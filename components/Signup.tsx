import React, { useState, useRef, useEffect } from "react";
import { View, Text, ImageBackground, StyleSheet, TextInput, TouchableOpacity, Image, PermissionsAndroid } from "react-native";
import RBSheet from "@nonam4/react-native-bottom-sheet";
import ImagePicker, { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function Example() {
  const refRBSheet = useRef<RBSheet | null>(null);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [userImage, setUserImage] = useState<string>('');

  const handleLogin = () => {
    console.log("Name: ", name);
    console.log("Email: ", email);
    console.log("Password: ", password);
    console.log("Age: ", age);
    // make api call and send data to backend
  };

  const handleTakingPicture = async () => {
    try {
      console.log("Before requesting camera permission");
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "App needs access to your camera",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      console.log("After requesting camera permission", granted);
  
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const options = {
          mediaType: 'photo' as const,
        };
        console.log("Before launching camera");
        launchCamera(options, (response: ImagePickerResponse) => {
          console.log("Image Response", response);
          if (!response.didCancel) {
            const userImageUri = response.assets?.[0]?.uri;
            if (userImageUri) {
              setUserImage(userImageUri);
            }
          }
        });
      } else {
        console.log("Camera permission denied");
      }
    } catch (error) {
      console.error('Error handling camera permission:', error);
    }
  };
  

  const handleUploadImage = async () => {
    try {
      const options = {
        mediaType: 'photo' as const,
      };

      launchImageLibrary(options, (response: ImagePickerResponse) => {
        console.log("Image Response", response);
        if (!response.didCancel) {
          // Check if 'uri' property exists before accessing it
          const userImageUri = response.assets?.[0]?.uri;

          if (userImageUri) {
            setUserImage(userImageUri);
          }
        }
      });
    } catch (error) {
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
            }
          }}
        >
          <View>
            <Text style={styles.text}>Signup</Text>
            <Text style={styles.textSmall}>Profile Picture</Text>
            <View style={styles.profileContainer}>
              {userImage ? (
                <Image source={{ uri: userImage }} style={styles.profileIcon} />
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
            <TouchableOpacity
              style={styles.btn}
              onPress={handleLogin}
            >
              <Text style={styles.btnText}>Create Account</Text>
            </TouchableOpacity>
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
  }
});
