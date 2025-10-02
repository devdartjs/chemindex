import crypto from "node:crypto";
const generateNonce = () => {
  return crypto.randomBytes(16).toString("base64");
};
export default generateNonce;