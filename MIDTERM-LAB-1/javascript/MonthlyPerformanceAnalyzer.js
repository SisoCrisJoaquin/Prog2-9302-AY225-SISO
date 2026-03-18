/**
 * MonthlyPerformanceAnalyzer.js
 *
 * Reads a VGChartz-style CSV dataset from a user-provided file path,
 * groups game records by release month, computes total sales per month,
 * displays a sorted monthly summary, and identifies the best-performing month.
 *
 * Usage: node MonthlyPerformanceAnalyzer.js
 */

const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// ─────────────────────────────────────────────
//  Data Record Module
// ─────────────────────────────────────────────

/**
 * Creates a DataRecord object from parsed CSV fields.
 * @param {string} title       - Game title
 * @param {number} totalSales  - Total worldwide sales (in millions)
 * @param {string} releaseDate - Release date in YYYY-MM-DD format
 * @returns {object} DataRecord with getMonthKey() method
 */
function createDataRecord(title, totalSales, releaseDate) {
    return {
        title: title,
        totalSales: totalSales,
        releaseDate: releaseDate,

        /**
         * Extracts the month key (YYYY-MM) from the release date.
         * @returns {string|null} month key or null if date is invalid
         */
        getMonthKey: function () {
            if (!releaseDate || releaseDate.length < 7) {
                return null;
            }
            return releaseDate.substring(0, 7);
        },

        toString: function () {
            const paddedTitle = title.substring(0, 50).padEnd(50);
            return `${paddedTitle} | Sales: ${totalSales.toFixed(2).padStart(8)}M | Date: ${releaseDate}`;
        }
    };
}

// ─────────────────────────────────────────────
//  CSV Parsing Module
// ─────────────────────────────────────────────

/**
 * Parses a single CSV line, handling quoted fields that may contain commas.
 * @param {string} line - A single CSV line
 * @returns {string[]} Array of field values
 */
function parseCsvLine(line) {
    const fields = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (c === '"') {
            inQuotes = !inQuotes;
        } else if (c === ',' && !inQuotes) {
            fields.push(current);
            current = '';
        } else {
            current += c;
        }
    }
    fields.push(current);
    return fields;
}

/**
 * Finds the index of a column by name (case-insensitive).
 * @param {string[]} headers - Array of header names
 * @param {string} name      - Column name to find
 * @returns {number} Column index, or -1 if not found
 */
function findColumnIndex(headers, name) {
    for (let i = 0; i < headers.length; i++) {
        if (headers[i].trim().toLowerCase() === name.toLowerCase()) {
            return i;
        }
    }
    return -1;
}

// ─────────────────────────────────────────────
//  File Loading Module
// ─────────────────────────────────────────────

/**
 * Loads and parses the CSV dataset from the given file path.
 * @param {string} filePath - Path to the CSV file
 * @returns {object[]} Array of DataRecord objects
 */
function loadDataset(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split(/\r?\n/);

    if (lines.length === 0 || lines[0].trim() === '') {
        throw new Error('CSV file is empty.');
    }

    const headers = parseCsvLine(lines[0]);
    const titleIndex = findColumnIndex(headers, 'title');
    const totalSalesIndex = findColumnIndex(headers, 'total_sales');
    const releaseDateIndex = findColumnIndex(headers, 'release_date');

    if (titleIndex === -1 || totalSalesIndex === -1 || releaseDateIndex === -1) {
        throw new Error(
            'CSV file is missing required columns. Expected: title, total_sales, release_date. ' +
            'Found headers: ' + lines[0]
        );
    }

    const records = [];
    let skippedRows = 0;
    const maxIndex = Math.max(titleIndex, totalSalesIndex, releaseDateIndex);

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line === '') {
            continue;
        }

        try {
            const fields = parseCsvLine(line);

            if (fields.length <= maxIndex) {
                skippedRows++;
                continue;
            }

            const title = fields[titleIndex].trim();
            const salesStr = fields[totalSalesIndex].trim();
            const releaseDate = fields[releaseDateIndex].trim();

            // Skip rows with empty sales or date
            if (salesStr === '' || releaseDate === '') {
                skippedRows++;
                continue;
            }

            const totalSales = parseFloat(salesStr);
            if (isNaN(totalSales)) {
                skippedRows++;
                continue;
            }

            const record = createDataRecord(title, totalSales, releaseDate);

            if (record.getMonthKey() !== null) {
                records.push(record);
            } else {
                skippedRows++;
            }
        } catch (e) {
            skippedRows++;
        }
    }

    console.log(`Dataset loaded: ${records.length} valid records.`);
    if (skippedRows > 0) {
        console.log(`Skipped ${skippedRows} rows (missing/invalid data).`);
    }

    return records;
}

