import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  PanResponder,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Colors from '../../Colors/Colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const { width, height } = Dimensions.get('window');
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const AmbulanceTrackingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { ambulanceType, price } = route.params || {};

  const [isExpanded, setIsExpanded] = useState(false);
  const translateY = useRef(new Animated.Value(height * 0.5)).current;
  const [currentOTP] = useState('4154');

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: height * 0.5,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  // Create PanResponder for handle bar only
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dy) > 5,
    onPanResponderMove: (evt, gestureState) => {
      const newTranslateY = height * 0.5 + gestureState.dy;
      if (newTranslateY >= 50 && newTranslateY <= height * 0.8) {
        translateY.setValue(newTranslateY);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy < -100) {
        setIsExpanded(true);
        Animated.timing(translateY, {
          toValue: 50,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else if (gestureState.dy > 100) {
        setIsExpanded(false);
        Animated.timing(translateY, {
          toValue: height * 0.5,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(translateY, {
          toValue: isExpanded ? 50 : height * 0.5,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const handleCallDriver = () => console.log('Calling driver...');
  const handleChangeLocation = () => console.log('Change location...');
  const handleEmergency = () => console.log('Emergency call...');

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar backgroundColor="#8B5CF6" barStyle="light-content" />
      
      {/* Map Section */}
      <View style={styles.mapContainer}>
      

        <View style={styles.mapView}>
          <View style={styles.mapBackground}>
            <View style={styles.routeLine} />
            <View style={[styles.locationPin, styles.startPin]}>
              <Icon name="location-on" size={20} color="#E53E3E" />
            </View>
            <View style={[styles.locationPin, styles.endPin]}>
              <Icon name="location-on" size={20} color="#E53E3E" />
            </View>
            <View style={styles.ambulanceMarker}>
              <Text style={styles.ambulanceIcon}>🚑</Text>
            </View>
          </View>

        
        </View>
      </View>

      {/* Bottom Sheet */}
      <Animated.View
        style={[styles.bottomSheet, { transform: [{ translateY }] }]}
      >
        {/* Handle Bar with PanResponder - Only this area responds to drag gestures */}
        <View style={styles.handleContainer} {...panResponder.panHandlers}>
          <View style={styles.handleBar} />
        </View>
        
        {/* ScrollView without PanResponder - This can scroll freely */}
        <ScrollView style={styles.sheetContent} showsVerticalScrollIndicator={false}>
          <View style={styles.sheetHeader}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Icon name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Ambulance Tracking</Text>
          </View>

        

             <ScrollView contentContainerStyle={styles.scrollContainer}>
                   {/* Driver Card */}
                   <View style={styles.otpContainer}>
                     <Text style={styles.otpText}>OTP : 4154</Text>
                   </View>
                   <View style={styles.driverCard}>
                     <Image
                       source={{ uri: 'https://randomuser.me/api/portraits/men/41.jpg' }}
                       style={styles.driverImage}
                     />
         
                     <View style={styles.driverInfo}>
                       <View style={styles.nameRow}>
                         <Text style={styles.driverName}>Dinesh Kumar</Text>
                         <Icon name="star" size={16} color="#FFD700" style={{ marginHorizontal: 4 }} />
                         <Text style={styles.rating}>4.3</Text>
                       </View>
         
                       <View style={styles.detailsRow}>
                         <View style={styles.vehicleBox}>
                           <Text style={styles.vehicleText}>TN05MA2658</Text>
                         </View>
                         <TouchableOpacity style={styles.callContainer}>
                           <View style={styles.callIconCircle}>
                             <Icon name="call" size={18} color="#7B2CBF" />
                           </View>
                           <Text style={styles.callText}>Call Driver</Text>
                         </TouchableOpacity>
                       </View>
                     </View>
                   </View>
         
                   {/* Pickup & Drop */}
                   <View style={styles.section}>
                     <View style={styles.locationRow}>
                       <MaterialIcons name="circle" size={10} color="#FF0000" />
                       <Text style={styles.locationLabel}>Pickup</Text>
                       <Text style={styles.locationValue}>
                         NO 3/1, I Street west mambalam chennai -33
                       </Text>
                     </View>
                     <View style={styles.locationRow}>
                       <MaterialIcons name="circle" size={10} color="#8E44AD" />
                       <Text style={styles.locationLabel}>Drop</Text>
                       <Text style={styles.locationValue}>
                         NO 3/1, I Street vyasarpadi chennai -33
                       </Text>
                     </View>
                   </View>
         
                   {/* Booking Date & Time */}
                   <View style={styles.section}>
                     <Text style={styles.sectionTitle}>Booking Date & Time</Text>
                     <View style={styles.infoRow}>
                       <Text style={styles.label}>Booking Date</Text>
                       <Text style={styles.value}>21 / 03 / 2025</Text>
                     </View>
                     <View style={styles.infoRow}>
                       <Text style={styles.label}>Booking Time</Text>
                       <Text style={styles.value}>05 : 30 PM</Text>
                     </View>
                   </View>
         
                   {/* Customer Details */}
                   <View style={styles.section}>
                     <Text style={styles.sectionTitle}>Customer Details</Text>
                     <Text style={styles.value}>Name : Jeswanth Kumar</Text>
                     <Text style={styles.value}>Mobile Number : 9345665447</Text>
                   </View>
         
                   {/* Assistance for Patient */}
                   <View style={styles.section}>
                     <Text style={styles.sectionTitle}>Assistance for the Patient</Text>
                     <View style={styles.infoRow}>
                       <Text style={styles.value}>First Floor</Text>
                       <Text style={styles.value}>₹ 350</Text>
                     </View>
                   </View>
         
                   {/* Emergency Card */}
                   <View style={styles.emergencyCard}>
                     <Text style={styles.emergencyTitle}>
                       Call customer care incase of emergency
                     </Text>
                     <Text style={styles.emergencyDescription}>
                       For any accident or patient mishandlings, press the call button to
                       contact our team.
                     </Text>
                     <TouchableOpacity style={styles.emergencyButton}>
                       <Icon name="phone" size={16} color="#4D2161" />
                       <Text style={styles.emergencyButtonText}>Emergency</Text>
                     </TouchableOpacity>
                   </View>
         
                   {/* Price Details */}
                   <View style={styles.section}>
                     <Text style={styles.sectionTitle}>Price Details</Text>
                     <View style={styles.infoRow}>
                       <Text style={styles.label}>Ambulance Cost</Text>
                       <Text style={styles.value}>₹ 1,500</Text>
                     </View>
                     <View style={styles.infoRow}>
                       <Text style={styles.label}>Assistance for the Patient</Text>
                       <Text style={styles.value}>₹ 350</Text>
                     </View>
                     <View
                       style={[
                         styles.infoRow,
                         { borderTopWidth: 1, borderColor: '#eee', paddingTop: 10 },
                       ]}
                     >
                       <Text style={[styles.label, { fontSize: 16 }]}>Total Price</Text>
                       <Text style={[styles.value, { fontSize: 16, color: '#7B2CBF' }]}>
                         ₹ 1,850
                       </Text>
                     </View>
                   </View>
         
                   {/* Track Ambulance Button */}
                   <TouchableOpacity style={styles.trackButton}>
                     <Text style={styles.trackButtonText}>Change Location</Text>
                   </TouchableOpacity>
                 </ScrollView>
        </ScrollView>
      </Animated.View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  mapContainer: { flex: 1, backgroundColor: '#8B5CF6' },
  mapView: { flex: 1 },
  mapBackground: { flex: 1, backgroundColor: '#F5F5F5' },
  routeLine: {
    position: 'absolute',
    top: '30%',
    left: '20%',
    width: 3,
    height: 120,
    backgroundColor: '#333',
    transform: [{ rotate: '45deg' }],
  },
  locationPin: {
    position: 'absolute',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 5,
  },
  startPin: { top: '25%', left: '15%' },
  endPin: { top: '60%', left: '50%' },
  ambulanceMarker: {
    position: 'absolute',
    top: '40%',
    left: '30%',
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  ambulanceIcon: { fontSize: 24 },
 
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: height,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 8,
  },
  // New container for handle bar with larger touch area
  handleContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
  },
  sheetContent: { 
    paddingHorizontal: 16,
    flex: 1,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  backButton: { marginRight: 8 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: '#333' },
 
 scrollContainer: { 
    paddingBottom: 200, 
    paddingHorizontal: 10 
  },
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    marginTop: 50,
    borderRadius: 12,
    elevation: 2,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  driverImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  driverInfo: {
    flex: 1,
    marginLeft: 10,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  driverName: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#333',
  },
  rating: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vehicleBox: {
    borderWidth: 1,
    borderStyle: 'dotted',
    borderColor: '#999',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  vehicleText: {
    fontSize: 12,
    color: '#333',
  },
  callContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callIconCircle: {
    backgroundColor: '#EDE9FE',
    padding: 8,
    borderRadius: 20,
    marginRight: 6,
  },
  callText: {
    fontSize: 13,
    color: '#7B2CBF',
    fontWeight: '600',
  },
  topBackground: {
    paddingTop: hp('4%'),
    paddingBottom: hp('2%'),
    paddingHorizontal: wp('4%'),
    height: hp('100%'),
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
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  screenTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    flex: 1, 
    marginLeft: 12 
  },
  locationButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#EDE9FE',
    borderRadius: 8,
  },
  locationText: { 
    fontSize: 12, 
    color: '#7B2CBF' 
  },
  otpContainer: {
    position: 'absolute',
    top: 15,
    right: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 8,
    zIndex: 1,
  },
  otpText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    elevation: 2,
  },
  sectionTitle: { 
    fontWeight: 'bold', 
    fontSize: 14, 
    marginBottom: 12 
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  locationLabel: { 
    fontWeight: 'bold', 
    marginHorizontal: 8, 
    fontSize: 13 
  },
  locationValue: { 
    color: '#333', 
    flex: 1, 
    fontSize: 13 
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: { 
    color: '#666' 
  },
  value: { 
    fontWeight: 'bold', 
    color: '#333' 
  },
  emergencyCard: {
    marginTop: 16,
    padding: 16,
    backgroundColor: Colors.statusBar,
    borderRadius: 12,
  },
  emergencyTitle: { 
    fontWeight: 'bold', 
    fontSize: 16, 
    marginBottom: 6, 
    color: '#ffff' 
  },
  emergencyDescription: { 
    fontSize: 12, 
    color: '#ffff' 
  },
  emergencyButton: {
    marginTop: 12,
    flexDirection: 'row',
    backgroundColor: '#DBDBDB',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergencyButtonText: { 
    color: Colors.statusBar, 
    fontWeight: 'bold', 
    marginLeft: 8 
  },
  trackButton: {
    flexDirection: 'row',
    backgroundColor: Colors.statusBar,
    paddingVertical: 14,
    marginTop: 20,
    marginBottom: 60,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 8,
  },
  
});

export default AmbulanceTrackingScreen;