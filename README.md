# todo-app-node-server

simple dockerized todo-app-server api

## Instructions

### To run in local
- git clone this repo
- set up your .env file (look in .env-example)
- run ```npm install``` or ```yarn install```
- open postman and import this link ```https://www.postman.com/muhamm4dkhal3d/workspace/newest-workspace/collection/12497399-2ef9de83-c433-4242-9c55-b574153c6ad6```

## To run with docker
- run ```docker pull muhammadkholid/todo-app-server:v1.0.3```
- run ```docker-compose up -d```
- yeay now running from docker
- then check the api from postman, link above.

if you wanna check log from dockerimage
- run ```docker ps```
- copy the container ID
- run ```docker logs <container ID>```


## Attention
always check file config.js. it is defined whether run from local or from docker image port
