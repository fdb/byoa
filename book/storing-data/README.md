# Storing Our Data

Almost all apps need a way to store and retrieve the data they manage. We've seen how we can do this locally using `AsyncStorage`, but what happens if we lose our phone? Or what if we want to make an app where data is shared between users, like a chat application? We need a central location to manage our data.

In this book we'll focus on using [Google Firebase](https://firebase.google.com/) to store and sync our data. The basic version is free, and we don't have to worry about managing infrastructure or writing complex back-end code.

