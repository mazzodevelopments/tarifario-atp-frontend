FROM node:18-alpine

# DIRECTORIO DE TRABAJO
WORKDIR /app

# ARCHIVOS NECESARIOS
COPY package.json package-lock.json ./
COPY tailwind.config.ts postcss.config.mjs ./

# INSTALAR DEPENDENCIAS
RUN npm install

# COPIAR RESTO DEL CODIGO FUENTE
COPY . .

# EXPONER PUERTO DESARROLLO
EXPOSE 3000

# COMNADO PARA INICIAR DESARROLLO
CMD ["npm", "run", "dev"]