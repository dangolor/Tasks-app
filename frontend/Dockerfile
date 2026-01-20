FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

#No instalamos por que choca con el node_modules volumen (se usa para una instalacion local sencilla)
#RUN npm install

COPY . .

EXPOSE 5173

CMD ["sh", "-c", "if [ ! -d node_modules ] || [ ! \"$(ls -A node_modules)\" ]; then npm install; fi && npm run dev -- --host"]
