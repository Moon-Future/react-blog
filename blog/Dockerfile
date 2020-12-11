FROM node:12-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm i --production --registry=https://registry.npm.taobao.org

COPY . /usr/src/app

RUN npm run build

EXPOSE 9000

CMD [ "npm", "start" ]