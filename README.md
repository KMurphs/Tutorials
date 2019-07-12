# docker-tutorial
Gentle introduction to docker


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
