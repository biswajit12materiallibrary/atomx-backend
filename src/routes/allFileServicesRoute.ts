import { Router, Response, NextFunction, RequestHandler } from "express";
// import { MyUserRequest } from "";
import { middlewaresUserObj } from "../apiMiddlewareFileService/userApiMiddleware";
import { allRouteFuctionMiddleware } from "../middleware/commonMiddleware";

export const allFileServicesRouter = Router();

allFileServicesRouter.post(
  "/transaction/:endpointKey",
  allRouteFuctionMiddleware(middlewaresUserObj)
);
