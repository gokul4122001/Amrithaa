import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  Alert,
  Image,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import logo from '../../Assets/logos.png';
import Fonts from '../../Fonts/Fonts';
import Colors from '../../Colors/Colors';
import Icons from 'react-native-vector-icons/MaterialIcons';

const AmbulanceBookingScreen = ({ navigation }) => {
  const [selectedAssistance, setSelectedAssistance] = useState('required');
  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handlePayment = () => {
    if (!customerName.trim() || !customerMobile.trim()) {
      Alert.alert('Error', 'Please fill in all required customer details');
      return;
    }

    navigation.navigate('Bookingconformation', {
      name: customerName,
      mobile: customerMobile,
      additionalInfo: additionalInfo,
      totalAmount: 1750,
    });
  };

  const categories = [
    {
      id: 'heart',
      title: 'Emergency Kit',
      image: require('../../Assets/emkit.png'),
    },
    {
      id: 'poisoning',
      title: 'Oxygen Tank',
      image: require('../../Assets/oxgenTank.png'),
    },
    {
      id: 'accident',
      title: 'IV Equipment',
      image: require('../../Assets/ivequp.png'),
    },
    {
      id: 'skin',
      title: 'Cardiac Monitors',
      image: require('../../Assets/cardiomonitor.png'),
    },
    {
      id: 'cpr',
      title: 'Ambulance Bed',
      image: require('../../Assets/ambulancebet.png'),
    },
  ];

  const handleCategorySelect = (category) => {
    console.log('Selected category:', category.title);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.statusBar} />
      <LinearGradient
        colors={['#ffffff', '#C3DFFF']}
        start={{ x: 0, y: 0.3 }}
        end={{ x: 0, y: 0 }}
        style={styles.topBackground}
      >
        {/* Header */}
        <View style={styles.header}>
          <Image source={logo} style={styles.logo} />
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>Hi, Welcome</Text>
            <Text style={styles.userName}>Jeswanth Kumar</Text>
          </View>
          <TouchableOpacity style={[styles.notificationButton, { right: hp('2%') }]}>
            <Icons name="notifications-on" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.notificationButton, { backgroundColor: 'red' }]}>
            <MaterialCommunityIcons name="alarm-light-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          style={styles.content}
          contentContainerStyle={{ paddingBottom: 200 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Pickup Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pickup</Text>

            <View style={styles.locationItem}>
              <View style={styles.locationDot} />
              <View style={styles.locationInfo}>
                <Text style={styles.locationText}>West Mambalam, Chennai - 33</Text>
              </View>
            </View>

            <View style={styles.locationItem}>
              <View style={[styles.locationDot, { backgroundColor: '#ff4444' }]} />
              <View style={styles.locationInfo}>
                <Text style={styles.locationText}>Vyasarpadi, Chennai - 39</Text>
              </View>
            </View>
          </View>

          {/* Ambulance Details */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Ambulance Details</Text>
              <TouchableOpacity>
                <Text style={styles.changeLink}>Change</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.ambulanceCard}>
              <View style={styles.ambulanceHeader}>
                <Image source={require('../../Assets/ambualnce.png')} style={styles.ambulanceImage} />
                <View style={styles.ambulanceInfo}>
                  <Text style={styles.ambulanceTitle}>Patient Transfer</Text>
                  <Text style={styles.ambulanceSubTitle}>Basic | ICMR AIS</Text>
                  <Text style={styles.arrivalTime}>Arrival Timing: 15 mins</Text>
                </View>
                <Text style={styles.price}>₹ 1,500</Text>
              </View>
            </View>
          </View>

          {/* Includes */}
          <View style={styles.categorySection}>
            <Text style={styles.categoryHeader}>Includes</Text>
            <View style={styles.categoryGrid}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={styles.categoryButton}
                  onPress={() => handleCategorySelect(category)}
                >
                  <Image source={category.image} style={styles.categoryImage} />
                  <Text style={styles.categoryLabel}>{category.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Patient Assistance */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Patient Assistance</Text>

            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setSelectedAssistance('not-required')}
            >
              <View style={[styles.radioButton, selectedAssistance === 'not-required' && styles.radioSelected]}>
                {selectedAssistance === 'not-required' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioText}>Not Required Patient Assistance</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.radioOption}
              onPress={() => setSelectedAssistance('required')}
            >
              <View style={[styles.radioButton, selectedAssistance === 'required' && styles.radioSelected]}>
                {selectedAssistance === 'required' && <View style={styles.radioInner} />}
              </View>
              <View style={styles.radioContent}>
                <Text style={styles.radioText}>Required Patient Assistance</Text>
                <Text style={styles.radioSubText}>This contains attendant</Text>
                <Text style={styles.radioPrice}>₹ 250</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Customer Details */}
          <View style={styles.section}>
            <TouchableOpacity style={styles.expandableHeader}>
              <Text style={styles.sectionTitle}>Add Customer Details</Text>
              <Icon name="keyboard-arrow-down" size={24} color="#666" />
            </TouchableOpacity>

            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Customer Name</Text>
                <TextInput
                  style={styles.textInput}
                  value={customerName}
                  onChangeText={setCustomerName}
                  placeholder="Enter customer name"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Customer Mobile Number</Text>
                <TextInput
                  style={styles.textInput}
                  value={customerMobile}
                  onChangeText={setCustomerMobile}
                  placeholder="Enter mobile number"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                  maxLength={10}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Write additional information here</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  value={additionalInfo}
                  onChangeText={setAdditionalInfo}
                  placeholder="Additional information (optional)"
                  placeholderTextColor="#999"
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
              </View>
            </View>
          </View>

          {/* Price Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Price Details</Text>

            <View style={styles.priceContainer}>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Ambulance Cost</Text>
                <Text style={styles.priceValue}>₹ 1,500</Text>
              </View>

              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Assistance for the Patient</Text>
                <Text style={styles.priceValue}>₹ 250</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.priceRow}>
                <Text style={styles.totalLabel}>Total Price</Text>
                <Text style={styles.totalValue}>₹ 1,750</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Floating Pay Now Button */}
        <View style={styles.floatingButtonWrapper}>
          <TouchableOpacity style={styles.payNowButton} onPress={handlePayment}>
            <Text style={styles.payNowButtonText}>Pay Now</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  topBackground: {
    flex: 1,
    paddingTop: hp('4%'),
    paddingHorizontal: wp('5%'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  logo: {
    width: wp('10%'),
    height: hp('5%'),
    resizeMode: 'contain',
  },
  greetingContainer: { flex: 1, marginLeft: wp('3%') },
  greeting: { fontSize: hp('2%'), color: 'black', fontFamily: Fonts.family.regular },
  userName: { fontSize: hp('2%'), fontWeight: 'bold', color: 'black', fontFamily: Fonts.family.regular },
  notificationButton: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('2%'),
  },
  content: { flex: 1 },
  section: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222',
    marginBottom: 12,
    fontFamily: Fonts.family.regular,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    top: 10,
  },
  locationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#28a745',
    marginRight: 12,
  },
  locationInfo: { flex: 1 },
  locationText: {
    fontSize: 14,
    color: '#666',
    fontFamily: Fonts.family.regular,
  },
  ambulanceCard: {
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    padding: 12,
  },
  ambulanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ambulanceImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginRight: 12,
  },
  ambulanceInfo: {
    flex: 1,
    marginLeft: 12,
  },
  ambulanceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    fontFamily: Fonts.family.regular,
  },
  ambulanceSubTitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
    fontFamily: Fonts.family.regular,
  },
  arrivalTime: {
    fontSize: 12,
    color: '#28a745',
    fontFamily: Fonts.family.regular,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    fontFamily: Fonts.family.regular,
  },
  categorySection: {
    marginVertical: 20,
    paddingHorizontal: 5,
  },
  categoryHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 16,
    fontFamily: Fonts.family.regular,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryButton: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  categoryLabel: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: Fonts.family.regular,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  radioSelected: {
    borderColor: '#007bff',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007bff',
  },
  radioContent: {
    flex: 1,
  },
  radioText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    fontFamily: Fonts.family.regular,
  },
  radioSubText: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
    fontFamily: Fonts.family.regular,
  },
  radioPrice: {
    fontSize: 14,
    color: '#28a745',
    fontWeight: '600',
    marginTop: 4,
    fontFamily: Fonts.family.regular,
  },
  expandableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  formContainer: {
    marginTop: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
    fontFamily: Fonts.family.regular,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#fff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  priceContainer: {
    marginTop: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  priceValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#e9ecef',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    fontFamily: Fonts.family.regular,
  },
  totalValue: {
    fontSize: 18,
    color: '#333',
    fontWeight: '700',
    fontFamily: Fonts.family.regular,
  },

  // Floating Pay Now Button
  floatingButtonWrapper: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 30 : 80,
    left: 20,
    right: 20,
    zIndex: 10,
    elevation: 10,
  },
  payNowButton: {
    backgroundColor: Colors.statusBar,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  payNowButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AmbulanceBookingScreen;
