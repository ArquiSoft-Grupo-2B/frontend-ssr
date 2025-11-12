# Etapa 1: construir el proyecto
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: servir el contenido
FROM node:18-alpine AS runner

WORKDIR /app
COPY --from=builder /app ./

# Expone el puerto interno
ARG PORT=3001

ENV PORT=${PORT}

EXPOSE ${PORT}

# Inicia el servidor de producción de Next.js
CMD ["npm", "start"]
