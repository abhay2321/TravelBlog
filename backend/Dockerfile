FROM node:18-alpine

WORKDIR /app

# copy only dependency files first (cache friendly)
COPY package.json package-lock.json ./

# install only production deps (low memory)
RUN npm ci --only=production --no-audit --no-fund

# copy remaining code
COPY . .

EXPOSE 8083

CMD ["node", "server.js"]