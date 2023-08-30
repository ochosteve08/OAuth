# Auth App

Welcome to CyberDev Auth App!

## About

This is a full-stack web application built with the MERN (MongoDB, Express, React, Node.js) stack. The app is designed to showcase robust authentication mechanisms that cater to modern web application needs.

## Features

1. **User Authentication**:

   - Allows users to sign up, log in, and log out.
   - Access control with protected routes for authenticated users only.
   - Integrated Google signup/sign-in using Firebase's Google Authentication.
2. **Frontend**:

   - Built with React.
   - Uses React Router for client-side routing.
   - Dynamic interactions and responsive design for an improved user experience.
3. **Backend**:

   - Developed with Node.js and Express.
   - MongoDB used as the database to store user information securely.
   - Authentication implemented using JSON Web Tokens (JWT).
   - Cookie based authentication

   * At the core of the backend functionality, a robust logging system is integrated to monitor application behavior, detect anomalies, and debug issues.
   * Customized error handling to provide meaningful feedback to users and help developers pinpoint the root causes of problems.
   * Efficient input validation feature ensures the integrity and security of the data being processed.
4. **Profile Management**:

   - Authenticated users can upload their profile pictures.
   - Profile pictures are stored on Firebase storage, with links saved in the MongoDB database.
   - Users can update their profile info and password.
   - Users can delete their account if they no longer wish to keep it.

## Running the Application


### Installation

1. Clone the repository:

```shell
https://github.com/ochosteve08/OAuth.gitgit clone 
```

2. On frontend and server directory,Install the dependencies:

```shell
npm install
```

3. Start the development server:

```shell
npm run dev
```

By default, the server will run on `http://localhost:3500` while the the client will run on `http://localhost:5173`.

## Contribution

Open to contributions. 

---
