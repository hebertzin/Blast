## Upload-s3

## Overview

I did this project to train concepts such as cloud computing using AWS services and I carried out the project using object-oriented programming and following good practices in software development.

## **Techs**

- **Node js**
- **Typescript**
- **AWS-SDK**
- **EC2**
- **S3**
- **Redis**
- **Docker**
- **Express**
- **Git**
- **Github actions**
- **Husky**
- **Prettier**
- **Eslint**
- **Zod**
- **Jest**
- **Supertest**

## **Features**

- [x] It is possible to upload a file
- [x] It is possible to upload multiple files at a time
- [x] It is possible to delete a file
- [x] It is possible to get data from a file
- [x] It is possible to list all files
- [ ] It is possible to list files by type. ex: **Pdf**, **Jpeg** .

## **Endpoints**

- **POST** `/api/v1/files/upload`: Uploads a single file to the cloud
- **POST** `/api/v1/files/multi-upload` : Uploads multiple files to the cloud
- **GET** `/api/v1/files/:id`: Returns data from a file, e.g. bytes, name, among others...
- **GET** `/api/v1/files` : Returns all files
- **DELETE** `/api/v1/files/:id` : Deletes a file

## How to run this project

- Make sure you have the **node**, **docker** installed
- Clone this repository `git clone: https://github.com/hebertsanto/upload-s3.git`

- Navigate to the project and run the following command `npm install`
- Create a `.env` file and create environment variables with your AWS s3 credentials, don't forget that.
- See how to define the variables in the `.env.exemple` file
- Then just run the server with the following command: `npm run dev`

## Run with docker

- In the json package I created a script to run docker, all you need to do is run the command `npm run docker:build`
- After that, the application image will be created.

## Running tests

- You can run integration tests with this script `npm run tests:integration`
- You can run unit tests with this script `npm run tests:unit`

## Pipilines/Github Actions

- **Lint**

  In this pipeline I implemented code lint to maintain the quality and organization of the code

- **Build**
  
  In this pipeline the code is transpiled to JavaScript and the project image is created
  
## AWS console with some files

![Captura de tela de 2024-04-06 20-31-11](https://github.com/hebertsanto/upload-s3/assets/108555424/a3a31951-33d3-4955-8458-62c30c4ad5d4)

## AWS EC2 some images with requests

- **File id request**

  ![file-id](https://github.com/hebertsanto/upload-s3/assets/108555424/7b549579-56cc-4938-a2d7-9373a0d49d38)

- **Health route**


## AWS EC2 some images with requests

- **File id request**
  
  ![file-id](https://github.com/hebertsanto/upload-s3/assets/108555424/7b549579-56cc-4938-a2d7-9373a0d49d38)

- **Health route**
  

  ![health-route](https://github.com/hebertsanto/upload-s3/assets/108555424/dda7b577-752c-4d5a-9f63-0fd7d33c7a6b)

## References

[EC2 article](https://medium.com/@sahdevgrover02/understanding-amazon-ec2-cb702b53c9ca)

[S3 docs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html)

[Playlist EC2 youtube course(Portuguese)](https://www.youtube.com/watch?v=HiBCv9DolxI&list=PLtL97Owd1gkQ0dfqGW8OtJ-155Gs67Ecz)


## Conclusion

By doing this project I managed to acquire a lot of knowledge about Docker and go deeper into how it works, I also learned concepts in cloud computing and application deployment, as I wanted to simulate an environment with many requests I also found it interesting to implement caching with redis, this is a project There's a lot to improve so I'll keep improving it

## Conclusion 

By doing this project I managed to acquire a lot of knowledge about Docker and go deeper into how it works, I also learned concepts in cloud computing and application deployment, as I wanted to simulate an environment with many requests I also found it interesting to implement caching with redis, this is a project There's a lot to improve so I'll keep improving it

