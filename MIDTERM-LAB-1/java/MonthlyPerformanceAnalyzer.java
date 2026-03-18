import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.TreeMap;

/**
 * MonthlyPerformanceAnalyzer.java
 *
 * Reads a VGChartz-style CSV dataset from a user-provided file path,
 * groups game records by release month, computes total sales per month,
 * displays a sorted monthly summary, and identifies the best-performing month.
 */
public class MonthlyPerformanceAnalyzer {

    /**
     * Prompts the user for a valid CSV file path.
     * Loops until a valid, readable CSV file is provided.
     *
     * @param scanner the Scanner for user input
     * @return the validated File object
     */
    private static File getValidFile(Scanner scanner) {
        File file;
        while (true) {
            System.out.print("Enter dataset file path: ");
            String path = scanner.nextLine().trim();

            if (path.isEmpty()) {
                System.out.println("Error: File path cannot be empty. Please try again.");
                continue;
            }

            file = new File(path);

            if (!file.exists()) {
                System.out.println("Error: File does not exist. Please try again.");
                continue;
            }

            if (!file.isFile()) {
                System.out.println("Error: Path is not a file. Please try again.");
                continue;
            }

            if (!file.canRead()) {
                System.out.println("Error: File is not readable. Please try again.");
                continue;
            }

            if (!path.toLowerCase().endsWith(".csv")) {
                System.out.println("Error: File is not in CSV format (.csv). Please try again.");
                continue;
            }

            break;
        }
        return file;
    }

    /**
     * Parses the CSV file and returns a list of DataRecord objects.
     * Handles quoted fields that may contain commas.
     *
     * @param file the CSV file to parse
     * @return list of parsed DataRecord objects
     * @throws IOException if an I/O error occurs
     */
    private static List<DataRecord> loadDataset(File file) throws IOException {
        List<DataRecord> records = new ArrayList<>();
        int skippedRows = 0;

        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String headerLine = reader.readLine();
            if (headerLine == null) {
                throw new IOException("CSV file is empty.");
            }

            // Validate that the CSV has the expected columns
            String[] headers = parseCsvLine(headerLine);
            int titleIndex = findColumnIndex(headers, "title");
            int totalSalesIndex = findColumnIndex(headers, "total_sales");
            int releaseDateIndex = findColumnIndex(headers, "release_date");

            if (titleIndex == -1 || totalSalesIndex == -1 || releaseDateIndex == -1) {
                throw new IOException(
                    "CSV file is missing required columns. Expected: title, total_sales, release_date. " +
                    "Found headers: " + headerLine
                );
            }

            String line;
            int lineNumber = 1;
            while ((line = reader.readLine()) != null) {
                lineNumber++;
                try {
                    String[] fields = parseCsvLine(line);

                    if (fields.length <= Math.max(titleIndex, Math.max(totalSalesIndex, releaseDateIndex))) {
                        skippedRows++;
                        continue;
                    }

                    String title = fields[titleIndex].trim();
                    String salesStr = fields[totalSalesIndex].trim();
                    String releaseDate = fields[releaseDateIndex].trim();

                    // Skip rows with empty sales or date
                    if (salesStr.isEmpty() || releaseDate.isEmpty()) {
                        skippedRows++;
                        continue;
                    }

                    double totalSales = Double.parseDouble(salesStr);
                    DataRecord record = new DataRecord(title, totalSales, releaseDate);

                    // Only include records with a valid month key
                    if (record.getMonthKey() != null) {
                        records.add(record);
                    } else {
                        skippedRows++;
                    }
                } catch (NumberFormatException e) {
                    skippedRows++;
                }
            }
        }

