import React from "react";
import { StackNavigator } from "react-navigation";
import PhotoListScreen from "./PhotoListScreen";
import PhotoDetailScreen from "./PhotoDetailScreen";

export default (App = StackNavigator({
  PhotoList: { screen: PhotoListScreen },
  PhotoDetail: { screen: PhotoDetailScreen }
}));
