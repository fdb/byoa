import React from 'react';
import {
  StatusBar,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Constants, Font } from 'expo';

export default class SignUpScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <ImageBackground
          style={styles.imageBackground}
          source={require('./assets/header-image.jpg')}>
          <Image source={require('./assets/logo.png')} style={styles.logo} />
          <Text style={styles.appName}>Recipe</Text>
          <Text style={styles.appSlogan}>The tasty recipe app</Text>
        </ImageBackground>
        <View style={styles.signInView}>
          <TouchableOpacity>
            <View style={styles.signInButton}>
              <Text style={styles.signInText}>Sign In</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.signInHelp}>
            Signing up is free and only takes a second.
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
  },
  logo: {
    width: 48,
    height: 48,
  },
  appName: {
    fontFamily: 'Rosario',
    color: 'white',
    fontSize: 72,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    marginBottom: 20,
  },
  appSlogan: {
    fontFamily: 'Rosario-Italic',
    color: 'white',
    fontSize: 24,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
  signInView: {
    backgroundColor: '#219653',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInButton: {
    width: 300,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    fontFamily: 'Rosario',
    color: 'white',
  },
  signInHelp: {
    fontFamily: 'Rosario',
    marginTop: 10,
    fontSize: 11,
    color: 'white',
  },
});
