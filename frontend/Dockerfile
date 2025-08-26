# Estágio de Build de Produção
FROM node:20-alpine AS production-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Estágio Final de Produção
FROM nginx:1.25-alpine
COPY --from=production-builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]