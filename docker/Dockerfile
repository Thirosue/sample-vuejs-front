FROM nginx:alpine

MAINTAINER takeshi.hirosue@bigtreetc.com

COPY dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]