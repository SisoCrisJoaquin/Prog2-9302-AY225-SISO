import java.io.*;
import java.util.*;

/**
 * =====================================================
 * Machine Problem 16: Random Dataset Sampler
 * Student: Siso, Cris Joaquin E.
 * Course: Programming 2
 * Date: March 18, 2026
 * 
 * Description:
 *   This program reads a CSV dataset and randomly samples N records
 *   specified by the user. It displays the sampled records in a
 *   formatted table and provides statistics about the sample.
 * =====================================================
 */
public class MP16_RandomSampler {

    // Variable to store all CSV records
    static List<String[]> records = new ArrayList<>();
    
    // Variable to store column headers
    static String[] headers;
    
    // Random number generator
    static Random random = new Random();

    /**
     * Main entry point - orchestrates program flow
     */
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        try {
            // Step 1: Display header and instructions
            System.out.println("=".repeat(60));
            System.out.println("  MP16: RANDOM DATASET SAMPLER");
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
            
            // Step 4: Prompt user for sample size
            int sampleSize = promptForSampleSize(scanner, records.size());
            
            if (sampleSize <= 0 || sampleSize > records.size()) {
                System.err.println("[ERROR] Invalid sample size.");
                return;
            }
            
            // Step 5: Generate random sample
            System.out.println("\n[INFO] Generating random sample...");
            List<String[]> sample = generateRandomSample(sampleSize);
            
            // Step 6: Display sampled records
            System.out.println("\n[INFO] Displaying " + sample.size() + " randomly sampled records:");
            displaySampledRecords(sample);
            
            // Step 7: Display statistics
            displayStatistics(sampleSize);
            
        } catch (Exception e) {
            System.err.println("[ERROR] " + e.getMessage());
            e.printStackTrace();
        } finally {
            scanner.close();
        }
    }

    /**
     * Prompts user for sample size with validation
     * Ensures sample size is within valid range
     * 
     * @param scanner Scanner for user input
     * @param maxSize Maximum records available
     * @return Valid sample size from user
     */
    static int promptForSampleSize(Scanner scanner, int maxSize) {
        while (true) {
            System.out.printf("\nEnter sample size (1-%d): ", maxSize);
            try {
                String input = scanner.nextLine().trim();
                int sampleSize = Integer.parseInt(input);
                
                if (sampleSize < 1 || sampleSize > maxSize) {
                    System.err.printf("[ERROR] Sample size must be between 1 and %d%n", maxSize);
                    continue;
                }
                
                return sampleSize;
            } catch (NumberFormatException e) {
                System.err.println("[ERROR] Please enter a valid number.");
            }
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
     * Generates a random sample of N records from the dataset
     * Uses Fisher-Yates shuffle algorithm for unbiased sampling
     * 
     * @param sampleSize Number of records to sample
     * @return List of randomly sampled records
     */
    static List<String[]> generateRandomSample(int sampleSize) {
        // Create a copy of record indices
        List<Integer> indices = new ArrayList<>();
        for (int i = 0; i < records.size(); i++) {
            indices.add(i);
        }
        
        // Shuffle indices
        Collections.shuffle(indices);
        
        // Select first sampleSize records
        List<String[]> sample = new ArrayList<>();
        for (int i = 0; i < sampleSize; i++) {
            int randomIndex = indices.get(i);
            sample.add(records.get(randomIndex));
        }
        
        return sample;
    }

    /**
     * Displays sampled records in formatted table
     * Shows key columns: Candidate, Exam, Score, Result, Exam Date
     * 
     * @param sample List of sampled records to display
     */
    static void displaySampledRecords(List<String[]> sample) {
        System.out.println("\n" + "=".repeat(100));
        System.out.printf("%-20s | %-35s | %-8s | %-8s | %-12s%n",
            "Candidate", "Exam", "Score", "Result", "Exam Date");
        System.out.println("=".repeat(100));
        
        for (String[] record : sample) {
            // Extract relevant columns
            // Expected order: Candidate (0), Student/Faculty (1), Column1 (2), Exam (3), Language (4), 
            //                 Exam Date (5), Score (6), Result (7), Time Used (8)
            
            String candidate = (record.length > 0) ? record[0] : "N/A";
            String exam = (record.length > 3) ? record[3] : "N/A";
            String score = (record.length > 6) ? record[6] : "N/A";
            String result = (record.length > 7) ? record[7] : "N/A";
            String examDate = (record.length > 5) ? record[5] : "N/A";
            
            System.out.printf("%-20s | %-35s | %-8s | %-8s | %-12s%n",
                truncate(candidate, 20),
                truncate(exam, 35),
                truncate(score, 8),
                truncate(result, 8),
                truncate(examDate, 12));
        }
        
        System.out.println("=".repeat(100));
    }

    /**
     * Truncates string to maximum length and adds ellipsis if needed
     * 
     * @param text Text to truncate
     * @param maxLength Maximum allowed length
     * @return Truncated text
     */
    static String truncate(String text, int maxLength) {
        if (text.length() <= maxLength) {
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
    static void displayStatistics(int sampleSize) {
        System.out.println("\n" + "=".repeat(60));
        System.out.println("  SAMPLING STATISTICS");
        System.out.println("=".repeat(60));
        System.out.printf("Sample Size: %d%n", sampleSize);
        System.out.printf("Population Size: %d%n", records.size());
        double percentage = (sampleSize * 100.0) / records.size();
        System.out.printf("Sample Percentage: %.2f%%%n", percentage);
        System.out.printf("Remaining Records: %d%n", records.size() - sampleSize);
        System.out.println("=".repeat(60));
    }
}
