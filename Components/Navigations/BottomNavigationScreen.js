import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomTabButton  from '../Navigations/CustomTabButton';
import HomeScreen from '../Screens/HomeScreen';
import MenuScreen from '../Screens/MenuScreen';
import BookmarkScreen from '../Screens/BookmarkScreen';
import AlertScreen from '../Screens/AlertScreen';
import ProfileScreen from '../Screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
   <Tab.Navigator
  screenOptions={({ route }) => ({
    headerShown: false,
    tabBarActiveTintColor: 'white',
    tabBarInactiveTintColor: 'purple',
    tabBarStyle: {
      backgroundColor: '#f5f5f5',
      height: 70,
    },
    tabBarIcon: ({ color, size }) => {
      let iconName;
      switch (route.name) {
        case 'Home':
          iconName = 'home-outline';
          break;
        case 'Menu':
          iconName = 'view-grid-outline';
          break;
        case 'Bookmark':
          iconName = 'bookmark-outline';
          break;
        case 'Alert':
          iconName = 'alarm-light-outline';
          break;
        case 'Profile':
          iconName = 'account-outline';
          break;
        default:
          iconName = 'circle';
      }

      return <Icon name={iconName} size={size} color={color} />;
    },
    tabBarLabel: route.name === 'Home' ? 'Home' : '',
  })}
>
  <Tab.Screen
    name="Home"
    component={HomeScreen}
    options={{
      tabBarButton: (props) => (
        <CustomTabButton {...props} label="Home" />
      ),
    }}
  />
  <Tab.Screen
    name="Menu"
    component={MenuScreen}
    options={{
      tabBarButton: (props) => (
        <CustomTabButton {...props} label="Menu" />
      ),
    }}
  />
  <Tab.Screen
    name="Bookmark"
    component={BookmarkScreen}
    options={{
      tabBarButton: (props) => (
        <CustomTabButton {...props} label="Bookmark" />
      ),
    }}
  />
  <Tab.Screen
    name="Alert"
    component={AlertScreen}
    options={{
      tabBarButton: (props) => (
        <CustomTabButton {...props} label="Alert" />
      ),
    }}
  />
  <Tab.Screen
    name="Profile"
    component={ProfileScreen}
    options={{
      tabBarButton: (props) => (
        <CustomTabButton {...props} label="Profile" />
      ),
    }}
  />
</Tab.Navigator>

  );
};

export default BottomTabs;
