// import { Auth } from "../middleware/authentication";
import { Router, Response, NextFunction, RequestHandler } from "express";
// import { middlewareObjI } from "../middleware/commonMiddleware";
import { CalculatorControllerController } from "../controller/calculatorController";
// import { baseValidation } from "../validation/baseValidation";
// import { userManagementValidation } from "../validation/userManagementValidation";
import { baseValidation } from "../validation/baseValidation";
// import { addTransaction } from "../service/userService";
// const auth = new Auth();
const calculatorControllerController = new CalculatorControllerController();
// Define the types of the middlewaresDownloadObj to ensure it complies with TypeScript
export const middlewaresUserObj: {
  [key: string]: RequestHandler[];
} = {
  ADDTRANSACTION: [
    ...baseValidation.addtransaction, // The validation is an array of middlewares
    calculatorControllerController.addTransaction,
  ],
  GETTRANSACTION: [calculatorControllerController.fetchTransaction],
  DOWNLOADTRANSACTION: [calculatorControllerController.fetchTransactionReport],
};
