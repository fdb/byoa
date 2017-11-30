import React from "react";
import { StackNavigator } from "react-navigation";
import NoteListScreen from "./NoteListScreen";
import NoteDetailScreen from "./NoteDetailScreen";

export default (App = StackNavigator({
  NoteList: { screen: NoteListScreen },
  NoteDetail: { screen: NoteDetailScreen }
}));
