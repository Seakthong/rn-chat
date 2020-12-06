import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/components/screens/LoginScreen';
import SignupScreen from './src/components/screens/SignupScreen';
import HomeScreen from './src/components/homepage/HomeScreen';
import Chat from './src/components/Chat/Chat';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: null }}
        />

        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: null }}
        />

        <Stack.Screen
          name="HomePage"
          component={HomeScreen}
          options={{ headerShown: true, title: "Homepage" }}
        />

        <Stack.Screen
          name="Chat"
          component={Chat}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;