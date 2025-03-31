FROM node:22.14.0

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

EXPOSE 1051

CMD ["npm", "start"]