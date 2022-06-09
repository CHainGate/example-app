FROM node:16 AS base
COPY nodejs-server ./
WORKDIR /nodejs-server
RUN npm install

FROM base as builder
CMD ["npm", "run", "prod"]