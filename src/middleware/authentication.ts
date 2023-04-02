import * as express from "express";
import * as jwt from "jsonwebtoken";
import { UsersService } from "../services";

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
) {
  const token = request.headers["authorization"]?.split(" ")[1] || "";

  return new Promise((resolve, reject) => {
    if (!token) {
      reject(new Error("No token provided"));
    }
    // @typescript-eslint/no-explicit-any
    jwt.verify(
      token,
      process.env.JWT_SECRET || "",
      async function (err: any, decoded: any) {
        if (err) {
          reject(err);
        }

        const user = await UsersService.findUserById(decoded.userId);
        if (!user) {
          reject(new Error("User not exist"));
        }
        // Check if JWT contains all required scopes
        if (scopes && scopes.length > 0) {
          for (const scope of scopes) {
            if (!decoded.role.includes(scope)) {
              reject(new Error("JWT does not contain required role."));
            }
          }
          resolve(decoded);
        }
      }
    );
  });
}
