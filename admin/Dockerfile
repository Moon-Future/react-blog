FROM nginx
RUN mkdir -p /usr/app

COPY ./dist/ /usr/share/nginx/html/

RUN npm run build

EXPOSE 80