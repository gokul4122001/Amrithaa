import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  Dimensions,
  StatusBar as RNStatusBar,
  Platform,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

const HealthUmbrellaScreen = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#ffffff', '#C3DFFF']}
      start={{ x: 0, y: 0.3 }}
      end={{ x: 0, y: 0 }}
      style={styles.gradientContainer}
    >
      <StatusBar backgroundColor="#7518AA" barStyle="light-content" />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container}>
          {/* Skip Button */}
          <View style={styles.skipContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Login6')}>
              <Text style={styles.skipText}>Skip ⏭</Text>
            </TouchableOpacity>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoRow1}>
              <View style={styles.logoRow}>
                <Image
                  source={require('../../Assets/logos.png')}
                  style={styles.logoImage}
                />
              </View>
              <View>
                <Text style={styles.logoTitle}>Health</Text>
                <Text style={styles.logoTitle}>Umbrella</Text>
              </View>
            </View>

            {/* Title and Subtitle */}
            <View style={styles.centeredContent}>
              <Text style={styles.title}>Book Your Physiotherapist</Text>
              <Text style={styles.subtitle}>
               Home Visit / Clinic Appointment
              </Text>
            </View>
          </View>
        </ScrollView>

       
        <View style={styles.bottomImageContainer}>
          <Image
            source={require('../../Assets/clini.png')}
            style={styles.bottomImage}
          />
          
        </View>
        
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HealthUmbrellaScreen;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  skipContainer: {
    alignItems: 'flex-end',
    padding: 16,
  },
  skipText: {
    color: '#555',
    fontWeight: 'bold',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
  },
  logoImage: {
    width: 70,
    height: 70,
    marginRight: 8,
  },
  logoTitle: {
    fontSize: 30,
    color: '#7518AA',
    fontWeight: '700',
    fontFamily: 'Satoshi',
  },
  centeredContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#666',
    textAlign: 'center',
  },
  logoRow1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    top: 10,
  },
  bottomImageContainer: {
    width: width,
   
  },
  bottomImage: {
    width: 350,
    height: 500,
    resizeMode: 'contain',
  },
});
