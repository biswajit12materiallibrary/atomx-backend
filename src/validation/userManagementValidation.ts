// import { NextFunction, Request, Response } from "express";
// import { check, body, validationResult } from "express-validator";
// import { sendResponse } from "../utils/statusCodeResponse";
// export const userManagementValidation = {
//   baseAuth: [
//     check("authorization")
//       .exists({ checkFalsy: true })
//       .withMessage("Please Provide Your Token")
//       .customSanitizer((value) => value?.split(" ")[1])
//       .isJWT()
//       .withMessage("token is not valid"),

//     (req: Request, res: Response, next: NextFunction) => {
//       const errors: any = validationResult(req);
//       if (!errors.isEmpty())
//         return sendResponse(req, res, 200, {
//           success: false,
//           data: {},
//           message: errors.errors[0].msg,
//           statusCode: 422,
//         });
//       next();
//     },
//   ],

//   getAllUser: [
//     check("authorization")
//       .exists({ checkFalsy: true })
//       .withMessage("Please Provide Your Token")
//       .customSanitizer((value) => value?.split(" ")[1])
//       .isJWT()
//       .withMessage("token is not valid"),

//     body("search").optional({ checkFalsy: true }).trim(),
//     body("skip").optional().isInt({ min: 0, max: 10000 }),
//     body("limit").optional().isInt({ min: 0, max: 10000 }),
//     body("pageNo").optional().isInt({ min: 0, max: 10000 }),
//     body("sort").optional(),

//     (req: Request, res: Response, next: NextFunction) => {
//       const errors: any = validationResult(req);
//       if (!errors.isEmpty())
//         return sendResponse(req, res, 200, {
//           success: false,
//           data: {},
//           message: errors.errors[0].msg,
//           statusCode: 422,
//         });
//       next();
//     },
//   ],
// };
