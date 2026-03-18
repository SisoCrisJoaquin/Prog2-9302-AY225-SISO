/**
 * DataRecord.java
 * Represents a single row from the VGChartz sales dataset.
 * Each record holds the game title, total sales, and release date.
 */
public class DataRecord {

    private String title;
    private double totalSales;
    private String releaseDate; // format: YYYY-MM-DD

    /**
     * Constructs a DataRecord with the given values.
     *
     * @param title       the game title
     * @param totalSales  total worldwide sales (in millions)
     * @param releaseDate release date in YYYY-MM-DD format
     */
    public DataRecord(String title, double totalSales, String releaseDate) {
        this.title = title;
        this.totalSales = totalSales;
        this.releaseDate = releaseDate;
    }

    public String getTitle() {
        return title;
    }

    public double getTotalSales() {
        return totalSales;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    /**
     * Extracts the month key (YYYY-MM) from the release date.
     *
     * @return the month key string, or null if the date is invalid
     */
    public String getMonthKey() {
        if (releaseDate == null || releaseDate.length() < 7) {
            return null;
        }
        // Expected format: YYYY-MM-DD → extract YYYY-MM
        return releaseDate.substring(0, 7);
    }

    @Override
    public String toString() {
        return String.format("%-50s | Sales: %8.2fM | Date: %s", title, totalSales, releaseDate);
    }
}