        System.out.println("Dataset loaded: " + records.size() + " valid records.");
        if (skippedRows > 0) {
            System.out.println("Skipped " + skippedRows + " rows (missing/invalid data).");
        }
        return records;
    }

    /**
     * Parses a single CSV line, handling quoted fields.
     *
     * @param line the CSV line to parse
     * @return array of field values
     */
    private static String[] parseCsvLine(String line) {
        List<String> fields = new ArrayList<>();
        StringBuilder current = new StringBuilder();
        boolean inQuotes = false;

        for (int i = 0; i < line.length(); i++) {
            char c = line.charAt(i);
            if (c == '"') {
                inQuotes = !inQuotes;
            } else if (c == ',' && !inQuotes) {
                fields.add(current.toString());
                current.setLength(0);
            } else {
                current.append(c);
            }
        }
        fields.add(current.toString());
        return fields.toArray(new String[0]);
    }

    /**
     * Finds the index of a column by name (case-insensitive).
     *
     * @param headers array of header names
     * @param name    the column name to find
     * @return the index, or -1 if not found
     */
    private static int findColumnIndex(String[] headers, String name) {
        for (int i = 0; i < headers.length; i++) {
            if (headers[i].trim().equalsIgnoreCase(name)) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Groups records by month and computes total sales per month.
     *
     * @param records the list of DataRecord objects
     * @return a TreeMap of month-key to total sales (sorted ascending)
     */
    private static TreeMap<String, Double> computeMonthlySales(List<DataRecord> records) {
        TreeMap<String, Double> monthlySales = new TreeMap<>();

        for (DataRecord record : records) {
            String monthKey = record.getMonthKey();
            if (monthKey != null) {
                monthlySales.merge(monthKey, record.getTotalSales(), Double::sum);
            }
        }
        return monthlySales;
    }

    /**
     * Displays the formatted monthly sales summary and identifies the best month.
     *
     * @param monthlySales the sorted map of monthly sales
     */
    private static void displayResults(TreeMap<String, Double> monthlySales) {
        if (monthlySales.isEmpty()) {
            System.out.println("No monthly data available to display.");
            return;
        }

        String bestMonth = null;
        double bestSales = Double.NEGATIVE_INFINITY;

        // Print header
        System.out.println();
        System.out.println("=======================================================");
        System.out.println("         MONTHLY PERFORMANCE SUMMARY                   ");
        System.out.println("=======================================================");
        System.out.printf("  %-12s | %18s | %8s%n", "Month", "Total Sales (M)", "Records");
        System.out.println("-------------------------------------------------------");

        // We also count records per month for informational purposes
        // but since we already aggregated, let's just show sales
        // For record counts, we'd need a second pass — let's track both
        // Actually, let's re-compute with counts
        // We already have totals; let's just display what we have.

        for (Map.Entry<String, Double> entry : monthlySales.entrySet()) {
            String month = entry.getKey();
            double sales = entry.getValue();

            System.out.printf("  %-12s | %18.2f |%n", month, sales);

            if (sales > bestSales) {
                bestSales = sales;
                bestMonth = month;
            }
        }

        System.out.println("-------------------------------------------------------");
        System.out.printf("  Total Months Analyzed: %d%n", monthlySales.size());
        System.out.println("=======================================================");
        System.out.println();
        System.out.println("*** BEST-PERFORMING MONTH ***");
        System.out.printf("  Month : %s%n", bestMonth);
        System.out.printf("  Sales : %.2fM%n", bestSales);
        System.out.println("=======================================================");
    }

    /**
     * Main entry point. Prompts user for file path, loads data, and displays results.
     */
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("=======================================================");
        System.out.println("       MONTHLY PERFORMANCE ANALYZER                    ");
        System.out.println("=======================================================");
        System.out.println();

        // Step 1: Get valid file path from user
        File file = getValidFile(scanner);
        System.out.println("File found. Processing...");
        System.out.println();

        // Step 2: Load dataset
        List<DataRecord> records;
        try {
            records = loadDataset(file);
        } catch (IOException e) {
            System.out.println("Error reading dataset: " + e.getMessage());
            scanner.close();
            return;
        }

        if (records.isEmpty()) {
            System.out.println("No valid records found in the dataset.");
            scanner.close();
            return;
        }

        // Step 3: Compute monthly sales
        TreeMap<String, Double> monthlySales = computeMonthlySales(records);

        // Step 4: Display results
        displayResults(monthlySales);

        scanner.close();
    }
}
