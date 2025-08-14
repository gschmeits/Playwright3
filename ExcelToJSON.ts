import * as fs from 'fs';
require('@dotenvx/dotenvx').config()

// Haal de gegevens uit het Excel bestand
// en zet de gegevens in een JSON bestand
const XLSX = require('xlsx');
const workbook = XLSX.readFile(process.env.EXCEL_FILE!);
const sheetName: string = workbook.SheetNames[0];
const sheet: object = workbook.Sheets[sheetName];
const jsonData: object = XLSX.utils.sheet_to_json(sheet);

fs.writeFileSync(process.env.JSON_PERSONS!, JSON.stringify(jsonData))
console.log(`Gegevens van bestand: ${process.env.EXCEL_FILE} van worksheet: ${sheetName} zijn overgezet naar ${process.env.JSON_PERSONS}`)