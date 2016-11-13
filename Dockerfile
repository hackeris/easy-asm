FROM node:6.9.1

RUN apt-get update
RUN apt-get install nasm gcc gcc-multilib build-essential mongodb-server redis-server -y
RUN mkdir -p /tmp/judger
RUN touch /tmp/judger/Makefile

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install --registry=https://registry.npm.taobao.org

COPY . /usr/src/app

RUN npm run build

EXPOSE 3000

CMD [ "bash", "./launch.sh" ]
