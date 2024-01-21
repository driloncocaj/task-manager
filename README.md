# Task Manager Application

A full-stack task management application built with React (frontend) and Node.js/Express (backend) with MySQL database.

## Features

- User authentication (signup/login)
- Create, read, and delete tasks
- Task management with title, description, and due date
- JWT-based authentication
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- MySQL database
- npm or yarn

## Setup Instructions

### 1. Database Setup

1. Install and start MySQL server
2. Create the database and tables by running the SQL schema:

```bash
mysql -u root -p < backend/schema.sql
```

Or manually execute the SQL commands in `backend/schema.sql`

### 2. Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

   - Copy the `.env` file (already created) and modify the database credentials if needed:

   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=task_manager
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=5000
   ```

4. Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user

### Tasks (Protected routes)

- `GET /api/tasks` - Get all tasks for the authenticated user
- `POST /api/tasks` - Create a new task
- `DELETE /api/tasks/:id` - Delete a task

## Usage

1. Open your browser and go to `http://localhost:5173`
2. Sign up for a new account or login with existing credentials
3. Create, view, and delete tasks
4. Use the logout button to sign out

## Project Structure

```
task-manager/
├── backend/
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── middleware/
│   │   └── requireAuth.js
│   ├── db.js
│   ├── index.js
│   ├── schema.sql
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Technologies Used

- **Frontend**: React, Vite, React Router
- **Backend**: Node.js, Express, MySQL2
- **Authentication**: JWT, bcryptjs
- **Database**: MySQL
