import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{
        marginTop: 30,
    }}>
      <Text style={styles.heading}>LOCO</Text>
      <Text style={[styles.text, {
        marginBottom: 30,
      }]}>Track your location in real-time with Loco.</Text>
        <Image
          style={styles.image}
          source={require('./HomeImg.jpg')}  // Make sure the path is correct
        />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.btnText}>Sign up</Text>
      </TouchableOpacity>

      <Text style={styles.text}>
        Already have an account? 
        <Text 
            onPress={() => navigation.navigate('Login')}
            style={styles.textBold}> Log in</Text>
      </Text>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
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
  heading: {
    fontSize: 30,
    color: '#fa7f05',
    textAlign: 'center',
    marginVertical: 10,
  },
  text: {
    color: '#616362',
    textAlign: 'center',
    marginTop: 10,
  },
  textBold: {
    color: '#000000',
    textAlign: 'center',
    marginTop: 10,
  },
  image: {
    width: '95%',
    height: '60%',
    resizeMode: 'cover',
    borderRadius: 10,
    marginLeft: 10,
    marginBottom: 30,
  },
});