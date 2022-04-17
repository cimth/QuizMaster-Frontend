###########################################
# BASIC UBUNTU IMAGE WITH NON-ROOT USER
###########################################
FROM ubuntu:latest AS non-root
SHELL ["/bin/bash", "-c"]

# environment
ENV USER="docker"
ENV USER_HOME="/home/$USER"

# no interactive installation
ENV DEBIAN_FRONTEND=noninteractive

#######
# ADD NON-ROOT USER
#######

# add user
RUN adduser --disabled-password $USER

# add sudo privileges
RUN apt-get update && \
    apt-get install -y sudo && \
    echo "$USER ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/$USER && \
    adduser $USER sudo

# run as non-root user in the following
USER $USER
WORKDIR $USER_HOME


###########################################
# INTERMEDIATE IMAGE FOR CONVERTING CRLF FILES TO LF FILES
# See: https://willi.am/blog/2016/08/11/docker-for-windows-dealing-with-windows-line-endings/
###########################################
FROM non-root AS files

# install dos2unix for converting from CRLF to LF
RUN sudo apt-get update && \
    sudo apt-get install -y dos2unix

# copy needed files
COPY --chown=$USER run_project.sh $USER_HOME/run_project.sh

# convert CRLF to LF
RUN dos2unix $USER_HOME/run_project.sh


###########################################
# PROJECT IMAGE
###########################################
FROM non-root AS project

# build args
ARG NODE_VERSION="16.14.2"

#######
# IMPORT CONVERTED FILES FROM INTERMEDIATE IMAGE
#######

COPY --from=files --chown=$USER $USER_HOME/run_project.sh $USER_HOME/run_project.sh

#######
# INSTALL NODE AND NPM VIA NVM
# See: https://e.printstacktrace.blog/using-sdkman-as-a-docker-image-for-jenkins-pipeline-a-step-by-step-guide/
#######

RUN sudo apt-get update && \
    sudo apt-get install -y curl

RUN curl https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash && \
    source $USER_HOME/.nvm/nvm.sh && \
    nvm install --lts && \
    nvm use --lts

#######
# INSTALL ANGULAR
#######

RUN source $USER_HOME/.nvm/nvm.sh && \
    npm install -g @angular/cli

#######
# RUN ENTRY SCRIPT
#######

# make run script to entry point to have access on the latest project files as volume
RUN chmod u+x run_project.sh
ENTRYPOINT ["/bin/bash", "-c", "./run_project.sh"]
