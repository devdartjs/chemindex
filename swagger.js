import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";

const swaggerDocument = yaml.load("./docs/swagger-bundle.yaml");

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default setupSwagger;
