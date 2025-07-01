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
  Image,TextInput
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
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0, y: 0 }}
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

    <ScrollView
  style={styles.content}
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{ paddingBottom: 120 }} // Prevent button from being hidden
>

          {/* Main Question */}
         <View style={styles.questionContainer}>
  <TouchableOpacity onPress={() => navigation.goBack()}>
    <Icon name="chevron-left" size={24} color="#000" />
  </TouchableOpacity>
  <Text style={styles.question}>Which ambulance variant do you choose?</Text>
</View>


          {/* Booking For Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ambulance Booking For</Text>
         <View style={styles.radioGroup}>
  {['Yourself', 'Others'].map((option) => {
    const isSelected = bookingFor === option;
    const isYourself = option === 'Yourself';
    const isOthers = option === 'Others';

    return (
      <TouchableOpacity
        key={option}
        style={[
          styles.radioOption,
          isYourself && styles.radioYourself,
          isOthers && styles.radioOthers,
          isSelected && styles.radioOptionSelected,
        ]}
        onPress={() => setBookingFor(option)}
      >
        <View style={[styles.radio, isSelected && styles.radioSelected]}>
          {isSelected && <View style={styles.radioInner} />}
        </View>
        <Text
          style={[
            styles.radioText,
            isYourself && styles.radioTextYourself,
            isOthers && styles.radioTextOthers,
          ]}
        >
          {option}
        </Text>
      </TouchableOpacity>
    );
  })}
</View>

          </View>

          {/* Booking Type Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select the Option</Text>
          <View style={styles.bookingTypeGroup}>
  <TouchableOpacity
    style={[
      styles.bookingTypeOption,
      styles.emergencyDesign,
      bookingType === 'Emergency' && styles.bookingTypeSelected
    ]}
    onPress={() => setBookingType('Emergency')}
  >
    <View style={[styles.radioCircle, bookingType === 'Emergency' && styles.radioSelected]}>
      {bookingType === 'Emergency' && <View style={styles.radioDot} />}
    </View>
    <Text style={[styles.bookingTypeText, styles.emergencyText]}>
      Emergency
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[
      styles.bookingTypeOption,
      styles.scheduleDesign,
      bookingType === 'Schedule Booking' && styles.bookingTypeSelected
    ]}
    onPress={() => {
      setBookingType('Schedule Booking');
      toggleScheduleModal();
    }}
  >
    <View style={[styles.radioCircle, bookingType === 'Schedule Booking' && styles.radioSelected]}>
      {bookingType === 'Schedule Booking' && <View style={styles.radioDot} />}
    </View>
    <Text style={[styles.bookingTypeText, styles.scheduleText]}>
      Schedule Booking
    </Text>
  </TouchableOpacity>
</View>

          </View>

       <View style={styles.locationCard}>
  <View style={styles.locationRow}>
    {/* Icon Column */}
    <View style={styles.iconColumn}>
      <View style={styles.circleGreen} />
      <View style={styles.verticalLine}>
        <Text style={styles.arrow}>↓</Text>
      </View>
      <View style={styles.circleRed} />
    </View>

    {/* Text Column */}
    <View style={styles.textColumn}>
      <TextInput
        placeholder="Enter pickup location"
        style={styles.locationInput}
        placeholderTextColor="#555"
      />
      <View style={styles.separator} />
      <TextInput
        placeholder="Enter destination location"
        style={styles.locationInput}
        placeholderTextColor="#555"
      />
    </View>
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
            <Text style={{color:'#ffff',fontSize:16}}>Next</Text>
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
   
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginVertical: 16,
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
 radioGroup: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: 5,
  marginVertical: 10,
},

radioOption: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 12,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#ccc',
  marginHorizontal: 5,
  flex: 1,
},

radioOptionSelected: {
  borderColor: '#E8E8E8',
  backgroundColor: '#ffff',
},

radio: {
  height: 20,
  width: 20,
  borderRadius: 10,
  borderWidth: 2,
  borderColor: '#aaa',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 10,
},

radioSelected: {
  borderColor: '#E8E8E8',
},

radioInner: {
  height: 10,
  width: 10,
  borderRadius: 5,
  backgroundColor: '#7518AA',
},

radioText: {
  fontSize: 16,
},

// Unique look for 'Yourself'
radioYourself: {
  backgroundColor: '#ffff',
},

radioTextYourself: {
  color: '#4a4a4a',
  fontWeight: 'bold',
},

// Unique look for 'Others'
radioOthers: {
  backgroundColor: '#ffff',
},

radioTextOthers: {
  color: '#4a4a4a',
  fontStyle: 'italic',
},
 bookingTypeGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginVertical: 10,
  },

  bookingTypeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    flex: 1,
    marginHorizontal: 5,
  },

  bookingTypeSelected: {
    borderColor: '#E8E8E8',
    backgroundColor: '#ffff',
  },

  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  radioSelected: {
    borderColor: '#7518AA',
  },

  radioDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#7518AA',
  },

  bookingTypeText: {
    fontSize: 16,
  },

  // Specific Emergency Design
  emergencyDesign: {
    backgroundColor: '#ffff',
    borderColor: '#E8E8E8',
  },

  emergencyText: {
    color: '#4a4a4a',
    fontWeight: 'bold',
  },

 
  scheduleDesign: {
    backgroundColor: '#ffff',
    borderColor: '#E8E8E8',
  },

  scheduleText: {
    color: '#4a4a4a',
    fontStyle: 'italic',
  },
   locationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    width: wp('90%'), // 90% of screen width
    height: hp('13%'), // Adjust as needed, e.g., 18% screen height
    alignSelf: 'center', // center horizontally
  },
  locationRow: {
    flexDirection: 'row',
  },
  iconColumn: {
    alignItems: 'center',
    marginRight: 10,
    paddingTop: 5,
  },
  circleGreen: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#00C851',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  verticalLine: {
    height: 40,
    borderLeftWidth: 1,
    borderStyle: 'dotted',
    borderColor: '#999',
    marginVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 10,
    color: '#999',
  },
  circleRed: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#ff4444',
    borderWidth: 1.5,
    borderColor: '#fff',
    
  },
  textColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  locationInput: {
    fontSize: 14,
    color: '#000',
    paddingVertical: 4,
    height: 40, // fixed height
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 6,
  },
  questionContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 16,
},
question: {
  fontSize: 18,
  fontWeight: 'bold',
  marginLeft: 8, // space between icon and text
  color: '#000',
},
nextButton: {
  backgroundColor: '#8B5CF6',
  borderRadius: 12,
  paddingVertical: 16,
  alignItems: 'center',
  alignSelf: 'center', // ✅ Center horizontally
  width: '90%', // ✅ Optional: set width
  marginVertical: 20,
},

});

export default AmbulanceBookingScreen;