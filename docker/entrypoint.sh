#!/bin/bash

#######
# CHOWN MOUNTED FILES
#######

echo "Run 'chown' on mounted files ..."
sudo chown -R $USER:$USER ~/project

#######
# RUN MOUNTED PROJECT SCRIPT
#######

# the project script is not used as entrypoint script to avoid rebuilding the container each time the project
# script is updated
echo "Run project script ..."
/bin/bash -c ~/run_project.sh
