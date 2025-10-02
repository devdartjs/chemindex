FROM node:20-alpine AS Builder
WORKDIR /indexchem

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

FROM node:20-alpine AS Runtime

RUN apk add --no-cache curl jq

COPY --from=builder /indexchem/ ./

ENV NODE_ENV=production

EXPOSE 7000

CMD ["node", "build/app.js"]