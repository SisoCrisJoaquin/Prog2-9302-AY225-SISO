/**
 * =====================================================
 * Machine Problem 14: Count Keyword Occurrences
 * Student: Siso, Cris Joaquin E.
 * Course: Programming 2
 * Date: March 18, 2026
 * Runtime: Node.js
 * 
 * Description:
 *   This program reads a CSV dataset and counts how many times
 *   a user-specified keyword appears in the dataset. It searches
 *   across all columns and provides a detailed frequency count.
 * =====================================================
 */

const fs = require('fs');
const readline = require('readline');

// Variable to store all CSV records
let records = [];

// Variable to store column headers
let headers = [];

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
        console.log("  MP14: COUNT KEYWORD OCCURRENCES");
        console.log("=".repeat(60));

        // Step 2: Prompt user for CSV file path
        const filePath = await question(rl, "\nEnter CSV file path: ");

        // Step 3: Verify file exists
        if (!fs.existsSync(filePath)) {
            console.error(`\n[ERROR] File not found: ${filePath}`);
            rl.close();
            return;
        }

        // Step 4: Read and parse CSV dataset
        console.log("\n[INFO] Reading CSV file...");
        readCSVFile(filePath);

        if (records.length === 0) {
            console.error("[ERROR] No data records found in CSV.");
            rl.close();
            return;
        }

        console.log(`[INFO] Successfully loaded ${records.length} records.`);

        // Step 5: Prompt user for keyword to search
        const keyword = await question(rl, "\nEnter keyword to search: ");

        if (keyword.trim().length === 0) {
            console.error("[ERROR] Keyword cannot be empty.");
            rl.close();
            return;
        }

        // Step 6: Count keyword occurrences
        console.log(`\n[INFO] Searching for keyword: "${keyword}"`);
        const totalCount = countKeywordOccurrences(keyword);

        // Step 7: Display results
        displayResults(keyword, totalCount);

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
            fields.push(current.trim());
            current = '';
        } else {
            current += c;
        }
    }

    fields.push(current.trim());
    return fields;
}

/**
 * Counts how many times a keyword appears in the dataset
 * Performs case-insensitive search across all fields
 * 
 * @param keyword The keyword to search for
 * @returns Total number of keyword occurrences
 */
function countKeywordOccurrences(keyword) {
    let count = 0;
    const searchTerm = keyword.toLowerCase();

    // Iterate through all records
    records.forEach(record => {
        // Search each field in the record
        record.forEach(field => {
            if (field && field.toLowerCase().includes(searchTerm)) {
                count++;
            }
        });
    });

    return count;
}

/**
 * Displays the search results in formatted output
 * Shows keyword, total count, and percentage
 * 
 * @param keyword The keyword searched
 * @param count Total occurrences found
 */
function displayResults(keyword, count) {
    console.log("\n" + "=".repeat(60));
    console.log("  SEARCH RESULTS");
    console.log("=".repeat(60));
    console.log(`Keyword Searched: "${keyword}"`);
    console.log(`Total Occurrences: ${count}`);
    console.log(`Total Records: ${records.length}`);

    // Calculate percentage of records containing keyword
    const percentage = records.length > 0 ? (count * 100.0 / records.length) : 0;
    console.log(`Percentage: ${percentage.toFixed(2)}%`);
    console.log("=".repeat(60));
}

// Entry point - call main function
main();
