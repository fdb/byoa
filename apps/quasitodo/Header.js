import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Add To-do"
          returnKeyType="done"
          value={this.props.text}
          onChangeText={this.props.onChangeText}
          onSubmitEditing={this.props.onAddItem}
          underlineColorAndroid="transparent"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#eee',
    flexDirection: 'row',
    width: '100%'
  },
  input: {
    flex: 1
  }
});
