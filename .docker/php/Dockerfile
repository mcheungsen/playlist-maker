FROM php:8.2-fpm AS php

ADD ./symfony.ini /usr/local/etc/php/conf.d/
ADD ./supervisord.conf /etc/supervisor/conf.d/

RUN groupmod -g 1000 www-data
RUN usermod -u 1000 -g 1000 www-data

RUN apt-get update \
    && apt-get install -y --no-install-recommends vim curl git zlib1g-dev libicu-dev g++ unzip libzip-dev zip libreoffice openssh-server supervisor

RUN apt-get install --no-install-recommends -y libpng-dev
RUN docker-php-ext-configure zip
RUN docker-php-ext-configure gd
RUN docker-php-ext-install gd
RUN docker-php-ext-install -j$(nproc) zip
RUN docker-php-ext-install -j$(nproc) pdo_mysql
RUN docker-php-ext-install -j$(nproc) intl
RUN docker-php-ext-install -j$(nproc) pcntl

COPY --from=composer:2.5 /usr/bin/composer /usr/bin/composer

RUN chown -R www-data /var/www
RUN touch /var/log/supervisor/supervisor.log && chmod -R 777 /var/log/supervisor/

WORKDIR /var/www/app

CMD composer install ; php-fpm
RUN chmod -R 777 /var/log/supervisor/

EXPOSE 9000
USER www-data
