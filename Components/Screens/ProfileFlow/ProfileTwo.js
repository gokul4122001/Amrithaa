import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const ProfileDisplayScreen = () => {
  const profileData = {
    name: 'Jeswanth Kumar',
    dateOfBirth: '03/06/2002',
    email: 'jeswanthkumar@gmail.com',
    mobile: '9345565448',
    age: '22',
    gender: 'Male',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format',
  };

  const familyMembers = [
    {
      id: 1,
      name: 'Seetha',
      dateOfBirth: '03/06/2002',
      email: 'jeswanthkumar@gmail.com',
      mobile: '9345565448',
      age: '22',
      gender: 'Male',
    },
  ];

  const handleEdit = () => {
    console.log('Edit profile pressed');
    // Add navigation to edit screen
  };

  const handleAddPerson = () => {
    console.log('Add person pressed');
    // Add navigation to add family member screen
  };

  const handleBack = () => {
    console.log('Back pressed');
    // Add navigation back
  };

  const renderInfoRow = (label, value) => (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );

  const renderProfileCard = (data, isMainProfile = false) => (
    <View style={styles.profileCard}>
      {isMainProfile && (
        <View style={styles.profileHeader}>
          <Image source={{uri: data.profileImage}} style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{data.name}</Text>
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Icon name="edit" size={16} color="#FFFFFF" />
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.infoContainer}>
        {!isMainProfile && (
          <View style={styles.familyMemberHeader}>
            <Text style={styles.familyMemberName}>{data.name}</Text>
          </View>
        )}
        
        {renderInfoRow('Date of Birth', data.dateOfBirth)}
        {renderInfoRow('Email Id', data.email)}
        {renderInfoRow('Mobile Number', data.mobile)}
        
        <View style={styles.rowInfo}>
          <View style={styles.halfInfo}>
            {renderInfoRow('Age', data.age)}
          </View>
          <View style={styles.halfInfo}>
            {renderInfoRow('Gender', data.gender)}
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8B5CF6" />
      
      {/* Header with Gradient */}
      <LinearGradient
        colors={['#8B5CF6', '#A78BFA']}
        style={styles.headerGradient}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Icon name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          
          <View style={styles.headerContent}>
            <View style={styles.welcomeSection}>
              <View style={styles.welcomeIcon}>
                <Icon name="person" size={20} color="#8B5CF6" />
              </View>
              <View>
                <Text style={styles.welcomeText}>Hi, Welcome</Text>
                <Text style={styles.welcomeName}>Jeswanth Kumar</Text>
              </View>
            </View>
            
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="refresh" size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Icon name="star" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>My Profile</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Main Profile */}
        {renderProfileCard(profileData, true)}

        {/* Family Details Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Family Details</Text>
          <TouchableOpacity style={styles.addPersonButton} onPress={handleAddPerson}>
            <Icon name="add" size={16} color="#FFFFFF" />
            <Text style={styles.addPersonText}>Add Person</Text>
          </TouchableOpacity>
        </View>

        {/* Family Members */}
        {familyMembers.map((member) => (
          <View key={member.id}>
            {renderProfileCard(member, false)}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  headerGradient: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  backButton: {
    padding: 8,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 8,
  },
  welcomeSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  welcomeText: {
    fontSize: 12,
    color: '#E0E7FF',
    fontWeight: '400',
  },
  welcomeName: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  titleSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  pageTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  infoContainer: {
    padding: 16,
  },
  familyMemberHeader: {
    marginBottom: 12,
  },
  familyMemberName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  infoRow: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '400',
  },
  rowInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInfo: {
    width: '48%',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  addPersonButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addPersonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
});

export default ProfileDisplayScreen;