FROM node:current-alpine

WORKDIR /easyConnectUI
COPY package*.json ./
RUN ["npm", "install"]
COPY . .
CMD ["npm", "start"]

