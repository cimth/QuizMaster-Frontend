# Frontend of QuizMaster

With QuizMaster you are able to create and play quizzes with 10 to 30 questions, providing a custom question pool.

This project contains the frontend of QuizMaster. The frontend handles the GUI for playing quizzes and managing
your data like predefined quizzes and the question pool. The actual logic behind the data management, however, is
implemented in the backend.

## API description and backend

You can find the API description, created with OpenAPI / Swagger, inside the following repository:
https://github.com/cimth/quizmaster_api

The backend, based on Spring boot, is located inside the following repository:
https://github.com/cimth/quizmaster_backend

## Admin Token

For manipulating the data managed by the backend, you have to provide an Admin Token in the 
Authorization header of your request. This token is re-created on each startup of the application
and will be printed on the console of the backend application. Thus, only the admin of the server 
can modify the database.

For more information look up the above linked backend repository.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
