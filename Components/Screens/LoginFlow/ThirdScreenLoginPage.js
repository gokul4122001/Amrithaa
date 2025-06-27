import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';

const HealthUmbrellaScreen = () => {
  return (
    <>
      {/* Skip Button at Top-Right */}
      <TouchableOpacity style={styles.skipContainer}>
        <Text style={styles.skipText}>Skip ⏭</Text>
      </TouchableOpacity>

      <ScrollView style={styles.container}>
        {/* Header with Logo and Title */}
        <View style={styles.header}>
          {/* Logo Row */}
          <View style={styles.logoRow}>
            <Image
              source={require('../../Assets/logos.png')}
              style={styles.logoImage}
            />
            <Text style={styles.logoText}>Health Umbrella</Text>
          </View>

          {/* Title and Subtitle */}
          <View style={styles.centeredContent}>
            <Text style={styles.title}>Book Your Ambulance</Text>
            <Text style={styles.subtitle}>Emergency / Schedule Booking</Text>
          </View>
        </View>
      </ScrollView>

      {/* Image Floating at Bottom Center */}
    <View style={{position:'absolute',justifyContent:'center',alignItems:'center',bottom:110}}>
    <Image source={require('../../Assets/bookambulance.png')} style={{ width: 400, height: 400,resizeMode:'contain' }} />

</View>
    </>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  skipContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  skipText: {
    color: '#555',
    fontWeight: 'bold',
    fontSize: 16,
  },
  header: {
    paddingTop: 20,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  logoImage: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
  logoText: {
    fontSize: 18,
    color: '#8000ff',
    fontWeight: 'bold',
  },
  centeredContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#666',
    textAlign: 'center',
  },
 
});

export default HealthUmbrellaScreen;
