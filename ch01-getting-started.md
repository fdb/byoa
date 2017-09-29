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

If we squint a bit, we can look at something that looks like HTML code.





 

