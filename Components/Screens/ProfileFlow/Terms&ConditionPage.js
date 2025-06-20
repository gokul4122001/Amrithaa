import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import logo from '../../Assets/logos.png';

const TermsAndConditionsScreen = ({ navigation }) => {
  const termsContent = `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more or less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).

It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more or less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.`;

  return (
    <>
      <View style={styles.statusBarBackground} />
      <ScrollView style={styles.container}>
        <LinearGradient
          colors={['#8B5CF6', '#7C3AED']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image source={logo} style={styles.logo} />
            </View>
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>Hi, Welcome</Text>
              <Text style={styles.userName}>Jesvanth Kumar</Text>
            </View>
            <View style={styles.headerButtons}>
              <TouchableOpacity style={styles.notificationButton}>
                <Icon name="notifications-on" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.alarmButton}>
                <MaterialCommunityIcons
                  name="alarm-light-outline"
                  size={20}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <FontAwesome6 name="angle-left" size={18} color="black" />
            </TouchableOpacity>
            <Text style={styles.pageTitle}>Terms and Conditions</Text>
          </View>

          <View style={styles.contentBody}>
            <Text style={styles.contentText}>{termsContent}</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default TermsAndConditionsScreen;

const styles = StyleSheet.create({
  statusBarBackground: {
    height: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#8B5CF6',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerGradient: {
    paddingBottom: hp('2%'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingTop: hp('1%'),
    paddingBottom: hp('1%'),
  },
  logoContainer: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: wp('8%'),
    height: wp('8%'),
    resizeMode: 'contain',
    tintColor: 'white',
  },
  greetingContainer: {
    flex: 1,
    marginLeft: wp('3%'),
  },
  greeting: {
    fontSize: hp('1.8%'),
    color: 'white',
    opacity: 0.9,
  },
  userName: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    color: 'white',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  alarmButton: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: -hp('1%'),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: hp('2%'),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingBottom: hp('2%'),
  },
  backButton: {
    marginRight: wp('3%'),
    padding: 8,
  },
  pageTitle: {
    fontSize: hp('2.4%'),
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },
  contentBody: {
    paddingHorizontal: wp('4%'),
    paddingBottom: hp('4%'),
  },
  contentText: {
    fontSize: hp('2%'),
    lineHeight: hp('3%'),
    color: '#374151',
    textAlign: 'justify',
  },
});