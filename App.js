import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './Components/Navigations/BottomNavigationScreen';


import Login1 from './Components/Screens/LoginFlow/HomeScreenLogin';
import Login2 from './Components/Screens/LoginFlow/SecondScreenLoginPage'
import Login3 from './Components/Screens/LoginFlow/ThirdScreenLoginPage'


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login1" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login1" component={Login1} />
        <Stack.Screen name="Login2" component={Login2} />
         <Stack.Screen name="Login3" component={Login3} />

        <Stack.Screen name="MainApp" component={BottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
