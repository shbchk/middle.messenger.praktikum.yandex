FROM node:18
WORKDIR /var/www
COPY . .
CMD npm install && npm run build && node ./server.js
EXPOSE 3000
