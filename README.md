# Image Search and Management System Backend Service

This is the backend service for the Image Search and Management System. It provides RESTful APIs for managing images, user authentication, and more.

## Dependencies

- **bcrypt** - For hashing user passwords.
- **cloudinary** - For managing and storing images.
- **cors** - For enabling Cross-Origin Resource Sharing.
- **dotenv** - For loading environment variables.
- **express** - For building the RESTful API.
- **jsonwebtoken** - For user authentication and token generation.
- **mongoose** - For interacting with the MongoDB database.
- **multer** - For handling file uploads.
- **uuid** - For generating UUIDs.
- **validator** - For validating email addresses.
- **nodemon** (devDependency) - For automatically restarting the server during development.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ajay-Maury/Image-Search-and-Management-System-Backend-Service.git
   ```

2. Navigate to the project folder:

   ```bash
   cd Image-Search-and-Management-System-Backend-Service
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root folder and add your environment variables (e.g., `DATABASE_URI`, `JWT_SECRET_KEY`, `CLOUDINARY_API_SECRET`, etc.). You can use the provided `.env.example` file as a template.

5. Start the server:

   ```bash
   npm start
   ```

The server will be running on the specified port (or port 3000 by default).

## API Documentation

### User Registration

**Endpoint**: `/api/user/register`

**Method**: `POST`

**Payload**:

```json
{
  "email": "user@example.com",
  "password": "YourStrongPassword"
}
```

**Response**:

- Success (Status: 201 Created):

  ```json
  {
    "message": "User registered successfully"
  }
  ```

- Validation Error (Status: 400 Bad Request):

  ```json
  {
    "error": "Email already in use"
  }
  ```

### User Login

**Endpoint**: `/api/user/login`

**Method**: `POST`

**Payload**:

```json
{
  "email": "user@example.com",
  "password": "YourStrongPassword"
}
```

**Response**:

- Success (Status: 200 OK):

  ```json
  {
    "token": "your-json-web-token"
  }
  ```

- Authentication Error (Status: 401 Unauthorized):

  ```json
  {
    "error": "Invalid credentials."
  }
  ```

### Upload Image

**Endpoint**: `/api/image/upload`

**Method**: `POST`

**Payload**: Upload an image file using a form or `multipart/form-data`.

**Headers**:

- `Authorization` (required): Bearer token received after login.

**Response**:

- Success (Status: 200 OK):

  ```json
  {
    "message": "Image uploaded successfully",
    "imageUrl": "url-to-the-uploaded-image"
  }
  ```

- Error (Status: 400 Bad Request):

  ```json
  {
    "error": "Invalid file format"
  }
  ```

- Authentication Error (Status: 401 Unauthorized):

  ```json
  {
    "error": "Invalid token"
  }
  ```

### Search Images

**Endpoint**: `/api/image/search`

**Method**: `GET`

<!-- **Query Parameters**:

- `query` (required): Search query. -->

**Headers**:

- `Authorization` (required): Bearer token received after login.

**Response**:

- Success (Status: 200 OK):

  ```json
  {
    "data": [
      {
        "_id": "document mongoId",
        "title": "image title",
        "description": "image description",
        "imageUrl": "image url",
        "dimensions": "width X height",
        "size": "image size in KB",
        "keywords": ["image keywords"],
        "tags": ["image tags"]
      },
      {
        "_id": "document mongoId",
        "title": "image title",
        "description": "image description",
        "imageUrl": "image url",
        "dimensions": "width X height",
        "size": "image size in KB",
        "keywords": ["image keywords"],
        "tags": ["image tags"]
      }
    ],
    "totalCount": "total documents"
  }
  ```

- No Results (Status: 200 OK):

  ```json
  {
    "data": [],
    "totalCount": 0
  }
  ```
  This README provides an overview of the backend service, its dependencies, and the available API endpoints with sample payloads and responses. You can find the full implementation in the [GitHub repository](https://github.com/Ajay-Maury/Image-Search-and-Management-System-Backend-Service).
