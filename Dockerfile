FROM node:8.10.0

# Creating base "src" directory where the source repo will reside in our container.
# Code is copied from the host machine to this "src" folder in the container as a last step.
RUN mkdir /src
WORKDIR /src

# Copy from cache unless the package.json file has changed
COPY ./package.json /src

# Install node dependencies
RUN npm install

# copy everything from current directory to src
COPY . /src

RUN npm install -g nodemon

# map a volume to override the code
VOLUME [ "/src" ]

# Expose web service and nodejs debug port
EXPOSE  5000

CMD ["nodemon"]