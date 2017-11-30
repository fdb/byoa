# Storing Our Data

**[Finished project on GitHub](https://github.com/fdb/byoa/tree/master/apps/freshnote)**

Almost all apps need a way to store and retrieve the data they manage. We've seen how we can do this locally using `AsyncStorage`, but what happens if we lose our phone? Or what if we want to make an app where data is shared between users, like a chat application? We need a central location to manage our data.

In this book we'll focus on using [Google Firebase](https://firebase.google.com/) to store and sync our data. The basic version is free, and we don't have to worry about managing infrastructure or writing complex back-end code.

Expo integrates well with Firebase, [as documented here](https://docs.expo.io/versions/latest/guides/using-firebase.html).

## Our example app: Freshnote

We're going to create a new app called _Freshnote_ that will be a small note-taking app with cloud storage. What's nice is that by the end of this chapter, this will be a real app that you can actually use, stores data in the cloud, and that is fully customizable!

The app will be as simple as possible: a _list_ screen showing all notes (using the `FlatList` component) and a _detail_ screen where we can view and edit the note. Of course, we'll also need a way for users to sign up or log in to the application.




