# Base image
FROM node:16-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Expose the listening port
EXPOSE 3000

# Start application
CMD ["npm", "run", "start:prod"]