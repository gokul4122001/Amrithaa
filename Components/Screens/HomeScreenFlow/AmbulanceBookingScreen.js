import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import logo from '../../Assets/logos.png';

const AmbulanceBookingScreen = ({ navigation }) => {
  // Main booking states
  const [bookingFor, setBookingFor] = useState('Others');
  const [bookingType, setBookingType] = useState('Emergency');
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Schedule booking modal states
  const [isScheduleModalVisible, setScheduleModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [after3HoursChecked, setAfter3HoursChecked] = useState(false);
  const [isScheduleValid, setIsScheduleValid] = useState(true);

  // Emergency categories configuration
  const categories = [
    { id: 'heart', title: 'Heart attack', icon: '❤️', screen: 'SelectHospitalScreen' },
    { id: 'poisoning', title: 'Poisoning', icon: '🧪' },
    { id: 'accident', title: 'Accidents care', icon: '🚗' },
    { id: 'skin', title: 'Skin Diseases', icon: '👤' },
    { id: 'cpr', title: 'CPR', icon: '👥' },
    { id: 'stroke', title: 'Stroke', icon: '🧠' },
    { id: 'unknown', title: 'Unknown', icon: '❓' },
    { id: 'pediatric', title: 'Pediatric emergency medicine', icon: '👶' },
    { id: 'others', title: 'Others Emergencies', icon: '🏥' },
  ];

  // Event handlers
  const handleCategorySelect = (category) => {
    setSelectedCategory(category.id);
    if (category.screen) {
      navigation.navigate(category.screen);
    } else {
      console.log(`${category.title} pressed - Coming Soon!`);
    }
  };

  const handleNext = () => {
    const bookingDetails = {
      bookingFor,
      bookingType,
      selectedCategory,
      scheduledDate: bookingType === 'Schedule Booking' ? selectedDate.toISOString() : null,
      scheduledTime: bookingType === 'Schedule Booking' ? selectedTime.toISOString() : null,
      after3Hours: bookingType === 'Schedule Booking' ? after3HoursChecked : null,
    };

    console.log('Next pressed with:', bookingDetails);
    navigation.navigate('LiveTrakingScreen', { bookingDetails });
  };

  // Schedule modal functions
  const toggleScheduleModal = () => {
    setScheduleModalVisible(!isScheduleModalVisible);
    if (!isScheduleModalVisible) {
      resetScheduleModal();
    }
  };

  const resetScheduleModal = () => {
    setSelectedDate(new Date());
    setSelectedTime(new Date());
    setAfter3HoursChecked(false);
    setIsScheduleValid(true);
  };

  const getMinimumTimeForToday = () => {
    const now = new Date();
    return new Date(now.getTime() + 3 * 60 * 60 * 1000);
  };

  const getMinimumDate = () => new Date();

  // Date picker handlers
  const onDateChange = (event, pickedDate) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (event.type === 'set' && pickedDate) {
      setSelectedDate(pickedDate);
      validateScheduleTime(pickedDate, selectedTime);
    }
  };

  const onTimeChange = (event, pickedTime) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }

    if (event.type === 'set' && pickedTime) {
      setSelectedTime(pickedTime);
      validateScheduleTime(selectedDate, pickedTime);
    }
  };

  const validateScheduleTime = (date, time) => {
    const now = new Date();
    const threeHoursFromNow = new Date(now.getTime() + 3 * 60 * 60 * 1000);
    
    const selectedDateTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes(),
      time.getSeconds()
    );

    const isValid = selectedDateTime.getTime() >= threeHoursFromNow.getTime();
    setAfter3HoursChecked(isValid);
    setIsScheduleValid(isValid);
  };

  const handleScheduleSubmit = () => {
    if (!isScheduleValid) {
      Alert.alert('Invalid Time', 'Please select a date and time at least 3 hours from now.');
      return;
    }

    console.log('Schedule Submitted:', {
      date: selectedDate.toLocaleDateString('en-US', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
      }),
      time: selectedTime.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      after3Hours: after3HoursChecked,
    });

    setBookingType('Schedule Booking');
    toggleScheduleModal();
  };

  // Validation effect
  useEffect(() => {
    validateScheduleTime(selectedDate, selectedTime);
  }, [selectedDate, selectedTime]);

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
            <Text style={styles.userName}>Janmani Kumar</Text>
          </View>
          <TouchableOpacity style={[styles.notificationButton, { right: hp('2%') }]}>
            <Icon name="notifications-on" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.notificationButton, { backgroundColor: 'red' }]}>
            <MaterialCommunityIcons name="alarm-light-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          {/* Main Question */}
          <Text style={styles.question}>Which ambulance variant do you choose?</Text>

          {/* Booking For Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ambulance Booking For</Text>
            <View style={styles.radioGroup}>
              {['Yourself', 'Others'].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[styles.radioOption, bookingFor === option && styles.radioOptionSelected]}
                  onPress={() => setBookingFor(option)}
                >
                  <View style={[styles.radio, bookingFor === option && styles.radioSelected]}>
                    {bookingFor === option && <View style={styles.radioInner} />}
                  </View>
                  <Text style={styles.radioText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Booking Type Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select the Option</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity
                style={[styles.radioOption, bookingType === 'Emergency' && styles.radioOptionSelected]}
                onPress={() => setBookingType('Emergency')}
              >
                <View style={[styles.radio, bookingType === 'Emergency' && styles.radioSelected]}>
                  {bookingType === 'Emergency' && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioText}>Emergency</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.radioOption, bookingType === 'Schedule Booking' && styles.radioOptionSelected]}
                onPress={() => {
                  setBookingType('Schedule Booking');
                  toggleScheduleModal();
                }}
              >
                <View style={[styles.radio, bookingType === 'Schedule Booking' && styles.radioSelected]}>
                  {bookingType === 'Schedule Booking' && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioText}>Schedule Booking</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Hospital Options */}
          <View style={styles.section}>
            <View style={styles.hospitalOption}>
              <View style={styles.hospitalIndicator} />
              <Text style={styles.hospitalText}>West Mambalam, Chennai-1: 33</Text>
            </View>
            <View style={styles.hospitalOption}>
              <View style={[styles.hospitalIndicator, { backgroundColor: '#ff4444' }]} />
              <Text style={styles.hospitalText}>Apollo Hospital, Thousand Lights, Chennai</Text>
            </View>
          </View>

          {/* Emergency Categories */}
          <View style={styles.section}>
            <Text style={styles.categoryTitle}>Don't know the issue? Select a category</Text>
            <View style={styles.categoriesGrid}>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryCard,
                    selectedCategory === category.id && styles.categoryCardSelected,
                  ]}
                  onPress={() => handleCategorySelect(category)}
                >
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text style={styles.categoryText}>{category.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Next Button */}
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Schedule Booking Modal */}
        <Modal
          isVisible={isScheduleModalVisible}
          onBackdropPress={toggleScheduleModal}
          onSwipeComplete={toggleScheduleModal}
          swipeDirection={['down']}
          style={styles.bottomModal}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Schedule Booking</Text>
              <TouchableOpacity onPress={toggleScheduleModal}>
                <Icon name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalSubtitle}>Pick the date and time for your ambulance</Text>

            {/* Date Picker */}
            <TouchableOpacity 
              onPress={() => setShowDatePicker(true)} 
              style={styles.datePickerInput}
            >
              <Text style={styles.datePickerText}>
                {selectedDate.toLocaleDateString('en-GB')}
              </Text>
              <Icon name="calendar-today" size={24} color="#8B5CF6" />
            </TouchableOpacity>

            {/* Time Picker */}
            <TouchableOpacity 
              onPress={() => setShowTimePicker(true)} 
              style={styles.timePickerInput}
            >
              <Text style={styles.datePickerText}>
                {selectedTime.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit', 
                  hour12: true 
                })}
              </Text>
              <Icon name="schedule" size={24} color="#8B5CF6" />
            </TouchableOpacity>

            {/* Validation Message */}
            {!isScheduleValid && (
              <Text style={styles.validationMessage}>
                Booking must be at least 3 hours from now.
              </Text>
            )}

            {/* 3 Hours Checkbox */}
            <TouchableOpacity style={styles.checkboxContainer}>
              <View style={[styles.checkbox, after3HoursChecked && styles.checkboxChecked]}>
                {after3HoursChecked && <Icon name="check" size={16} color="#fff" />}
              </View>
              <Text style={styles.checkboxText}>
                After 3 hours only schedule booking available
              </Text>
            </TouchableOpacity>

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                styles.modalSubmitButton, 
                !isScheduleValid && styles.modalSubmitButtonDisabled
              ]}
              onPress={handleScheduleSubmit}
              disabled={!isScheduleValid}
            >
              <Text style={styles.modalSubmitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* Date/Time Pickers */}
        {showDatePicker && (
          <DateTimePicker
            testID="datePicker"
            value={selectedDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
            minimumDate={getMinimumDate()}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            testID="timePicker"
            value={selectedTime}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onTimeChange}
          />
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
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
    marginBottom: hp('2%'),
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
    marginLeft: wp('2%'),
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginVertical: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  radioGroup: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 4,
  },
  radioOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  radioOptionSelected: {
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#8B5CF6',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8B5CF6',
  },
  radioText: {
    fontSize: 14,
    color: '#000',
  },
  hospitalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  hospitalIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    marginRight: 12,
  },
  hospitalText: {
    fontSize: 14,
    color: '#000',
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    padding: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryCardSelected: {
    borderColor: '#8B5CF6',
    backgroundColor: '#F3E8FF',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 11,
    textAlign: 'center',
    color: '#333',
    fontWeight: '500',
    lineHeight: 14,
  },
  nextButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 16,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  datePickerInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#f8f8f8',
  },
  timePickerInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#f8f8f8',
  },
  datePickerText: {
    fontSize: 16,
    color: '#333',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  checkboxText: {
    fontSize: 14,
    color: '#333',
    flexShrink: 1,
  },
  modalSubmitButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  modalSubmitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalSubmitButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  validationMessage: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default AmbulanceBookingScreen;