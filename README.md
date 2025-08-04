# Mini LinkedIn Community Platform

A mini full-stack LinkedIn-like community web application that allows users to register, log in, create public posts, view others' profiles, and manage their own posts.

🌍 Deployment

Frontend: 

Backend: 

## Features

- User registration and login
- Secure session-based authentication
- Create text and image posts
- View all posts on a global feed
- View user profiles with bio
- Edit or delete own posts
- Update bio information
- Upload and update profile posts with images

---

## Tech Stack

### Frontend
- React.js
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)
- jsonwebtoken for authentication
- Multer for file uploads

---

## Folder Structure

Mini Linkedin/
├── back-end/
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── uploads/ # Uploaded images
│ └── index.js
├── front-end/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ │ ├── Home.jsx
│ │ │ ├── Profile.jsx
│ │ │ ├── Login.jsx
│ │ │ └── Register.jsx
│ │ ├── App.js
│ │ ├── api.js
│ │ └── index.js
│ └── public/
└── README.md

⚙️ Setup Instructions 1️⃣ Clone the repository

git clone https://github.com/Jaswant-Yadav/Mini-LinkdeIn.git 
cd Mini-LinkdeIn

3️⃣ Configure Environment Variables (Backend)

Create .env in /backend:

PORT=5000 
MONGO_URI=your_MONGO_URL
JWT_SECRET=yourSecretKey

4️⃣ Start the Backend

cd backend 
npm install npm start

5️⃣ Start the Frontend

cd frontend 
npm install 
npm start

API Endpoints
Auth

    POST /api/register – Register user

    POST /api/login – Login user

    GET /api/logout – Logout user

User

    GET /api/users/:id – Get user by ID

    PUT /api/users/:id/bio – Update user bio

Posts

    GET /api/posts – Get all posts

    GET /api/posts/user/:id – Get posts by user

    POST /api/posts – Create a new post (text/image)

    PUT /api/posts/:id – Edit a post

    DELETE /api/posts/:id – Delete a post

Notes

    Ensure the uploads/ folder exists in the back-end/ directory for image uploads.

    Posts with images are served from: http://localhost:5000/uploads/<filename>

