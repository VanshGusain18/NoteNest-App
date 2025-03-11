# 🗒️ NoteNest App

NoteNest is a full-stack MERN application that allows users to create, edit, and manage notes securely with user authentication.

---

## ✨ Features

- **User Authentication**: Secure login and registration.
- **CRUD Operations**: Create, read, update, and delete notes.
- **Real-Time Data Storage**: Stores notes in a MongoDB database.
- **Responsive Design**: Works seamlessly on all devices.

---

## ⚙️ Installation

To set up and run the project locally:

### 🔧 Backend Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/VanshGusain18/NoteNest-App.git
   ```
2. **Navigate to the backend directory**:
   ```bash
   cd NoteNest-App/backend
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up environment variables**:
   - Create a `.env` file in the `backend` directory.
   - Add the following:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```
5. **Start the backend server**:
   ```bash
   npm start
   ```

### 🎨 Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd ../frontend
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the frontend server**:
   ```bash
   npm start
   ```

The app should now be running on `http://localhost:3000/` (frontend) and `http://localhost:5000/` (backend).

---

## 🛠 Technologies Used

- **MongoDB**: Database for storing user notes.
- **Express.js**: Backend framework for API development.
- **React.js**: Frontend framework for UI.
- **Node.js**: Server-side JavaScript runtime.
- **JWT Authentication**: Secure user authentication.

---

## 👨‍💻 Author

- **Vansh Gusain** - Creator & Developer
