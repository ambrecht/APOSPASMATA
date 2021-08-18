# Base image
FROM node:lts-alpine
# Set working directory so that all subsequent command runs in this folder
WORKDIR /usr/src/app/backend
# Copy package json and install dependencies
COPY package*.json ./
RUN npm install
# Copy our app
COPY . .
# Expose port to access server
EXPOSE 8080
# Command to run our app
CMD [ "npm", "run", "dev"]