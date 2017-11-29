import React from 'react';
import { View, Text, StyleSheet, CameraRoll, ScrollView, TouchableHighlight, Image, Dimensions } from 'react-native';

export default class PhotoListScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { photos: [] };
  }

  componentDidMount() {
    CameraRoll.getPhotos({ first: 25 }).then(r => this.setState({ photos: r.edges }));
  }

  onChooseImage(photo, index) {
    const navigate = this.props.navigation.navigate;
    navigate('PhotoDetail', { photo, index });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {this.state.photos.map((photo, index) => (
            <TouchableHighlight key={index} onPress={this.onChooseImage.bind(this, photo, index)}>
              <Image key={index} style={styles.image} source={{ uri: photo.node.image.uri }} />
            </TouchableHighlight>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const BOX_SIZE = Dimensions.get('window').width / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  scrollViewContent: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  image: {
    width: BOX_SIZE,
    height: BOX_SIZE
  }
});
