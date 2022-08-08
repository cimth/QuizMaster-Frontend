Frontend of QuizMaster
======================

With QuizMaster you can create and play quizzes where you have to select 1 of 4 answers.

This project contains the frontend of QuizMaster. 
The frontend handles the GUI for playing quizzes and managing your data like predefined quizzes and the question pool. 
The actual logic behind the data management, however, is implemented in the backend.


## API description and backend

You can find the API description, created with OpenAPI / Swagger, inside the following repository:
https://github.com/cimth/quizmaster_api

The backend, based on Spring boot, is located inside the following repository:
https://github.com/cimth/quizmaster_backend


## Included main dependencies

| Dependency                 | Version |
|----------------------------|---------|
| Angular                    | 14      |
| Bootstrap                  | 5       |
| @ng-bootstrap/ng-bootstrap | 13      |

**Note:**

* The main dependencies come with many sub-dependencies. 
  For a full overview consider the [package.json](package.json).
* Only the major versions are listed.
  To get the exact minor version, please consider the [package.json](package.json).


## Admin Token

For manipulating the data managed by the backend, you have to provide an Admin Token in the Authorization header of 
your request. 
This token is re-created on each startup of the application and will be printed on the console of the backend 
application. 
Thus, only the admin of the server can modify the database.

For more information look up the above linked backend repository.


## Development without Docker

Run `ng serve` for a dev server. 
Navigate to `http://localhost:4200/` to use the app. 
The app will automatically reload if you change any of the source files.


## Develop with Docker

You can use the Docker setup provided inside the [docker](docker) directory.
Without changing this setup, the application is started with the following settings:

| Usage                     | Default value         | Notes                                                                                |
|---------------------------|-----------------------|--------------------------------------------------------------------------------------|
| Backend URL               | http://localhost:8080 |                                                                                      |
| Environment for Angular   | local                 | The file [environment.local.ts](src/environments/environment.local.ts) will be used. |

If you change the backend URL inside [docker-compose.yml](docker/docker-compose.yml), you do not have to adjust the 
Angular environment file since it is automatically changed by the [entrypoint.sh](docker/entrypoint.sh).

You can run the Docker setup via `docker-compose up` inside the [docker](docker) directory.
The setup will automatically install all dependencies and run the application.

**Note:**
You might have to adjust the permissions to the project's directory depending on your system or add `chown` commands
(or similar) to have correct access privileges to the files.


## Build for a server

Run `ng build` to build the project. 
The build artifacts will be stored in the `dist/` directory. 
Use the `--prod` flag for a production build.
