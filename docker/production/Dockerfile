FROM keymetrics/pm2:latest-alpine

# Creating base "src" directory where the source repo will reside in our container.
# Code is copied from the host machine to this "src" folder in the container as a last step.
RUN mkdir /src
WORKDIR /src

# copy everything from current directory to src
COPY . /src

# Copy from cache unless the package.json file has changed
COPY ./package.json /src

COPY ./ecosystem.config.js /src

ENV NPM_CONFIG_LOGLEVEL warn

# Install node dependencies
RUN npm install

# map a volume to override the code
VOLUME [ "/src" ]

# Expose web service and nodejs debug port
EXPOSE  5000

# Show current folder structure in logs
RUN ls -al -R

CMD ["pm2-runtime", "start", "ecosystem.config.js" ]