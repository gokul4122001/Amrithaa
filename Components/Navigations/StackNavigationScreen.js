// navigation/HomeStack.js

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import AmbulanceBookingScreen from '../Screens/AmbulanceBookingScreen';
import SelectHospitalScreen from '../Screens/SelectHospitalpage';
import LiveTrakingScreen from '../Screens/LiveTrakingScreen'
import AmbulanceSelectionScreen from '../Screens/SelectAmbulanceScreen';

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="AmbulanceBookingScreen"
        component={AmbulanceBookingScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="SelectHospitalScreen"
        component={SelectHospitalScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="LiveTrakingScreen"
        component={LiveTrakingScreen}
        options={{ headerShown: false }}
      />
      
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
