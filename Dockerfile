FROM node:10-alpine

RUN mkdir -p /home/user/Work/todo-server/node_modules && chown -R node:node /home/user/Work/todo-server

WORKDIR /home/user/Work/todo-server

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "server.js" ]