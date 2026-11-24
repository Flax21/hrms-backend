# HRMS Backend System

## Project Description

The Human Resource Management System (HRMS) Backend is a REST API developed for managing basic human resource operations. It uses NestJS, TypeORM, and MySQL to provide organized and secure data management.

## Technologies Used

- NestJS
- TypeScript
- TypeORM
- MySQL
- XAMPP
- JWT Authentication
- Postman

## System Modules

1. **Authentication** – Handles user registration, login, password hashing, and JWT authentication.
2. **Department Management** – Manages department records.
3. **Employee Management** – Manages employee information.
4. **Attendance Management** – Manages employee attendance records.
5. **Leave Management** – Manages employee leave requests.

## Project Setup

### Requirements

- Node.js and npm
- XAMPP
- MySQL
- Postman

### Installation

1. Clone or download this repository.
2. Open the project folder in VS Code.
3. Open the terminal and install the dependencies:

```bash
npm install
```

4. Start MySQL using XAMPP.
5. Create a database named `hrms_db`.
6. Import the provided SQL database file.
7. Configure your database credentials and JWT environment variables in `.env`.

## Running the Project

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

The backend runs at:

`http://localhost:3000`

## API Base URL

`http://localhost:3000/api/v1`

## API Endpoints

| Module | Base Endpoint |
|---|---|
| Authentication | `/auth` |
| Departments | `/departments` |
| Employees | `/employees` |
| Attendance | `/attendance` |
| Leaves | `/leaves` |

Each CRUD module supports creating, retrieving, updating, and deleting records.

## Authentication and Security

The system uses JSON Web Tokens (JWT) to protect authorized endpoints. Passwords are hashed using bcrypt before being stored in the database. Input validation is implemented using class-validator and NestJS ValidationPipe.

## API Testing

Postman is used to test API requests, responses, CRUD operations, and authentication.

## Database

The system uses MySQL as its database and TypeORM for database operations and entity relationships.

## Project Information

**Subject:** ITEC 116 – Systems Integration

**Project:** Final Project – Systems Integration Backend Prototype

**System:** Human Resource Management System (HRMS) Backend
