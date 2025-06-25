import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,SafeAreaView,StatusBar
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import logo from '../../Assets/logos.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const services = [
  { title: 'Ambulance', image: require('../../Assets/HomeAmbulance.png') ,screen: 'AmbulanceBookingScreen'},
  { title: 'Home care Nursing', image: require('../../Assets/Homecarenursing.png') },
  { title: 'Physiotherapy', image: require('../../Assets/phisiotherapy.png') },
  { title: 'Lab', image: require('../../Assets/lap.png') },
  { title: 'Funeral & Mortuary Service', image: require('../../Assets/murchary.png') },
  { title: 'Emergency', image: require('../../Assets/emergency.png') },
];

const listings = [
  { title: 'Hospital', image: require('../../Assets/report1.png') },
  { title: 'Clinics', image: require('../../Assets/report2.png') },
  { title: 'Blood Bank', image: require('../../Assets/report3.png') },
  { title: 'Pharmacy', image: require('../../Assets/report4.png') },
  { title: 'Medical Equipment', image: require('../../Assets/report5.png') },
];

const transactions = [
  { service: 'Pharmacy', date: 'April 2, 2025', amount: '- ₹150' },
  { service: 'Physiotherapy', date: 'April 6, 2025', amount: '- ₹1,550' },
  { service: 'Home care Nursing', date: 'April 20, 2025', amount: '- ₹550' },
  { service: 'Pharmacy', date: 'April 2, 2025', amount: '- ₹150' },
];

export default function App({ navigation }) {
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

      {/* Search */}
     <View style={styles.searchContainer}>
  <MaterialCommunityIcons
    name="magnify"
    size={20}
    color="#888"
    style={styles.searchIcon}
  />
  <TextInput
    style={styles.searchBox}
    placeholder="Search for your service"
    placeholderTextColor="#888"
  />
</View>

<ScrollView>
      {/* Services */}
      <Text style={styles.sectionTitle}>Book Your Services</Text>
      <View style={styles.grid}>
      {services.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => {
            if (item.screen) {
              navigation.navigate(item.screen);
            }
          }}
        >
          <Image source={item.image} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{item.title}</Text>
        </TouchableOpacity>
      ))}
        {services.length % 3 === 2 && <View style={styles.card} />}
    </View>

      {/* Listings */}
      <Text style={styles.sectionTitle}>Listing</Text>
     <View style={styles.grid}>
  {listings.map((item, index) => (
    <View key={index} style={styles.card}>
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.title}</Text>
    </View>
  ))}

  {/* Add empty View if listings count is not a multiple of 3 */}
  {listings.length % 3 === 2 && <View style={styles.card} />}
</View>


      {/* Schedule */}
      <Text style={styles.sectionTitle}>Upcoming Schedule</Text>
      <View style={styles.scheduleCard}>
        <View style={styles.scheduleHeader}>
          <Image source={require('../../Assets/report2.png')} style={styles.scheduleAvatar} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.doctorName}>Dr. Dhanush Kumar</Text>
            <Text style={styles.specialty}>Physiotherapy</Text>
          </View>
          <Image source={require('../../Assets/report2.png')} style={styles.phoneIcon} />
        </View>
        <View style={styles.scheduleDetails}>
          <Text style={styles.scheduleDate}>Monday, 17 March</Text>
          <Text style={styles.scheduleTime}>09:00 to 10:30</Text>
        </View>
      </View>

      {/* Transactions */}
      <Text style={styles.sectionTitle}>Transactions</Text>
      {transactions.map((item, index) => (
        <View key={index} style={styles.transactionCard}>
          <Image source={require('../../Assets/report2.png')} style={styles.transactionIcon} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.transactionTitle}>{item.service}</Text>
            <Text style={styles.transactionDate}>{item.date}</Text>
          </View>
          <Text style={styles.transactionAmount}>{item.amount}</Text>
        </View>
      ))}

</ScrollView>
       </LinearGradient>
       </SafeAreaView>
  );
}

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: '#fff',
  },
 searchContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderRadius: 8,
  paddingHorizontal: 10,
  marginBottom: 20,
  height: 60,
  marginTop:20
},

searchIcon: {
  marginRight: 8,
},

searchBox: {
  flex: 1,
  fontSize: 14,
  color: '#000',
},
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '30%',
    marginBottom: 16,
    alignItems: 'center',
  },
  cardImage: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
  },
  cardTitle: {
    marginTop: 5,
    fontSize: 16,
    textAlign: 'center',
    fontFamily:'Roboto',
    fontWeight:'700',
    color:'#000000'
  },
  scheduleCard: {
    backgroundColor: '#6A1B9A',
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
  },
  scheduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  doctorName: {
    color: '#fff',
    fontWeight: 'bold',
  },
  specialty: {
    color: '#ddd',
  },
  phoneIcon: {
    width: 24,
    height: 24,
  },
  scheduleDetails: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
  },
  scheduleDate: {
    fontWeight: 'bold',
  },
  scheduleTime: {
    color: '#888',
  },
  transactionCard: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  transactionIcon: {
    width: 30,
    height: 30,
  },
  transactionTitle: {
    fontWeight: 'bold',
  },
  transactionDate: {
    color: '#666',
    fontSize: 12,
  },
  transactionAmount: {
    fontWeight: 'bold',
    color: '#D32F2F',
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
