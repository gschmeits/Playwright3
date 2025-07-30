const XLSX = require('xlsx');
const ExcelJS = require('exceljs')
import * as fs from 'fs';

const testResults = fs.readFileSync('test-results.json')
if (testResults.toString()[0] != '[') {
	fs.writeFileSync('test-results.json', '[' + testResults + ']',)
}
try {
	const results = require('./test-results.json')
	const jsonData = results

	// Datum van vandaag
	const today = new Date()
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0');
	var yyyy = today.getFullYear();
	var uur = String(today.getHours()).padStart(2, '0')
	var minuut = String(today.getMinutes()).padStart(2, '0')
	var seconde = String(today.getSeconds()).padStart(2, '0')
	var todayDate = yyyy + mm + dd + uur + minuut + seconde;

	let testscript1 = jsonData[0].suites[0].title
	let testScript3 = testscript1.split('.')
	let testScriptName = testScript3[0]

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

	let teller = 0
	// Add rows to the worksheet
	jsonData.forEach((data: any) => {
		data.suites[0].specs.forEach((data1: any) => {
			console.log('Saving testresults excuted testscript: ' + data1.title)
			worksheet.addRow({
				testscript: data.suites[0].title,
				testname: data1.title,
				result: data1.tests[teller].results[0].status,
				startTime: data1.tests[teller].results[0].startTime,
				duration: data1.tests[teller].results[0].duration,
			});
		})
		teller = teller + 1
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
		column.width = dataMax //< 20 ? 20 : dataMax;
	}

	workbook.xlsx
		.writeFile(`results_${testScriptName}_${todayDate}.xlsx`)
		.then(() => console.log("File saved!"));
}
catch(e) {
    if (e instanceof Error && e.message === "MODULE_NOT_FOUND")
        console.log("Can't load foo!");
    else
        throw e;
}