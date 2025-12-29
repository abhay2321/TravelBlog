# ---------- Build Stage ----------
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
# Copy .env.docker to .env so Vite can use it during build
RUN cp .env.docker .env || true
RUN npm run build


# ---------- Production Stage ----------
FROM nginx:alpine

# remove default nginx html
RUN rm -rf /usr/share/nginx/html/*

# copy build output
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