// ─────────────────────────────────────────────
//  Analytics Module
// ─────────────────────────────────────────────

/**
 * Groups records by month and computes total sales per month.
 * @param {object[]} records - Array of DataRecord objects
 * @returns {Map<string, number>} Map of month-key to total sales
 */
function computeMonthlySales(records) {
    const monthlySales = new Map();

    for (const record of records) {
        const monthKey = record.getMonthKey();
        if (monthKey !== null) {
            const current = monthlySales.get(monthKey) || 0;
            monthlySales.set(monthKey, current + record.totalSales);
        }
    }

    return monthlySales;
}

/**
 * Sorts monthly sales by month key in ascending order.
 * @param {Map<string, number>} monthlySales - Unsorted monthly sales map
 * @returns {Array<[string, number]>} Sorted array of [month, sales] pairs
 */
function sortMonthlySales(monthlySales) {
    const entries = Array.from(monthlySales.entries());
    entries.sort((a, b) => a[0].localeCompare(b[0]));
    return entries;
}

// ─────────────────────────────────────────────
//  Display Module
// ─────────────────────────────────────────────

/**
 * Displays the formatted monthly sales summary and identifies the best month.
 * @param {Array<[string, number]>} sortedMonthlySales - Sorted monthly sales data
 */
function displayResults(sortedMonthlySales) {
    if (sortedMonthlySales.length === 0) {
        console.log('No monthly data available to display.');
        return;
    }

    let bestMonth = null;
    let bestSales = -Infinity;

    console.log('');
    console.log('=======================================================');
    console.log('         MONTHLY PERFORMANCE SUMMARY                   ');
    console.log('=======================================================');
    console.log(`  ${'Month'.padEnd(12)} | ${'Total Sales (M)'.padStart(18)} `);
    console.log('-------------------------------------------------------');

    for (const [month, sales] of sortedMonthlySales) {
        console.log(`  ${month.padEnd(12)} | ${sales.toFixed(2).padStart(18)} `);

        if (sales > bestSales) {
            bestSales = sales;
            bestMonth = month;
        }
    }

    console.log('-------------------------------------------------------');
    console.log(`  Total Months Analyzed: ${sortedMonthlySales.length}`);
    console.log('=======================================================');
    console.log('');
    console.log('*** BEST-PERFORMING MONTH ***');
    console.log(`  Month : ${bestMonth}`);
    console.log(`  Sales : ${bestSales.toFixed(2)}M`);
    console.log('=======================================================');
}

// ─────────────────────────────────────────────
//  File Path Validation & Main Flow
// ─────────────────────────────────────────────

/**
 * Validates that the given path points to a readable CSV file.
 * @param {string} filePath - The file path to validate
 * @returns {string|null} Error message, or null if valid
 */
function validateFilePath(filePath) {
    if (!filePath || filePath.trim() === '') {
        return 'Error: File path cannot be empty. Please try again.';
    }

    filePath = filePath.trim();

    if (!fs.existsSync(filePath)) {
        return 'Error: File does not exist. Please try again.';
    }

    try {
        const stats = fs.statSync(filePath);
        if (!stats.isFile()) {
            return 'Error: Path is not a file. Please try again.';
        }
    } catch (e) {
        return 'Error: Cannot access file. Please try again.';
    }

    try {
        fs.accessSync(filePath, fs.constants.R_OK);
    } catch (e) {
        return 'Error: File is not readable. Please try again.';
    }

    if (!filePath.toLowerCase().endsWith('.csv')) {
        return 'Error: File is not in CSV format (.csv). Please try again.';
    }

    return null;
}

/**
 * Asks the user for a valid file path, looping until one is provided.
 * Then processes the dataset and displays results.
 */
function askFilePath() {
    rl.question('Enter dataset file path: ', function (path) {
        const error = validateFilePath(path);

        if (error) {
            console.log(error);
            askFilePath();
            return;
        }

        console.log('File found. Processing...');
        console.log('');

        try {
            // Step 1: Load dataset
            const records = loadDataset(path.trim());

            if (records.length === 0) {
                console.log('No valid records found in the dataset.');
                rl.close();
                return;
            }

            // Step 2: Compute monthly sales
            const monthlySales = computeMonthlySales(records);

            // Step 3: Sort by month ascending
            const sortedMonthlySales = sortMonthlySales(monthlySales);

            // Step 4: Display results
            displayResults(sortedMonthlySales);
        } catch (e) {
            console.log('Error reading dataset: ' + e.message);
        }

        rl.close();
    });
}

// Main execution
console.log('=======================================================');
console.log('       MONTHLY PERFORMANCE ANALYZER                    ');
console.log('=======================================================');
console.log('');

askFilePath();
