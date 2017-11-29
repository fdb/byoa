import React from 'react';
import { StyleSheet, Text, View, TextInput, Switch } from 'react-native';

export default class TodoItem extends React.Component {
  render() {
    const item = this.props.item;
    return (
      <View style={styles.item}>
        <Text style={[styles.itemText, item.complete && styles.complete]}>
          {item.text}
        </Text>
        <Switch value={item.complete} onValueChange={this.props.onToggleItem} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1
  },
  itemText: {
    fontSize: 24,
    color: '#444'
  },
  complete: {
    textDecorationLine: 'line-through'
  }
});
