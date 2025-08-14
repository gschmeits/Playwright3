"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
require('@dotenvx/dotenvx').config();
console.log('test');
// Haal de gegevens uit het Excel bestand
// en zet de gegevens in een JSON bestand
var XLSX = require('xlsx');
var workbook = XLSX.readFile(process.env.EXCEL_FILE);
var sheetName = workbook.SheetNames[0];
console.log(sheetName);
var sheet = workbook.Sheets[sheetName];
var jsonData = XLSX.utils.sheet_to_json(sheet);
fs.writeFileSync(process.env.JSON_PERSONS, JSON.stringify(jsonData));
