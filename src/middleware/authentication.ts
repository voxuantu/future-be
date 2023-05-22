import * as express from "express";
import * as jwt from "jsonwebtoken";
import { UsersService } from "../services";
import HttpException from "../utils/http-exception";
import { HttpStatus } from "../constances/enum";

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
) {
  const token = request.headers["authorization"]?.split(" ")[1] || "";

  return new Promise((resolve, reject) => {
    if (!token) {
      reject(new HttpException(HttpStatus.UNAUTHORIZED, "No token provided"));
    }
    // @typescript-eslint/no-explicit-any
    jwt.verify(
      token,
      process.env.JWT_SECRET || "",
      async function (err: any, decoded: any) {
        if (err) {
          return reject(
            new HttpException(HttpStatus.UNAUTHORIZED, err.message)
          );
        }

        // Check if JWT contains all required scopes
        if (scopes && scopes.length > 0) {
          for (const scope of scopes) {
            // @typescript-eslint/no-explicit-any
            if (!decoded.role.includes(scope)) {
              return reject(
                new HttpException(
                  HttpStatus.FOBIDDEN,
                  "JWT does not contain required role."
                )
              );
            } else if (scope === "user") {
              const user = await UsersService.findUserById(decoded.userId);
              if (!user) {
                return reject(
                  new HttpException(HttpStatus.NOT_FOUND, "User not exist")
                );
              }
            }
          }
          resolve(decoded);
        }
      }
    );
  });
}
