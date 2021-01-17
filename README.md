# crowd.data

## Inspiration

In the current age of digital technology, data is everywhere. Machine learning and artificial intelligence researchers can ask the public for data to train models, and analysts can conduct market research for free! We want to develop a platform to allow users from anywhere contribute and compile data together! This allows for easy access of free crowd sourced data that anyone can contribute to.

This can also be used as an internal tool for developers. In this case, developers can easily contribute test data sets!

## What it does

We developed a platform that allows anyone to upload or request data from the community. Users can start threads which other users can upload their own data as contributions. We made this platform to encourage collaboration among communities, so we allow comments on each thread.

## How we built it

We used React to make the front end, and Node to make the back end. We used the DropBase API to combine data from various sources. We also made use of their pipeline feature to allow users to customize their uploaded data. We also used CockroachDB to store all of our users, threads, comments, and contribution data for easy access.

## Challenges we ran into

We ran into some tough challenges but we were able to overcome them. We wanted to have a user authentication system for login/signup, and we ran into trouble integrating passport.js. Another issue was modelling our database to hold users, threads, and comment data. Over the course of the hackathon, we had to change our model multiple times to make things more efficient and simpler to implement.

## Accomplishments that we're proud of

We are proud that we were able to have a working product in the end.

## What we learned

We learned how to use a new database, CockroachDB! We also learned how to develop an authentication system for users to sign up and log in.

## What's next for crowd.space

There are some limitations of the DropBase API, such as not being able to create a pipeline and get the pipeline token from the API. In the future, when the API gets updated, we hope to be able to make the process of uploading data and starting a thread even simpler by allowing users to interact solely on our platform. Then we can take care of the rest in the backend. In addition, we would like to allow the original poster of a thread to accept or reject data submissions. This ensures that all contributions are valid according to the OP as well.
