import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './Components/Navigations/BottomNavigationScreen';

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
}
