first you need to have docker install and then run the followings commans:

docker volume create mysql-db-data

docker volume ls

docker run -d -p 3307:3306 --name mysql-db  -e MYSQL_ROOT_PASSWORD=admin --mount src=mysql-db-data,dst=/var/lib/mysql mysql
