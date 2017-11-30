# Adding Firebase Support

To add support for Firebase, we'll need to create a Firebase account. If you already have a Google account, that's also your Firebase account.

You can visit [console.firebase.google.com](https://console.firebase.google.com) to login to the Firebase console. There, you can create a new project. We'll call it Freshnote:

![](firebase-create-project.png)

## Setting Up a Sign-In Method

Once we've created our new project, we'll be presented with a welcome screen. Here, choose "Authentication" from the side bar to set up user authentication.

![](firebase-authentication.png)

Firebase supports a number of sign-in methods. Here, we'll use the Email/Password method. Click "set up sign-in method", then click Email/Password and set it to Enabled:

![](firebase-sign-in-email.png)

While we're here, we can also create a test user to test if user login is working. Switch to the users tab and click "Add user". Create a new user with your email and password.

![](firebase-users.png)

## Integrating Firebase Into Our App

To integrate Firebase into our app, we first need to install the `firebase` module. Go to the command line, `cd` into your project directory and type:

```
npm install --save firebase
```

This will install the correct module. Firebase also needs a set of keys to work. We'll get those from the console.

In the console sidebar, click on "Project Overview". There, click on "Add Firebase to your web app". This will give us a snippet of code that looks like this:

```html
<script src="https://www.gstatic.com/firebasejs/4.6.2/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDMtYW-wjd92qRwJX92mjeg8B0JxP5b0Ws",
    authDomain: "fdb-freshnote.firebaseapp.com",
    databaseURL: "https://fdb-freshnote.firebaseio.com",
    projectId: "fdb-freshnote",
    storageBucket: "fdb-freshnote.appspot.com",
    messagingSenderId: "683729693275"
  };
  firebase.initializeApp(config);
</script>
```

We're only interested in the part _inside_ of the script tag, the one that starts with `var config = {...`. We need to copy this over into our app.

Go to App.js. At the top add an import for Firebase:

```js
import firebase from 'firebase';
```

Add a constructor to our `App` class that initializes Firebase, using the snippet of code we just retrieved:

```js
constructor(props) {
  super(props);
  // Initialize Firebase
  const config = {
    apiKey: 'AIzaSyDMtYW-wjd92qRwJX92mjeg8B0JxP5b0Ws',
    authDomain: 'fdb-freshnote.firebaseapp.com',
    databaseURL: 'https://fdb-freshnote.firebaseio.com',
    projectId: 'fdb-freshnote',
    storageBucket: 'fdb-freshnote.appspot.com',
    messagingSenderId: '683729693275'
  };
  firebase.initializeApp(config);
}
```
I've replaced the `var config...` with `const config...`, but otherwise the code is the same as the one we just copied.

Note that my keys will be different from yours. Make sure to use your own keys!

You can refresh the app; however, nothing will change since we don't get the data from Firebase yet.

In the next section, we'll talk about adding a Login screen.
