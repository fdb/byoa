import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

export default class PhotoDetailScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { params } = this.props.navigation.state;

    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: params.photo.node.image.uri }}
        />
      </View>
    );
  }
}

const BOX_SIZE = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000"
  },
  image: {
    width: BOX_SIZE,
    height: BOX_SIZE
  }
});
