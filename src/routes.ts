/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import {
  Controller,
  ValidationService,
  FieldErrors,
  ValidateError,
  TsoaRoute,
  HttpStatusCodeLiteral,
  TsoaResponse,
  fetchMiddlewares,
} from "@tsoa/runtime";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AddressController } from "./controllers/address.controller";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthenticationController } from "./controllers/authentication.controller";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { OrdersController } from "./controllers/order.controller";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ProductsController } from "./controllers/product.controller";
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UsersController } from "./controllers/user.controller";
import { expressAuthentication } from "./middleware/authentication";
// @ts-ignore - no great way to install types from subpackage
const promiseAny = require("promise.any");
import type { RequestHandler, Router } from "express";

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  AddressRes: {
    dataType: "refObject",
    properties: {
      province: { dataType: "string", required: true },
      district: { dataType: "string", required: true },
      ward: { dataType: "string", required: true },
      specificAddress: { dataType: "string", required: true },
      phone: { dataType: "string", required: true },
      receiver: { dataType: "string", required: true },
      _id: { dataType: "string", required: true },
      default: { dataType: "boolean", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateAddressDTO: {
    dataType: "refObject",
    properties: {
      province: { dataType: "string", required: true },
      district: { dataType: "string", required: true },
      ward: { dataType: "string", required: true },
      specificAddress: { dataType: "string", required: true },
      phone: { dataType: "string", required: true },
      receiver: { dataType: "string", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Partial_CreateAddressDTO_: {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {
        province: { dataType: "string" },
        district: { dataType: "string" },
        ward: { dataType: "string" },
        specificAddress: { dataType: "string" },
        phone: { dataType: "string" },
        receiver: { dataType: "string" },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UpdateAddressDTO: {
    dataType: "refAlias",
    type: {
      dataType: "intersection",
      subSchemas: [
        { ref: "Partial_CreateAddressDTO_" },
        {
          dataType: "nestedObjectLiteral",
          nestedProperties: { default: { dataType: "boolean" } },
        },
      ],
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UserAuthenticate: {
    dataType: "refObject",
    properties: {
      token: { dataType: "string", required: true },
      name: { dataType: "string", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "Pick_ICreateUser.username-or-password_": {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {
        username: { dataType: "string", required: true },
        password: { dataType: "string", required: true },
      },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  "Pick_ICreateUser.email_": {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: { email: { dataType: "string", required: true } },
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  IEmailVerify: {
    dataType: "refAlias",
    type: { ref: "Pick_ICreateUser.email_", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UserResDTO: {
    dataType: "refObject",
    properties: {
      _id: { dataType: "string", required: true },
      name: { dataType: "string", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ICreateUser: {
    dataType: "refObject",
    properties: {
      name: { dataType: "string", required: true },
      email: { dataType: "string", required: true },
      username: { dataType: "string", required: true },
      password: { dataType: "string", required: true },
      avatar: { dataType: "string", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  FlattenMaps_T_: {
    dataType: "refAlias",
    type: {
      dataType: "nestedObjectLiteral",
      nestedProperties: {},
      validators: {},
    },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  IProductModel: {
    dataType: "refAlias",
    type: { ref: "FlattenMaps_T_", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  IOrderItem: {
    dataType: "refObject",
    properties: {
      product: {
        dataType: "union",
        subSchemas: [{ dataType: "string" }, { ref: "IProductModel" }],
        required: true,
      },
      price: { dataType: "double", required: true },
      quantity: { dataType: "double", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ICreateOrder: {
    dataType: "refObject",
    properties: {
      orderItems: {
        dataType: "array",
        array: { dataType: "refObject", ref: "IOrderItem" },
        required: true,
      },
      address: { dataType: "string", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  IOrderHistoryRes: {
    dataType: "refObject",
    properties: {
      _id: { dataType: "string", required: true },
      shortId: { dataType: "string", required: true },
      total: { dataType: "double", required: true },
      createdAt: { dataType: "string", required: true },
      firstProduct: {
        dataType: "nestedObjectLiteral",
        nestedProperties: {
          price: { dataType: "double", required: true },
          quantity: { dataType: "double", required: true },
          thumbnail: { dataType: "string", required: true },
          name: { dataType: "string", required: true },
          _id: { dataType: "string", required: true },
        },
        required: true,
      },
      orderItemsLength: { dataType: "double", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  OrderStatus: {
    dataType: "refEnum",
    enums: ["pending", "delivering", "completed"],
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  IAddress: {
    dataType: "refObject",
    properties: {
      province: { dataType: "string", required: true },
      district: { dataType: "string", required: true },
      ward: { dataType: "string", required: true },
      specificAddress: { dataType: "string", required: true },
      phone: { dataType: "string", required: true },
      receiver: { dataType: "string", required: true },
      default: { dataType: "boolean", required: true },
      deleted: { dataType: "boolean", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  IUserModel: {
    dataType: "refAlias",
    type: { ref: "FlattenMaps_T_", validators: {} },
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  IAllOrders: {
    dataType: "refObject",
    properties: {
      shortId: { dataType: "string", required: true },
      address: {
        dataType: "union",
        subSchemas: [{ dataType: "string" }, { ref: "IAddress" }],
        required: true,
      },
      userId: {
        dataType: "union",
        subSchemas: [{ dataType: "string" }, { ref: "IUserModel" }],
        required: true,
      },
      total: { dataType: "double", required: true },
      dateCreated: { dataType: "string", required: true },
      status: { ref: "OrderStatus", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  ISignJWT: {
    dataType: "refObject",
    properties: {
      userId: { dataType: "string", required: true },
      role: { dataType: "string", required: true },
    },
    additionalProperties: false,
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################
  app.post(
    "/api/v1/addresses",
    authenticateMiddleware([{ jwt: ["user"] }]),
    ...fetchMiddlewares<RequestHandler>(AddressController),
    ...fetchMiddlewares<RequestHandler>(
      AddressController.prototype.createAddress
    ),

    function AddressController_createAddress(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        dto: {
          in: "body",
          name: "dto",
          required: true,
          ref: "CreateAddressDTO",
        },
        request: {
          in: "request",
          name: "request",
          required: true,
          dataType: "object",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new AddressController();

        const promise = controller.createAddress.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.put(
    "/api/v1/addresses/:id",
    authenticateMiddleware([{ jwt: ["user"] }]),
    ...fetchMiddlewares<RequestHandler>(AddressController),
    ...fetchMiddlewares<RequestHandler>(
      AddressController.prototype.updateAddress
    ),

    function AddressController_updateAddress(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        id: { in: "path", name: "id", required: true, dataType: "string" },
        dto: {
          in: "body",
          name: "dto",
          required: true,
          ref: "UpdateAddressDTO",
        },
        request: {
          in: "request",
          name: "request",
          required: true,
          dataType: "object",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new AddressController();

        const promise = controller.updateAddress.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.delete(
    "/api/v1/addresses/:id",
    authenticateMiddleware([{ jwt: ["user"] }]),
    ...fetchMiddlewares<RequestHandler>(AddressController),
    ...fetchMiddlewares<RequestHandler>(
      AddressController.prototype.deleteAddress
    ),

    function AddressController_deleteAddress(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        id: { in: "path", name: "id", required: true, dataType: "string" },
        request: {
          in: "request",
          name: "request",
          required: true,
          dataType: "object",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new AddressController();

        const promise = controller.deleteAddress.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v1/authenticate/login",
    ...fetchMiddlewares<RequestHandler>(AuthenticationController),
    ...fetchMiddlewares<RequestHandler>(
      AuthenticationController.prototype.loginUser
    ),

    function AuthenticationController_loginUser(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        dto: {
          in: "body",
          name: "dto",
          required: true,
          ref: "Pick_ICreateUser.username-or-password_",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new AuthenticationController();

        const promise = controller.loginUser.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v1/authenticate/send-code-email",
    ...fetchMiddlewares<RequestHandler>(AuthenticationController),
    ...fetchMiddlewares<RequestHandler>(
      AuthenticationController.prototype.sendVerifyCode
    ),

    function AuthenticationController_sendVerifyCode(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        dto: { in: "body", name: "dto", required: true, ref: "IEmailVerify" },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new AuthenticationController();

        const promise = controller.sendVerifyCode.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v1/authenticate/register",
    ...fetchMiddlewares<RequestHandler>(AuthenticationController),
    ...fetchMiddlewares<RequestHandler>(
      AuthenticationController.prototype.createUser
    ),

    function AuthenticationController_createUser(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        dto: { in: "body", name: "dto", required: true, ref: "ICreateUser" },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new AuthenticationController();

        const promise = controller.createUser.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/authenticate/google",
    ...fetchMiddlewares<RequestHandler>(AuthenticationController),
    ...fetchMiddlewares<RequestHandler>(
      AuthenticationController.prototype.createGoogleClientRequest
    ),

    function AuthenticationController_createGoogleClientRequest(
      request: any,
      response: any,
      next: any
    ) {
      const args = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new AuthenticationController();

        const promise = controller.createGoogleClientRequest.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/authenticate/google/callback",
    ...fetchMiddlewares<RequestHandler>(AuthenticationController),
    ...fetchMiddlewares<RequestHandler>(
      AuthenticationController.prototype.callBackGoogle
    ),

    function AuthenticationController_callBackGoogle(
      request: any,
      response: any,
      next: any
    ) {
      const args = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new AuthenticationController();

        const promise = controller.callBackGoogle.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v1/orders",
    authenticateMiddleware([{ jwt: ["user"] }]),
    ...fetchMiddlewares<RequestHandler>(OrdersController),
    ...fetchMiddlewares<RequestHandler>(OrdersController.prototype.createOrder),

    function OrdersController_createOrder(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        body: { in: "body", name: "body", required: true, ref: "ICreateOrder" },
        request: {
          in: "request",
          name: "request",
          required: true,
          dataType: "object",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new OrdersController();

        const promise = controller.createOrder.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/orders/history",
    authenticateMiddleware([{ jwt: ["user"] }]),
    ...fetchMiddlewares<RequestHandler>(OrdersController),
    ...fetchMiddlewares<RequestHandler>(
      OrdersController.prototype.getOrderHistoryfollowStatus
    ),

    function OrdersController_getOrderHistoryfollowStatus(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        status: {
          in: "query",
          name: "status",
          required: true,
          ref: "OrderStatus",
        },
        request: {
          in: "request",
          name: "request",
          required: true,
          dataType: "object",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new OrdersController();

        const promise = controller.getOrderHistoryfollowStatus.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/orders/pagination",
    ...fetchMiddlewares<RequestHandler>(OrdersController),
    ...fetchMiddlewares<RequestHandler>(
      OrdersController.prototype.getAllOrders
    ),

    function OrdersController_getAllOrders(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        limit: {
          in: "query",
          name: "limit",
          required: true,
          dataType: "double",
        },
        page: { in: "query", name: "page", required: true, dataType: "double" },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new OrdersController();

        const promise = controller.getAllOrders.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/orders/order-follow-date/pagination",
    ...fetchMiddlewares<RequestHandler>(OrdersController),
    ...fetchMiddlewares<RequestHandler>(
      OrdersController.prototype.getOrdersFollowDate
    ),

    function OrdersController_getOrdersFollowDate(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        limit: {
          in: "query",
          name: "limit",
          required: true,
          dataType: "double",
        },
        page: { in: "query", name: "page", required: true, dataType: "double" },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new OrdersController();

        const promise = controller.getOrdersFollowDate.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.put(
    "/api/v1/orders/update-status",
    ...fetchMiddlewares<RequestHandler>(OrdersController),
    ...fetchMiddlewares<RequestHandler>(
      OrdersController.prototype.updateStatusOrder
    ),

    function OrdersController_updateStatusOrder(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        orderId: {
          in: "query",
          name: "order-id",
          required: true,
          dataType: "string",
        },
        status: {
          in: "query",
          name: "status",
          required: true,
          ref: "OrderStatus",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new OrdersController();

        const promise = controller.updateStatusOrder.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v1/products",
    ...fetchMiddlewares<RequestHandler>(ProductsController),
    ...fetchMiddlewares<RequestHandler>(
      ProductsController.prototype.createProduct
    ),

    function ProductsController_createProduct(
      request: any,
      response: any,
      next: any
    ) {
      const args = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new ProductsController();

        const promise = controller.createProduct.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/products",
    ...fetchMiddlewares<RequestHandler>(ProductsController),
    ...fetchMiddlewares<RequestHandler>(
      ProductsController.prototype.getProducts
    ),

    function ProductsController_getProducts(
      request: any,
      response: any,
      next: any
    ) {
      const args = {};

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new ProductsController();

        const promise = controller.getProducts.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/users",
    authenticateMiddleware([{ jwt: ["user"] }]),
    ...fetchMiddlewares<RequestHandler>(UsersController),
    ...fetchMiddlewares<RequestHandler>(UsersController.prototype.getTest),

    function UsersController_getTest(request: any, response: any, next: any) {
      const args = {
        request: {
          in: "request",
          name: "request",
          required: true,
          dataType: "object",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new UsersController();

        const promise = controller.getTest.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v1/users",
    ...fetchMiddlewares<RequestHandler>(UsersController),
    ...fetchMiddlewares<RequestHandler>(UsersController.prototype.createUser),

    function UsersController_createUser(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        dto: { in: "body", name: "dto", required: true, ref: "ICreateUser" },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new UsersController();

        const promise = controller.createUser.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.post(
    "/api/v1/users/sign-jwt-token",
    ...fetchMiddlewares<RequestHandler>(UsersController),
    ...fetchMiddlewares<RequestHandler>(UsersController.prototype.signJwtToken),

    function UsersController_signJwtToken(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        dto: { in: "body", name: "dto", required: true, ref: "ISignJWT" },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new UsersController();

        const promise = controller.signJwtToken.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/users/addresses",
    authenticateMiddleware([{ jwt: ["user"] }]),
    ...fetchMiddlewares<RequestHandler>(UsersController),
    ...fetchMiddlewares<RequestHandler>(
      UsersController.prototype.getMyAddresses
    ),

    function UsersController_getMyAddresses(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        request: {
          in: "request",
          name: "request",
          required: true,
          dataType: "object",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new UsersController();

        const promise = controller.getMyAddresses.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/users/:userId",
    ...fetchMiddlewares<RequestHandler>(UsersController),
    ...fetchMiddlewares<RequestHandler>(UsersController.prototype.findUserById),

    function UsersController_findUserById(
      request: any,
      response: any,
      next: any
    ) {
      const args = {
        userId: {
          in: "path",
          name: "userId",
          required: true,
          dataType: "string",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new UsersController();

        const promise = controller.findUserById.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  app.get(
    "/api/v1/users/:userId/wish-list",
    ...fetchMiddlewares<RequestHandler>(UsersController),
    ...fetchMiddlewares<RequestHandler>(UsersController.prototype.wishlist),

    function UsersController_wishlist(request: any, response: any, next: any) {
      const args = {
        userId: {
          in: "path",
          name: "userId",
          required: true,
          dataType: "string",
        },
      };

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = getValidatedArgs(args, request, response);

        const controller = new UsersController();

        const promise = controller.wishlist.apply(
          controller,
          validatedArgs as any
        );
        promiseHandler(controller, promise, response, undefined, next);
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
    return async function runAuthenticationMiddleware(
      request: any,
      _response: any,
      next: any
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      // keep track of failed auth attempts so we can hand back the most
      // recent one.  This behavior was previously existing so preserving it
      // here
      const failedAttempts: any[] = [];
      const pushAndRethrow = (error: any) => {
        failedAttempts.push(error);
        throw error;
      };

      const secMethodOrPromises: Promise<any>[] = [];
      for (const secMethod of security) {
        if (Object.keys(secMethod).length > 1) {
          const secMethodAndPromises: Promise<any>[] = [];

          for (const name in secMethod) {
            secMethodAndPromises.push(
              expressAuthentication(request, name, secMethod[name]).catch(
                pushAndRethrow
              )
            );
          }

          // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

          secMethodOrPromises.push(
            Promise.all(secMethodAndPromises).then((users) => {
              return users[0];
            })
          );
        } else {
          for (const name in secMethod) {
            secMethodOrPromises.push(
              expressAuthentication(request, name, secMethod[name]).catch(
                pushAndRethrow
              )
            );
          }
        }
      }

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      try {
        request["user"] = await promiseAny.call(Promise, secMethodOrPromises);
        next();
      } catch (err) {
        // Show most recent error as response
        const error = failedAttempts.pop();
        error.status = error.status || 401;
        next(error);
      }

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    };
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function isController(object: any): object is Controller {
    return (
      "getHeaders" in object && "getStatus" in object && "setStatus" in object
    );
  }

  function promiseHandler(
    controllerObj: any,
    promise: any,
    response: any,
    successStatus: any,
    next: any
  ) {
    return Promise.resolve(promise)
      .then((data: any) => {
        let statusCode = successStatus;
        let headers;
        if (isController(controllerObj)) {
          headers = controllerObj.getHeaders();
          statusCode = controllerObj.getStatus() || statusCode;
        }

        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

        returnHandler(response, statusCode, data, headers);
      })
      .catch((error: any) => next(error));
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function returnHandler(
    response: any,
    statusCode?: number,
    data?: any,
    headers: any = {}
  ) {
    if (response.headersSent) {
      return;
    }
    Object.keys(headers).forEach((name: string) => {
      response.set(name, headers[name]);
    });
    if (
      data &&
      typeof data.pipe === "function" &&
      data.readable &&
      typeof data._read === "function"
    ) {
      response.status(statusCode || 200);
      data.pipe(response);
    } else if (data !== null && data !== undefined) {
      response.status(statusCode || 200).json(data);
    } else {
      response.status(statusCode || 204).end();
    }
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function responder(
    response: any
  ): TsoaResponse<HttpStatusCodeLiteral, unknown> {
    return function (status, data, headers) {
      returnHandler(response, status, data, headers);
    };
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function getValidatedArgs(args: any, request: any, response: any): any[] {
    const fieldErrors: FieldErrors = {};
    const values = Object.keys(args).map((key) => {
      const name = args[key].name;
      switch (args[key].in) {
        case "request":
          return request;
        case "query":
          return validationService.ValidateParam(
            args[key],
            request.query[name],
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: "throw-on-extras" }
          );
        case "queries":
          return validationService.ValidateParam(
            args[key],
            request.query,
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: "throw-on-extras" }
          );
        case "path":
          return validationService.ValidateParam(
            args[key],
            request.params[name],
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: "throw-on-extras" }
          );
        case "header":
          return validationService.ValidateParam(
            args[key],
            request.header(name),
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: "throw-on-extras" }
          );
        case "body":
          return validationService.ValidateParam(
            args[key],
            request.body,
            name,
            fieldErrors,
            undefined,
            { noImplicitAdditionalProperties: "throw-on-extras" }
          );
        case "body-prop":
          return validationService.ValidateParam(
            args[key],
            request.body[name],
            name,
            fieldErrors,
            "body.",
            { noImplicitAdditionalProperties: "throw-on-extras" }
          );
        case "formData":
          if (args[key].dataType === "file") {
            return validationService.ValidateParam(
              args[key],
              request.file,
              name,
              fieldErrors,
              undefined,
              { noImplicitAdditionalProperties: "throw-on-extras" }
            );
          } else if (
            args[key].dataType === "array" &&
            args[key].array.dataType === "file"
          ) {
            return validationService.ValidateParam(
              args[key],
              request.files,
              name,
              fieldErrors,
              undefined,
              { noImplicitAdditionalProperties: "throw-on-extras" }
            );
          } else {
            return validationService.ValidateParam(
              args[key],
              request.body[name],
              name,
              fieldErrors,
              undefined,
              { noImplicitAdditionalProperties: "throw-on-extras" }
            );
          }
        case "res":
          return responder(response);
      }
    });

    if (Object.keys(fieldErrors).length > 0) {
      throw new ValidateError(fieldErrors, "");
    }
    return values;
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
