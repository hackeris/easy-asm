#!/bin/bash

mongod &
redis-server &
sleep 10
npm run start

