FROM node:23-alpine3.20
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3015
CMD ["node", "consumer.js"]
