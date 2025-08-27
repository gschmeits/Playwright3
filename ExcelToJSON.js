"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
require('@dotenvx/dotenvx').config();
// Haal de gegevens uit het Excel bestand
// en zet de gegevens in een JSON bestand
var XLSX = require('xlsx');
var workbook = XLSX.readFile(process.env.EXCEL_FILE);
var sheetName = workbook.SheetNames[0];
var sheet = workbook.Sheets[sheetName];
var jsonData = XLSX.utils.sheet_to_json(sheet);
fs.writeFileSync(process.env.JSON_PERSONS, JSON.stringify(jsonData));
console.log("Gegevens van bestand: ".concat(process.env.EXCEL_FILE, " van worksheet: ").concat(sheetName, " zijn overgezet naar ").concat(process.env.JSON_PERSONS));
