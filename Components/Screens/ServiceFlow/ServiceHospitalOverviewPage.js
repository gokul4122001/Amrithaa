import React, { useState } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import logo from '../../Assets/logos.png'; 
import Colors from '../../Colors/Colors';


const AccidentScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const hospitals = [
    {
      id: 1,
      name: 'Dr. Kamakshi Memorial Hospital',
      timing: 'Open 24 hours',
      address: 'No 3/1, 1 street, West Mambalam, Chennai- 33',
      Image: require('../../Assets/Hospital.png'),
      route: 'ServiceHospitalDetailScreen',
      rating: '4.3',
    },
    {
      id: 2,
      name: 'Apollo Speciality Hospital',
      timing: 'Open 24 hours',
      address: 'Mount Road, Chennai',
      Image: require('../../Assets/Hospital.png'),
      route: 'StrokeScreen',
      rating: '4.3',
    },
    {
      id: 3,
      name: 'Kovai Medical Center',
      timing: 'Open 24 hours',
      address: 'Coimbatore',
      Image: require('../../Assets/Hospital.png'),
      route: 'AccidentScreen',
      rating: '4.3',
    },
  ];

  const filteredHospitals = hospitals.filter(hospital =>
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    hospital.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const HospitalCard = ({ hospital }) => (
<TouchableOpacity
  style={styles.serviceCard}
  onPress={() => navigation.navigate(hospital.route)}
>
  <View style={{ flexDirection: 'row' }}>
    <Image style={styles.serviceIcon} source={hospital.Image} />
    <View style={[styles.serviceNameContainer, { marginLeft: 10, flex: 1 }]}>
      <Text style={styles.serviceName}>
        {hospital.name.length > 20 ? hospital.name.substring(0, 20) + '...' : hospital.name}
      </Text>

      <Text style={styles.timing}>{hospital.timing}</Text>
      <Text style={styles.address}>
        <Entypo name="location-pin" size={20} color="red" />{' '}
        {hospital.address.length > 20
          ? hospital.address.substring(0, 20) + '...'
          : hospital.address}
      </Text>

      {/* Rating */}
      <View style={styles.ratingRow}>
        <AntDesign name="star" size={16} color="gold" />
        <Text style={styles.ratingText}>{hospital.rating}</Text>
      </View>

      {/* Action Icons */}
      <View style={styles.iconGroup}>
        <TouchableOpacity style={[styles.iconCircle, { backgroundColor: '#BDEDFF' }]}>
          <Entypo name="phone" size={16} color="#043446" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconCircle, { backgroundColor: '#FDDCCE' }]}>
          <Entypo name="globe" size={16} color="#AC4A15" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.iconCircle, { backgroundColor: '#FFE2E2' }]}>
          <Entypo name="location-pin" size={16} color="#FF0000" />
        </TouchableOpacity>
      </View>
    </View>
  </View>
</TouchableOpacity>


  );

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
            <Text style={styles.userName}>Janmani Kumar</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="notifications-on" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.notificationButton, { backgroundColor: 'red' }]}>
            <MaterialCommunityIcons name="alarm-light-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Page Title */}
        <View style={styles.pageTitle}>
          <FontAwesome6 name="angle-left" size={16} color="black" />
          <Text style={styles.type}>Hospital</Text>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#999" />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchInput}
              placeholder="By doctor, hospital, city, pincode..."
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Location */}
        <View style={styles.locationRow}>
          <Entypo name="location-pin" size={20} color="red" />
          <Text style={styles.locationLabel}>Your Location: </Text>
          <Text style={styles.locationText}>
            {'West Mambalam, Chennai - 33'.length > 20
              ? 'West Mambalam, Chennai...'
              : 'West Mambalam, Chennai - 33'}
          </Text>
        </View>

        {/* Scrollable Hospital Cards */}
   <ScrollView
  contentContainerStyle={styles.scrollCardsOnly}
  showsVerticalScrollIndicator={false}
  showsHorizontalScrollIndicator={false}
>
          {filteredHospitals.map((item, index) => (
            <HospitalCard key={index} hospital={item} />
          ))}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default AccidentScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBackground: {
    flex: 1,
    paddingTop: hp('4%'),
    paddingBottom: hp('2%'),
    paddingHorizontal: wp('4%'),
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
    marginLeft: 8,
  },
  pageTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  type: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: '#7416B2',
    marginLeft: 10,
    position:'absolute',
 left:'40%'
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  locationRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  locationLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#535a5b',
  },
  locationText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    textDecorationLine: 'underline',
  },
  scrollCardsOnly: {
    paddingBottom: 30,
    paddingTop: 10,
  },
  serviceCard: {
    width: wp('90%'),
    height: hp('25%'),
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    padding: 12,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    
  },
  serviceIcon: {
    width: wp('30%'),
    height: '120%',
    borderRadius: 8,
    
  },
  serviceNameContainer: {
    flexDirection: 'column',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flexWrap: 'wrap',
  },
  timing: {
    fontSize: 14,
    color: '#177C1B',
    marginTop: 4,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 13,
    color: '#555',
    marginTop: 6,
  },
  viewdetails: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: '#600F8F',
    color: 'white',
    fontSize: 12,
    borderRadius: 5,
    fontWeight: 'bold',
  },
  ratingRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 6,
},

ratingText: {
  fontSize: 14,
  color: '#000',
  marginLeft: 4,
},

iconGroup: {
  flexDirection: 'row',
  marginTop: 15,
  gap: 20, 
},

iconCircle: {
  width: 30,
  height: 30,
  borderRadius: 15,
  justifyContent: 'center',
  alignItems: 'center',
},

});
