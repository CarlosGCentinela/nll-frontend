# Etapa 1: Construcción de la aplicación
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine

COPY --from=build /app/dist/nll-frontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


#solo subimos el build de angular, que es el cod reducido
#docker build -t nll-frontend:latest .
#docker run -d -p 80:80 nll-frontend:latest
