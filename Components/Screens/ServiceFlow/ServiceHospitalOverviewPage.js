import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  TextInput,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React from 'react';
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

const AccidentScreen = ({ navigation }) => {
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
      name: 'Dr. Kamakshi Memorial Hospital',
      timing: 'Open 24 hours',
      address: 'No 3/1, 1 street, West Mambalam, Chennai- 33',
      Image: require('../../Assets/Hospital.png'),
      route: 'AccidentScreen',
      rating: '4.3',
    },
    {
      id: 4,
      name: 'Dr. Kamakshi Memorial Hospital',
      timing: 'Open 24 hours',
      address: 'No 3/1, 1 street, West Mambalam, Chennai- 33',
      Image: require('../../Assets/Hospital.png'),
      route: 'AccidentScreen',
      rating: '4.3',
    },
    {
      id: 5,
      name: 'Dr. Kamakshi Memorial Hospital',
      timing: 'Open 24 hours',
      address: 'No 3/1, 1 street, West Mambalam, Chennai- 33',
      Image: require('../../Assets/Hospital.png'),
      route: 'AccidentScreen',
      rating: '4.3',
    },
  ];

  const HospitalCard = ({ hospital }) => (
    <TouchableOpacity
      style={styles.serviceCard}
      onPress={() => navigation.navigate(hospital.route)}
    >
      <View style={{ flexDirection: 'row' }}>
        <Image style={styles.serviceIcon} source={hospital.Image} />
        <View style={[styles.serviceNameContainer, { marginLeft: 10, flex: 1 }]}>
          <Text style={styles.serviceName}>
            {hospital.name}
            {hospital.name.length <= 10 && '  ' + hospital.timing}
          </Text>
          {hospital.name.length > 10 && (
            <Text style={styles.timing}>({hospital.timing})</Text>
          )}
          <Text style={styles.address}>
            <Entypo name="location-pin" size={20} color="red" /> {hospital.address}
          </Text>
          <View style={{ flexDirection: 'row', top: 10, justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
              <AntDesign name="star" size={16} color="gold" />
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#333', left: 6 }}>
                {hospital.rating}
              </Text>
            </View>
            <Text style={styles.viewdetails}>View Details</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8B5CF6" />
      <LinearGradient
        colors={['#ffffff', '#C3DFFF']}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.topBackground}
      >
        <View style={styles.header}>
          <Image source={logo} style={styles.logo} />
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>Hi, Welcome</Text>
            <Text style={styles.userName}>Janmani Kumar</Text>
          </View>
          <TouchableOpacity style={[styles.notificationButton, { right: hp('2%') }]}>
            <Icon name="notifications-on" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.notificationButton, { backgroundColor: 'red' }]}>
            <MaterialCommunityIcons name="alarm-light-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', padding: 5, top: 10, alignItems: 'center' }}>
          <FontAwesome6 name="angle-left" size={16} color="black" />
          <Text style={styles.type}>Hospital</Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#999" />
            <TextInput
              style={styles.searchInput}
              placeholder="By doctor, hospital, city, pincode..."
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <View style={{ flexDirection: 'row', margin: 10 }}>
          <Entypo name="location-pin" size={20} color="red" />
          <Text style={{ fontSize: 16, fontWeight: '500', color: '#535a5b' }}>
            Your Location:{' '}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: '#000000',
              textDecorationLine: 'underline',
            }}
          >
            West Mambalam, Chennai - 33
          </Text>
        </View>
    

      <FlatList
        data={hospitals}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <HospitalCard hospital={item} />}
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: wp('4%') }}
      
      />
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
    paddingTop: hp('2%'),
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
  type: {
    fontSize: hp('2.1%'),
    fontWeight: 'bold',
    color: 'black',
    left: 10,
  },
  serviceCard: {
    width: '100%',
    height: hp('20%'),
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    padding: 12,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  serviceIcon: {
    width: wp('35%'),
    height: hp('17%'),
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
    marginTop: 2,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 13,
    color: '#555',
    marginTop: 4,
  },
  viewdetails: {
    width: wp('20%'),
    height: hp('2.3%'),
    borderRadius: 5,
    textAlign: 'center',
    backgroundColor: 'rgb(96, 15, 143)',
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
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
});
