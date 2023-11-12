# Library-Management-System

## Dependencies For Setup Project

- Install `Nodejs v18`
- Install `Postgresql`
- install `docker`
- install `docker compose`

## How To Run Project With NPM

- Clone Repo `https://github.com/MohamedEsssam/Library-Management-System.git`
- `cd Library-Management-System`
- install all dependencies `npm i`
- Add .env file in your directory with values

```
## express ##
PORT=YOUR_PORT

## jwt ##
JWT_KEY=YOUR_KEY
EXPIRATION_TIME=1h

## DB ##
DB_USER_NAME=DB_USER_NAME
DB_PASSWORD=DB_PASSWORD
DB_HOSTNAME=localhost
DB_PORT=DB_PORT
DB_NAME=DB_NAME

## Docker ##
POSTGRES_DB=DB_NAME
POSTGRES_USER=DB_USER_NAME
POSTGRES_PASSWORD=DB_PASSWORD
```

- run script `npm run start`

## How To Run Project With Docker-Compose

- Clone Repo `https://github.com/MohamedEsssam/Library-Management-System.git`
- `cd Library-Management-System`
- install all dependencies `npm i`
- Add .env file in your directory with values

```
## express ##
PORT=YOUR_PORT

## jwt ##
JWT_KEY=YOUR_KEY
EXPIRATION_TIME=1h

## DB ##
DB_USER_NAME=DB_USER_NAME
DB_PASSWORD=DB_PASSWORD
DB_HOSTNAME=db
DB_PORT=DB_PORT
DB_NAME=DB_NAME

## Docker ##
POSTGRES_DB=DB_NAME
POSTGRES_USER=DB_USER_NAME
POSTGRES_PASSWORD=DB_PASSWORD
```

- run script `docker-compose build && docker-compose up`

## Features

- User:
  - [x] Create Borrower
  - [x] Create Admin
  - [x] Update User
  - [x] Delete User
  - [x] Fetch All Borrower
- Book
  - [x] Create New Book
  - [x] Update Book
  - [x] Delete Book
  - [x] Filter Book By title, Author, ISBN
- Borrowing Process
  - [x] Create Borrowing Record
  - [x] Return Book
  - [x] Get All Borrowing Process
  - [x] Get All Overdue Borrowings
  - Reports
    - [x] Get all borrowing process for given period and export it in xlsx file
    - [x] Get all overdue borrowings for last month and export it xlsx file
    - [x] Get all borrowing process for last month and export it in xlsx file
- Rate Limiting
  - [x] Handle rate limiting for endpoints using ```express-rate-limit``` 
- Auth
  - [x] Handle authentication using `JWT auth guard middleware`
  - [x] Handle authorization using `custom roles guard middleware `
- Dockerize app
  - [x] Dockerize app using docker and docker-compose
- Handle Error
  - [x] Handle errors with status code and messages.

## Database Schema Diagram

![Screenshot from 2023-11-10 15-15-37](https://file.io/yRfwr6JxXM56)

## <img src="https://file.io/EV7dqARvtgRO" width="40" height = "40"> APIs Documentation Postman

https://elements.getpostman.com/redirect?entityId=31097933-d4e133ab-b314-48cd-a907-0294f80745ce&entityType=collection

## Folder Structure

![Screenshot from 2023-11-11 18-38-47](https://file.io/8TEL8JdcdtP6)
