# Use an official Node runtime as a base image
FROM node:20 as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Angular CLI
RUN npm install -g @angular/cli@17

# Install project dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the Angular project
RUN ng build

# Use Nginx as the base image for serving the Angular app
FROM nginx:alpine


# Set the working directory in the container
WORKDIR /app

# Remove the default NGINX configuration (optional, if not needed)
RUN rm /etc/nginx/conf.d/default.conf

# Copy the NGINX configuration file (if you have one)
COPY nginx.conf /etc/nginx/conf.d/

# Copy the built Angular application from the "builder" stage to the NGINX container
COPY --from=builder /app/dist/home-page /usr/share/nginx/html

