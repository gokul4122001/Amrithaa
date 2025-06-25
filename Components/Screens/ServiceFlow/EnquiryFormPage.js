    import React, { useState } from 'react';
    import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Alert,Image,
    ScrollView
    } from 'react-native';
import logo from '../../Assets/logos.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
    const HospitalForm = ({ navigation }) => {
    const [formData, setFormData] = useState({
        name: '',
        mobileNumber: '',
        emailId: '',
        location: '',
        reason: '',
    });

    const handleInputChange = (field, value) => {
        setFormData(prevState => ({
        ...prevState,
        [field]: value,
        }));
    };

    const handleSubmit = () => {
    if (!formData.name || !formData.mobileNumber || !formData.emailId) {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
    }

    // Navigate to booking success screen
    navigation.navigate('BookingSuccessScreen');
    };


    return (
        <SafeAreaView style={styles.container}>
                    <StatusBar barStyle="light-content" backgroundColor="#8B5CF6" />
            
                  <LinearGradient
                    colors={['#ffffff', '#C3DFFF']}
                    start={{ x: 0.1, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.topBackground}
                  >
        {/* Header */}
      <View style={styles.header}>
                  <Image source={logo} style={styles.logo} />
                  <View style={styles.greetingContainer}>
                    <Text style={styles.greeting}>Hi, Welcome</Text>
                    <Text style={styles.userName1}>Janmani Kumar</Text>
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
                <Text style={styles.sectionTitle}>Hospital</Text>
              </View>

        {/* Form */}
        <ScrollView>
        <View style={styles.formContainer}>
            {/* Name Field */}
            <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your Name"
                value={formData.name}
                onChangeText={(text) => handleInputChange('name', text)}
            />
            </View>

            {/* Mobile Number Field */}
            <View style={styles.inputGroup}>
            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter mobile number"
                value={formData.mobileNumber}
                onChangeText={(text) => handleInputChange('mobileNumber', text)}
                keyboardType="phone-pad"
            />
            </View>

            {/* Email ID Field */}
            <View style={styles.inputGroup}>
            <Text style={styles.label}>Email ID</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Email Id"
                value={formData.emailId}
                onChangeText={(text) => handleInputChange('emailId', text)}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            </View>

            {/* Location Field */}
            <View style={styles.inputGroup}>
            <Text style={styles.label}>Location</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter location"
                value={formData.location}
                onChangeText={(text) => handleInputChange('location', text)}
            />
            </View>

            {/* Reason Field */}
            <View style={styles.inputGroup}>
            <Text style={styles.label}>Enter your reason</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter your reason"
                value={formData.reason}
                onChangeText={(text) => handleInputChange('reason', text)}
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
            />
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
   </LinearGradient>
     </SafeAreaView>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
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
  userName1: {
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
    welcomeContainer: {
        backgroundColor: '#8B5CF6',
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    welcomeText: {
        color: '#FFFFFF',
        fontSize: 14,
        opacity: 0.9,
    },
    userName: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 2,
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 24,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 20,
        fontWeight: '700',
        color: '#374151',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 17,
        fontSize: 16,
        backgroundColor: '#FFFFFF',
        color: '#374151',
        width:'105%',
    },
    textArea: {
        height: 100,
        paddingTop: 12,
    },
    submitButton: {
        backgroundColor: '#7518AA',
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
     sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop:20
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
marginLeft:'35%',
color:'#7416B2',top:-5
  },
    });

    export default HospitalForm;