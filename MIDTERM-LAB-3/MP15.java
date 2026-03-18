import java.io.*;
import java.util.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * =====================================================
 * Machine Problem 15: Export First 50 Rows to CSV
 * Student: Siso, Cris Joaquin E.
 * Course: Programming 2
 * Date: March 18, 2026
 * 
 * Description:
 *   This program reads a CSV dataset, extracts the first 50 data rows,
 *   and exports them to a new CSV file with a timestamp. It preserves
 *   the original format and column structure.
 * =====================================================
 */
public class MP15_ExportFirst50 {

    // Variable to store all CSV records
    static List<String[]> records = new ArrayList<>();
    
    // Variable to store column headers
    static String[] headers;
    
    // Variable to store original header line
    static String originalHeaderLine;

    /**
     * Main entry point - orchestrates program flow
     */
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        try {
            // Step 1: Display header and instructions
            System.out.println("=".repeat(60));
            System.out.println("  MP15: EXPORT FIRST 50 ROWS TO CSV");
            System.out.println("=".repeat(60));
            System.out.print("\nEnter source CSV file path: ");
            String sourceFilePath = scanner.nextLine().trim();
            
            // Step 2: Verify source file exists
            File sourceFile = new File(sourceFilePath);
            if (!sourceFile.exists()) {
                System.err.println("\n[ERROR] File not found: " + sourceFilePath);
                return;
            }
            
            // Step 3: Read and parse CSV dataset
            System.out.println("\n[INFO] Reading source CSV file...");
            readCSVFile(sourceFilePath);
            
            if (records.isEmpty()) {
                System.err.println("[ERROR] No data records found in CSV.");
                return;
            }
            
            System.out.println("[INFO] Successfully loaded " + records.size() + " records.");
            
            // Step 4: Generate output filename with timestamp
            String outputFileName = generateOutputFileName();
            String outputDir = sourceFile.getParent() != null ? sourceFile.getParent() : ".";
            String outputFilePath = outputDir + File.separator + outputFileName;
            
            // Step 5: Export first 50 rows
            System.out.println("\n[INFO] Exporting first 50 rows...");
            int exportedCount = exportFirst50Rows(outputFilePath);
            
            // Step 6: Display results
            displayResults(outputFilePath, exportedCount);
            
        } catch (Exception e) {
            System.err.println("[ERROR] " + e.getMessage());
            e.printStackTrace();
        } finally {
            scanner.close();
        }
    }

    /**
     * Generates output filename with timestamp
     * Format: MP15_Export_YYYY-MM-DD_HH-MM-SS.csv
     * 
     * @return Generated filename with timestamp
     */
    static String generateOutputFileName() {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd_HH-mm-ss");
        return "MP15_Export_" + now.format(formatter) + ".csv";
    }

    /**
     * Reads CSV file and stores records in memory
     * Skips header rows (first 7 rows) that contain metadata
     * 
     * @param filePath Path to the CSV file
     * @throws IOException If file cannot be read
     */
    static void readCSVFile(String filePath) throws IOException {
        BufferedReader reader = new BufferedReader(new FileReader(filePath));
        String line;
        int lineNumber = 0;
        boolean headerFound = false;
        
        while ((line = reader.readLine()) != null) {
            lineNumber++;
            
            // Skip metadata rows (first 6 lines)
            if (lineNumber <= 6) {
                continue;
            }
            
            // Line 7 contains headers
            if (lineNumber == 7) {
                headers = parseCSVLine(line);
                originalHeaderLine = line;
                headerFound = true;
                continue;
            }
            
            // Skip empty lines
            if (line.trim().isEmpty()) {
                continue;
            }
            
            // Parse data records
            if (headerFound) {
                String[] record = parseCSVLine(line);
                records.add(record);
            }
        }
        
        reader.close();
    }

    /**
     * Parses a CSV line considering quoted fields
     * Handles commas inside quoted values properly
     * 
     * @param line The CSV line to parse
     * @return Array of parsed field values
     */
    static String[] parseCSVLine(String line) {
        List<String> fields = new ArrayList<>();
        StringBuilder current = new StringBuilder();
        boolean inQuotes = false;
        
        for (int i = 0; i < line.length(); i++) {
            char c = line.charAt(i);
            
            if (c == '"') {
                inQuotes = !inQuotes;
            } else if (c == ',' && !inQuotes) {
                fields.add(current.toString());
                current = new StringBuilder();
            } else {
                current.append(c);
            }
        }
        
        fields.add(current.toString());
        return fields.toArray(new String[0]);
    }

    /**
     * Exports the first 50 rows to a new CSV file
     * Includes the header row and preserves the original format
     * 
     * @param outputFilePath Path where the CSV file will be saved
     * @return Number of rows exported (excluding header)
     * @throws IOException If file cannot be written
     */
    static int exportFirst50Rows(String outputFilePath) throws IOException {
        BufferedWriter writer = new BufferedWriter(new FileWriter(outputFilePath));
        
        // Write header line
        writer.write(originalHeaderLine);
        writer.newLine();
        
        // Write the first 50 data rows (or all if less than 50)
        int rowsToExport = Math.min(50, records.size());
        
        for (int i = 0; i < rowsToExport; i++) {
            String[] record = records.get(i);
            String csvLine = convertRecordToCSVLine(record);
            writer.write(csvLine);
            writer.newLine();
        }
        
        writer.close();
        return rowsToExport;
    }

    /**
     * Converts a record array back to CSV format
     * Properly quotes fields that contain commas or quotes
     * 
     * @param record Array of field values
     * @return CSV formatted line
     */
    static String convertRecordToCSVLine(String[] record) {
        StringBuilder csv = new StringBuilder();
        
        for (int i = 0; i < record.length; i++) {
            String field = record[i];
            
            // Quote field if it contains comma or quote
            if (field != null && (field.contains(",") || field.contains("\""))) {
                csv.append("\"").append(field.replace("\"", "\"\"")).append("\"");
            } else {
                csv.append(field != null ? field : "");
            }
            
            // Add comma separator if not last field
            if (i < record.length - 1) {
                csv.append(",");
            }
        }
        
        return csv.toString();
    }

    /**
     * Displays the export results in formatted output
     * Shows output file path and number of rows exported
     * 
     * @param outputFilePath Path to the output CSV file
     * @param exportedCount Number of rows exported
     */
    static void displayResults(String outputFilePath, int exportedCount) {
        System.out.println("\n" + "=".repeat(60));
        System.out.println("  EXPORT RESULTS");
        System.out.println("=".repeat(60));
        System.out.println("[SUCCESS] CSV export completed!");
        System.out.printf("Output File: %s%n", outputFilePath);
        System.out.printf("Rows Exported: %d%n", exportedCount);
        System.out.printf("Header Row: Yes%n");
        System.out.printf("Total Lines: %d%n", exportedCount + 1);
        System.out.println("=".repeat(60));
    }
}
