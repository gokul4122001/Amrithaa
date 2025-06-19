import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
  Modal,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = ({ navigation }) => {
  const [isEmergencyModalVisible, setIsEmergencyModalVisible] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState({
    name: '',
    contactNumber: '',
  });

  const menuItems = [
    {
      id: 1,
      title: 'My Profile',
      icon: 'person',
      isActive: true,
    },
    {
      id: 2,
      title: 'Change Password',
      icon: 'lock',
      isActive: false,
    },
    {
      id: 3,
      title: 'Emergency Contact',
      icon: 'phone',
      isActive: false,
    },
    {
      id: 4,
      title: 'My Reports',
      icon: 'description',
      isActive: false,
    },
    {
      id: 5,
      title: 'Terms and Conditions',
      icon: 'article',
      isActive: false,
    },
    {
      id: 6,
      title: 'Logout',
      icon: 'logout',
      isActive: false,
    },
  ];

  const handleMenuPress = (item) => {
    console.log(`Pressed: ${item.title}`);
    
    switch (item.title) {
      case 'My Profile':
        navigation.navigate('Profileone');
        break;
      case 'Change Password':
        navigation.navigate('ChangePassword');
        break;
      case 'Emergency Contact':
        setIsEmergencyModalVisible(true);
        break;
      case 'My Reports':
        navigation.navigate('MyReport');
        break;
      case 'Terms and Conditions':
        navigation.navigate('Terms');
        break;
      case 'Logout':
        // You might want to add logout logic here
        break;
      default:
        break;
    }
  };

 const handleSaveEmergencyContact = () => {
  console.log('Emergency Contact Saved:', emergencyContact);
  setIsEmergencyModalVisible(false);

  setTimeout(() => {
    navigation.navigate('EmergencyContactScreen'); // or any other target screen
  }, 300); // delay helps avoid UI glitches
};


  const handleCancelEmergencyContact = () => {
    setIsEmergencyModalVisible(false);
    // Reset form if needed
    setEmergencyContact({ name: '', contactNumber: '' });
  };

  const renderBottomTab = (iconName, label, isActive = false) => (
    <TouchableOpacity style={styles.tabItem}>
      <Icon 
        name={iconName} 
        size={24} 
        color={isActive ? '#8B5CF6' : '#9CA3AF'} 
      />
      {label && (
        <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8B5CF6" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <View style={styles.content}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format',
            }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>Jeswanth Kumar</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.menuItem, item.isActive && styles.activeMenuItem]}
              onPress={() => handleMenuPress(item)}
            >
              <View style={styles.menuItemContent}>
                <Icon
                  name={item.icon}
                  size={20}
                  color={item.isActive ? '#8B5CF6' : '#6B7280'}
                  style={styles.menuIcon}
                />
                <Text style={[styles.menuText, item.isActive && styles.activeMenuText]}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {renderBottomTab('home', null)}
        {renderBottomTab('more-horiz', null)}
        {renderBottomTab('apps', null)}
        {renderBottomTab('folder', null)}
        {renderBottomTab('person', 'Profile', true)}
      </View>

      {/* Emergency Contact Modal */}
      <Modal
        visible={isEmergencyModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsEmergencyModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Emergency Contact</Text>
              <TouchableOpacity
                onPress={handleCancelEmergencyContact}
                style={styles.closeButton}
              >
                <Icon name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitle}>
              Add your emergency contact so an enterprise call will be made in case of an emergency
            </Text>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Name *</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter Name"
                  placeholderTextColor="#9CA3AF"
                  value={emergencyContact.name}
                  onChangeText={(text) => 
                    setEmergencyContact(prev => ({ ...prev, name: text }))
                  }
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Contact Number *</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter contact number"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="phone-pad"
                  value={emergencyContact.contactNumber}
                  onChangeText={(text) => 
                    setEmergencyContact(prev => ({ ...prev, contactNumber: text }))
                  }
                />
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancelEmergencyContact}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveEmergencyContact}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  activeMenuItem: {
    backgroundColor: '#F3F4F6',
    borderLeftWidth: 4,
    borderLeftColor: '#8B5CF6',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 16,
  },
  menuText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  activeMenuText: {
    color: '#8B5CF6',
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  tabItem: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tabLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
    fontWeight: '500',
  },
  activeTabLabel: {
    color: '#8B5CF6',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  closeButton: {
    padding: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
    lineHeight: 20,
  },
  formContainer: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});

export default ProfileScreen;