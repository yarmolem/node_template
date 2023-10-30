FROM node:18-alpine as build

WORKDIR /node-app

RUN apk add --no-cache python3 make g++

COPY . .

RUN yarn install

RUN yarn build

FROM node:18-alpine as production

WORKDIR /node-app

COPY --from=build /node-app ./

RUN npm install --only=production

EXPOSE $PORT

CMD yarn start
