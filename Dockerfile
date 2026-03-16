# STAGE 1: BUILD
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# STAGE 2: SERVE
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/projeto-livros/browser/ /usr/share/nginx/html/

RUN if [ -f /usr/share/nginx/html/index.csr.html ]; then \
    mv /usr/share/nginx/html/index.csr.html /usr/share/nginx/html/index.html; \
    fi

EXPOSE 80