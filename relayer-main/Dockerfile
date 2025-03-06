FROM node:18.11.0-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock package* tsconfig.json tsconfig.build.json ./

RUN yarn install

COPY . ./

RUN yarn run prisma db pull

RUN yarn run prisma generate

RUN yarn build

EXPOSE 8000