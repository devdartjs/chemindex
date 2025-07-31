FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


FROM node:20-alpine AS production
WORKDIR /app


COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules


COPY --from=builder /app/dist ./dist
COPY --from=builder /app/app.js ./app.js
COPY --from=builder /app/build.js ./build.js
COPY --from=builder /app/swagger.js ./swagger.js


COPY --from=builder /app/config ./config
COPY --from=builder /app/.env* ./

COPY --from=builder /app/database ./database

COPY --from=builder /app/routes ./routes
COPY --from=builder /app/controllers ./controllers

COPY --from=builder /app/mid-admin ./mid-admin
COPY --from=builder /app/mid-clean-inputs ./mid-clean-inputs
COPY --from=builder /app/mid-functions ./mid-functions
COPY --from=builder /app/mid-security ./mid-security

COPY --from=builder /app/models ./models

COPY --from=builder /app/views ./views

COPY --from=builder /app/public ./public

COPY --from=builder /app/utils ./utils

COPY --from=builder /app/route.csurf ./route.csurf

COPY --from=builder /app/docs ./docs


EXPOSE 3000

CMD ["node", "app.js"]
