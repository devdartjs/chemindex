FROM node:20-alpine AS Builder
WORKDIR /indexchem

COPY package.json .
RUN npm install

COPY . .

FROM node:20-alpine AS Runtime

COPY --from=Builder /indexchem/ .

ENV NODE_ENV=development

EXPOSE 3000

CMD ["node", "src/app.js"]

#docker build -t chemindex .
#docker run -p 3000:3000 -v $(pwd):/indexchem --env NODE_ENV=development chemindex

