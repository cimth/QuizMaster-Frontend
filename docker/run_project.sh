#!/bin/bash

# load .bashrc modified in the Dockerfile into the current bash instance
# => only with this command the environment variables for Node will be used
source $USER_HOME/.nvm/nvm.sh

# chown project
sudo chown -R $USER:$USER $USER_HOME/project

# substitute the backend URL in the target environment file
# => ATTENTION: Use "|" as delimiter for sed because the URL contains the usual delimiter "/"
#               and would not be recognized else
cd $USER_HOME/project
BACKEND_LINE_REGEX="BACKEND_URL: '.*'"
BACKEND_LINE_TARGET="BACKEND_URL: '${BACKEND_URL}'"
sed -i "s|${BACKEND_LINE_REGEX}|${BACKEND_LINE_TARGET}|" ./src/environments/environment.${ANGULAR_ENVIRONMENT}.ts

# build and run frontend
# => ATTENTION:
#    - Use '--host 0.0.0.0' for allowing requests from the host
#    - Use '--poll 2000' to automatically check for updated files every 2 seconds
npm install && ng serve --configuration=${ANGULAR_ENVIRONMENT} --host 0.0.0.0 --poll 2000

# alternative to build and run: just keep the container alive
# => can be useful when the application should be done manually or if the container should be used to e.g. update
#    the dependencies
#sleep infinity
