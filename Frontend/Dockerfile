
FROM node:lts-alpine AS builder
WORKDIR /app
COPY package.json .
COPY . .
RUN yarn install --force && yarn build
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]