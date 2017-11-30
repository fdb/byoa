# Loading Data from Firebase

Currently, our `NoteListScreen` displays the default data. We want to display our actual notes.

But first, how do we store this data? In Firebase, we're free to structure the data however we want. The entire database is basically a giant JSON file. This will contain the data for all of our users. It is up to us to structure the data in a way that makes sense.

We'll store the data under a key `notes`, then the unique user id, then the key for a note, and then the note text. So for example:

![](firebase-notes-data.png)

Note that the user ID is something we get back from Firebase. The keys "001" and "002" are just examples. 
