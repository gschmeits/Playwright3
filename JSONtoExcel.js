"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const XLSX = require('xlsx');
const ExcelJS = require('exceljs');
const fs = __importStar(require("fs"));
const testResults = fs.readFileSync('test-results.json');
if (testResults.toString()[0] != '[') {
    fs.writeFileSync('test-results.json', '[' + testResults + ']');
}
try {
    const results = require('./test-results.json');
    const jsonData = results;
    // Datum van vandaag
    const today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    var uur = String(today.getHours()).padStart(2, '0');
    var minuut = String(today.getMinutes()).padStart(2, '0');
    var seconde = String(today.getSeconds()).padStart(2, '0');
    var todayDate = yyyy + mm + dd + uur + minuut + seconde;
    let testscript1 = jsonData[0].suites[0].title;
    let testScript3 = testscript1.split('.');
    let testScriptName = testScript3[0];
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(testScriptName);
    worksheet.columns = [
        { header: "Testscript name", key: "testscript", },
        { header: "Test name", key: "testname" },
        { header: "Test result", key: "result" },
        { header: "Start time", key: "startTime" },
        { header: "Duration", key: "duration" }
    ];
    worksheet.getRow(1).font = {
        bold: true
    };
    let teller = 0;
    // Add rows to the worksheet
    jsonData.forEach((data) => {
        data.suites[0].specs.forEach((data1) => {
            console.log('Saving testresults excuted testscript: ' + data1.title);
            worksheet.addRow({
                testscript: data.suites[0].title,
                testname: data1.title,
                result: data1.tests[teller].results[0].status,
                startTime: data1.tests[teller].results[0].startTime,
                duration: data1.tests[teller].results[0].duration,
            });
        });
        teller = teller + 1;
    });
    for (let i = 0; i < worksheet.columns.length; i += 1) {
        let dataMax = 0;
        const column = worksheet.columns[i];
        for (let j = 1; j < column.values.length; j += 1) {
            const columnLength = column.values[j].length;
            if (columnLength > dataMax) {
                dataMax = columnLength;
            }
        }
        column.width = dataMax; //< 20 ? 20 : dataMax;
    }
    workbook.xlsx
        .writeFile(`results_${testScriptName}_${todayDate}.xlsx`)
        .then(() => console.log("File saved!"));
}
catch (e) {
    if (e instanceof Error && e.message === "MODULE_NOT_FOUND")
        console.log("Can't load foo!");
    else
        throw e;
}
