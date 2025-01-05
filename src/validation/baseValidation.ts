import { NextFunction, Request, Response } from "express";
import { check, validationResult, body } from "express-validator";
import { sendResponse } from "../utils/statusCodeResponse";

export const baseValidation = {
  baseAuth: [
    check("authorization")
      .exists({ checkFalsy: true })
      .withMessage("Please Provide Your Token")
      .customSanitizer((value) => value?.split(" ")[1])
      .isJWT()
      .withMessage("token is not valid"),

    (req: Request, res: Response, next: NextFunction) => {
      const errors: any = validationResult(req);
      if (!errors.isEmpty())
        return sendResponse(req, res, 200, {
          success: false,
          data: {},
          message: errors.errors[0].msg,
          statusCode: 422,
        });
      next();
    },
  ],
  addtransaction: [
    body("type")
      .exists({ checkFalsy: true })
      .withMessage("Type is required")
      .isIn(["credit", "debit"])
      .withMessage("Type must be credit or debit"),

    body("invoice")
      .exists({ checkFalsy: true })
      .withMessage("Invoice is required")
      .isString()
      .withMessage("Invoice must be a string"),

    body("status")
      .exists({ checkFalsy: true })
      .withMessage("Status is required")
      .isString()
      .withMessage("Status must be a string"),

    body("mobile")
      .exists({ checkFalsy: true })
      .withMessage("Mobile is required")
      .isString()
      .withMessage("Mobile must be a string")
      .isLength({ min: 10, max: 15 })
      .withMessage("Mobile number must be between 10 and 15 characters"),

    (req: Request, res: Response, next: NextFunction) => {
      const errors: any = validationResult(req);
      if (!errors.isEmpty())
        return sendResponse(req, res, 200, {
          success: false,
          data: {},
          message: errors.errors[0].msg,
          statusCode: 422,
        });
      next();
    },
  ],
};
