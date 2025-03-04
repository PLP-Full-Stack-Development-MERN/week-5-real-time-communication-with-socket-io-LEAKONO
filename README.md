# Real-Time Collaborative Notes App

This is a real-time collaborative notes application built with **React**, **Express.js**, **MongoDB**, and **Socket.io**.

## Features

- **Real-Time Note Editing**: Users in the same room can see changes live.
- **Room-Based Collaboration**: Users join specific rooms to edit shared notes.
- **Persistent Notes**: Notes are stored in a MongoDB database.
- **User Presence Tracking**: Displays a list of online users in each room.
- **Join/Leave Notifications**: Users get notified when someone joins or leaves a room.

## Technologies Used

- **Frontend**: React, Vite, Axios, Socket.io-client
- **Backend**: Express.js, MongoDB, Mongoose, Socket.io
- **Database**: MongoDB (Atlas or local Compass)
- **Deployment**: Render (backend) & Vercel (frontend)

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/PLP-Full-Stack-Development-MERN/week-5-real-time-communication-with-socket-io-LEAKONO.git
   cd real-time-notes
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a **.env** file and add your MongoDB connection string:
   ```env
   MONGO_URI=mongodb+srv://yourusername:yourpassword@cluster.mongodb.net/notesDB
   PORT=5000
   ```
4. Start the server:
   ```sh
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React app:
   ```sh
   npm run dev
   ```

## Usage
1. Open **http://localhost:5000** in your browser.
2. Enter a **Room ID** to join a collaborative note session.
3. Start typing and see changes update in real time!

## API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | /notes/:room | Get note by room |
| POST | /notes | Save or update note |
| DELETE | /notes/:room | Delete a note |

## Deployment
### Backend Deployment (Render)
1. Push your backend code to GitHub.
2. Create a new service in **Render**.
3. Connect your GitHub repository.
4. Set up the **environment variables** (MONGO_URI, PORT).
5. Deploy the backend.

### Frontend Deployment (Vercel)
1. Push your frontend code to GitHub.
2. Create a new project in **Vercel**.
3. Connect your GitHub repository.
4. Deploy the frontend.

## License
This project is licensed under the MIT License.

