FROM wordpress:php7.1-apache

# https://docs.docker.com/engine/reference/builder/#add
COPY --chown=www-data:www-data . /var/www/html

WORKDIR /var/www/html

# RUN chown -R www-data:www-data /var/www/html
# USER www-data


# docker build -t wp-image -f Dockerfile .
# docker run --name mysql-cont -e MYSQL_ROOT_PASSWORD=qwerty -d mysql:5.7
# docker run --name wp-cont --link mysql-cont:mysql -p 8000:80 -d wp-image