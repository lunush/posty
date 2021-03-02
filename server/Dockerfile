FROM node:15-alpine

WORKDIR /app

COPY . ./

RUN npm install --production
RUN npm run build

# tsc ignores *.graphql files
# See: https://github.com/ardatan/graphql-tools/issues/273
RUN cp src/schema.graphql build/schema.graphql

EXPOSE 3456

CMD node build/index.js
