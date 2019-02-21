FROM nginx

ARG PLATFORM

COPY mysite.template /etc/nginx/conf.d/

COPY dist/ /usr/share/nginx/html

RUN envsubst < /usr/share/nginx/html/index.html > /usr/share/nginx/html/index.html
