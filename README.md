# Firebase Functions and Firestore Project

## 📄 Description

This project implements a backend application using **Firebase Functions** and **Firestore**. The main functionality allows the creation of records with a sequential `increment_id`, ensuring consistency even in scalable environments.

## 🏗️ Architecture

### 🔧 Components

- **Firebase Functions**:
  - **HTTP Function (`createRecord`)**: Receives `POST` requests to create new records in the `records` collection.
  - **Firestore Trigger (`setIncrementId`)**: Assigns a sequential `increment_id` to each new record created.

- **Firestore**:
  - **Collection `records`**: Stores records with the fields `name` and `increment_id`.

### 📁 Folder Structure

functions
  ├── index.js
  ├── src/
    ├── createRecord.js
    └── setIncrementId.js
  ├── tests/
    ├── createRecord.test.js
    └── setIncrementId.test.js 
  ├── package.json 
  ├── firebase.json 
  └── .eslintrc.js

## 🛠️ Features

- **Create Record**:
  - **Endpoint**: `POST /createRecord`
  - **Body**:
    ```json
    {
      "name": "Record Name"
    }
    ```
  - **Response**:
    ```json
    {
      "id": "RECORD_ID"
    }
    ```

- **Increment ID**:
  - When creating a record, a sequential `increment_id` is automatically assigned.

## 🚀 Installation and Setup

### 1. 📋 **Prerequisites**

Before starting, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (version 18 or higher)
- [Firebase CLI](https://firebase.google.com/docs/cli) (`npm install -g firebase-tools`)
- [Git](https://git-scm.com/)

### 2. 🛠️ **Clone the Repository**

Clone the repository and navigate to the `functions` directory:

#### 🖥️ **Installing Java**

The Firebase Emulators require Java to run. Follow the steps below to install Java on your operating system.
firebase emulators:start

#### Example with CURL:

curl -X POST http://localhost:5001/<YOUR_PROJECT_ID>/createRecord \
     -H "Content-Type: application/json" \
     -d '{"name": "Test Record"}'

git clone <REPOSITORY_URL>
cd <PROJECT_NAME>/functions