FROM node:18-alpine AS BUILD_IMAGE

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

FROM nginx:alpine AS PRODUCTION_IMAGE

COPY --from=BUILD_IMAGE /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
