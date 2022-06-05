# stage1 - build react app first 
FROM node:16 as build
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY ./package.json /usr/src/app/
COPY ./package-lock.json /usr/src/app

RUN npm install

COPY . /usr/src/app

RUN npm run build

# stage 2 - build the final image and copy the react build files
FROM nginx:1.17.8-alpine

COPY --from=build /usr/src/app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx/conf.d
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]