import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import logo from '../../Assets/logos.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const ProfileFormScreen = ({ navigation }) => {
  const [profileData, setProfileData] = useState({
    name: '',
    dateOfBirth: '',
    emailId: '',
    mobileNumber: '',
    age: '',
    gender: 'Select Gender',
    profileImage: null,
  });

  const [familyMembers, setFamilyMembers] = useState([
    {
      id: 1,
      name: '',
      dateOfBirth: '',
      emailId: '',
      mobileNumber: '',
      age: '',
      gender: 'Select Gender',
    },
  ]);

  const [includeFamilyMembers, setIncludeFamilyMembers] = useState(false);

  const updateProfileData = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateFamilyMember = (index, field, value) => {
    const updatedMembers = [...familyMembers];
    updatedMembers[index][field] = value;
    setFamilyMembers(updatedMembers);
  };

  const addFamilyMember = () => {
    setFamilyMembers(prev => [
      ...prev,
      {
        id: Date.now(),
        name: '',
        dateOfBirth: '',
        emailId: '',
        mobileNumber: '',
        age: '',
        gender: 'Select Gender',
      },
    ]);
  };

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel || response.error) {
        return;
      }
      if (response.assets && response.assets[0]) {
        updateProfileData('profileImage', response.assets[0].uri);
      }
    });
  };

  const showGenderPicker = (isProfile = true, memberIndex = 0) => {
    Alert.alert(
      'Select Gender',
      '',
      [
        {
          text: 'Male',
          onPress: () => {
            if (isProfile) {
              updateProfileData('gender', 'Male');
            } else {
              updateFamilyMember(memberIndex, 'gender', 'Male');
            }
          },
        },
        {
          text: 'Female',
          onPress: () => {
            if (isProfile) {
              updateProfileData('gender', 'Female');
            } else {
              updateFamilyMember(memberIndex, 'gender', 'Female');
            }
          },
        },
        {
          text: 'Other',
          onPress: () => {
            if (isProfile) {
              updateProfileData('gender', 'Other');
            } else {
              updateFamilyMember(memberIndex, 'gender', 'Other');
            }
          },
        },
        {text: 'Cancel', style: 'cancel'},
      ],
    );
  };

const handleSave = () => {
  console.log('Profile Data:', profileData);
  console.log('Family Members:', familyMembers);

  Alert.alert('Success', 'Profile saved successfully!', [
    {
      text: 'OK',
      onPress: () => navigation.navigate('ProfileTwo'), // 👉 change to your target screen
    },
  ]);
};


  const renderFormField = (
    label,
    value,
    onChangeText,
    placeholder,
    isDropdown = false,
    onPress = null,
  ) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {isDropdown ? (
        <TouchableOpacity style={styles.dropdownContainer} onPress={onPress}>
          <Text
            style={[
              styles.dropdownText,
              value === 'Select Gender' && styles.placeholderText,
            ]}>
            {value}
          </Text>
          <Icon name="keyboard-arrow-down" size={24} color="#9CA3AF" />
        </TouchableOpacity>
      ) : (
        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
        />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
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
      {/* Header */}
      <View style={styles.headered}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
       
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.section}>
          {renderFormField(
            'Name',
            profileData.name,
            text => updateProfileData('name', text),
            'Enter Your Name',
          )}

          {renderFormField(
            'Date of Birth',
            profileData.dateOfBirth,
            text => updateProfileData('dateOfBirth', text),
            'Select Date of Birth',
          )}

          {renderFormField(
            'E-mail ID',
            profileData.emailId,
            text => updateProfileData('emailId', text),
            'Enter mail id',
          )}

          {renderFormField(
            'Mobile Number',
            profileData.mobileNumber,
            text => updateProfileData('mobileNumber', text),
            'Enter mobile number',
          )}

          <View style={styles.rowContainer}>
            <View style={styles.halfField}>
              {renderFormField(
                'Age',
                profileData.age,
                text => updateProfileData('age', text),
                'Enter your Age',
              )}
            </View>
            <View style={styles.halfField}>
              {renderFormField(
                'Gender',
                profileData.gender,
                null,
                '',
                true,
                () => showGenderPicker(true),
              )}
            </View>
          </View>

          {/* Upload Profile Image */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Upload Profile Image</Text>
            <TouchableOpacity style={styles.uploadContainer} onPress={selectImage}>
              {profileData.profileImage ? (
                <Image
                  source={{uri: profileData.profileImage}}
                  style={styles.uploadedImage}
                />
              ) : (
                <>
                  <Icon name="cloud-upload" size={40} color="#7518AA" />
                  <Text style={styles.uploadText}>Upload image</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Family Members Toggle */}
          <TouchableOpacity
            style={styles.toggleContainer}
            onPress={() => setIncludeFamilyMembers(!includeFamilyMembers)}>
            <Icon
              name={includeFamilyMembers ? 'check-box' : 'check-box-outline-blank'}
              size={24}
              color="#4CAF50"
            />
            <Text style={styles.toggleText}>
              Would you like to include your family members details?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Family Members Section */}
        {includeFamilyMembers && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Family Members Details</Text>

            {familyMembers.map((member, index) => (
              <View key={member.id} style={styles.familyMemberContainer}>
                {renderFormField(
                  'Name',
                  member.name,
                  text => updateFamilyMember(index, 'name', text),
                  'Enter Your Name',
                )}

                {renderFormField(
                  'Date of Birth',
                  member.dateOfBirth,
                  text => updateFamilyMember(index, 'dateOfBirth', text),
                  'Select Date of Birth',
                )}

                {renderFormField(
                  'E-mail ID',
                  member.emailId,
                  text => updateFamilyMember(index, 'emailId', text),
                  'Enter mail id',
                )}

                {renderFormField(
                  'Mobile Number',
                  member.mobileNumber,
                  text => updateFamilyMember(index, 'mobileNumber', text),
                  'Enter mobile number',
                )}

                <View style={styles.rowContainer}>
                  <View style={styles.halfField}>
                    {renderFormField(
                      'Age',
                      member.age,
                      text => updateFamilyMember(index, 'age', text),
                      'Enter your Age',
                    )}
                  </View>
                  <View style={styles.halfField}>
                    {renderFormField(
                      'Gender',
                      member.gender,
                      null,
                      '',
                      true,
                      () => showGenderPicker(false, index),
                    )}
                  </View>
                </View>
              </View>
            ))}

            {/* Add More Person Button */}
            <TouchableOpacity style={styles.addButton} onPress={addFamilyMember}>
              <Icon name="add" size={20} color="#8B5CF6" />
              <Text style={styles.addButtonText}>Add one more Person</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>



      </ScrollView>
    </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  headered: {
 
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:10,
  marginLeft:-10
  
    
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
  },
  refreshButton: {
    padding: 8,
    marginRight: 8,
  },
  closeButton: {
    padding: 8,
  },
 
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  dropdownText: {
    fontSize: 16,
    color: '#1F2937',
  },
  placeholderText: {
    color: '#9CA3AF',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfField: {
    width: '48%',
  },
  uploadContainer: {
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9FAFB',
  },
  uploadedImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  uploadText: {
    marginTop: 8,
    fontSize: 14,
    color: '#6B7280',
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    marginTop: 8,
  },
  toggleText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#166534',
    flex: 1,
  },
  familyMemberContainer: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#8B5CF6',
    borderRadius: 8,
    backgroundColor: '#FAFAFA',
  },
  addButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#7518AA',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginVertical: 24,
    marginHorizontal: 16,
  marginBottom:100
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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
  content:{
    marginTop:20
  }
});

export default ProfileFormScreen;