FROM node:15-alpine

WORKDIR /app

COPY package*.json .
RUN npm install --production

COPY . .
RUN npm install -g serve

EXPOSE 3000

CMD serve -s build
