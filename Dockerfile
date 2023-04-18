FROM node:16

ARG NODE_ENV=""
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn
COPY . .
RUN curl -LJO https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x wait-for-it.sh
EXPOSE 8080
ENV NODE_ENV=$NODE_ENV
CMD ["./wait-for-it.sh", "db:5432", "--", "yarn", "start"]