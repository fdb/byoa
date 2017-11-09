# Adding Navigation

We've mainly focused on one screen. However, most apps will have *lots* of screens, so we need a way to move between them.

React Native and Expo don't include a standard way of moving between screens. Instead, they defer this functionality to a separate module. We're going to use [react-navigation](https://reactnavigation.org/), since it seems to be the recommended one, but know that there are others that all have slightly different ways of working.

The basic idea of navigating between screens is that we need to define *how* we navigate and what happens when we *go back*.

There are many ways to think about navigation. For example, your app might have a **tab bar** at the bottom. Each of those tabs will be a separate screen, and we can switch between them. Alternatively, your app might have a **drawer** (also called the "hamburger menu") that slides in from the side, and allows you to switch around between screens. In addition, some screens you can only get to when you click on something, and you can press the **back button** to go back one screen.

The react-navigation library supports all of these navigation styles. In our example, we're going to make a simple photo viewer that is built using a simple list-detail navigation style. When we open the app, we see a list of images. We can then tap on a thumbnail to see the image up close. To go back, we hit the back button.

Create a new project in the Expo XDE or using the command line:

```bash
exp init photoview
```    

Choose the template "blank" when asked.

Open the project and run it on your phone. In the command line you would use:

```bash
cd photoview
npm install
exp start
```

We're going to need the `react-navigation` module. We'll install it on the command line using `npm`. Open a new Terminal, then type:

```bash
cd photoview
npm install --save react-navigation
```

This will add the package to `package.json` and install the required dependencies under the `node_modules` folder.

## Adding screens

Using react-navigation, we can think of our application as a list of *screens*. Each screen has its own functionality, and is basically it's own `App.js`. We're going to make two screens:

* A `PhotoList` screen that will show a list of photo thumbnails.
* A `PhotoDetail` screen that will show a single photo.

Let's begin by setting up our App.js. Replace *all* code in the App.js file with this:

```js
import React from 'react';

import { StackNavigator } from 'react-navigation';
import PhotoListScreen from './PhotoListScreen';
import PhotoDetailScreen from './PhotoDetailScreen';

export default (App = StackNavigator({
  PhotoList: { screen: PhotoListScreen },
  PhotoDetail: { screen: PhotoDetailScreen }
}));
```

Note that this refers to two files that we still have to create: `PhotoListScreen.js` and `PhotoDetailScreen.js`. Let's do that now. 

Let's stub those out first. PhotoListScreen.js will look like this:

```js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class PhotoListScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the PhotoListScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  }
});
```

The `PhotoDetailScreen.js` file will look almost exactly the same:

```js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class PhotoDetailScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the PhotoDetailScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  }
});
```

However, we can't *get* to the PhotoDetail screen, since we start up in PhotoList and there is no way to navigate to it. We have to do this ourselves. But first, let's fill up the photo list.

The PhotoListScreen will get a list of images from the "camera roll". First, add `CameraRoll` to our `react-native` imports. Then in the constructor, prepare the state so that we're ready to receive our photos:

```js
constructor(props) {
  super(props);
  this.state = { photos: [] };    
}
```

Now we can create a `componentDidMount` method below the constructor that will load the photos from the camera roll:

```js
componentDidMount() {
  CameraRoll.getPhotos({ first: 25 })
    .then(r => this.setState({ photos: r.edges }));
  }
}
```

