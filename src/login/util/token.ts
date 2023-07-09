import * as jwt from 'jsonwebtoken';

export const generateToken = (payload: any) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};
