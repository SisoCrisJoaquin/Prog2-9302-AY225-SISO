import java.io.*;
import java.util.*;

/**
 * =====================================================
 * Machine Problem 14: Count Keyword Occurrences
 * Student: Siso, Cris Joaquin E.
 * Course: Programming 2
 * Date: March 18, 2026
 * 
 * Description:
 *   This program reads a CSV dataset and counts how many times
 *   a user-specified keyword appears in the dataset. It searches
 *   across all columns and provides a detailed frequency count.
 * =====================================================
 */
public class MP14_KeywordCounter {

    // Variable to store all CSV records
    static List<String[]> records = new ArrayList<>();
    
    // Variable to store column headers
    static String[] headers;

    /**
     * Main entry point - orchestrates program flow
     */
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        try {
            // Step 1: Prompt user for CSV file path
            System.out.println("=".repeat(60));
            System.out.println("  MP14: COUNT KEYWORD OCCURRENCES");
            System.out.println("=".repeat(60));
            System.out.print("\nEnter CSV file path: ");
            String filePath = scanner.nextLine().trim();
            
            // Step 2: Verify file exists
            File file = new File(filePath);
            if (!file.exists()) {
                System.err.println("\n[ERROR] File not found: " + filePath);
                return;
            }
            
            // Step 3: Read and parse CSV dataset
            System.out.println("\n[INFO] Reading CSV file...");
            readCSVFile(filePath);
            
            if (records.isEmpty()) {
                System.err.println("[ERROR] No data records found in CSV.");
                return;
            }
            
            System.out.println("[INFO] Successfully loaded " + records.size() + " records.");
            
            // Step 4: Prompt user for keyword to search
            System.out.print("\nEnter keyword to search: ");
            String keyword = scanner.nextLine().trim();
            
            if (keyword.isEmpty()) {
                System.err.println("[ERROR] Keyword cannot be empty.");
                return;
            }
            
            // Step 5: Count keyword occurrences
            System.out.println("\n[INFO] Searching for keyword: \"" + keyword + "\"");
            int totalCount = countKeywordOccurrences(keyword);
            
            // Step 6: Display results
            displayResults(keyword, totalCount);
            
        } catch (Exception e) {
            System.err.println("[ERROR] " + e.getMessage());
            e.printStackTrace();
        } finally {
            scanner.close();
        }
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
                fields.add(current.toString().trim());
                current = new StringBuilder();
            } else {
                current.append(c);
            }
        }
        
        fields.add(current.toString().trim());
        return fields.toArray(new String[0]);
    }

    /**
     * Counts how many times a keyword appears in the dataset
     * Performs case-insensitive search across all fields
     * 
     * @param keyword The keyword to search for
     * @return Total number of keyword occurrences
     */
    static int countKeywordOccurrences(String keyword) {
        int count = 0;
        String searchTerm = keyword.toLowerCase();
        
        // Iterate through all records
        for (String[] record : records) {
            // Search each field in the record
            for (String field : record) {
                if (field != null && field.toLowerCase().contains(searchTerm)) {
                    count++;
                }
            }
        }
        
        return count;
    }

    /**
     * Displays the search results in formatted output
     * Shows keyword, total count, and percentage
     * 
     * @param keyword The keyword searched
     * @param count Total occurrences found
     */
    static void displayResults(String keyword, int count) {
        System.out.println("\n" + "=".repeat(60));
        System.out.println("  SEARCH RESULTS");
        System.out.println("=".repeat(60));
        System.out.printf("Keyword Searched: \"%s\"%n", keyword);
        System.out.printf("Total Occurrences: %d%n", count);
        System.out.printf("Total Records: %d%n", records.size());
        
        // Calculate percentage of records containing keyword
        double percentage = (records.size() > 0) ? 
            (count * 100.0 / records.size()) : 0;
        System.out.printf("Percentage: %.2f%%%n", percentage);
        System.out.println("=".repeat(60));
    }
}
