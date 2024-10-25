# Etapa 1: Construcción de la aplicación
FROM node:20.14.0-alpine

WORKDIR /app

COPY . .

RUN npm install


EXPOSE 4200

CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]
###  "start": "ng serve --host 0.0.0.0",

#solo subimos el build de angular, que es el cod reducido
#docker build -t nll-frontend:latest .
#docker run -d -p 80:80 nll-frontend:latest

#docker tag nll-frontend krlosaa/nll-frontend:latest
#docker push krlosaa/nll-frontend:latest

#prueba

