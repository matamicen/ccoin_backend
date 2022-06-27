FROM node:16-alpine


# set working directory
WORKDIR /app

# install app dependencies
# COPY package.json ./
COPY package*.json ./
RUN npm install
COPY . .
COPY .env .
RUN npm run build
# CMD ["node", "dist/main"]
# COPY yarn.lock ./
# RUN yarn install