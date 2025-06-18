// AmbulanceBookingScreen.js
import React, { useState, useEffect } from 'react'; // Import useEffect
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';

const AmbulanceBookingScreen = ({ navigation }) => {
  const [bookingFor, setBookingFor] = useState('Others');
  const [bookingType, setBookingType] = useState('Emergency');
  const [selectedCategory, setSelectedCategory] = useState(null);

  // State for the Schedule Booking Modal
  const [isScheduleModalVisible, setScheduleModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [after3HoursChecked, setAfter3HoursChecked] = useState(false);
  const [isScheduleValid, setIsScheduleValid] = useState(true); // New state for validation

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

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.id);

    if (category.screen) {
      navigation.navigate(category.screen);
    } else {
      console.log(`${category.title} pressed - Coming Soon!`);
    }
  };

  const handleNext = () => {
    console.log('Next pressed with:', {
      bookingFor,
      bookingType,
      selectedCategory,
      scheduledDate: bookingType === 'Schedule Booking' ? selectedDate.toLocaleDateString() : null,
      scheduledTime: bookingType === 'Schedule Booking' ? selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null,
      after3Hours: bookingType === 'Schedule Booking' ? after3HoursChecked : null,
    });

      navigation.navigate('LiveTrakingScreen', {
      bookingDetails: {
        bookingFor,
        bookingType,
        selectedCategory: selectedCategory, // Pass the ID or the full category object if needed
        scheduledDate: bookingType === 'Schedule Booking' ? selectedDate.toISOString() : null, // ISO string for robust date passing
        scheduledTime: bookingType === 'Schedule Booking' ? selectedTime.toISOString() : null,
        after3Hours: bookingType === 'Schedule Booking' ? after3HoursChecked : null,
      }
    });
    // Add logic to proceed to the next screen or confirm booking
  };

  // --- Schedule Booking Modal Logic ---
  const toggleScheduleModal = () => {
    setScheduleModalVisible(!isScheduleModalVisible);
    // Reset date/time to current when opening modal if it's new
    if (!isScheduleModalVisible) {
      setSelectedDate(new Date());
      setSelectedTime(new Date());
      setAfter3HoursChecked(false); // Reset checkbox on modal open
      setIsScheduleValid(true); // Reset validation state
    }
  };

  // Function to calculate the minimum allowed time for today's date (+3 hours)
  const getMinimumTimeForToday = () => {
    const now = new Date();
    const minAllowedTime = new Date(now.getTime() + 3 * 60 * 60 * 1000); // Current time + 3 hours
    return minAllowedTime;
  };

  const onDateChange = (event, pickedDate) => {
    // For Android, close picker immediately. For iOS, it's typically embedded or controlled differently.
    setShowDatePicker(Platform.OS === 'ios');
    if (pickedDate) {
      setSelectedDate(pickedDate);

      // If the selected date is today, ensure the time is also at least 3 hours from now
      const now = new Date();
      if (
        pickedDate.getDate() === now.getDate() &&
        pickedDate.getMonth() === now.getMonth() &&
        pickedDate.getFullYear() === now.getFullYear()
      ) {
        const minTimeForToday = getMinimumTimeForToday();
        if (selectedTime < minTimeForToday) {
          setSelectedTime(minTimeForToday); // Adjust time if it's less than 3 hours from now
        }
      }
    }
  };

  const onTimeChange = (event, pickedTime) => {
    // For Android, close picker immediately.
    setShowTimePicker(Platform.OS === 'ios');
    if (pickedTime) {
      setSelectedTime(pickedTime);
    }
  };

  // Effect to handle the "After 3 hours" checkbox and general validation
  useEffect(() => {
    const now = new Date();
    const threeHoursFromNow = new Date(now.getTime() + 3 * 60 * 60 * 1000);

    let currentDateTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      selectedTime.getHours(),
      selectedTime.getMinutes(),
      selectedTime.getSeconds()
    );
    
    // Check if the selected date and time is at least 3 hours from now
    if (currentDateTime.getTime() < threeHoursFromNow.getTime()) {
      setAfter3HoursChecked(false);
      setIsScheduleValid(false); // Mark as invalid if less than 3 hours
    } else {
      setAfter3HoursChecked(true); // Automatically check if it's 3 hours or more
      setIsScheduleValid(true); // Mark as valid
    }
  }, [selectedDate, selectedTime]);


  const handleScheduleSubmit = () => {
    if (!isScheduleValid) {
      alert('Please select a date and time at least 3 hours from now.');
      return;
    }

    console.log('Schedule Submitted:', {
      date: selectedDate.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      time: selectedTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      after3Hours: after3HoursChecked,
    });
    setBookingType('Schedule Booking'); // Ensure this is set
    toggleScheduleModal(); // Close the modal
  };

  // --- End Schedule Booking Modal Logic ---

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.profileSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>JK</Text>
            </View>
            <View>
              <Text style={styles.greeting}>Hi, Welcome</Text>
              <Text style={styles.userName}>Jesvanth Kumar</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="notifications" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="close" size={24} color="#fff" style={{ backgroundColor: '#ff4444', borderRadius: 12 }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Question */}
        <Text style={styles.question}>Which ambulance variant do you choose?</Text>

        {/* Ambulance Booking For */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ambulance Booking For</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={[styles.radioOption, bookingFor === 'Yourself' && styles.radioOptionSelected]}
              onPress={() => setBookingFor('Yourself')}
            >
              <View style={[styles.radio, bookingFor === 'Yourself' && styles.radioSelected]}>
                {bookingFor === 'Yourself' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioText}>Yourself</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.radioOption, bookingFor === 'Others' && styles.radioOptionSelected]}
              onPress={() => setBookingFor('Others')}
            >
              <View style={[styles.radio, bookingFor === 'Others' && styles.radioSelected]}>
                {bookingFor === 'Others' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioText}>Others</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Select the Option */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select the Option</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={[styles.radioOption, bookingType === 'Emergency' && styles.radioOptionSelected]}
              onPress={() => {
                setBookingType('Emergency');
                setScheduleModalVisible(false); // Close modal if open
              }}
            >
              <View style={[styles.radio, bookingType === 'Emergency' && styles.radioSelected]}>
                {bookingType === 'Emergency' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioText}>Emergency</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.radioOption, bookingType === 'Schedule Booking' && styles.radioOptionSelected]}
              onPress={() => {
                setBookingType('Schedule Booking'); // Set booking type first
                toggleScheduleModal(); // Then open the modal
              }}
            >
              <View style={[styles.radio, bookingType === 'Schedule Booking' && styles.radioSelected]}>
                {bookingType === 'Schedule Booking' && <View style={styles.radioInner} />}
              </View>
              <Text style={styles.radioText}>Schedule Booking</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Hospital Options (These typically would be dynamic based on location/search) */}
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

        {/* Categories */}
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
      </ScrollView>

      {/* Next Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>

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
            <Text style={styles.modalTitle}>Note</Text>
            <TouchableOpacity onPress={toggleScheduleModal}>
              <Icon name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <Text style={styles.modalSubtitle}>Pick the date and time for your ambulance</Text>

          {/* Select Date Input */}
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerInput}>
            <Text style={styles.datePickerText}>
              {selectedDate.toLocaleDateString('en-GB')} {/* Formatted for DD/MM/YYYY */}
            </Text>
            <Icon name="calendar-today" size={24} color="#8B5CF6" />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              testID="datePicker"
              value={selectedDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onDateChange}
              minimumDate={new Date()} // Can't select past dates
            />
          )}

          {/* Select Time Input */}
          <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.timePickerInput}>
            <Text style={styles.datePickerText}>
              {selectedTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
            </Text>
            <Icon name="schedule" size={24} color="#8B5CF6" />
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              testID="timePicker"
              value={selectedTime}
              mode="time"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onTimeChange}
              // Set minimum time only if the selected date is today
              minimumDate={
                selectedDate.getDate() === new Date().getDate() &&
                selectedDate.getMonth() === new Date().getMonth() &&
                selectedDate.getFullYear() === new Date().getFullYear()
                  ? getMinimumTimeForToday()
                  : undefined // No minimum time for future dates
              }
            />
          )}

          {/* Validation Message */}
          {!isScheduleValid && (
            <Text style={styles.validationMessage}>
              Booking must be at least 3 hours from now.
            </Text>
          )}

          {/* Checkbox - now visually driven by isScheduleValid */}
          <TouchableOpacity
            style={styles.checkboxContainer}
            // Logic for checking/unchecking is handled by useEffect and validation
            // We keep it as a TouchableOpacity for consistent styling, but it's not directly toggling after3HoursChecked state
            // setAfter3HoursChecked is now handled by useEffect
            onPress={() => {
              // Optionally, if you want manual toggle, you'd add:
              // setAfter3HoursChecked(!after3HoursChecked);
              // However, current logic forces it based on date/time.
              // A user might want to manually uncheck it even if valid,
              // or it might be disabled if less than 3 hours.
              // For now, it reflects the calculated state.
            }}
          >
            <View style={[styles.checkbox, after3HoursChecked && styles.checkboxChecked]}>
              {after3HoursChecked && <Icon name="check" size={16} color="#fff" />}
            </View>
            <Text style={styles.checkboxText}>After 3 hours only schedule Booking available</Text>
          </TouchableOpacity>


          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.modalSubmitButton, !isScheduleValid && styles.modalSubmitButtonDisabled]}
            onPress={handleScheduleSubmit}
            disabled={!isScheduleValid} // Disable if validation fails
          >
            <Text style={styles.modalSubmitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    marginBottom: 8,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  greeting: {
    fontSize: 12,
    color: '#666',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 12,
    padding: 4,
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
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  nextButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  // --- Modal Styles ---
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
    backgroundColor: '#cccccc', // Dimmed color for disabled state
  },
  validationMessage: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
  }
});

export default AmbulanceBookingScreen;