FROM node:15-alpine

WORKDIR /app

COPY . ./

RUN npm install --production
RUN npm install -g serve

EXPOSE 3000

CMD serve -s build
