# Task Manager Authentication App (MERN Stack)

A simple and secure **Task Manager Application** built with:

- **Frontend**: React.js  
- **Backend**: Node.js, Express, Sequelize ORM, MySQL  
- **Authentication**: JWT (stored in cookies) 

# Features

- User Registration & Login with JWT
- Secure password hashing with bcrypt
- Protected API routes
- Add / View / Delete personal tasks
- Cookie-based session handling
- Cross-Origin support for frontend ↔ backend

# Backend project Structure
backend/
├── config/
│   └── db.js                # Sequelize database connection setup
│
├── controllers/             # Route logic/controllers
│   ├── auth.js              # Handles registration and login
│   └── tasks.js             # Handles task-related operations
│
├── middleware/
│   └── auth.js              # JWT authentication middleware
│
├── models/                  # Sequelize models
│   ├── index.js             # Model associations and init
│   ├── task.model.js        # Task model definition
│   └── user.model.js        # User model definition
│
├── routes/                  # Express route definitions
│   ├── auth.js              # Auth routes (register, login)
│   └── tasks.js             # Task routes (CRUD)
│
├── .env                     # Environment variables (not committed)
├── .sample.env              # Sample environment config
├── .gitignore               # Files to ignore in git
├── app.js                   # Main app file (middleware, routes setup)
├── server.js                # Starts the Express server
├── package.json             # NPM dependencies and scripts
├── package-lock.json        # Dependency lock file
└── README.md                # Project documentation



# Setup Instructions
1. **Clone the Repository:**
git clone https://github.com/Achhyob/assesment-backend.git

2. **Install Dependencies**
npm install

3. **Create .env File**
PLease copy sample.env and rename the file to .env and put the appropriate values.
In app.js please update the origin url to frontend hosted url
PORT=5000
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=taskmanager
JWT_SECRET=your_jwt_secret_key

4. **Run server**
npm start

