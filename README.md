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
    "message": "User registered successfully",
    "status": true
  }
  ```

- Validation Error (Status: 400 Bad Request):

  ```json
  {
    "message": "Email already in use",
    "status": false
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
    "token": "your-json-web-token",
    "message": "User logged in successfully",
    "status": true
  }
  ```

- Authentication Error (Status: 401 Unauthorized):

  ```json
  {
    "message": "Invalid credentials.",
    "status": false
  }
  ```

### Upload Image on Cloudinary

**Endpoint**: `/api/image/cloudinary-upload`

**Method**: `POST`

**Payload**: Upload an image file using a form or `multipart/form-data`.

**Headers**:

- `Authorization` (required): Bearer token received after login.

**Response**:

- Success (Status: 200 OK):

  ```json
  {
    "message": "Image uploaded successfully",
    "asset_id": "cloudinary asset id",
    "public_id": "cloudinary public id",
    "version": "version",
    "version_id": "version id",
    "signature": "cloudinary signature",
    "width": "width of image",
    "height": "height og image",
    "format": "image format",
    "resource_type": "image",
    "created_at": "upload date",
    "tags": [],
    "bytes": "image size in bytes",
    "type": "upload",
    "etag": "etag",
    "placeholder": false,
    "url": "uploaded image URL",
    "secure_url": "uploaded image secure url",
    "folder": "image folder on cloudinary",
    "original_filename": "file name",
    "api_key": "cloudinary api key"
  }
  ```

- Error (Status: 400 Bad Request):

  ```json
  {
    "message": "Invalid file format"
  }
  ```

- Authentication Error (Status: 401 Unauthorized):

  ```json
  {
    "message": "Invalid token"
  }
  ```

### Save uploaded image details in the database 

**Endpoint**: `/api/image/save`

**Method**: `POST`

**Payload**: 

```json
{
 "title": "image title",
"description": "image description",
"keywords": "image keywords in comma (,) separated string ",
"height": "height of image",
"width": "width of image",
"imageUrl": "uploaded image URL",
"size": "image size in KB",
}
```

**Headers**:

- `Authorization` (required): Bearer token received after login.

**Response**:

- Success (Status: 200 OK):

  ```json
  {
   "message": "Image saved successfully",
   "image": {
   "_id": "mongo object id",
   "title": "image title",
   "description": "image description",
   "keywords": "image keywords in comma (,) separated string ",
   "height": "height of image",
   "width": "width of image",
   "imageUrl": "uploaded image URL",
   "size": "image size in KB"
   }
  }
  ```

- Error (Status: Internal Server Error):

  ```json
  {
    "message": "(error message)"
  }
  ```

- Authentication Error (Status: 401 Unauthorized):

  ```json
  {
    "message": "Invalid token"
  }
  ```

### Search Images

**Endpoint**: `/api/image/search`

**Method**: `POST`


**Payload**: 

```json
{
"searchText": "searched text (optional)",
"sort": "{sorting key with value} (default value is { uploadedAt: -1 })",
"limit": "limit of documents (number) (default value is 10)",
"offset": "documents offset (number) (default value is 0)"
}
```

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
        "width": "width of image",
        "height": "height of image",
        "size": "image size in KB",
        "keywords": ["image keywords"],
        "tags": ["image tags"]
      },
      {
        "_id": "document mongoId",
        "title": "image title",
        "description": "image description",
        "imageUrl": "image url",
        "width": "width of image",
        "height": "height of image",
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


## Deployed Application

You can access the deployed application at the following URL:

[Image Search and Management System - Backend Service](https://frail-ruby-penguin.cyclic.app/api)

Feel free to explore and use the backend service for your Image Search and Management System project. If you have any questions or encounter any issues, please refer to the project's documentation or reach out to me.

Happy image management!
