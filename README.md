# docker-tutorial
Gentle introduction to docker

# Containers


## First commands
```
docker --version

docker info
docker version

docker image ls --all
docker container ls --all
docker container ls -aq

docker run hello-world
```


## Building an image
The . specifies the current directory, omitting the :vxxxxx means that the image will be versioned at "latest" instead of "xxxxx"

```
docker build --tag=myImageName .
docker build --tag=myImageName:v1.0.1 .
```


## Running an image - Deploying the image as container
run image port 4000 on local host is mapped to port 80 on container
app.py specified that the "server" would run at 0.0.0.0:80 which is mapped to our localhost:4000
```
docker run -p 4000:80 friendlyhello_mytag
```
visit
```
http://localhost:4000
```
or execute
```
curl http://localhost:4000
```
Note that port 80 is first exposed when the container is setup in the docker file (EXPOSE ).
Then a mapping can be done between the container's port 80 and localhost:4000 (docker run -p)

Also note that myImageName is the name of the image that generated the container.
Once the container is spawned it gets its own ID (similar to process id) and its own name

Log in runninng container with
```
docker exec -it <container-name> sh
docker exec -it <container-name> bash
```
Also note that the app's host name is the container id


## Pushing Image to Registry

```
A registry is a collection of repository which is a collection of images
An account can create many repositories like github
```

```
docker login
```

The notation for associating a local image with a repository on a registry is username/repository:tag. 
The tag is optional, but recommended, since it is the mechanism that registries use to give Docker images a version
docker tag myImageName kmurphs/get-started:part2

At this point we just tagged the image in a way that allows it to be pushed to the repository. However, at this point,
it is an image like any other and can be viewed with:
```
docker image ls 
```

Once the tagging is done,
```
docker push username/repository:tag
```
Now it is visible in dockerhub


The follwing will pull the specific image with the specified tag from dockerhub if the image is not found on your system
```
docker run -p 4000:80 username/repository:tag
```


# Services

The docker environment has 3 levels:
```
Stak
Services
Container
```

We dealt with containers in the first part

```
A service is a construct built on top of containers that makes it possible to scale by spawning more containers replica (generated 
by the same image) doing the same things but sharing the load and increasing the service's processing power (horizontal scaling)
```

### From the docs
> In a distributed application, different pieces of the app are called “services”. For example, if you imagine a video sharing site, it probably includes a service for storing application data in a database, a service for video transcoding in the background after a user uploads something, a service for the front-end, and so on.

> Services are really just “containers in production.” A service only runs one image, but it codifies the way that image runs—what ports it should use, how many replicas of the container should run so the service has the capacity it needs, and so on. Scaling a service changes the number of container instances running that piece of software, assigning more computing resources to the service in the process.


### docker-compose.yml

You configure and run the service by using the file ***``docker-compose.yml``***. See example below
```
version: "3"
services:
  web:
    # replace username/repo:tag with your name and image details
    image: username/repo:tag
    deploy:
      replicas: 5
      resources:
        limits:
          cpus: "0.1"
          memory: 50M
      restart_policy:
        condition: on-failure
    ports:
      - "4000:80"
    networks:
      - webnet
networks:
  webnet:
```


0. **Create an app (stack) with services as listed, and networks as listed**
The service and network exist as addressable and identifiable entities

1. Create the services listed (In this case only one service is listed)
2. The service is **named** *web*
3. Pull the service's image from ...
4. Deployment policy:
- 5 replicas at any given time
- Limit cpu usage to 10% for each replica
- Allocate 50M RAM of memory to each replica
- On failure, restart failed replica
5. Forward replica's internal port 80 to localhost's port 4000 via a load-balancing network called **webnet** defined after

6. Since webnet does not have any specified parameters, it is configured with default parameters


## Run the Service

```
docker swarm init
```

Instruction is explained later in part 4

```
docker stack deploy -c docker-compose.yml getstartedlab
```

The name ``getstartedlab`` is the name we give to our app/**stack**

List running services
```
docker service ls
```
List services in a stack
```
docker stack services <your app/stack name e.g. getstartedlab>
```
The name of a service is ``<your app/stack name e.g. getstartedlab>_<the network it's configured to use>`` e.g getstartedlab_web
A container within a service is called task and receives the name ``<service name>.<incrementing counter>``
The container still get listed with ``docker container ls``
```
docker service ps getstartedlab_web
```

```
curl -4 http://localhost:4000
```
Will convince of the load balancing, you will hit different containers as you curl into the docker app/stack


Rerun ``docker stack deploy -c docker-compose.yml getstartedlab`` with updated ``docker-compose.yml`` to update the deployment configuration.