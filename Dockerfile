FROM node
MAINTAINER José Padilla
WORKDIR /usr/src/app
COPY ./server.js ./server.js
COPY ./app.js ./app.js
COPY ./index.html ./index.html
CMD node server.js