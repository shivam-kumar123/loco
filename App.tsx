import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import Login from './components/Login'
import Signup from './components/Signup';
import Profile from './components/Profile';

const Stack = createNativeStackNavigator();

const App = () => {

  const [authToken, setAuthToken] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
          initialParams={{ setAuthToken, setUserEmail, setUserPassword }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ 
            headerShown: true,
            headerTitleAlign: 'center',
            headerLeft: () => null,
          }}
          initialParams={{ authToken, userEmail, userPassword }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;