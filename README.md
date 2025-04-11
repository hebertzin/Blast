# Blast upload

## Overview

This project was built to practice **cloud computing** concepts using AWS services. It follows **object-oriented programming** principles and applies software development best practices, focusing on scalability and code quality.

---

## Tech Stack

- Node.js  
- TypeScript  
- AWS SDK  
- EC2  
- S3  
- Redis  
- Docker  
- Express  
- Git  
- GitHub Actions  
- Husky  
- Prettier  
- ESLint  
- Zod  
- Jest  
- Supertest  

---

## Features

- [x] Upload a single file  
- [x] Upload multiple files at once  
- [x] Delete files  
- [x] Get file metadata (name, size, etc.)  
- [x] List all files  
- [ ] Filter files by type (e.g., PDF, JPEG)  

---

## API Endpoints

- `POST /api/v1/files/upload`  
  Upload a single file to S3.

- `POST /api/v1/files/multi-upload`  
  Upload multiple files at once to S3.

- `GET /api/v1/files/:id`  
  Get file metadata by ID.

- `GET /api/v1/files`  
  List all uploaded files.

- `DELETE /api/v1/files/:id`  
  Delete a file by ID.

---

## Running Locally

1. Make sure you have **Node.js** and **Docker** installed.
2. Clone the repository:  
   `git clone https://github.com/hebertsanto/upload-s3.git`
3. Install the dependencies:  
   `npm install`
4. Create a `.env` file with your AWS S3 credentials.  
   You can use `.env.exemple` as a reference.
5. Start the server:  
   `npm run dev`

---

## Running with Docker

1. Build the image:  
   `npm run docker:build`
2. The application Docker image will be created automatically.

---

## Running Tests

- Run integration tests:  
  `npm run tests:integration`

- Run unit tests:  
  `npm run tests:unit`

---

## CI/CD (GitHub Actions)

### Lint
This pipeline ensures code style consistency and quality using ESLint and Prettier.

### Build
Transpiles TypeScript to JavaScript and builds the Docker image of the project.

---

## AWS S3 Console - Uploaded Files

![Screenshot](https://github.com/hebertsanto/upload-s3/assets/108555424/a3a31951-33d3-4955-8458-62c30c4ad5d4)

---

## AWS EC2 - Request Samples

### File by ID

![file-id](https://github.com/hebertsanto/upload-s3/assets/108555424/7b549579-56cc-4938-a2d7-9373a0d49d38)

### Health Check Route

![health-route](https://github.com/hebertsanto/upload-s3/assets/108555424/dda7b577-752c-4d5a-9f63-0fd7d33c7a6b)

---

## Future Improvements

This project has room for improvement and evolution. Some next steps include:

- Decouple external services (e.g., AWS SDK, Redis) using dependency inversion.
- Add a domain layer following Domain-Driven Design (DDD) principles.
- Refactor to a cleaner, layered architecture.
- Improve unit and integration test coverage.

---

## References

- [EC2 Article](https://medium.com/@sahdevgrover02/understanding-amazon-ec2-cb702b53c9ca)  
- [S3 Official Docs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html)  
- [EC2 YouTube Playlist (Portuguese)](https://www.youtube.com/watch?v=HiBCv9DolxI&list=PLtL97Owd1gkQ0dfqGW8OtJ-155Gs67Ecz)  

---

## Conclusion

Through this project, I gained hands-on experience with **Docker**, deepened my understanding of **cloud computing**, and explored **application deployment** with AWS. To simulate a real-world high-traffic scenario, I also implemented **caching with Redis**. This is a project I plan to keep improving as I learn more.

