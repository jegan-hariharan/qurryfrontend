FROM node:14.15.0-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install 
COPY . /app
RUN npm install -g ionic
RUN npm run-script build

FROM nginx:1.20.1
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-step /app/www/ /usr/share/nginx/html
	
