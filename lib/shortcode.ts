import crypto from "crypto";

export function generateShortCode(): string {
  return crypto.randomBytes(4).toString("base64url");
}
