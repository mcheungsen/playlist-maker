# nuxt-symfony-project
composer require symfony/orm-pack
composer require --dev symfony/maker-bundle

php bin/console doctrine:database:create

{
  "mysqlOptions": {
    "authProtocol": "default",
    "enableSsl": "Disabled"
  },
  "previewLimit": 50,
  "server": "localhost",
  "port": 3307,
  "driver": "MySQL",
  "name": "db_to_name",
  "database": "to_name",
  "username": "root",
  "password": "root"
}

api-platform : localhost/api/docs 