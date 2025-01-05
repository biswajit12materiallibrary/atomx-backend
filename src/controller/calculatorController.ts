import { Request, Response } from "express";
import {
  addTransaction,
  fetchTransaction,
  fetchTransactionorExcel,
} from "../service/userService";
import { sendResponse } from "../utils/statusCodeResponse";
import { mergeExcelFiles } from "../utils/helpers";
import * as fs from "fs";

export class CalculatorControllerController {
  // super user signup
  public async addTransaction(req: Request, res: Response) {
    try {
      const data = await addTransaction(req.body);
      if (!data?.success) {
        throw new Error(data?.message || "SomeThing Went Wrong");
      }
      return sendResponse(req, res, 200, data);
    } catch (error: any) {
      return sendResponse(req, res, 200, {
        success: false,
        data: {},
        message: error.message,
        statusCode: 404,
      });
    }
  }

  public async fetchTransaction(req: Request, res: Response) {
    try {
      const data = await fetchTransaction(req.body);
      if (!data?.success) {
        throw new Error(data?.message || "SomeThing Went Wrong");
      }
      return sendResponse(req, res, 200, data);
    } catch (error: any) {
      return sendResponse(req, res, 200, {
        success: false,
        data: {},
        message: error.message,
        statusCode: 404,
      });
    }
  }
  public async fetchTransactionReport(req: Request, res: Response) {
    try {
      const data: any = await fetchTransactionorExcel(req.body);
      if (!data?.success) {
        throw new Error(data?.message || "SomeThing Went Wrong");
      }

      return res.download(data.data, () => {
        fs.unlink(data.data, (err: any) => {
          if (err) {
            console.error("Error while deleting the file:", err);
          } else {
            console.log("File deleted successfully");
          }
        });
      });
    } catch (error: any) {
      return sendResponse(req, res, 200, {
        success: false,
        data: {},
        message: error.message,
        statusCode: 404,
      });
    }
  }
}
