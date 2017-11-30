import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

export default class NoteDetailScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { params } = this.props.navigation.state;
    const note = params.note;

    return (
      <View style={styles.container}>
        <Text>{note.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 10
  }
});
