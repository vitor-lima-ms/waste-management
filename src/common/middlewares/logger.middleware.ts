/* Other libraries imports */
import { Request, Response, NextFunction } from "express";
/* LoggerMiddleware */
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log("Request...");
  next();
}
