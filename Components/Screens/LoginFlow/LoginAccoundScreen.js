import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
  Keyboard,
  Modal,
  FlatList,
} from 'react-native';
import { countries } from './CountryJson';
import { useNavigation } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Fonts from '../../Fonts/Fonts';
import Colors from '../../Colors/Colors';
const LoginScreen = () => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [mobileNumber, setMobileNumber] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();

  const handleSendOTP = () => {
    Keyboard.dismiss();
    const isValidNumber = /^[0-9]{10}$/.test(mobileNumber);
    if (!isValidNumber) {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit number');
      return;
    }
    navigation.navigate('Login7', {
      phoneNumber: mobileNumber,
      countryCode: selectedCountry.dial_code,
    });
  };

  const renderCountryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() => {
        setSelectedCountry(item);
        setShowModal(false);
      }}
    >
      <Image
        source={{ uri: `https://flagcdn.com/w40/${item.code}.png` }}
        style={styles.modalFlag}
      />
      <Text style={styles.countryText}>
        {item.name} ({item.dial_code})
      </Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#ffffff', '#C3DFFF']}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0, y: 0 }}
      style={styles.gradientContainer}
    >
      <StatusBar barStyle="dark-content" backgroundColor={Colors.statusBar} translucent />

      <SafeAreaView style={styles.container}>
        {/* Logo */}
        <View style={styles.logoRow1}>
          <View style={styles.logoRow}>
            <Image
              source={require('../../Assets/logos.png')}
              style={styles.logoImage}
            />
          </View>
          <View>
            <Text style={styles.logoBrand}>Health</Text>
            <Text style={styles.logoBrand}>Umbrella</Text>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>
            Login your <Text style={{ color: '#7518AA' }}>Account</Text>
          </Text>

          <Text style={styles.label}>Enter Mobile Number</Text>

          {/* Input */}
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.countryPickerContainer}
              onPress={() => setShowModal(true)}
            >
              <Image
                source={{ uri: `https://flagcdn.com/w20/${selectedCountry.code}.png` }}
                style={styles.flagIcon}
              />
              <Icons name="keyboard-arrow-down" size={25} color="#333" style={styles.arrowIcon} />
            </TouchableOpacity>

            <TextInput
              style={styles.mobileInput}
              placeholder="Enter mobile number"
              placeholderTextColor="#999"
              value={mobileNumber}
              onChangeText={(text) => setMobileNumber(text.replace(/\s+/g, ''))}
              keyboardType="numeric"
              maxLength={10}
            />
          </View>
        </View>

        {/* Send OTP Button */}
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity style={styles.otpButton} onPress={handleSendOTP}>
            <Text style={styles.otpButtonText}>Send OTP</Text>
          </TouchableOpacity>
        </View>

        {/* Modal Country Picker */}
        <Modal visible={showModal} animationType="slide">
          <SafeAreaView style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Country</Text>
            <FlatList
              data={countries}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderCountryItem}
            />
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 40,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
     fontFamily:Fonts.family.regular
  },
  label: {
    fontSize: 20,
    color: '#333',
    marginBottom: 15,
    fontWeight: '600',
     fontFamily:Fonts.family.regular
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    paddingHorizontal: 10,
    minHeight: 65,
  },
  countryPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    marginRight: 10,
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
    paddingHorizontal: 5,
  },
  flagIcon: {
  width: 38,
  height: 34,
  marginRight: 5,
  borderRadius: 14,
  overflow: 'hidden',
},
  arrowIcon: {
    color: 'grey',
  },
  mobileInput: {
    flex: 1,
    fontSize: 18,
    color: '#333',
    paddingVertical: 10,
  },
  bottomButtonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'transparent',
  },
  otpButton: {
    backgroundColor: '#7518AA',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  otpButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
     fontFamily:Fonts.family.regular
  },
  modalContainer: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
     fontFamily:Fonts.family.regular
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
 modalFlag: {
  width: 30,
  height: 30,
  marginRight: 15,
  borderRadius: 15,
  overflow: 'hidden',
},
  countryText: {
    fontSize: 16,
     fontFamily:Fonts.family.regular
  },
  closeButton: {
    backgroundColor: '#7c3aed',
    padding: 15,
    marginVertical: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
     fontFamily:Fonts.family.regular
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoRow1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  logoImage: {
    width: 70,
    height: 70,
    marginRight: 8,
  },
  logoBrand: {
    fontSize: 30,
    color:  Colors.statusBar,
    fontWeight: '700',
   fontFamily:Fonts.family.regular
  },
});

export default LoginScreen;
