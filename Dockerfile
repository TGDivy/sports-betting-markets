FROM node:18-alpine AS builder
ENV NODE_ENV production

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install
COPY . .
RUN npm run build


# --------------------------------------
FROM nginx:latest
ENV NODE_ENV production

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build/ /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]