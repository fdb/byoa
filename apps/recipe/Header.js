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
  FlatList,
} from 'react-native';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#197540" barStyle="light-content" />
        <Ionicons name="md-menu" size={32} color="white" />
        <View style={styles.logo}>
          <Image source={require('./assets/logo.png')} style={styles.logoImage} />
          <Text style={styles.logoText}>Recipe</Text>
        </View>
        <Ionicons name="md-search" size={32} color="white" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#219653',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60 + Constants.statusBarHeight,
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 10,
  },
  logo: {
    flexDirection: 'row',
  },
  logoImage: {
    width: 24,
    height: 24,
  },
  logoText: {
    fontFamily: 'Rosario',
    fontSize: 24,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    color: 'white',
    marginLeft: 10,
  },
});
