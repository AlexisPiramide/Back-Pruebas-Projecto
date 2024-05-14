FROM node:latest

WORKDIR /app

RUN git clone https://github.com/AlexisPiramide/Back-Aplicacion-Autoescuela .

RUN npm install

CMD ["npm", "run", "dev"]
