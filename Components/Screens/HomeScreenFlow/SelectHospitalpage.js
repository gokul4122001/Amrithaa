import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import logo from '../../Assets/logos.png';
import Fonts from '../../Fonts/Fonts';
import Colors from '../../Colors/Colors';

const SelectHospitalScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHospitals, setSelectedHospitals] = useState([]);

  const suggestedHospitals = ['Apollo', 'SIMS Hospital', 'KRS'];

  const handleHospitalSelect = (hospitalName) => {
    if (!selectedHospitals.includes(hospitalName)) {
      setSelectedHospitals([...selectedHospitals, hospitalName]);
    }
  };

  const handleRemoveHospital = (hospitalName) => {
    setSelectedHospitals(selectedHospitals.filter((h) => h !== hospitalName));
  };

  const handleSubmit = () => {
    console.log('Selected Hospitals:', selectedHospitals);
    navigation.navigate('LiveTrakingScreen');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
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
              <Icon name="notifications-on" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.notificationButton, { backgroundColor: 'red' }]}>
              <MaterialCommunityIcons name="alarm-light-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Title */}
            <View style={styles.titleContainer}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.title}>Select Hospital</Text>
            </View>

            <Text style={styles.subtitle}>You can also choose hospitals on your own</Text>

            {/* Search Bar */}
            <View style={styles.searchBarContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search your hospital"
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#999"
              />
              <Icon name="arrow-drop-down" size={24} color="#000" />
            </View>

            {/* Suggested Hospitals */}
            <View style={styles.suggestedHospitalsContainer}>
              {[...suggestedHospitals, 'Apollo'].map((hospital, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.hospitalTag}
                  onPress={() => handleHospitalSelect(hospital)}
                >
                  <Text style={styles.hospitalTagText}>+ {hospital}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Selected Hospitals */}
            {selectedHospitals.length > 0 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.selectedHospitalsScroll}
              >
                {selectedHospitals.map((hospital, index) => (
                  <View key={index} style={styles.selectedHospitalBadge}>
                    <Text style={styles.selectedHospitalText}>{hospital}</Text>
                    <TouchableOpacity onPress={() => handleRemoveHospital(hospital)}>
                      <Icon name="close" size={16} color="#fff" style={styles.removeIcon} />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            )}
          </ScrollView>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </LinearGradient>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FF' },
  topBackground: {
    flex: 1,
    paddingTop: hp('4%'),
    paddingHorizontal: wp('5%'),
    position: 'relative',
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

  contentContainer: {
    paddingBottom: 180, // extra space to avoid overlap
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },

  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },

  suggestedHospitalsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  hospitalTag: {
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 10,
    marginBottom: 10,
  },
  hospitalTagText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },

  selectedHospitalsScroll: {
    marginBottom: 20,
  },
  selectedHospitalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7518AA',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  selectedHospitalText: {
    color: '#fff',
    marginRight: 5,
  },

  submitButton: {
    backgroundColor: '#7518AA',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SelectHospitalScreen;
