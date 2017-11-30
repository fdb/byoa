import React from 'react';
import { View, FlatList, Text, TouchableHighlight, StyleSheet } from 'react-native';

const DEFAULT_NOTES = [
  {
    key: 1512027663498,
    text: 'Welcome to Freshnote! Use the app for recording thoughts, large and small.'
  },
  {
    key: 1512027698885,
    text: 'These are the default notes but you can delete them.'
  }
];

export default class NoteListScreen extends React.Component {
  static navigationOptions = {
    title: 'All Notes'
  };

  constructor(props) {
    super(props);
    this.state = { notes: DEFAULT_NOTES };
  }

  onChooseNote(note) {
    const navigate = this.props.navigation.navigate;
    navigate('NoteDetail', { note });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList style={styles.noteList} data={this.state.notes} renderItem={this.renderItem.bind(this)} />
      </View>
    );
  }

  renderItem(item) {
    const note = item.item;
    return (
      <TouchableHighlight key={note.key} onPress={this.onChooseNote.bind(this, note)}>
        <View style={styles.noteItem}>
          <Text numberOfLines={1}>{note.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  noteList: {
    width: '100%'
  },
  noteItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white'
  }
});
