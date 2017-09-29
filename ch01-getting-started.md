# Getting Started

Getting started with app development requires an installation process that takes a while. Because the tooling space is quite young, a lot of the tools are in flux: new versions introduce incompatibilities, and things that used to work 6 months ago now no longer run. Obviously, this can be very frustrating if you just want to dive in and start writing an application.

Fortunately, if we just want to get started, we don't have to do all of this. We can build small React Native apps with nothing more than our smartphone and a web browser. Meet Expo Snack.

## Expo Snack

Expo is a company that makes React Native development super-easy. They provide a downloadable app for your computer that allows you to write apps in a text editor, save, and have the changes automatically be visible on your phone. Installation is quite simple.

Expo Snack goes a step further. All you need is a web browser and the Expo app on your phone. You write code in your browser, and the code gets compiled in the cloud and sent to the app on your phone. Apart from the phone app, there is nothing to install, and it works everywhere. It's the easiest way to get started writing apps, or just trying things out. Expo Snack is available at [expo.snack.io](https://snack.expo.io/).

![](/assets/Screenshot 2017-09-29 at 20.31.44.png)![](/assets/expo-snack-screenshot.png)

To get started, download the Expo Client for [iOS](https://itunes.apple.com/us/app/expo-client/id982107779?mt=8) or for [Android](https://play.google.com/store/apps/details?id=host.exp.exponent). Then, open a web browser on your laptop and visit [expo.snack.io](https://expo.snack.io/). This brings up a QR code that you can scan in the Expo Client on your smartphone. That sets up a live connection between your phone and the editor.

So, what can we do? The code we see is a full React Native app, albeit a really simple one. It consists of a single view, and a style sheet that defines what this view will look like. We'll go into much more detail about all views and style sheets later, but for now we just want to have fun!

Let's concentrate on the part in the middle:

```
export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Change code in the editor and watch it change on your phone!
          Save to get a shareable url. You get a new url each time you save.
        </Text>
      </View>
    );
  }
}
```

If we squint a bit, we can look at something that looks like HTML code, even though the tags are all wrong. There's a `<View>` tag, a `<Text>` tag... I don't remember having those in HTML? That's because we're not developing for the web; we're making an app. And while websites have `<h1>` for headers, `<p>` for paragraphs, `<img>` for images, in apps we have slightly different tags. And, as we'll see, we can also make our own tags \(called _components_ in React Native-speak\).

Between the `<Text>` tags we can see a piece of text that also appears on the phone. Change the text into "Welcome to my first app" and see the text automatically change on the phone. It's magic!

### Troubleshooting

Sometimes Expo loses the connection between the web app and your phone. This often happens when your phone goes to sleep. Don't panic: just click on the **QR Code** button on the website and scan the code again. I suggest connecting your phone to power to avoid it going to sleep while developing. Also, because your phone uses the internet, losing your connection means the app won't update anymore.

To scan a new QR code on your iPhone, **shake your phone**. This brings up the expo menu where you have the option to scan another QR code. On Android, drag down from the status bar to reveal the Expo icon. Select it and choose to scan a new QR code.

Note that every time you press "Save Changes", you get a different URL!  You can make as many as you like. You can share the link with your friends so they can view your app as well.

## Styling

At the bottom of the example we can find something that looks like CSS: a set of _selectors_ and _properties_ with _values_. These define how components in our app look. The syntax is quite similar to CSS, actually, and React Native supports most styling options, including Flexbox for layout.

For now, let's experiment with colors and font sizes.

```
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
```

We see two distinct style blocks: one for the `container` \(our entire screen\) and one for the `paragraph` \(the text in the middle\). Here are some things to try:

* In the container, set the `backgroundColor` to '\#FA6900'. Then change the `color` of the paragraph to 'white' \(without the "\#" hashtag\). We can also use `rgb()` and `hsl()` colors, if we want.
* Change the `fontSize` of the paragraph to `36` or even bigger, like `72`. Note that, unlike CSS, we don't have to specify units.

Imagine we're building our first screen that users see when they first open the app. In the `render()` method change the existing text element to say "Welcome." Below it, add another `<Text>` element saying "Time to get you set up." The render method should now look like this:

```
   render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
         Welcome.
        </Text>
        <Text style={styles.paragraph}>
         Time to get you set up.
        </Text>
      </View>
    );
  }
```

Because we use the same style for both text elements, they will have have the same font size. However, we want the "Welcome" text to be bigger, and the text below it a bit smaller. Let's create a second text style, called "small", for the text below the central paragraph. Copy and paste the paragraph style and call it "small". Change the `fontSize` to 18, change the color to `#69D2E7` then in the `render()` method, set the style of the second text to `styles.small`. Here's what the part of the style sheet should look:

```
  small: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#69D2E7',
  },
```

![](/assets/expo-snack-welcome.jpg)

Now it's up to you! Play around with the styles, find your own color palette. You can look at the [text style reference](https://facebook.github.io/react-native/docs/text.html#style) for all options on how to style text controls.

## Exploring Controls

So far we only used `<Text>` controls, but our smartphones have many interactive controls that we can include in our application. The [React Native reference](https://facebook.github.io/react-native/docs/getting-started.html) has an overview of the sidebar of all available controls. We're going to experiment with a few of them.

First is the venerable `<Button>`. We want our users to continue from this screen, so the button will lead them to the next screen.

Below the second `<Text>` tag, add a button element that looks like this:

```
<Button onPress={this.onButtonPress} title="Let's do this!">
```

And lo and behold: **uh-oh**:

![](/assets/expo-snack-import-error.jpg)

This looks...terrifying? Actually, the error will be simple to fix, but the error looks extremely scary. Unfortunately, apart from the first line, none of the other details can tell us anything more about the issue. So what does this mean: `Can't find variable: Button`?

Every React Native component needs to be imported before it can be used. We've largely ignored the top part of our code, but there we import the dependencies we need: React itself, of course, and every individual component we might need. That list doesn't include Button yet, so let's add it. Change the second import line to include Button. It should look like this:

```
import { Text, View, StyleSheet, Button } from 'react-native';
```

We should now see the button. However, clicking on it doesn't *do* anything, since the button is not hooked up to a method on our app. Let's write the `onButtonPress` method. I put this code above the `render()` method:

```
  onButtonPress() {
    Alert.alert(
      'My App',
      'Thanks for pushing the button! Come back soon when our app is ready.'
    );
  }
```

Note that Expo will complain about a missing `Alert` variable. Just like with our button, add it to the import statement: 

```
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
```

Now, tapping our button should pop up an alert box telling users to please come back when our app is ready. Awesome!

### More Troubleshooting!
Expo Snack reloads the app when you've stopped typing for a bit. That means that if you haven't finished your code you might see something like this:

![](/assets/expo-snack-syntax-error.png)

Again, no reason to panic. Expo tries to be helpful by showing you the context of your error. In this case, I forgot closing the Alert statement with a bracket. That happened because I copied code from the [alert component reference page](https://facebook.github.io/react-native/docs/alert.html), and forgot including the last part. Ah, the wonders of copy-paste programming!


