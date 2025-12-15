FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY dist/* .

EXPOSE 3000

CMD [ "npm", "run", "start" ]