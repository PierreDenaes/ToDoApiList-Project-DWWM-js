# Todo API Project

<p align="center">
  <img width="500" height="500" alt="image todo list" src="https://i.postimg.cc/HnxTMRmq/pngwing-com.png">
</p>

## Overview

Todo API is a robust and scalable Node.js application designed for managing tasks efficiently. It provides a comprehensive set of features for task management, including adding, updating, deleting, and retrieving tasks, as well as managing task statuses and archiving completed tasks.

## Features

- **Task Management**: Create, update, and delete tasks.
- **Status Updates**: Change the status of each task (e.g., 'doing', 'done').
- **Task Archiving**: Archive completed tasks for future reference.
- **Secure Access**: HTTPS setup for secure communication.

## Installation

Before you begin, ensure you have [Node.js](https://nodejs.org/en/) and npm installed on your system.

### Step 1: Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/PierreDenaes/ToDoApiList-Project-DWWM-js.git
cd todoapi
```

## Step 2: Install Dependencies

Clone the repository to your local machine:

```bash
npm install
```

## Step 3: Local SSL Certificate Creation

For development purposes, you might want to create a self-signed SSL certificate to enable HTTPS on your local server. Here’s how you can do it:

### Prerequisites

- Ensure you have OpenSSL installed on your system. It usually comes pre-installed on MacOS and Linux. For Windows, you might need to install it separately.

### Generating SSL Certificate

1. **Open a Terminal or Command Prompt** and navigate to your project directory.

2. **Run the OpenSSL command** to generate a private key and a certificate:

   ```bash
   openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365
   ````

    - `x509`: This option specifies the creation of a self-signed certificate.

    - `newkey rsa:4096`: Creates a new certificate request along with a new private key. The `rsa:4096` denotes a 4096-bit RSA key.

    - `keyout`: Specifies the filename for the newly created private key. Example filename: `key.pem`.

    - `out`: Specifies the filename for the certificate. Example filename: `cert.pem`.

    - `days`: The validity period of the certificate. For example, `365` days denotes one year.

3. **Complete the Certificate Creation**:
   - Follow the prompts to input details like country code, state, and organization. These fields can be left blank for local development purposes.

### Note

While self-signed SSL certificates are suitable for development environments, they should not be used in production. For production environments, obtain a certificate from a trusted Certificate Authority (CA).

## Step 4: Set Up Environment Variables

Create a '.env' file in the root directory of the project and define your environment variables:

```javascript
DB_HOST=localhost
DB_USER=yourUsername
DB_PASSWORD=yourPassword
DB_DATABASE=todolist
DB_PORT=3306 /*(8889 -> Mac)*/
SSL_KEY_PATH=path/to/your/key.pem
SSL_CERT_PATH=path/to/your/cert.pem
```

1. **Update Environment Variables**:
   - Modify your `.env` file with the paths to your newly created `key.pem` and `cert.pem` files, as described in the 'Set Up Environment Variables' section.

## Step 5: Run the Application

Start the server.js

```bash
node server.js
````

## API Endpoints

The Todo API provides various endpoints to manage tasks, statuses, and archived tasks. Below is a list of available endpoints and their functionalities:

### Task Endpoints

- **GET `/tasks`**: Fetch all tasks.
- **POST `/tasks`**: Add a new task.
  - Body Parameters: `taskTitle`, `taskContent`
- **DELETE `/tasks/:id`**: Delete a task by its ID.
- **PATCH `/tasks/:id/status`**: Update the status of a task.
  - Body Parameters: `status_idstatus`
- **PATCH `/tasks/:id/archived`**: Archive a task.
  - Body Parameters: `isFinished`
- **GET `/tasks/:id`**: Fetch a single task by its ID.
- **GET `/tasks/doing`**: Fetch tasks that are currently in progress.
- **POST `/tasks/archived/:id`**: Add a task to the archived list.

### Status Endpoints

- **GET `/status`**: Fetch all status labels.
- **POST `/status`**: Add a new status label.
  - Body Parameters: `labelStatus`
- **PUT `/status/:id`**: Update a status label by its ID.
  - Body Parameters: `labelStatus`
- **DELETE `/status/:id`**: Delete a status label by its ID.

### Archived Tasks Endpoints

- **GET `/archived`**: Fetch all archived tasks.

## License

[MIT](https://opensource.org/licenses/MIT)

---

Thank you for considering Todo API for your task management needs!

Feel free to adjust the content to match the specifics of your project, such as the repository URL, usage instructions, and any additional features or details you wish to include.
