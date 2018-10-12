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
import Header from './Header';
import { Ionicons } from '@expo/vector-icons';

const RECIPES = [
  {
    key: '1',
    title: 'Pancake with orange and blueberries',
    author: 'Monica Grabkowska',
    image_url: 'https://debleser.be/2018/byoa/recipe/pancake-blueberries_w600.jpg',
  },
  {
    key: '2',
    title: 'Meat balls with fresh herbs',
    author: 'Emiliano Vittoriosi',
    image_url: 'https://debleser.be/2018/byoa/recipe/meat-balls_w600.jpg',
  },
  {
    key: '3',
    title: 'Tasty strawberry juice',
    author: 'Monica Grabkowska',
    image_url: 'https://debleser.be/2018/byoa/recipe/strawberry-juice_w600.jpg',
  },
];

export default class RecipeListScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <FlatList data={RECIPES} renderItem={this._renderRecipe} style={styles.list} />
      </View>
    );
  }

  _renderRecipe({ item }) {
    return (
      <View style={styles.recipe}>
        <Image source={{ uri: item.image_url }} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>{item.author}</Text>
        <Ionicons name="md-heart" size={24} color="white" style={styles.heart} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#252E33',
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  list: {
    paddingTop: 20,
  },
  heart: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  recipe: {
    marginHorizontal: 15,
    paddingBottom: 5,
    backgroundColor: 'white',
    marginBottom: 15,
    borderRadius: 4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    overflow: 'hidden',
  },
  image: {
    width: 345,
    height: 125,
    marginBottom: 5,
  },
  title: {
    fontFamily: 'Rosario',
    color: '#4b4b4b',
    fontSize: 12,
    marginLeft: 5,
    marginBottom: 3,
  },
  author: {
    fontFamily: 'Rosario',
    color: '#9f9f9f',
    fontSize: 10,
    marginLeft: 5,
    marginBottom: 2,
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
