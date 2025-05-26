FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Clear everything and reinstall fresh
RUN rm -rf node_modules package-lock.json
RUN npm cache clean --force
RUN npm install

# Install Angular CLI
RUN npm install -g @angular/cli

# Copy source code
COPY . .

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0", "--disable-host-check"]