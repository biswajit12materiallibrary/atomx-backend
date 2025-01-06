import { ITransaction } from "../model/userModel";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jsonToken";
import mongoose, { ObjectId } from "mongoose"; // Correct import
import { Request, Response } from "express";
const _ = require("lodash");
import { v4 as uuidv4 } from "uuid";

import transactionSchema from "../model/userModel";
import {
  mergeExcelFiles,
  processAndGenerateTransactionReport,
} from "../utils/helpers";
import { skip } from "node:test";

export const addTransaction = async (req: ITransaction) => {
  try {
    const { type, invoice, timestamp, status, mobile } = req;

    const createUser = await transactionSchema.create({
      type,
      invoice,
      timestamp: Date.now(),
      status,
      mobile,
    });

    if (!createUser) {
      throw new Error("Transaction failed");
    }
    return {
      success: true,
      data: {},
      message: "Transaction create Successfully",
      statusCode: 200,
    };
  } catch (err: any) {
    return {
      success: false,
      data: {},
      message: err.message,
      statusCode: 404,
    };
  }
};
export const fetchTransaction = async (req: any) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = { _id: -1 },
      type,
      startDate,
      endDate,
    } = req;
    const query: any = {};
    if (type) query.type = type;

    if (startDate && endDate) {
      // Get start and end of the target date in IST
      const startOfDayIST = new Date(`${startDate}T00:00:00+05:30`);
      const endOfDayIST = new Date(`${endDate}T23:59:59.999+05:30`);
      const startUTC = new Date(startOfDayIST);
      const endUTC = new Date(endOfDayIST.toISOString());
      query.timestamp = {
        $gte: startOfDayIST.getTime(),
        $lte: endOfDayIST.getTime(),
      };
    }
    const totalcount = await transactionSchema.countDocuments(query);
    const fetch = await transactionSchema
      .find(query, { _id: 0, __v: 0 })
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    return {
      success: true,
      data: { data: fetch, totalcount: totalcount },
      message: "Transaction fetch Successfully",
      statusCode: 200,
    };
  } catch (err: any) {
    return {
      success: false,
      data: {},
      message: err.message,
      statusCode: 404,
    };
  }
};

export const fetchTransactionorExcel = async (req: any) => {
  try {
    const { type, startDate, endDate } = req;
    const query: any = {};
    if (type) query.type = type;

    if (startDate && endDate) {
      // Get start and end of the target date in IST
      // Get start and end of the target date in IST
      const startOfDayIST = new Date(`${startDate}T00:00:00+05:30`);
      const endOfDayIST = new Date(`${endDate}T23:59:59.999+05:30`);
      const startUTC = new Date(startOfDayIST);
      const endUTC = new Date(endOfDayIST.toISOString());
      query.timestamp = {
        $gte: startOfDayIST.getTime(),
        $lte: endOfDayIST.getTime(),
      };
    }
    let shipmentData;
    const totalCount: number = await transactionSchema.countDocuments(query);

    console.log("Total Count:", totalCount);

    let trenchLoop = Math.ceil(totalCount / 1000);
    console.log("trenchLoop", trenchLoop, "totalCount", totalCount);

    // set the skip and limit
    let skip = 0;
    let limit = 1000;
    const promises: any[] = [];

    console.log("***** START Of Main For Loop *****");

    // main loop get 100 products each time loop run
    for (let i = 0; i < trenchLoop; i++) {
      // database read query
      promises.push(
        processAndGenerateTransactionReport(
          query,
          skip,
          limit,
          `${uuidv4().slice(0, 8)}${skip}${limit}.xlsx`
        )
      );

      skip += 1000;
      if (skip > totalCount) {
        let finalLimit = skip - totalCount;
        limit = finalLimit;
      }
      console.log("****** End Of Inner For Loop *********");
    }

    console.log("***** End Of Main For Loop *****");
    shipmentData = await Promise.all(promises);
    const file = await mergeExcelFiles(
      shipmentData,
      `${uuidv4().slice(0, 8)}trasanction.xlsx
`
    );

    if (!file.success) {
      throw new Error("Transaction report failed");
    }

    return {
      success: true,
      data: file.filePath,
      message: "Transaction fetch Successfully",
      statusCode: 200,
    };
  } catch (err: any) {
    return {
      success: false,
      data: {},
      message: err.message,
      statusCode: 404,
    };
  }
};
