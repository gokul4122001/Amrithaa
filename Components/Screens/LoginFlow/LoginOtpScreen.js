import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const OTPVerificationScreen = ({ route, navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(120);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const inputRefs = useRef([]);
  const mobileNumber = route?.params?.mobileNumber || '9345665442';

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          setIsResendEnabled(true);
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (value, index) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 4) {
      Alert.alert('Invalid OTP', 'Please enter a 4-digit OTP');
      return;
    }

    navigation.navigate('Login8');
    Alert.alert('Success', `OTP ${enteredOtp} verified successfully!`);
  };

  const handleResend = () => {
    if (!isResendEnabled) return;
    setTimer(120);
    setIsResendEnabled(false);
    setOtp(['', '', '', '']);
    inputRefs.current[0]?.focus();
    Alert.alert('OTP Resent', `New OTP has been sent to ${mobileNumber}`);
  };

  const handleChangeMobile = () => {
    navigation?.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f5ff" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 20}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }} // Extra bottom space
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo Section */}
          <View style={styles.logoRow1}>
            <View style={styles.logoRow}>
              <Image
                source={require('../../Assets/logos.png')}
                style={styles.logoImage}
              />
            </View>
            <View>
              <Text style={styles.logoBrand}>Health</Text>
              <Text style={styles.logoBrand}>Umbrella</Text>
            </View>
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            <View style={styles.content}>
              <Text style={styles.title}>OTP Sent to {mobileNumber}</Text>

              <TouchableOpacity onPress={handleChangeMobile}>
                <Text style={styles.changeMobileText}>Change Mobile number</Text>
              </TouchableOpacity>

              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    style={[
                      styles.otpInput,
                      digit ? styles.otpInputFilled : styles.otpInputEmpty,
                    ]}
                    value={digit}
                    onChangeText={(value) => handleOtpChange(value, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    keyboardType="numeric"
                    maxLength={1}
                    textAlign="center"
                  />
                ))}
              </View>

              <Text style={styles.timerText}>{formatTime(timer)}</Text>

              <View style={styles.resendContainer}>
                <Text style={styles.resendQuestion}>Didn't receive a code? </Text>
                <TouchableOpacity onPress={handleResend} disabled={!isResendEnabled}>
                  <Text
                    style={[
                      styles.resendLink,
                      isResendEnabled ? styles.resendEnabled : styles.resendDisabled,
                    ]}
                  >
                    Resend
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Submit Button Fixed Bottom with spacing */}
        <View style={styles.submitContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f5ff',
  },
  logoRow1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  logoImage: {
    width: 70,
    height: 70,
    marginRight: 8,
  },
  logoBrand: {
    fontSize: 30,
    color: '#7518AA',
    fontWeight: '700',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  content: {
    alignItems: 'center',
    marginTop: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  changeMobileText: {
    fontSize: 20,
    color: '#333',
    textDecorationLine: 'underline',
    marginBottom: 40,
    top: 10,
    fontWeight: '700',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 15,
  },
  otpInput: {
    width: 70,
    height: 70,
    borderRadius: 8,
    borderWidth: 2,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  otpInputEmpty: {
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    color: '#333',
  },
  otpInputFilled: {
    borderColor: '#7c3aed',
    backgroundColor: '#7c3aed',
    color: 'white',
  },
  timerText: {
    fontSize: 20,
    color: '#ff4444',
    fontWeight: '600',
    marginBottom: 20,
    top: 20,
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 60,
    marginTop: 20,
  },
  resendQuestion: {
    fontSize: 17,
    color: '#666',
  },
  resendLink: {
    fontSize: 14,
    fontWeight: '600',
  },
  resendEnabled: {
    color: '#ff4444',
  },
  resendDisabled: {
    color: '#ccc',
  },
  submitContainer: {
    padding: 10,
    paddingBottom: 20, 
    backgroundColor: '#f8f5ff',
  },
  submitButton: {
    backgroundColor: '#7518AA',
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#7c3aed',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OTPVerificationScreen;
