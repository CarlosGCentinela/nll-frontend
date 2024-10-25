# Etapa 1: Construcción de la aplicación
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

# Etapa 2: Servir la aplicación con Nginx
EXPOSE 4200

CMD ["npm","run", "start"]


#solo subimos el build de angular, que es el cod reducido
#docker build -t nll-frontend:latest .
#docker run -d -p 80:80 nll-frontend:latest

#docker tag nll-frontend krlosaa/nll-frontend:latest
#docker push krlosaa/nll-frontend:latest

#prueba

