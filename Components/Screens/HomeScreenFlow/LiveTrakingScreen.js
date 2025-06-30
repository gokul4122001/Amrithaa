import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const RideBookingScreen = ({ navigation }) => {
  const [pickup, setPickup] = useState('West Mambalam, Chennai-33');
  const [destination, setDestination] = useState('Apollo Hospital, Thousand Lights, Chennai');
  const [userName] = useState('Jeswanth Kumar');

const handleConfirmLocation = () => {
  if (!pickup.trim() || !destination.trim()) {
    Alert.alert('Error', 'Please enter both pickup and destination locations');
    return;
  }

  // Navigate to the next screen (e.g., BookingSuccessScreen)
  navigation.navigate('AmbulanceSelectionScreen', {
    pickup,
    destination,
  });
};


  const handleNotification = () => {
    Alert.alert('Notifications', 'You have no new notifications');
  };

  const handleProfile = () => {
    Alert.alert('Profile', `Welcome ${userName}!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.welcomeSection}>
          <Icon name="car-sport" size={24} color="#7C3AED" />
          <View style={styles.welcomeText}>
            <Text style={styles.hiText}>Hi, Welcome</Text>
            <Text style={styles.nameText}>{userName}</Text>
          </View>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={handleNotification} style={styles.iconButton}>
            <Icon name="notifications-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleProfile} style={styles.profileButton}>
            <Icon name="person" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Location Inputs */}
      <View style={styles.locationContainer}>
        <View style={styles.locationInputGroup}>
          <View style={styles.locationIcon}>
            <View style={styles.greenDot} />
          </View>
          <TextInput
            style={styles.locationInput}
            value={pickup}
            onChangeText={setPickup}
            placeholder="Enter pickup location"
            placeholderTextColor="#999"
          />
        </View>
        
        <View style={styles.locationInputGroup}>
          <View style={styles.locationIcon}>
            <View style={styles.redDot} />
          </View>
          <TextInput
            style={styles.locationInput}
            value={destination}
            onChangeText={setDestination}
            placeholder="Enter destination"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapText}>Map View</Text>
          <Text style={styles.mapSubText}>Static map without location tracking</Text>
          
          {/* Route visualization */}
          <View style={styles.routeContainer}>
            <View style={styles.routePoint}>
              <View style={styles.startPoint} />
              <Text style={styles.pointLabel}>Start</Text>
            </View>
            <View style={styles.routeLine} />
            <View style={styles.routePoint}>
              <View style={styles.endPoint} />
              <Text style={styles.pointLabel}>End</Text>
            </View>
          </View>
          
          {/* Mock cars around */}
          <View style={styles.carsContainer}>
            <View style={[styles.carIcon, { top: 50, left: 30 }]}>
              <Icon name="car" size={16} color="#7C3AED" />
            </View>
            <View style={[styles.carIcon, { top: 80, right: 40 }]}>
              <Icon name="car" size={16} color="#7C3AED" />
            </View>
            <View style={[styles.carIcon, { bottom: 60, left: 50 }]}>
              <Icon name="car" size={16} color="#7C3AED" />
            </View>
            <View style={[styles.carIcon, { bottom: 40, right: 30 }]}>
              <Icon name="car" size={16} color="#7C3AED" />
            </View>
          </View>
        </View>
      </View>

      {/* Confirm Button */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmLocation}>
        <Text style={styles.confirmButtonText}>Confirm Location</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  welcomeSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeText: {
    marginLeft: 10,
  },
  hiText: {
    fontSize: 14,
    color: '#666',
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginRight: 15,
  },
  profileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  locationInputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  locationIcon: {
    marginRight: 15,
  },
  greenDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22C55E',
  },
  redDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#EF4444',
  },
  locationInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  mapContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mapText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 5,
  },
  mapSubText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 30,
  },
  routeContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  routePoint: {
    alignItems: 'center',
    marginVertical: 10,
  },
  startPoint: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#22C55E',
    marginBottom: 5,
  },
  endPoint: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#EF4444',
    marginBottom: 5,
  },
  routeLine: {
    width: 2,
    height: 40,
    backgroundColor: '#7C3AED',
    marginVertical: 5,
  },
  pointLabel: {
    fontSize: 12,
    color: '#666',
  },
  carsContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  carIcon: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  confirmButton: {
    backgroundColor: '#7C3AED',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RideBookingScreen;