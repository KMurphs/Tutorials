FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock /usr/src/app/
RUN yarn --pure-lockfile

# Bundle app source
COPY . /usr/src/app

# RUN sed $'s/\r$//' up.sh > up.unix.sh
# RUN sed $'s/\r$//' down.sh > down.unix.sh
# RUN cat -v up.sh
# RUN cat -v up.unix.sh
# RUN chmod +x up.unix.sh
# RUN chmod +x down.unix.sh
# RUN cp up.unix.sh /up.unix.sh
# RUN cp down.unix.sh /down.unix.sh

RUN cp up.sh /up.sh
RUN cp down.sh /down.sh

EXPOSE 3000
CMD [ "node", "." ]
