import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TouchableOpacity,
  ScrollView,SafeAreaView
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import logo from '../../Assets/logos.png';
import LinearGradient from 'react-native-linear-gradient';

const EmergencyHomeScreen = ({ navigation }) => {
 

  const services = [
    { 
      id: 1, 
      name: 'Accident/Trauma', 
      Image: require('../../Assets/Trauma.png'),
      route: 'EmergencyHospitalScreen',
      params: { serviceType: 'Accident/Trauma' }
    },
    { 
      id: 2, 
      name: 'Stroke', 
      Image: require('../../Assets/Stroke.png'),
      route: 'EmergencyHospitalScreen',
      params: { serviceType: 'Stroke' }
    },
    { 
      id: 3, 
      name: 'Burns', 
      Image: require('../../Assets/Burns.png'),
      route: 'EmergencyHospitalScreen',
      params: { serviceType: 'Burns' }
    },
    { 
      id: 4, 
      name: 'Cardiac', 
      Image: require('../../Assets/heat.png'),
      route: 'EmergencyHospitalScreen',
      params: { serviceType: 'Cardiac' }
    },
    { 
      id: 5, 
      name: 'Bites/Poisoning', 
      Image: require('../../Assets/bits.png'),
      route: 'EmergencyHospitalScreen',
      params: { serviceType: 'Bites/Poisoning' }
    },
    { 
      id: 6, 
      name: '24/7 Pharmacy', 
      Image: require('../../Assets/24.png'),
      route: 'EmergencyHospitalScreen',
      params: { serviceType: '24/7 Pharmacy' }
    },
    { 
      id: 7, 
      name: 'Maternity', 
      Image: require('../../Assets/Maternity.png'),
      route: 'EmergencyHospitalScreen',
      params: { serviceType: 'Maternity' }
    },
  ];

  const ServiceCard = ({ service }) => (
  <View style={{ alignItems: 'center', margin: 10}}>
  <TouchableOpacity onPress={() => navigation.navigate(service.route, service.params)}>
    <Image style={styles.serviceIcon} source={service.Image} />
  </TouchableOpacity>
  <Text style={styles.serviceName}>{service.name}</Text>
</View>

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
            <TouchableOpacity
              style={[styles.notificationButton, { right: hp('2%') }]}
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
          <View
            style={{
              flexDirection: 'row',
              padding: 5,
              top: 10,
              alignItems: 'center',
              
            }}
          >
            <FontAwesome6 name="angle-left" size={18} color="black" />
            <Text style={styles.type}>Emergency list</Text>
          </View>
          <View style={styles.servicesGrid}>
            {services.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </View>
        </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  statusBarBackground: {
    height: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: 'rgba(117, 24, 170, 1)',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  topBackground: {
    paddingTop: hp('2%'),
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
  restOfScreen: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: wp('4%'),
    paddingTop: hp('2%'),
  },
  type: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    left: 10,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingTop:30
  },
  serviceCard: {
    width: wp('28%'),
    height: hp('15%'),
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 15,
    justifyContent: 'space-evenly',
    alignItems: 'space-evenly',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
 serviceIcon: {
  width: 80,
  height: 80,
  resizeMode: 'contain',
  marginBottom: 5,
},

serviceName: {
  fontSize: 14,
  color: '#000',
  textAlign: 'center',
},

});

export default EmergencyHomeScreen;