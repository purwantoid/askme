FROM nginx:1.19-alpine
RUN set -x ; \
  addgroup -g 1000 -S www-data ; \
  adduser -u 1000 -D -S -G www-data www-data && exit 0 ; exit 1

RUN apk add --no-cache shadow && usermod -u 1000 -o www-data && groupmod -g 1000 -o www-data

WORKDIR /var/www/

# add php session
RUN chown --changes -R www-data:www-data /var/www/