# build environment
FROM node:10 as builder

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package* /usr/app/
COPY yarn* /usr/app/

COPY public /usr/app/public
COPY src /usr/app/src

RUN yarn install

ENV NODE_ENV production
ENV CI true

RUN yarn test

RUN yarn build

# production environment
FROM nginx:alpine
RUN rm -rf /etc/nginx/conf.d
COPY nginx/conf /etc/nginx
COPY --from=builder /usr/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
