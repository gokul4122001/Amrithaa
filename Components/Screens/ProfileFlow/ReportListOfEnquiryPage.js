import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

const HospitalListingScreen = ({ navigation }) => {
  const hospitalData = [
    {
      id: 1,
      name: 'Bavaa Medicals',
      timing: 'Open 10:00 am to 10:00 pm',
      address: 'No.29, 1 street, West Mambalam, Chennai - 33',
      image: require('../../Assets/Hospital.png'), // Replace with your hospital image
      rating: '4.3',
      patientName: 'Sanjay Kumar. S',
      mobile: '9345664547',
      age: '22',
      gender: 'Male',
      date: '28/03/2023',
      time: '05:00 PM',
      reason: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    },
    {
      id: 2,
      name: 'Bavaa Medicals',
      timing: 'Open 10:00 am to 10:00 pm',
      address: 'No.29, 1 street, West Mambalam, Chennai - 33',
      image: require('../../Assets/Hospital.png'),
      rating: '4.3',
      patientName: 'Sanjay Kumar. S',
      mobile: '9345664547',
      age: '22',
      gender: 'Male',
      date: '28/03/2023',
      time: '05:00 PM',
      reason: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    },
    {
      id: 3,
      name: 'Bavaa Medicals',
      timing: 'Open 10:00 am to 10:00 pm',
      address: 'No.29, 1 street, West Mambalam, Chennai - 33',
      image: require('../../Assets/Hospital.png'),
      rating: '4.3',
      patientName: 'Sanjay Kumar. S',
      mobile: '9345664547',
      age: '22',
      gender: 'Male',
      date: '28/03/2023',
      time: '05:00 PM',
      reason: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    },
  ];

  const HospitalCard = ({ hospital }) => (
    <View style={styles.cardContainer}>
      <View style={styles.hospitalInfoSection}>
        <Image source={hospital.image} style={styles.hospitalImage} />
        <View style={styles.hospitalDetails}>
          <Text style={styles.hospitalName}>{hospital.name}</Text>
          <Text style={styles.hospitalTiming}>{hospital.timing}</Text>
          <View style={styles.addressContainer}>
            <Entypo name="location-pin" size={14} color="#FF6B6B" />
            <Text style={styles.address}>{hospital.address}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <AntDesign name="star" size={14} color="#FFD700" />
            <Text style={styles.rating}>{hospital.rating}</Text>
            <TouchableOpacity style={styles.viewDetailsButton}>
              <Text style={styles.viewDetailsText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.patientInfoSection}>
        <View style={styles.patientRow}>
          <Text style={styles.patientLabel}>Name:</Text>
          <Text style={styles.patientValue}>{hospital.patientName}</Text>
        </View>
        <View style={styles.patientRow}>
          <Text style={styles.patientLabel}>Mobile:</Text>
          <Text style={styles.patientValue}>{hospital.mobile}</Text>
        </View>
        <View style={styles.patientDetailsRow}>
          <View style={styles.patientDetail}>
            <Text style={styles.patientLabel}>Age:</Text>
            <Text style={styles.patientValue}>{hospital.age}</Text>
          </View>
          <View style={styles.patientDetail}>
            <Text style={styles.patientLabel}>Gender:</Text>
            <Text style={styles.patientValue}>{hospital.gender}</Text>
          </View>
        </View>
        <View style={styles.patientDetailsRow}>
          <View style={styles.patientDetail}>
            <Text style={styles.patientLabel}>Date:</Text>
            <Text style={styles.patientValue}>{hospital.date}</Text>
          </View>
          <View style={styles.patientDetail}>
            <Text style={styles.patientLabel}>Time:</Text>
            <Text style={styles.patientValue}>{hospital.time}</Text>
          </View>
        </View>
        <View style={styles.reasonContainer}>
          <Text style={styles.patientLabel}>Reason:</Text>
          <Text style={styles.reasonText}>{hospital.reason}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar 
        backgroundColor="#6A1B9A" 
        barStyle="light-content" 
        translucent={false}
      />
      
      {/* Header */}
      <LinearGradient
        colors={['#8E24AA', '#7B1FA2']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>J</Text>
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.welcomeText}>Hi, Welcome</Text>
              <Text style={styles.userName}>Jesvanth Kumar</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.notificationButton}>
              <Icon name="notifications" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.alarmButton}>
              <MaterialCommunityIcons name="alarm-light" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Title Section */}
      <View style={styles.titleSection}>
        <Text style={styles.titleText}>List of enquiry</Text>
        <Text style={styles.subtitleText}>Hospital</Text>
      </View>

      {/* Hospital List */}
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {hospitalData.map((hospital) => (
          <HospitalCard key={hospital.id} hospital={hospital} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8E24AA',
  },
  userInfo: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.9,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  alarmButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF5722',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSection: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  cardContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  hospitalInfoSection: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  hospitalImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  hospitalDetails: {
    flex: 1,
  },
  hospitalName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  hospitalTiming: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
    marginBottom: 4,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  address: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rating: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 4,
  },
  viewDetailsButton: {
    backgroundColor: '#8E24AA',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  viewDetailsText: {
    fontSize: 12,
    color: '#FFF',
    fontWeight: '500',
  },
  patientInfoSection: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 12,
  },
  patientRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  patientDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  patientDetail: {
    flexDirection: 'row',
    flex: 1,
  },
  patientLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginRight: 8,
  },
  patientValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  reasonContainer: {
    marginTop: 4,
  },
  reasonText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
    marginTop: 4,
  },
});

export default HospitalListingScreen;