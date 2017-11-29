import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Switch,
  TouchableOpacity
} from 'react-native';

export default class Footer extends React.Component {
  render() {
    const filter = this.props.filter;
    return (
      <View style={styles.footer}>
        <View style={styles.filters}>
          <TouchableOpacity
            style={[styles.filter, filter === 'all' && styles.selected]}
            onPress={() => this.props.onFilter('all')}
          >
            <Text>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filter, filter === 'active' && styles.selected]}
            onPress={() => this.props.onFilter('active')}
          >
            <Text>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filter, filter === 'completed' && styles.selected]}
            onPress={() => this.props.onFilter('completed')}
          >
            <Text>Completed</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.props.onClearCompleted}>
          <Text>Clear Completed</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#eee',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10
  },
  filters: {
    flexDirection: 'row'
  },
  filter: {
    padding: 8,
    borderRadius: 5
  },
  selected: {
    backgroundColor: '#ccc'
  }
});
