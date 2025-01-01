# User API Documentation

## Overview 🔐📑🌐

This document outlines the functionality of the `/register`, `/login`, and `/users/profile` endpoints. These endpoints facilitate user registration, authentication, and profile retrieval, respectively. All endpoints validate user input and issue JSON Web Tokens (JWT) upon successful operations. 🌐🔐📑

---

## Endpoints 📏🔧📚

### POST `/register` 🔒📃🔑

**Description**: This endpoint registers a new user by validating the input data, hashing the password, and generating a unique username. Upon successful registration, it returns a JWT token and user details. 📃🔑🔒

#### Request 📥📙🔨

- **Headers**:
  - `Content-Type: application/json`

- **Body**:
  - `name` (string, required): The user's full name, minimum 3 characters.
  - `email` (string, required): A valid email address.
  - `password` (string, required): A password with at least 8 characters.

#### Example Request Body 📋🔧📗

```json
{
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "securePassword123"
}
```

#### Response 📦📢🔒

- **Success (201 Created)**: 🌟🔐📓
  - **Body**:

    ```json
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "user": {
            "_id": "60d0fe4f5311236168a109ca",
            "name": "John Doe",
            "email": "johndoe@example.com",
            "username": "johndoe_abc12",
            "avatar": "https://api.dicebear.com/9.x/lorelei/svg"
        }
    }
    ```

- **Error (400 Bad Request)**: ⚠️🔧🔨
  - **Body**:

    ```json
    {
        "errors": [
            {
                "msg": "Invalid value",
                "param": "email",
                "location": "body"
            }
        ]
    }
    ```

---

### POST `/login` 🔐🏢📃

**Description**: This endpoint authenticates an existing user by validating their email and password. A JWT token and user details are returned upon successful authentication. 🏢📃🔐

#### Request 📥🔐📢

- **Headers**:
  - `Content-Type: application/json`

- **Body**:
  - `email` (string, required): A valid email address.
  - `password` (string, required): The account password, minimum 8 characters.

#### Example Request Body 🔧📢📦

```json
{
    "email": "johndoe@example.com",
    "password": "securePassword123"
}
```

#### Response 🔒📓📏

- **Success (200 OK)**: 🌟🔑📃
  - **Body**:

    ```json
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "user": {
            "_id": "60d0fe4f5311236168a109ca",
            "name": "John Doe",
            "email": "johndoe@example.com",
            "username": "johndoe_abc12",
            "avatar": "https://api.dicebear.com/9.x/lorelei/svg"
        }
    }
    ```

- **Error (401 Unauthorized)**: ⚠️🔐🔒
  - **Body**:

    ```json
    {
        "message": "Invalid email or password"
    }
    ```

---

### GET `/profile` 🌟📓📢

**Description**: Retrieves the profile information of the authenticated user. 📓🌟📦

#### Request 📥🔒🔑

- **Headers**:
  - `Authorization`: Bearer token (JWT) required for authentication.

#### Response 🔐📢🌟

- **Success (200 OK)**: 🌟📃🔑
  - **Body**:

    ```json
    {
        "_id": "60d0fe4f5311236168a109ca",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "username": "johndoe_abc12",
        "avatar": "https://api.dicebear.com/9.x/lorelei/svg"
    }
    ```

- **Error (401 Unauthorized)**: ⚠️🔒📢
  - **Body**:

    ```json
    {
        "message": "Authentication required"
    }
    ```

---

## Error Handling 🔧🏢📥

### Validation Errors 🏢🔧🔐

If required fields are missing or invalid, the server responds with a `400 Bad Request` status and a list of validation errors. 🏢🔧🔐

#### Example 🔒📢🌟

```json
{
    "errors": [
        {
            "msg": "Invalid value",
            "param": "email",
            "location": "body"
        }
    ]
}
```

### Authentication Errors 🔒🔧📃

If the email or password is incorrect, the server responds with a `401 Unauthorized` status and an error message. 🔒🔧📃

#### Example 📢📃🌟

```json
{
    "message": "Invalid email or password"
}
```

### Server Errors 🔧🏢🔒

If an unexpected error occurs, the server responds with a `500 Internal Server Error`. 🏢🔒🔧

---

## Notes 🌟📢📙

- **Username Generation**: The username is derived from the local part of the email (before the `@` symbol) and appended with a hash-based suffix to ensure uniqueness. 🌟🔧🔐
- **Password Security**: Passwords are securely hashed using industry-standard algorithms before storage. 🔐📃🏢
- **JWT Signing**: JWT tokens are signed with a secret key stored in the `JWT_SECRET` environment variable. 🔧🔐🌟

## Environment Variables 📢🔐🌟

- `JWT_SECRET`: The secret key for signing JWT tokens. Ensure this is securely set in your environment. 🔐🏢🔧

---

This documentation provides comprehensive details on the `/register`, `/login`, and `/users/profile` endpoints, including request and response formats, error handling, and security considerations. For further assistance, contact the API development team. 🌟🔐�
