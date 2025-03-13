# Use the official Playwright image (has browsers & dependencies)
FROM mcr.microsoft.com/playwright:focal

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install -g artillery
RUN npm install

# Copy your Artillery test files
COPY . .

# Run your Artillery test by default
CMD ["artillery", "run", "load-test.ts"]
