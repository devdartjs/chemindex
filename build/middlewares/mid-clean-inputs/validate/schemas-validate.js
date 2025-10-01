export function validate(schemas = {}) {
  return (req, res, next) => {
    console.log("validating user schema running!");
    const partsToCheck = ["body", "params", "query"];
    for (const part of partsToCheck) {
      const schema = schemas[part];
      if (schema) {
        const {
          error,
          value
        } = schema.validate(req[part], {
          abortEarly: false,
          stripUnknown: false // remove extre fields
        });
        if (error) {
          const messages = error.details.map(item => item.message);
          return res.status(400).json({
            error: `Invalid data in ${part}`,
            messages
          });
        }
        req[part] = value; // re-write clean data
        console.log("value:", value);
      }
    }
    console.log("validating user schema: ok!");
    next();
  };
}
export default validate;