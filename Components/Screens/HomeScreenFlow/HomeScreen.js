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
import Iconed from 'react-native-vector-icons/MaterialCommunityIcons';
import  { useState } from 'react';
import Colors from '../../Colors/Colors';
import Fonts from '../../Fonts/Fonts';
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
  { service: 'Pharmacy', date: 'April 2, 2025', amount: '- ₹150', icon: require('../../Assets/tr1.png'), bgColor: '#DFFFEF' },
  { service: 'Physiotherapy', date: 'April 5, 2025', amount: '- ₹1,550', icon: require('../../Assets/tr2.png'), bgColor: '#D6FFFC' },
  { service: 'Home care Nursing', date: 'April 20, 2025', amount: '- ₹550', icon: require('../../Assets/tr3.png'), bgColor: '#E8E6FF' },
  { service: 'Pharmacy', date: 'April 2, 2025', amount: '- ₹150', icon: require('../../Assets/tr1.png'), bgColor: '#DFFFEF' },
];


export default function App({ navigation }) {
 const [showAll, setShowAll] = useState(false);

  const displayedTransactions = showAll ? transactions : transactions.slice(0, 2);


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.statusBar} />
           <LinearGradient
                       colors={['#ffffff', '#C3DFFF']}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0, y: 0 }}
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

<ScrollView
  showsVerticalScrollIndicator={false}
  showsHorizontalScrollIndicator={false}
>
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


     
      <Text style={styles.sectionTitle}>Upcoming Schedule</Text>
      <View style={styles.scheduleCard}>
        <View style={styles.scheduleHeader}>
          <Image source={require('../../Assets/profile.png')} style={styles.scheduleAvatar} />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.doctorName}>Dr. Dhanush Kumar</Text>
            <Text style={styles.specialty}>Physiotherapy</Text>
          </View>
          <Image source={require('../../Assets/calling.png')} style={styles.phoneIcon} />
        </View>

         <View style={styles.scheduleContainer}>
      <View style={styles.scheduleDetailsRow}>
        <View style={styles.dateBox}>
          <Iconed name="calendar-month-outline" size={20} color="#555" />
          <Text style={styles.scheduleText}>Monday, 17 March</Text>
        </View>

        <View style={styles.timeBox}>
          <Iconed name="clock-outline" size={20} color="#555" />
          <Text style={styles.scheduleText}>09:00 to 10:30</Text>
        </View>
      </View>
    </View>
      </View>

       <View style={styles.containers}>
      <View style={styles.headers}>
        <Text style={styles.sectionTitle}>Transactions</Text>
        <TouchableOpacity onPress={() => setShowAll(!showAll)}>
          <Text style={styles.seeAll}>{showAll ? 'See less' : 'See all'}</Text>
        </TouchableOpacity>
      </View>

      {displayedTransactions.map((item, index) => (
        <View key={index} style={styles.transactionCard}>
          <View style={[styles.iconContainer, { backgroundColor: item.bgColor }]}>
            <Image source={item.icon} style={styles.transactionIcon} />
          </View>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.transactionTitle}>{item.service}</Text>
            <Text style={styles.transactionDate}>{item.date}</Text>
          </View>
          <Text style={styles.transactionAmount}>{item.amount}</Text>
        </View>
      ))}
    </View>
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
     fontFamily:Fonts.family.regular,
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
    paddingBottom:10
  },
  scheduleAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  doctorName: {
    color: '#fff',
    fontWeight: 'bold',
     fontFamily:Fonts.family.regular
  },
  specialty: {
    color: '#ddd',
     fontFamily:Fonts.family.regular
  },
  phoneIcon: {
    width: 34,
    height: 34,
  },
  scheduleContainer: {
   paddingTop:20,
    margin: 10,
    borderTopWidth:2,
    borderStyle:'dashed',
    borderColor:'#ffff'
  },
  scheduleDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffff',
    backgroundColor: '#ffff',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    flex: 1,
  },
  timeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffff',
    backgroundColor: '#ffff',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
     marginRight: 8,
    flex: 1,
  },
  scheduleText: {
    marginLeft: 6,
    fontSize: 16,
    color: '#333',
     fontFamily:Fonts.family.regular
  },
  
    topBackground: {
      paddingTop: hp('5%'),
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
     fontFamily:Fonts.family.regular
  },
  userName: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    color: 'black',
     fontFamily:Fonts.family.regular
  },
  notificationButton: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
    containers: {
    padding: 10,
  paddingBottom:50
  },
  headers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom:15,
     fontFamily:Fonts.family.regular

  },
  seeAll: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: '500',
     fontFamily:Fonts.family.regular
  },
 transactionCard: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 12,
  backgroundColor: '#fff',
  borderRadius: 12,
  marginBottom: 10,
  // iOS shadow
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  // Android shadow
  elevation: 5,
},

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
     fontFamily:Fonts.family.regular
  },
  transactionDate: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
     fontFamily:Fonts.family.regular
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
     fontFamily:Fonts.family.regular
  },
});
