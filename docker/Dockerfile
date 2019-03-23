FROM nginx:alpine

MAINTAINER takeshi.hirosue@bigtreetc.com

COPY dist /usr/share/nginx/html

EXPOSE 80
STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]