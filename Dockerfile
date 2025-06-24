# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy only dependency-related files
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm ci

# Copy the rest of the application source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Prepare the production image
FROM node:20-alpine AS production

# Set working directory
WORKDIR /app

# Copy necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/app.js ./app.js

  

# Expose the port your app runs on (adjust as needed)
EXPOSE 3000

# Command to run the application
CMD ["node", "app.js"]
