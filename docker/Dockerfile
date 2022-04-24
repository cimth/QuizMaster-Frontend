################################################################################

#####################
# BASIC UBUNTU IMAGE WITH NON-ROOT USER
#####################
FROM ubuntu:latest AS non-root
SHELL ["/bin/bash", "-c"]

# get user data from docker-compose.yml
ENV USER="docker"
ARG USER_PASSWORD

# no interactive installation
ENV DEBIAN_FRONTEND=noninteractive

# add user
RUN adduser --disabled-password $USER && \
    echo "$USER":"$USER_PASSWORD" | chpasswd

# add sudo privileges
RUN apt-get update && \
    apt-get install -y sudo && \
    adduser $USER sudo

# run as non-root user in the following
USER $USER
WORKDIR /home/$USER

################################################################################

#####################
# ANGULAR IMAGE
#####################
FROM non-root AS angular

#######
# INSTALL NODE AND NPM VIA NVM
# See: https://e.printstacktrace.blog/using-sdkman-as-a-docker-image-for-jenkins-pipeline-a-step-by-step-guide/
#######

# install prerequisites
USER root

RUN apt-get update && \
    apt-get install -y curl

# install nvm, Node LTS and Angular CLI for non-root user
USER $USER

RUN curl https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash && \
    source /home/$USER/.nvm/nvm.sh && \
    nvm install --lts && \
    nvm use --lts

RUN source /home/$USER/.nvm/nvm.sh && \
    npm install -g @angular/cli

################################################################################

#####################
# ENTRYPOINT IMAGE
#####################
FROM angular AS entrypoint

# allow sudo commands from entrypoint and project script to be executed without a password
USER root
RUN echo "$USER ALL=(ALL) NOPASSWD: /usr/bin/chown" > /etc/sudoers.d/$USER

# copy entrypoint script with root privileges so that it cannot be changed but only executed inside the container
COPY --chown=root:root ./entrypoint.sh /home/$USER/entrypoint.sh
RUN chmod o+x entrypoint.sh

# set container user and starting directory when entering the container interactively
USER $USER
WORKDIR /home/$USER/project

# use the entrypoint script to have access on the mounted project files
ENTRYPOINT ["/bin/bash", "-c", "/home/$USER/entrypoint.sh"]
