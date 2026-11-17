# Viva Questions & Answers

## Practical 4: Implement POST/GET APIs & Validate Schema Fields Using Mongoose

### 1. What is Mongoose?
**Answer:** Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between code objects and MongoDB document representations.

### 2. What is a schema?
**Answer:** A Mongoose schema defines the structure of documents within a MongoDB collection (specifying field names, data types, default values, validators, etc.).

### 3. What is a model?
**Answer:** A model is a compiled constructor provided by Mongoose based on a schema. An instance of a model represents a MongoDB document that can be queried, updated, saved, or deleted in the database.

### 4. What does `required: true` do?
**Answer:** `required: true` is a built-in schema validator that ensures a specific field must be present when creating or saving a document. If omitted, Mongoose throws a `ValidationError`.

### 5. Difference between `min` and `minlength`?
**Answer:** 
- `min`: Used for `Number` (and `Date`) fields to enforce a minimum numerical value (e.g., `age: { min: 17 }`).
- `minlength`: Used for `String` fields to enforce a minimum string length / number of characters (e.g., `name: { minlength: 3 }`).

### 6. What does `enum` do?
**Answer:** `enum` is a string validator that creates an array of allowed values. If a string field contains a value not in the enum list, Mongoose rejects it with a validation error.

### 7. Why do we use `express.json()`?
**Answer:** `express.json()` is a built-in middleware in Express that parses incoming HTTP requests with JSON payloads (Content-Type: `application/json`) and populates `req.body` with the parsed JavaScript object.

### 8. What is the difference between POST and GET?
**Answer:**
- `GET`: Used to retrieve/fetch data from the server. It does not modify server state and carries parameters in URL query strings.
- `POST`: Used to send data to the server to create a new resource. The data is sent in the request body.

### 9. Why is `unique` used for email?
**Answer:** `unique: true` creates a unique index in MongoDB for that field, preventing multiple documents from containing the same email address and ensuring each user/student email is distinct.

### 10. What happens when Mongoose validation fails?
**Answer:** When validation fails, Mongoose halts the operation, does not persist changes to MongoDB, and returns/throws a `ValidationError` containing details for each invalid field.

---

## Practical 5: JWT Authentication (Signup, Login, and Protected Route)

### 1. What is JWT?
**Answer:** JWT (JSON Web Token) is an open, industry-standard (RFC 7519) compact and self-contained URL-safe format used for securely transmitting information between parties as a JSON object.

### 2. Why do we use JWT?
**Answer:** JWT allows stateless authentication. The server doesn't need to keep session state in memory or a database; it issues a signed token to the client, which sends it in the `Authorization` header on subsequent requests.

### 3. What is bcrypt?
**Answer:** `bcrypt` (or `bcryptjs`) is a password-hashing library implementing the Blowfish-based adaptive hashing algorithm with salt generation to protect passwords against rainbow table and brute-force attacks.

### 4. Why should passwords not be stored directly?
**Answer:** Plaintext passwords risk exposure if the database is compromised, leaked, or accessed by unauthorized personnel. Hashing with salt ensures that even if database records are exposed, the original passwords cannot be easily recovered.

### 5. What is a JWT payload?
**Answer:** The payload is the second part of a JWT, containing claims (information about an entity, e.g., `userId`, `email`, role, and standard metadata like `exp`).

### 6. What is `jwt.sign()`?
**Answer:** `jwt.sign(payload, secretOrPrivateKey, [options])` is a jsonwebtoken method that generates and signs a new token using the given payload, secret key, and options (such as expiration time).

### 7. What is `jwt.verify()`?
**Answer:** `jwt.verify(token, secretOrPublicKey)` verifies the validity of a JWT (checks if signature matches and if token is expired) and returns the decoded payload if valid.

### 8. What is middleware?
**Answer:** Middleware functions in Express are functions that have access to the request object (`req`), the response object (`res`), and the next middleware function (`next`) in the application’s request-response cycle.

### 9. What does `next()` do?
**Answer:** `next()` passes control to the next middleware function in the stack. If not called, the request will hang unless a response is sent.

### 10. What is the purpose of `Authorization: Bearer <token>`?
**Answer:** It is the standard HTTP header convention for sending authentication credentials. The `Bearer` authentication scheme indicates that the bearer of the token is authorized to access the requested resource.

### 11. What happens if the JWT is expired?
**Answer:** `jwt.verify()` throws a `TokenExpiredError`. The authentication middleware catches this error and returns HTTP 401 Unauthorized (`Invalid or expired token`).

### 12. Why should the JWT secret not be hardcoded in a real application?
**Answer:** Hardcoded secrets in source code can be exposed through version control, logs, or decompilation. Storing secrets in environment variables (`.env`) keeps sensitive keys separate from code and allows different secrets for development, staging, and production.

