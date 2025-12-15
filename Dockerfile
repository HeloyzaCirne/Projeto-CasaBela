FROM node:latest

WORKDIR /app

COPY *.json .

COPY .env .

COPY prisma ./prisma

RUN npm install

RUN npx prisma generate

COPY dist .

EXPOSE 3000

CMD [ "npm", "run", "production" ]
