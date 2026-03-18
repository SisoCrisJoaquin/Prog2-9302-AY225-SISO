/**
 * =====================================================
 * Machine Problem 15: Export First 50 Rows to CSV
 * Student: Siso, Cris Joaquin E.
 * Course: Programming 2
 * Date: March 18, 2026
 * Runtime: Node.js
 * 
 * Description:
 *   This program reads a CSV dataset, extracts the first 50 data rows,
 *   and exports them to a new CSV file with a timestamp. It preserves
 *   the original format and column structure.
 * =====================================================
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Variable to store all CSV records
let records = [];

// Variable to store column headers
let headers = [];

// Variable to store original header line
let originalHeaderLine = '';

/**
 * Main entry point - orchestrates program flow
 * Uses async/await for file I/O operations
 */
async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    try {
        // Step 1: Display header
        console.log("=".repeat(60));
        console.log("  MP15: EXPORT FIRST 50 ROWS TO CSV");
        console.log("=".repeat(60));

        // Step 2: Prompt user for source CSV file path
        const sourceFilePath = await question(rl, "\nEnter source CSV file path: ");

        // Step 3: Verify source file exists
        if (!fs.existsSync(sourceFilePath)) {
            console.error(`\n[ERROR] File not found: ${sourceFilePath}`);
            rl.close();
            return;
        }

        // Step 4: Read and parse CSV dataset
        console.log("\n[INFO] Reading source CSV file...");
        readCSVFile(sourceFilePath);

        if (records.length === 0) {
            console.error("[ERROR] No data records found in CSV.");
            rl.close();
            return;
        }

        console.log(`[INFO] Successfully loaded ${records.length} records.`);

        // Step 5: Generate output filename with timestamp
        const sourceDir = path.dirname(sourceFilePath);
        const outputFileName = generateOutputFileName();
        const outputFilePath = path.join(sourceDir, outputFileName);

        // Step 6: Export first 50 rows
        console.log("\n[INFO] Exporting first 50 rows...");
        const exportedCount = exportFirst50Rows(outputFilePath);

        // Step 7: Display results
        displayResults(outputFilePath, exportedCount);

    } catch (error) {
        console.error("[ERROR] " + error.message);
    } finally {
        rl.close();
    }
}

/**
 * Promisified question function for readline
 * Allows using async/await with user input
 * 
 * @param rl readline interface
 * @param query The question to ask user
 * @returns Promise that resolves with user input
 */
function question(rl, query) {
    return new Promise(resolve => {
        rl.question(query, resolve);
    });
}

/**
 * Generates output filename with timestamp
 * Format: MP15_Export_YYYY-MM-DD_HH-MM-SS.csv
 * 
 * @returns Generated filename with timestamp
 */
function generateOutputFileName() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `MP15_Export_${year}-${month}-${day}_${hours}-${minutes}-${seconds}.csv`;
}

/**
 * Reads CSV file and stores records in memory
 * Skips header rows (first 7 rows) that contain metadata
 * 
 * @param filePath Path to the CSV file
 */
function readCSVFile(filePath) {
    // Read file content synchronously
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n');

    let headerFound = false;

    // Process each line
    lines.forEach((line, index) => {
        // Skip metadata rows (first 6 lines)
        if (index < 6) {
            return;
        }

        // Line 7 (index 6) contains headers
        if (index === 6) {
            headers = parseCSVLine(line);
            originalHeaderLine = line;
            headerFound = true;
            return;
        }

        // Skip empty lines
        if (line.trim().length === 0) {
            return;
        }

        // Parse data records
        if (headerFound) {
            const record = parseCSVLine(line);
            records.push(record);
        }
    });
}

/**
 * Parses a CSV line considering quoted fields
 * Handles commas inside quoted values properly
 * 
 * @param line The CSV line to parse
 * @returns Array of parsed field values
 */
function parseCSVLine(line) {
    const fields = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const c = line.charAt(i);

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
 * Exports the first 50 rows to a new CSV file
 * Includes the header row and preserves the original format
 * 
 * @param outputFilePath Path where the CSV file will be saved
 * @returns Number of rows exported (excluding header)
 */
function exportFirst50Rows(outputFilePath) {
    let csvContent = originalHeaderLine + '\n';

    // Write the first 50 data rows (or all if less than 50)
    const rowsToExport = Math.min(50, records.length);

    for (let i = 0; i < rowsToExport; i++) {
        const record = records[i];
        const csvLine = convertRecordToCSVLine(record);
        csvContent += csvLine + '\n';
    }

    // Write to file
    fs.writeFileSync(outputFilePath, csvContent, 'utf-8');

    return rowsToExport;
}

/**
 * Converts a record array back to CSV format
 * Properly quotes fields that contain commas or quotes
 * 
 * @param record Array of field values
 * @returns CSV formatted line
 */
function convertRecordToCSVLine(record) {
    const csvFields = record.map(field => {
        if (field && (field.includes(',') || field.includes('"'))) {
            return '"' + field.replace(/"/g, '""') + '"';
        }
        return field || '';
    });

    return csvFields.join(',');
}

/**
 * Displays the export results in formatted output
 * Shows output file path and number of rows exported
 * 
 * @param outputFilePath Path to the output CSV file
 * @param exportedCount Number of rows exported
 */
function displayResults(outputFilePath, exportedCount) {
    console.log("\n" + "=".repeat(60));
    console.log("  EXPORT RESULTS");
    console.log("=".repeat(60));
    console.log("[SUCCESS] CSV export completed!");
    console.log(`Output File: ${outputFilePath}`);
    console.log(`Rows Exported: ${exportedCount}`);
    console.log(`Header Row: Yes`);
    console.log(`Total Lines: ${exportedCount + 1}`);
    console.log("=".repeat(60));
}

// Entry point - call main function
main();
