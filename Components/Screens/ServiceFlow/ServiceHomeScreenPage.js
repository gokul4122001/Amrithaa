// screens/MyReportsScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,StatusBar
} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
import logo from '../../Assets/logos.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
const MyReportsScreen = ({ navigation }) => {


const services = [
  {
    id: '1',
    name: 'Hospital',
    image: require('../../Assets/report1.png'),
    screen: 'ServiceHospitalScreen',
  },
  {
    id: '2',
    name: 'Clinics',
    image: require('../../Assets/report2.png'),
    screen: 'ClinicsScreen',
  },
  {
    id: '3',
    name: 'Blood Bank',
    image: require('../../Assets/report3.png'),
    screen: 'BloodBankScreen',
  },
  {
    id: '4',
    name: 'Pharmacy',
    image: require('../../Assets/report4.png'),
    screen: 'PharmacyScreen',
  },
  {
    id: '5',
    name: 'Medical Equipment',
    image: require('../../Assets/report5.png'),
    screen: 'MedicalEquipmentScreen',
  },
];



const renderItem = ({ item }) => (
  <TouchableOpacity
    onPress={() => {
      if (item.screen) {
        navigation.navigate(item.screen);
      }
    }}
    style={{ alignItems: 'center', margin: 10 }} 
  >
    <Image source={item.image} style={styles.cardImage} />
    <Text style={styles.cardText}>{item.name}</Text>
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

      <View style={styles.sectionHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons name="chevron-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Services</Text>
      </View>

      <Text style={styles.serviceLabel}>Best Listing Service</Text>
      <FlatList
        data={services}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.gridContainer}
      />
       </LinearGradient>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
 
  },
 
  iconRow: {
    flexDirection: 'row',
  },
  iconButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 8,
    marginLeft: 10,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop:20
  },
  sectionTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  serviceLabel: {
    fontSize: 25,
    fontWeight: '700',
    marginVertical: 10,
    color: '#000',
    marginHorizontal:13
  },
  gridContainer: {
    paddingBottom: 20,
  },
 
cardImage: {
  width: 110,
  height: 110,
  resizeMode: 'contain',
  marginBottom: 5,
},

cardText: {
  fontSize: 16,
  color: '#4a4a4a',
  textAlign: 'center',
  fontWeight:'600'
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

});

export default MyReportsScreen;
