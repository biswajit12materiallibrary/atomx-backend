import * as fs from "fs";
import * as path from "path";
import * as XLSX from "xlsx";
const _ = require("lodash");
import transactionSchema from "../model/userModel";

export async function processAndGenerateTransactionReport(
  query: any,
  skip: number = 0,
  limit: number = 10,
  fileName: string
) {
  try {
    const data = await transactionSchema
      .find(query, { _id: 0, __v: 0 })
      .skip(skip)
      .limit(limit)
      .lean();
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    // Convert processed data to a single worksheet
    const finalWorksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, finalWorksheet, "Report");

    // Write to Excel file
    const filePath = path.join(__dirname, "../assets/files", fileName);
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    XLSX.writeFile(workbook, filePath);

    return filePath;
  } catch (err) {
    console.error("Error processing data and generating report:", err);
    return {
      success: false,
      error: "Failed to process data and generate report",
    };
  }
}

export function mergeExcelFiles(files: string[], outputFileName: string) {
  try {
    console.time("Merging Time");
    console.log(outputFileName);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    files.forEach((filePath, index) => {
      if (fs.existsSync(filePath)) {
        const data = XLSX.readFile(filePath);
        const sheetName = `Sheet${index + 1}`;

        // Append each sheet to the new workbook
        const firstSheetName = data.SheetNames[0];
        const worksheet = data.Sheets[firstSheetName];
        XLSX.utils.book_append_sheet(
          workbook,
          worksheet,
          path.basename(filePath, ".xlsx")
        );
      } else {
        console.warn(`File not found: ${filePath}`);
      }
    });

    const outputFilePath = path.join(
      __dirname,
      "../assets/files",
      outputFileName
    );
    const dir = path.dirname(outputFilePath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    XLSX.writeFile(workbook, outputFilePath);

    // Delete original files after merging
    files.forEach((filePath) => {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted: ${filePath}`);
      }
    });

    console.timeEnd("Merging Time");

    return {
      success: true,
      filePath: outputFilePath,
      fileName: outputFileName,
    };
  } catch (err) {
    console.error("Error merging Excel files:", err);
    return {
      success: false,
      error: "Failed to merge Excel files",
    };
  }
}
