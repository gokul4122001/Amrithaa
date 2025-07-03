import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../Colors/Colors';
import logo from '../../Assets/logos.png';

import CurrentBookingTab from './CurrentBookingTab';
import ScheduleBookingTab from './ScheduleBookingTab';
import CompleteBookingTab from './CompleteBookingTab';
import CancellationBookingTab from './CancelBookingTab';

const BookingListScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('current');

  const tabs = [
    { id: 'current', label: 'Current Booking', key: 'current' },
    { id: 'schedule', label: 'Schedule Booking', key: 'schedule' },
    { id: 'complete', label: 'Complete Booking', key: 'complete' },
    { id: 'cancellation', label: 'Cancellation Booking', key: 'cancellation' },
  ];

  const renderTabButton = (tab) => (
    <TouchableOpacity
      key={tab.id}
      style={[
        styles.tabButton,
        activeTab === tab.key && styles.activeTabButton,
      ]}
      onPress={() => setActiveTab(tab.key)}
    >
      <Text
        style={[
          styles.tabButtonText,
          activeTab === tab.key && styles.activeTabButtonText,
        ]}
      >
        {tab.label}
      </Text>
    </TouchableOpacity>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'current':
        return <CurrentBookingTab />;
      case 'schedule':
        return <ScheduleBookingTab />;
      case 'complete':
        return <CompleteBookingTab />;
      case 'cancellation':
        return <CancellationBookingTab />;
      default:
        return <CancellationBookingTab />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.statusBar} />

      {/* Header */}
      <LinearGradient
        colors={['#ffffff', '#C3DFFF']}
        start={{ x: 0, y: 0.8 }}
        end={{ x: 0, y: 0 }}
        style={styles.headerBackground}
      >
        <View style={styles.header}>
          <Image source={logo} style={styles.logo} />
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>Hi, Welcome</Text>
            <Text style={styles.userName}>Janmani Kumar</Text>
          </View>
          <TouchableOpacity
            style={[styles.notificationButton, { marginRight: wp('2%') }]}
          >
            <Icon name="notifications-on" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.notificationButton, { backgroundColor: 'red' }]}
          >
            <MaterialCommunityIcons
              name="alarm-light-outline"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icons name="chevron-back" size={24} />
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>Booking List</Text>
        </View>
      </LinearGradient>

      {/* Tab Buttons & Content */}
      <View style={styles.content}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabContainer}
          contentContainerStyle={styles.tabScrollContent}
        >
          {tabs.map(renderTabButton)}
        </ScrollView>

        <View style={styles.tabContent}>{renderTabContent()}</View>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    position: 'relative',
  },
  headerBackground: {
    paddingTop: hp('4%'),
    paddingBottom: hp('1.2%'),
    paddingHorizontal: wp('4%'),
  },
  content: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  tabContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    maxHeight: hp('8%'),
  },
  tabScrollContent: {
    alignItems: 'center',
    paddingRight: wp('4%'),
  },
  tabButton: {
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1.5%'),
    marginRight: wp('2%'),
    borderRadius: 10,
    backgroundColor: 'white',
    minWidth: wp('35%'),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    minHeight: wp('10%'),
  },
  activeTabButton: {
    backgroundColor: Colors.statusBar || '#007AFF',
  },
  tabButtonText: {
    fontSize: hp('1.8%'),
    color: '#666',
    fontWeight: '600',
  },
  activeTabButtonText: {
    color: 'white',
  },
  tabContent: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: hp('12%'), // leave space for button
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: wp('10%'),
    height: hp('5%'),
    resizeMode: 'contain',
  },
  greetingContainer: {
    flex: 1,
    marginLeft: wp('3%'),
  },
  greeting: {
    fontSize: hp('2%'),
    color: 'black',
    opacity: 0.9,
  },
  userName: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    color: 'black',
  },
  notificationButton: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
 
});

export default BookingListScreen;
