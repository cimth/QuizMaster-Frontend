#!/bin/bash

#######
# LOAD ENVIRONMENT VARIABLES FOR DEVELOPMENT TOOLS
#######

echo "Load environment variables ..."

# load Node variables
source ~/.nvm/nvm.sh

#######
# GO TO PROJECT DIRECTORY
#######

echo "Go to ~/project ..."
cd ~/project

#######
# ADJUST PROJECT SETTINGS
#######

echo "Adjust project settings ..."

# substitute the backend URL in the target environment file
# => ATTENTION: Use "|" as delimiter for sed because the URL contains the usual delimiter "/"
#               and would not be recognized else

BACKEND_LINE_REGEX="BACKEND_URL: '.*'"
BACKEND_LINE_TARGET="BACKEND_URL: '${BACKEND_URL}'"
sed -i "s|${BACKEND_LINE_REGEX}|${BACKEND_LINE_TARGET}|" ./src/environments/environment.${ANGULAR_ENVIRONMENT}.ts

#######
# STARTUP COMMAND
#######

# just keep the container alive; the application has to be started interactively
echo "Keep container alive ..."
sleep infinity

# alternative to sleep infinity: automatically build and run application
# => ATTENTION:
#    - Use '--host 0.0.0.0' for allowing requests from the host
#    - Use '--poll 2000' to automatically check for updated files every 2 seconds
#echo "Start application ..."
#npm install && ng serve --configuration=${ANGULAR_ENVIRONMENT} --host 0.0.0.0 --poll 2000
