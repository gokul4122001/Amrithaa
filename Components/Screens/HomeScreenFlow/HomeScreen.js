import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({ navigation }) => {
  const services = [
    { id: 1, name: 'Ambulance', icon: '🚑', screen: 'AmbulanceBookingScreen' },
    { id: 2, name: 'Home care Nursing', icon: '👩‍⚕️', screen: null },
    { id: 3, name: 'Physiotherapy', icon: '🏃‍♂️', screen: null },
    { id: 4, name: 'Lab', icon: '🧪', screen: null },
    { id: 5, name: 'Tractor & Machinery Service', icon: '🚜', screen: null },
    { id: 6, name: 'Listing', icon: '📋', screen: null },
    { id: 7, name: 'Hospital', icon: '🏥', screen: null },
    { id: 8, name: 'Clinic', icon: '🏥', screen: null },
    { id: 9, name: 'Blood Bank', icon: '🩸', screen: null },
    { id: 10, name: 'Pharmacy', icon: '💊', screen: null },
    { id: 11, name: 'Medical Equipment', icon: '🩺', screen: null },
  ];

  const transactions = [
    { id: 1, service: 'Pharmacy', amount: 150, type: 'debit', icon: '💊' },
    { id: 2, service: 'Physiotherapy', amount: 1500, type: 'debit', icon: '🏃‍♂️' },
    { id: 3, service: 'Home care Nursing', amount: 550, type: 'debit', icon: '👩‍⚕️' },
    { id: 4, service: 'Pharmacy', amount: 150, type: 'debit', icon: '💊' },
  ];

  const handleServicePress = (service) => {
    if (service.screen) {
      navigation.navigate(service.screen);
    } else {
      console.log(`${service.name} pressed - Coming Soon!`);
      // You can show an alert or toast here
    }
  };

  const ServiceCard = ({ service }) => (
    <TouchableOpacity 
      style={styles.serviceCard}
      onPress={() => handleServicePress(service)}
    >
      <View style={styles.serviceIconContainer}>
        <Text style={styles.serviceIcon}>{service.icon}</Text>
      </View>
      <Text style={styles.serviceName}>{service.name}</Text>
    </TouchableOpacity>
  );

  const TransactionItem = ({ transaction }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <Text style={styles.transactionIcon}>{transaction.icon}</Text>
        <Text style={styles.transactionService}>{transaction.service}</Text>
      </View>
      <Text style={styles.transactionAmount}>₹ {transaction.amount}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#6C63FF" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greeting}>Hi, Welcome</Text>
          <Text style={styles.userName}>Janmani Kumar</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="notifications" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
          <Text style={styles.searchPlaceholder}>Search for your service</Text>
        </View>

        {/* Book Your Services Section */}
        <Text style={styles.sectionTitle}>Book Your Services</Text>
        
        <View style={styles.servicesGrid}>
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </View>

        {/* Upcoming Schedule */}
        <View style={styles.scheduleContainer}>
          <Text style={styles.scheduleTitle}>Upcoming Schedule</Text>
          <View style={styles.doctorCard}>
            <View style={styles.doctorInfo}>
              <View style={styles.doctorAvatar}>
                <Text style={styles.doctorInitial}>D</Text>
              </View>
              <View style={styles.doctorDetails}>
                <Text style={styles.doctorName}>Dr. Dhiresh Kumar</Text>
                <Text style={styles.doctorSpecialty}>Physiotherapist</Text>
              </View>
            </View>
            <View style={styles.callButtons}>
              <TouchableOpacity style={styles.callButton}>
                <Icon name="phone" size={20} color="#6C63FF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.callButton}>
                <Icon name="videocam" size={20} color="#6C63FF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Transactions */}
        <View style={styles.transactionsContainer}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.transactionsTitle}>Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
  },
  userName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginTop: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchPlaceholder: {
    color: '#999',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  serviceCard: {
    width: '30%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  serviceIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceIcon: {
    fontSize: 24,
  },
  serviceName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  scheduleContainer: {
    marginBottom: 30,
  },
  scheduleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  doctorCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  doctorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  doctorInitial: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  doctorDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  callButtons: {
    flexDirection: 'row',
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  transactionsContainer: {
    marginBottom: 30,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAll: {
    fontSize: 14,
    color: '#6C63FF',
    fontWeight: '500',
  },
  transactionItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  transactionService: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default HomeScreen;