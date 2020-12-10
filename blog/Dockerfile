FROM node:alpine
RUN mkdir -p /usr/app

WORKDIR /usr/app
COPY package.json /usr/app

RUN npm install --production

COPY . /usr/app

RUN npm run start

EXPOSE 9000