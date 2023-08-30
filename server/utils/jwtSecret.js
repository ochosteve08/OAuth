import crypto from "crypto";

const generateJwtSecret = () => {
  const secret = crypto.randomBytes(32).toString("hex");
  return secret;
};
export const jwtSecret = generateJwtSecret();
