FROM nginx

# 删除 Nginx 的默认配置
RUN rm /etc/nginx/conf.d/default.conf
COPY ../build /www

EXPOSE 80
