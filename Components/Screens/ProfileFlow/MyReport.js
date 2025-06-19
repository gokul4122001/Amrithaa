import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const services = [
  {
    id: '1',
    name: 'Hospital',
    image: require('../../Assets/report1.png'),
  },
  {
    id: '2',
    name: 'Clinics',
    image: require('../../Assets/report2.png'),
  },
  {
    id: '3',
    name: 'Blood Bank',
    image: require('../../Assets/report3.png'),
  },
  {
    id: '4',
    name: 'Pharmacy',
    image: require('../../Assets/report4.png'),
  },
  {
    id: '5',
    name: 'Medical Equipment',
    image: require('../../Assets/report5.png'),
  },
];

const MyReportsScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate(item.name + 'Screen')}
    >
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Hi, Welcome</Text>
          <Text style={styles.username}>Jeswanth Kumar</Text>
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="notifications-outline" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="alert-circle" size={20} color="red" />
          </TouchableOpacity>
        </View>
      </View>

      {/* My Reports Title */}
      <View style={styles.sectionHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>My Reports</Text>
      </View>

      {/* Services */}
      <Text style={styles.serviceLabel}>Service</Text>
      <FlatList
        data={services}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.gridContainer}
      />
    </SafeAreaView>
  );
};

export default MyReportsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 14,
    color: '#333',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
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
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  serviceLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
    color: '#000',
  },
  gridContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
    padding: 12,
    flex: 1,
    minWidth: 100,
    maxWidth: '30%',
    elevation: 3,
  },
  cardImage: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});
