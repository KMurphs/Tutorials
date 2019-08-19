FROM python:3.6-slim


# Installing linux utils
RUN apt-get clean \
    && apt-get -y update
RUN apt-get -y install nginx \
    && apt-get -y install python3-dev \
    && apt-get -y install build-essential

RUN apt-get install curl iputils-ping sudo ufw nano systemd dos2unix -y



# Copying whole context in the container and take care of end of lines
COPY . /server
WORKDIR /server
RUN dos2unix file * || exit 0 # if there is an error, it returns 0


# Configuring nginx
RUN cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bak
COPY nginx.conf /etc/nginx



# Installing python ecosystem
RUN pip install -r requirements.txt --src /usr/local/src



# setting up auto startup
RUN chmod +x ./start.sh
CMD ["./start.sh"]

# how to use this container
# docker build -t 127.0.0.1:testApp -f Dockerfile .
# docker run --name testApp --net testnetwork -p 60000:80 -t 127.0.0.1:testApp