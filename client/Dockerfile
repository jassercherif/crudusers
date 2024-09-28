FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

# Build the React app
# RUN npm run build
RUN chown -R node:node /app

ENV PORT 5173

EXPOSE ${PORT}

USER node
