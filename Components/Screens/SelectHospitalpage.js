import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Or any other icon library you prefer

const SelectHospitalScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHospitals, setSelectedHospitals] = useState([]);

  // Dummy data for suggested hospitals
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
    // Here you would typically navigate to the next screen or perform an API call
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View style={styles.avatarPlaceholder} />
          <View>
            <Text style={styles.greeting}>Hi, Welcome</Text>
            <Text style={styles.userName}>Jeswanth Kumar</Text>
          </View>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="notifications" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconButton, styles.alertIcon]}>
            <Icon name="notifications-active" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Back Button and Title */}
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={() => console.log('Go Back')}>
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
        />
        <Icon name="arrow-drop-down" size={24} color="#000" />
      </View>

      {/* Suggested Hospitals */}
      <View style={styles.suggestedHospitalsContainer}>
        {suggestedHospitals.map((hospital, index) => (
          <TouchableOpacity
            key={index}
            style={styles.hospitalTag}
            onPress={() => handleHospitalSelect(hospital)}>
            <Icon name="add" size={18} color="#000" />
            <Text style={styles.hospitalTagName}>{hospital}</Text>
          </TouchableOpacity>
        ))}
        {/* Added the extra Apollo button as per the image */}
        <TouchableOpacity
            style={styles.hospitalTag}
            onPress={() => handleHospitalSelect('Apollo')}>
            <Icon name="add" size={18} color="#000" />
            <Text style={styles.hospitalTagName}>Apollo</Text>
          </TouchableOpacity>
      </View>

      {/* Display Selected Hospitals (if needed, not explicitly shown in image but common pattern) */}
      {selectedHospitals.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selectedHospitalsScroll}>
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

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    padding: 20,
    paddingTop: 0, // Adjust to prevent extra space at top
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginHorizontal: -20, // To make it full width
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc', // Placeholder color
    marginRight: 10,
  },
  greeting: {
    fontSize: 14,
    color: '#666',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#eee',
    marginLeft: 10,
  },
  alertIcon: {
    backgroundColor: '#ff4c4c', // Red color for alert
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  suggestedHospitalsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  hospitalTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  hospitalTagName: {
    marginLeft: 5,
    fontSize: 14,
    color: '#333',
  },
  selectedHospitalsScroll: {
    marginBottom: 10,
  },
  selectedHospitalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200ee', // A distinct color for selected items
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  selectedHospitalText: {
    color: '#fff',
    marginRight: 5,
  },
  removeIcon: {
    // Styling for the close icon within selected badge
  },
  submitButton: {
    backgroundColor: '#6200ee', // A deep purple color
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SelectHospitalScreen;