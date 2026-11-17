# Assignment 11: Backend MERN Lab Experiments

This repository contains implementations for **Lab Experiment 4** and **Lab Experiment 5** as detailed in the lab manual.

---

## Directory Structure

```text
Assignment 11/
├── student-api/                    # LAB EXPERIMENT 4
│   ├── models/
│   │   └── Student.js             # Mongoose schema with validations
│   ├── server.js                  # Express server with POST & GET APIs
│   └── package.json               # Dependencies: express, mongoose, cors
│
├── jwt-auth-api/                   # LAB EXPERIMENT 5
│   ├── models/
│   │   └── User.js                # User schema (name, email, hashed password)
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT Bearer token authentication middleware
│   ├── server.js                  # Signup, Login, and Protected Profile APIs
│   └── package.json               # Dependencies: express, mongoose, bcryptjs, jsonwebtoken, cors
│
├── VIVA_QUESTIONS.md               # Complete answers for all 22 Viva questions
└── README.md                       # Setup and API Testing Guide
```

---

## Prerequisites

1. **Node.js** (v18+)
2. **MongoDB Community Server** (running locally on `mongodb://127.0.0.1:27017`)
3. **Postman** or **cURL** for testing

---

## Lab Experiment 4: Student Management REST API

### Features Implemented
- **Student Schema Validation Rules**:
  - `name`: String, required, minlength: 3, maxlength: 50, trim
  - `email`: String, required, unique, lowercase, trim, regex pattern validation
  - `age`: Number, required, min: 17, max: 30
  - `course`: String, required, enum: `["CSE", "IT", "ECE", "Biotechnology"]`
  - `cgpa`: Number, required, min: 0, max: 10
  - `timestamps`: automatically recorded (`createdAt`, `updatedAt`)
- **APIs**:
  - `POST /api/students` – Add new student (validates fields and returns 201 on success or 400 on error)
  - `GET /api/students` – Retrieve all students (returns 200 with JSON array)

### How to Run
```bash
cd student-api
node server.js
```
*Server runs on `http://localhost:5000` and connects to `mongodb://127.0.0.1:27017/StudentDB`.*

### Postman Testing Guide

#### 1. Valid Student (POST)
- **URL**: `POST http://localhost:5000/api/students`
- **Headers**: `Content-Type: application/json`
- **Body (raw JSON)**:
  ```json
  {
    "name": "Rahul Sharma",
    "email": "rahul@gmail.com",
    "age": 21,
    "course": "CSE",
    "cgpa": 8.5
  }
  ```
- **Expected Status**: `201 Created`

#### 2. Retrieve All Students (GET)
- **URL**: `GET http://localhost:5000/api/students`
- **Expected Status**: `200 OK`

#### 3. Validation Tests (POST)
- **Test 1 — Missing name**:
  ```json
  { "email": "test@gmail.com", "age": 21, "course": "CSE", "cgpa": 8 }
  ```
  *Expected: `400 Bad Request` ("Student name is required")*

- **Test 2 — Invalid age (< 17)**:
  ```json
  { "name": "Amit", "email": "amit@gmail.com", "age": 15, "course": "CSE", "cgpa": 8 }
  ```
  *Expected: `400 Bad Request` ("Age must be at least 17")*

- **Test 3 — Invalid CGPA (> 10)**:
  ```json
  { "name": "Amit", "email": "amit@gmail.com", "age": 20, "course": "CSE", "cgpa": 15 }
  ```
  *Expected: `400 Bad Request` ("CGPA cannot be greater than 10")*

- **Test 4 — Invalid course**:
  ```json
  { "name": "Amit", "email": "amit@gmail.com", "age": 20, "course": "Mechanical", "cgpa": 8 }
  ```
  *Expected: `400 Bad Request` ("Invalid course")*

---

## Lab Experiment 5: JWT Authentication

### Features Implemented
- **User Schema**:
  - `name`: String, required, minlength: 3
  - `email`: String, required, unique, lowercase, trim
  - `password`: String, required, minlength: 6 (hashed using `bcryptjs` with salt rounds = 10)
- **APIs**:
  - `POST /api/signup` – Register new user with hashed password
  - `POST /api/login` – Authenticate user using bcrypt comparison and return JWT token
  - `GET /api/profile` – Protected route guarded by `authMiddleware` (returns user profile with password excluded)
- **Authentication Middleware (`middleware/authMiddleware.js`)**:
  - Reads `Authorization` header
  - Extracts Bearer token
  - Verifies JWT with secret key
  - Attaches decoded token payload to `req.user`
  - Returns `401 Unauthorized` if token is missing, invalid, or expired

### How to Run
```bash
cd jwt-auth-api
node server.js
```
*Server runs on `http://localhost:5000` and connects to `mongodb://127.0.0.1:27017/JWTAuthDB`.*

### Postman Testing Guide (7 Mandatory Tests)

| # | Test Case | HTTP Method & URL | Body / Headers | Expected Status |
|---|---|---|---|---|
| **1** | Signup valid user | `POST http://localhost:5000/api/signup` | `{"name":"Rahul Sharma","email":"rahul@gmail.com","password":"rahul123"}` | `201 Created` |
| **2** | Signup duplicate email | `POST http://localhost:5000/api/signup` | `{"name":"Rahul Sharma","email":"rahul@gmail.com","password":"rahul123"}` | `400 Bad Request` ("User already exists") |
| **3** | Login correct password | `POST http://localhost:5000/api/login` | `{"email":"rahul@gmail.com","password":"rahul123"}` | `200 OK` (returns JWT token) |
| **4** | Login wrong password | `POST http://localhost:5000/api/login` | `{"email":"rahul@gmail.com","password":"wrongpassword"}` | `401 Unauthorized` ("Invalid email or password") |
| **5** | Profile without token | `GET http://localhost:5000/api/profile` | No headers | `401 Unauthorized` ("Access denied. No token provided.") |
| **6** | Profile with invalid token | `GET http://localhost:5000/api/profile` | Header: `Authorization: Bearer invalid123` | `401 Unauthorized` ("Invalid or expired token") |
| **7** | Profile with valid token | `GET http://localhost:5000/api/profile` | Header: `Authorization: Bearer <TOKEN_FROM_STEP_3>` | `200 OK` (user profile excluding password) |

---

## Viva Questions

Detailed answers for all 22 Viva questions for Practical 4 and Practical 5 are available in [VIVA_QUESTIONS.md](file:///c:/Users/adity/OneDrive/Desktop/5thSem/backendMern/Assignment%2011/VIVA_QUESTIONS.md).

