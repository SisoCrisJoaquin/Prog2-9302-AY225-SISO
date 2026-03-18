/**
 * =====================================================
 * Machine Problem 16: Random Dataset Sampler
 * Student: Siso, Cris Joaquin E.
 * Course: Programming 2
 * Date: March 18, 2026
 * Runtime: Node.js
 * 
 * Description:
 *   This program reads a CSV dataset and randomly samples N records
 *   specified by the user. It displays the sampled records in a
 *   formatted table and provides statistics about the sample.
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
        console.log("  MP16: RANDOM DATASET SAMPLER");
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

        // Step 5: Prompt user for sample size
        const sampleSize = await promptForSampleSize(rl, records.length);

        if (sampleSize <= 0 || sampleSize > records.length) {
            console.error("[ERROR] Invalid sample size.");
            rl.close();
            return;
        }

        // Step 6: Generate random sample
        console.log("\n[INFO] Generating random sample...");
        const sample = generateRandomSample(sampleSize);

        // Step 7: Display sampled records
        console.log(`\n[INFO] Displaying ${sample.length} randomly sampled records:`);
        displaySampledRecords(sample);

        // Step 8: Display statistics
        displayStatistics(sampleSize);

        rl.close();

    } catch (error) {
        console.error("[ERROR] " + error.message);
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
 * Prompts user for sample size with validation
 * Ensures sample size is within valid range
 * 
 * @param rl readline interface
 * @param maxSize Maximum records available
 * @returns Promise that resolves with valid sample size
 */
function promptForSampleSize(rl, maxSize) {
    return new Promise(resolve => {
        const askSize = () => {
            rl.question(`\nEnter sample size (1-${maxSize}): `, (input) => {
                try {
                    const sampleSize = parseInt(input.trim());
                    
                    if (isNaN(sampleSize) || sampleSize < 1 || sampleSize > maxSize) {
                        console.error(`[ERROR] Sample size must be between 1 and ${maxSize}`);
                        askSize();
                    } else {
                        resolve(sampleSize);
                    }
                } catch (e) {
                    console.error("[ERROR] Please enter a valid number.");
                    askSize();
                }
            });
        };
        askSize();
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
 * Generates a random sample of N records from the dataset
 * Uses Fisher-Yates shuffle algorithm for unbiased sampling
 * 
 * @param sampleSize Number of records to sample
 * @returns Array of randomly sampled records
 */
function generateRandomSample(sampleSize) {
    // Create array of indices
    const indices = Array.from({ length: records.length }, (_, i) => i);

    // Shuffle indices using Fisher-Yates algorithm
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    // Select first sampleSize records
    const sample = [];
    for (let i = 0; i < sampleSize; i++) {
        const randomIndex = indices[i];
        sample.push(records[randomIndex]);
    }

    return sample;
}

/**
 * Displays sampled records in formatted table
 * Shows key columns: Candidate, Exam, Score, Result, Exam Date
 * 
 * @param sample Array of sampled records to display
 */
function displaySampledRecords(sample) {
    console.log("\n" + "=".repeat(100));
    console.log(
        padRight("Candidate", 20) + " | " +
        padRight("Exam", 35) + " | " +
        padRight("Score", 8) + " | " +
        padRight("Result", 8) + " | " +
        padRight("Exam Date", 12)
    );
    console.log("=".repeat(100));

    sample.forEach(record => {
        // Extract relevant columns
        // Expected order: Candidate (0), Student/Faculty (1), Column1 (2), Exam (3), Language (4),
        //                 Exam Date (5), Score (6), Result (7), Time Used (8)
        
        const candidate = record.length > 0 ? record[0] : "N/A";
        const exam = record.length > 3 ? record[3] : "N/A";
        const score = record.length > 6 ? record[6] : "N/A";
        const result = record.length > 7 ? record[7] : "N/A";
        const examDate = record.length > 5 ? record[5] : "N/A";

        console.log(
            padRight(truncate(candidate, 20), 20) + " | " +
            padRight(truncate(exam, 35), 35) + " | " +
            padRight(truncate(score, 8), 8) + " | " +
            padRight(truncate(result, 8), 8) + " | " +
            padRight(truncate(examDate, 12), 12)
        );
    });

    console.log("=".repeat(100));
}

/**
 * Pads string to right with spaces
 * 
 * @param text Text to pad
 * @param length Target length
 * @returns Padded text
 */
function padRight(text, length) {
    return text.padEnd(length);
}

/**
 * Truncates string to maximum length and adds ellipsis if needed
 * 
 * @param text Text to truncate
 * @param maxLength Maximum allowed length
 * @returns Truncated text
 */
function truncate(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength - 3) + "...";
}

/**
 * Displays sampling statistics
 * Shows sample size, population size, and percentage
 * 
 * @param sampleSize Size of the random sample
 */
function displayStatistics(sampleSize) {
    console.log("\n" + "=".repeat(60));
    console.log("  SAMPLING STATISTICS");
    console.log("=".repeat(60));
    console.log(`Sample Size: ${sampleSize}`);
    console.log(`Population Size: ${records.length}`);
    const percentage = (sampleSize * 100.0) / records.length;
    console.log(`Sample Percentage: ${percentage.toFixed(2)}%`);
    console.log(`Remaining Records: ${records.length - sampleSize}`);
    console.log("=".repeat(60));
}

// Entry point - call main function
main();
