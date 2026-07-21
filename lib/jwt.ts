import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not defined");
}

export interface AdminJwtPayload extends JwtPayload {
  id: string;
  name: string;
  email: string;
}

/**
 * Generate JWT Token
 */
export const generateToken = (
  payload: Omit<AdminJwtPayload, keyof JwtPayload>
): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
};

/**
 * Verify JWT Token
 */
export const verifyToken = (token: string): AdminJwtPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminJwtPayload;
  } catch (error) {
    return null;
  }
};