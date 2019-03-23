FROM nginx:alpine

MAINTAINER takeshi.hirosue@bigtreetc.com

COPY dist /usr/share/nginx/html

EXPOSE 8080
STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]