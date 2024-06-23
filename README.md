## Upload-s3

## Overview

I did this project to train concepts such as cloud computing using AWS services and I carried out the project using object-oriented programming and following good practices in software development.

## **Techs**

- **Node js**
- **Typescript**
- **AWS-SDK**
- **EC2**
- **S3**
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
- Clone this repository `git clone: ​​https://github.com/hebertsanto/upload-s3.git`

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

## AWS console with some files

![Captura de tela de 2024-04-06 20-31-11](https://github.com/hebertsanto/upload-s3/assets/108555424/a3a31951-33d3-4955-8458-62c30c4ad5d4)
