# DevDir

### Setting up with Docker

Just install Docker, please ;)

Run the commands below in the project directory.

```bash
npm install

sudo docker-compose up -d
```

That is all you need to start up the docker containers

### Using the API

Rename `.env.example` to `.env` and update with your custom configs
The command above starts the app container and services in the background.

To view the app logs, get the `container_id` with `docker ps` then `docker log -f {container-hash}`.

Yass! You are good to go!