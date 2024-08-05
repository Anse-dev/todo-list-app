
# Todo List App

This is a complex Todo List application built with Next.js and MongoDB.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/)

### Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/anse-dev/todo-list-app.git
    cd todo-list-app
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `.env.local` file in the root of the project and add your MongoDB connection string:
    ```env
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/todo-list?retryWrites=true&w=majority

    SWAGGER_API_DOC_PATH="./src/app/api"
    ```

4. Run the development server:
    ```bash
    npm run dev
    ```

    The app will be available at [http://localhost:3000](http://localhost:3000).

## Usage

### Running the application
To start the application in development mode, use:
```bash
npm run dev
```

For production build:
```bash
npm run build
npm start
```

### API Endpoints

#### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/users/{id}` - Get a user by ID
- `PATCH /api/users/{id}` - Update a user by ID
- `DELETE /api/users/{id}` - Delete a user by ID

#### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/{id}` - Get a task by ID
- `PATCH /api/tasks/{id}` - Update a task by ID
- `DELETE /api/tasks/{id}` - Delete a task by ID

#### Tasklists
- `GET /api/tasklists` - Get all tasklists
- `POST /api/tasklists` - Create a new tasklist
- `GET /api/tasklists/{id}` - Get a tasklist by ID
- `PATCH /api/tasklists/{id}` - Update a tasklist by ID
- `DELETE /api/tasklists/{id}` - Delete a tasklist by ID

## API Documentation

API documentation is provided using Swagger. You can access the API documentation at `/api-docs`.

### Adding Swagger Documentation

To add new Swagger documentation, you can follow the pattern below:

```typescript
/**
 * @swagger
 * /api/example:
 *   get:
 *     description: Example endpoint
 *     responses:
 *       200:
 *         description: Successful response
 */
export const GET = async () => {
    // Handler code
};
```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
```
![Screenshot 2024-08-05 at 15-22-21 Create Next App](https://github.com/user-attachments/assets/39b14bd2-796f-4373-9451-dcb91ed4358a)

