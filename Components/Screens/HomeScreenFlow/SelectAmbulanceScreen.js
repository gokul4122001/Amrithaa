import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AmbulanceSelectionScreen = ({ navigation }) => {
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);
  const [modelFilter, setModelFilter] = useState('All');
  const [userName] = useState('Jeswanth Kumar');
  const [pickup] = useState('West Mambalam, Chennai L-33');
  const [destination] = useState('Apollo Hospital, Thousand Lights, Chennai');

  const [ambulanceTypes] = useState([
    {
      id: 1,
      type: 'Small',
      subtitle: 'ECG, First Aid',
      time: '5 mins',
      price: 1500,
      icon: '🚑',
      color: '#7C3AED',
      description: 'Basic emergency care'
    },
    {
      id: 2,
      type: 'Large',
      subtitle: 'Oxygen transfer, First Aid',
      time: '7 mins',
      price: 2500,
      icon: '🚑',
      color: '#7C3AED',
      description: 'Advanced emergency transport'
    },
    {
      id: 3,
      type: 'Basic life support',
      subtitle: '',
      time: '8 mins',
      price: 2000,
      icon: '🚑',
      color: '#7C3AED',
      includes: 'Emergency kit, Oxygen Tank, AI equipment, Cardiac Monitor, Ambulance Bed, Patient Stretchers',
      description: 'Complete basic life support'
    },
    {
      id: 4,
      type: 'Advance life support',
      subtitle: '',
      time: '10 mins',
      price: 2000,
      icon: '🚑',
      color: '#7C3AED',
      includes: 'Emergency kit, Oxygen Tank, AI equipment, Cardiac Monitor, Ambulance Bed, Ventilator support with nursing support',
      description: 'Advanced life support with medical staff'
    }
  ]);

  const handleAmbulanceSelect = (ambulance) => {
    setSelectedAmbulance(ambulance);
  };

 const handleBookAmbulance = () => {
  if (!selectedAmbulance) {
    Alert.alert('Selection Required', 'Please select an ambulance type');
    return;
  }

  Alert.alert(
    'Booking Confirmed',
    `${selectedAmbulance.type} ambulance booked for ₹${selectedAmbulance.price.toLocaleString()}\nEstimated arrival: ${selectedAmbulance.time}`
  );

  navigation.navigate('BookingoverviewScreen', {
    ambulance: selectedAmbulance,
  });
};


  const handleBack = () => {
    Alert.alert('Go Back', 'Return to previous screen');
  };

  const renderAmbulanceCard = (ambulance) => (
    <TouchableOpacity
      key={ambulance.id}
      style={[
        styles.ambulanceCard,
        selectedAmbulance?.id === ambulance.id && styles.selectedCard
      ]}
      onPress={() => handleAmbulanceSelect(ambulance)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.ambulanceInfo}>
          <View style={[styles.ambulanceIcon, { backgroundColor: ambulance.color }]}>
            <Text style={styles.ambulanceEmoji}>{ambulance.icon}</Text>
          </View>
          <View style={styles.ambulanceDetails}>
            <Text style={styles.ambulanceType}>{ambulance.type}</Text>
            {ambulance.subtitle ? (
              <Text style={styles.ambulanceSubtitle}>{ambulance.subtitle}</Text>
            ) : null}
            <Text style={styles.ambulanceTime}>{ambulance.time}</Text>
          </View>
        </View>
        <Text style={styles.ambulancePrice}>₹ {ambulance.price.toLocaleString()}</Text>
      </View>
      {ambulance.includes && (
        <View style={styles.includesSection}>
          <Text style={styles.includesTitle}>Includes:</Text>
          <Text style={styles.includesText}>{ambulance.includes}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.welcomeSection}>
          <Icon name="medical" size={24} color="#7C3AED" />
          <View style={styles.welcomeText}>
            <Text style={styles.hiText}>Hi, Welcome</Text>
            <Text style={styles.nameText}>{userName}</Text>
          </View>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="notifications-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileButton}>
            <Icon name="person" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Location Info */}
      <View style={styles.locationContainer}>
        <View style={styles.locationRow}>
          <View style={styles.greenDot} />
          <Text style={styles.locationText}>{pickup}</Text>
        </View>
        <View style={styles.locationRow}>
          <View style={styles.redDot} />
          <Text style={styles.locationText}>{destination}</Text>
        </View>
      </View>

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <View style={styles.routeVisualization}>
            <View style={styles.routeStart} />
            <View style={styles.routePath} />
            <View style={styles.routeEnd} />
          </View>
        </View>
      </View>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Icon name="chevron-back" size={20} color="#000" />
        <Text style={styles.backButtonText}>Select the Ambulance</Text>
      </TouchableOpacity>

      {/* Patient Transfer Section */}
      <View style={styles.transferSection}>
        <Text style={styles.transferTitle}>Patient transfer</Text>
        <Icon name="chevron-down" size={20} color="#666" />
      </View>

      {/* Model Type Filter */}
      <View style={styles.modelFilterContainer}>
        {['All', 'Small', 'Large', 'Basic life support', 'Advance life support'].map((model) => (
          <TouchableOpacity
            key={model}
            onPress={() => setModelFilter(model)}
            style={[
              styles.modelButton,
              modelFilter === model && styles.modelButtonSelected
            ]}
          >
            <Text style={[styles.modelText, modelFilter === model && styles.modelTextSelected]}>
              {model}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Ambulance List */}
      <ScrollView style={styles.ambulanceList} showsVerticalScrollIndicator={false}>
        {ambulanceTypes
          .filter((item) => modelFilter === 'All' || item.type === modelFilter)
          .map(renderAmbulanceCard)}
      </ScrollView>

      {/* Book Button */}
      {selectedAmbulance && (
        <TouchableOpacity style={styles.bookButton} onPress={handleBookAmbulance}>
          <Text style={styles.bookButtonText}>
            Book {selectedAmbulance.type} - ₹{selectedAmbulance.price.toLocaleString()}
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#fff',
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 4,
  },
  welcomeSection: { flexDirection: 'row', alignItems: 'center' },
  welcomeText: { marginLeft: 10 },
  hiText: { fontSize: 14, color: '#666' },
  nameText: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  iconButton: { marginRight: 15 },
  profileButton: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: '#FF4444',
    justifyContent: 'center', alignItems: 'center',
  },
  locationContainer: { paddingHorizontal: 20, paddingVertical: 10 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  greenDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#22C55E', marginRight: 12 },
  redDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#EF4444', marginRight: 12 },
  locationText: { fontSize: 14, color: '#000', flex: 1 },
  mapContainer: { height: 120, marginHorizontal: 20, marginBottom: 15, borderRadius: 8, overflow: 'hidden' },
  mapPlaceholder: { flex: 1, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' },
  routeVisualization: { flexDirection: 'row', alignItems: 'center' },
  routeStart: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#22C55E' },
  routePath: { width: 60, height: 2, backgroundColor: '#7C3AED', marginHorizontal: 10 },
  routeEnd: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#EF4444' },
  backButton: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10 },
  backButtonText: { fontSize: 16, fontWeight: '600', marginLeft: 5, color: '#000' },
  transferSection: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0',
  },
  transferTitle: { fontSize: 16, fontWeight: '600', color: '#000' },
  modelFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
    flexWrap: 'wrap',
  },
  modelButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 5,
    marginBottom: 10,
  },
  modelButtonSelected: {
    backgroundColor: '#7C3AED',
  },
  modelText: {
    fontSize: 12,
    color: '#000',
  },
  modelTextSelected: {
    color: '#fff',
  },
  ambulanceList: { flex: 1, paddingHorizontal: 20 },
  ambulanceCard: {
    backgroundColor: '#fff', borderRadius: 12, padding: 15, marginBottom: 15,
    borderWidth: 1, borderColor: '#f0f0f0', elevation: 2,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 4,
  },
  selectedCard: { borderColor: '#7C3AED', borderWidth: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ambulanceInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  ambulanceIcon: {
    width: 40, height: 40, borderRadius: 8,
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  ambulanceEmoji: { fontSize: 20 },
  ambulanceDetails: { flex: 1 },
  ambulanceType: { fontSize: 16, fontWeight: 'bold', color: '#000', marginBottom: 2 },
  ambulanceSubtitle: { fontSize: 12, color: '#666', marginBottom: 2 },
  ambulanceTime: { fontSize: 12, color: '#666' },
  ambulancePrice: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  includesSection: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  includesTitle: { fontSize: 14, fontWeight: '600', color: '#000', marginBottom: 4 },
  includesText: { fontSize: 12, color: '#666', lineHeight: 16 },
  bookButton: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: '#7C3AED',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default AmbulanceSelectionScreen;
