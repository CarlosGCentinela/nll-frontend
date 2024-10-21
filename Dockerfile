# Etapa 1: Construcción del entorno de desarrollo
FROM node:20-alpine

# Instalar Angular CLI globalmente
RUN npm install -g @angular/cli

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de configuración
COPY package*.json ./

# Instalar las dependencias
RUN npm install --production

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto 4200
EXPOSE 4200

# Comando para ejecutar el servidor de desarrollo
CMD ["ng", "serve", "--host", "0.0.0.0"]