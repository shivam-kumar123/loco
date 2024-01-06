import React, { useState, useRef, useEffect } from "react";
import { View, Text, ImageBackground, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import RBSheet from "@nonam4/react-native-bottom-sheet";

export default function Example() {
  const refRBSheet = useRef<RBSheet | null>(null);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    console.log("Email: ", email);
    console.log("Password: ", password);
    // make api call and send data to backend
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
            <TouchableOpacity
              style={styles.btn}
              onPress={handleLogin}
            >
              <Text style={styles.btnText}>Login</Text>
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
  }
});
