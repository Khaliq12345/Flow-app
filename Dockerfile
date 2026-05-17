# Build Stage 1
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./

# Regenerate Nuxt types with the full source available
RUN npm run postinstall

RUN npm run build

# Build Stage 2
FROM node:22-alpine
WORKDIR /app

COPY --from=build /app/.output/ ./

EXPOSE 3000
ENV PORT=3000
ENV HOST=0.0.0.0

CMD ["node", "/app/server/index.mjs"]
