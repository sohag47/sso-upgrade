/* eslint-disable @typescript-eslint/no-explicit-any */
import { Workbook } from "exceljs";

export interface ColumnOption<T> {
  header: string;
  key: keyof T | string;
  width?: number;
  formatter?: (value: any, item: T) => string | number;
}

export interface ExportToExcelOptions<T> {
  data: T[];
  columns: ColumnOption<T>[];
  fileName?: string;
  sheetName?: string;
}

export async function exportToExcel<T extends Record<string, any>>({
  data,
  columns,
  fileName = "Export",
  sheetName = "Data",
}: ExportToExcelOptions<T>) {
  if (!data || data.length === 0) {
    alert("No data available to export.");
    return;
  }

  // Always instantiate a fresh workbook to prevent duplicate sheet errors
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  // 1. Map columns configuration
  worksheet.columns = columns.map((col) => ({
    header: col.header,
    key: String(col.key),
    width: col.width || Math.max(col.header.length + 5, 15),
  }));

  // 2. Style Header Row
  const headerRow = worksheet.getRow(1);
  headerRow.font = { bold: true, color: { argb: "FFFFFF" } };
  headerRow.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "1E293B" }, // Dark slate
  };
  headerRow.alignment = { vertical: "middle", horizontal: "left" };

  // 3. Populate Rows
  data.forEach((item) => {
    const rowData: Record<string, any> = {};

    columns.forEach((col) => {
      const rawValue = item[col.key as keyof T];
      rowData[String(col.key)] = col.formatter
        ? col.formatter(rawValue, item)
        : (rawValue ?? "");
    });

    worksheet.addRow(rowData);
  });

  // 4. Apply Light Cell Borders
  worksheet.eachRow((row) => {
    row.eachCell((cell) => {
      cell.border = {
        top: { style: "thin", color: { argb: "E2E8F0" } },
        left: { style: "thin", color: { argb: "E2E8F0" } },
        bottom: { style: "thin", color: { argb: "E2E8F0" } },
        right: { style: "thin", color: { argb: "E2E8F0" } },
      };
    });
  });

  // 5. Download File
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${fileName}_${new Date().toISOString().slice(0, 10)}.xlsx`;
  anchor.click();

  window.URL.revokeObjectURL(url);
}
