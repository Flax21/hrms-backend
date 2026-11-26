# HRMS Backend System

## 1. Project Description

The Human Resource Management System (HRMS) Backend is a RESTful API developed to support basic human resource operations. It provides secure and organized management of employee information, departments, attendance records, and leave requests.

The backend is developed using NestJS, TypeORM, and MySQL. It also implements JWT authentication and role-based authorization to control access to protected resources.

## 2. Technologies Used

- NestJS
- TypeScript
- TypeORM
- MySQL
- XAMPP
- JSON Web Token (JWT)
- bcrypt
- class-validator
- Postman

## 3. System Modules

1. **Authentication Module** – Handles user registration, login, password hashing, JWT generation, and user profile retrieval.
2. **Department Management** – Provides CRUD operations for managing department records.
3. **Employee Management** – Manages employee information and department relationships.
4. **Attendance Management** – Handles employee attendance records and employee-specific attendance retrieval.
5. **Leave Management** – Manages employee leave requests, including submission and approval or rejection.

## 4. Project Requirements

Before installing the project, make sure you have the following:

- Node.js
- npm
- XAMPP
- MySQL
- Visual Studio Code or another code editor
- Postman

## 5. Project Installation and Setup

### Step 1: Clone the Repository

Clone the repository using Git:

```bash
git clone https://github.com/Flax21/hrms-backend.git
```

Open the project folder:

```bash
cd hrms-backend
```

### Step 2: Install Dependencies

Run the following command:

```bash
npm install
```

### Step 3: Configure MySQL

1. Open XAMPP Control Panel.
2. Start Apache (if needed for phpMyAdmin).
3. Start MySQL.
4. Open phpMyAdmin.
5. Create a database named `hrms_db`.
6. Import the provided HRMS SQL database export.

### Step 4: Configure Environment Variables

Create a `.env` file in the root directory of the project.

Configure the database credentials and JWT settings according to the environment configuration in `src/app.module.ts` and the authentication module.

Example JWT settings:

```env
JWT_SECRET=your_secure_secret_key
JWT_EXPIRES_IN=1d
```

Do not upload your actual `.env` file or secret credentials to GitHub.

### Step 5: Run the Backend

Start the development server:

```bash
npm run start:dev
```

The backend server runs at:

`http://localhost:3000`

## 6. API Configuration

**API Base URL:**

`http://localhost:3000/api/v1`

The API uses RESTful endpoints to communicate with the frontend and manage system data.

## 7. API Modules and Endpoints

| Module | Base Endpoint |
|---|---|
| Authentication | `/auth` |
| Departments | `/departments` |
| Employees | `/employees` |
| Attendance | `/attendance` |
| Leaves | `/leaves` |

The CRUD modules support the following HTTP methods