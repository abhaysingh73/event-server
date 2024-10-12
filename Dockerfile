FROM node:22

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY app.js app.js

RUN npm install

ENTRYPOINT ["node", "app.js"]