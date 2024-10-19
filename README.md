## Zajel Project Overview

The **Zajel** project is a real-time messaging platform utilizing **React** for the frontend and **Django** with **Django Channels** for the backend. It provides users with real-time communication features, including WebSocket-based messaging, integrated authentication, a friend system, and persistent message storage using **Redis**. The system is designed for scalability and responsiveness, ensuring smooth interactions between users without the need to refresh the page.

### Technologies and Architecture

- **Frontend**:  
  The frontend is built with **React**, providing a responsive user interface that interacts dynamically with the backend through WebSockets for real-time updates.

- **Backend**:  
  The backend is powered by **Django**. It handles routing, data management, user authentication, and the friend system. **Django Channels** extend Django’s functionality to manage WebSocket connections for real-time communication.

- **WebSockets & Django Channels**:  
  WebSocket communication is enabled through **Django Channels**, which allows asynchronous handling of multiple connections, making the system highly scalable for real-time interaction.

- **Persistent Storage with Redis**:  
  Instead of using in-memory storage, **Redis** is employed for storing chat messages. Redis provides high-speed data retrieval and persistence, ensuring that users can access messages even after disconnections or page reloads.

- **Friend System**:  
  Zajel includes a **friend system**, allowing users to add, remove, and manage friendships. This feature helps enhance user interaction by enabling private messaging between friends.

- **Authentication**:  
  The project integrates **Django Allauth** for user authentication, allowing users to log in using popular social accounts such as Google.

### Key Features

- **Real-Time Messaging**:  
  Users can communicate in real time, with messages being instantly delivered to recipients through WebSocket connections.
  
- **User Authentication**:  
  User registration and login are managed through Django’s built-in authentication system, with the added ability to log in using social accounts like Google.

- **Friend System**:  
  Users can send and accept friend requests, manage their friend lists, and engage in private messaging with friends.

- **Persistent Chat History**:  
  Messages are stored using Redis, ensuring that conversation history is not lost and can be retrieved when needed.

- **Scalability**:  
  The project leverages Redis and WebSockets to handle large volumes of real-time interactions, making it ideal for scenarios with many concurrent users.

