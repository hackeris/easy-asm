#!/bin/bash

mongod 1> /dev/null 2> /dev/null &
redis-server 1> /dev/null 2> /dev/null &
sleep 10
npm run start

