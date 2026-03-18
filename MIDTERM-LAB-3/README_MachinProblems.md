# Programming 2 Machine Problems (MP14, MP15, MP16)

## Overview
This folder contains three machine problems that process CSV datasets. Each problem is implemented in both Java and JavaScript.

**Student:** Siso, Cris Joaquin E.  
**Course:** Programming 2  
**Date:** March 18, 2026  
**Dataset:** Sample_Data-Prog-2-csv.csv (168 exam records)

---

## Machine Problem 14: Count Keyword Occurrences

**Filename:** `MP14_KeywordCounter.java` / `MP14_KeywordCounter.js`

### Description
This program searches through an entire CSV dataset and counts how many times a user-specified keyword appears. The search is case-insensitive and scans across all columns.

### Program Logic (3-5 sentences)
The program begins by prompting the user for the CSV file path, then reads and parses the dataset, skipping the metadata header rows. It stores all records in memory using an ArrayList (Java) or array (JavaScript). When given a keyword, the program iterates through each record and field, performing a case-insensitive substring search to count occurrences. Finally, it displays the total count, total records processed, and the percentage of records containing the keyword.

### How to Run

**Java:**
```bash
javac MP14_KeywordCounter.java
java MP14_KeywordCounter
# Enter: Sample_Data-Prog-2-csv.csv
# Enter keyword: Python
```

**JavaScript:**
```bash
node MP14_KeywordCounter.js
# Enter: Sample_Data-Prog-2-csv.csv
# Enter keyword: Python
```

### Sample Output
```
============================================================
  MP14: COUNT KEYWORD OCCURRENCES
============================================================

Enter CSV file path: Sample_Data-Prog-2-csv.csv
[INFO] Reading CSV file...
[INFO] Successfully loaded 168 records.

Enter keyword to search: Python

[INFO] Searching for keyword: "Python"

============================================================
  SEARCH RESULTS
============================================================
Keyword Searched: "Python"
Total Occurrences: 15
Total Records: 168
Percentage: 8.93%
============================================================
```

### Key Features
- Case-insensitive search
- Searches across all fields
- Displays percentage calculation
- Error handling for missing files
- Proper CSV parsing with quote handling

---

## Machine Problem 15: Export First 50 Rows to CSV

**Filename:** `MP15_ExportFirst50.java` / `MP15_ExportFirst50.js`

### Description
This program reads the CSV dataset and exports the first 50 data rows to a new CSV file. The output file includes the header row and uses a timestamp in the filename to avoid overwriting previous exports.

### Program Logic (3-5 sentences)
The program prompts the user for the source CSV file path and reads all records into memory. It then generates a timestamped output filename (format: MP15_Export_YYYY-MM-DD_HH-MM-SS.csv). The program writes the header row first, followed by the first 50 (or fewer if dataset is smaller) data rows to the new CSV file. The original CSV format is preserved, with proper handling of quoted fields and commas within fields. Finally, it displays confirmation with the output file path and number of rows exported.

### How to Run

**Java:**
```bash
javac MP15_ExportFirst50.java
java MP15_ExportFirst50
# Enter: Sample_Data-Prog-2-csv.csv
```

**JavaScript:**
```bash
node MP15_ExportFirst50.js
# Enter: Sample_Data-Prog-2-csv.csv
```

### Sample Output
```
============================================================
  MP15: EXPORT FIRST 50 ROWS TO CSV
============================================================

Enter source CSV file path: Sample_Data-Prog-2-csv.csv

[INFO] Reading source CSV file...
[INFO] Successfully loaded 168 records.

[INFO] Exporting first 50 rows...

============================================================
  EXPORT RESULTS
============================================================
[SUCCESS] CSV export completed!
Output File: .\MP15_Export_2026-03-18_14-42-08.csv
Rows Exported: 50
Header Row: Yes
Total Lines: 51
============================================================
```

### Key Features
- Timestamped output filenames
- Preserves original CSV format
- Handles quoted fields correctly
- Creates output in same directory as input
- Displays success confirmation

---

## Machine Problem 16: Random Dataset Sampler

**Filename:** `MP16_RandomSampler.java` / `MP16_RandomSampler.js`

### Description
This program randomly samples N records from the CSV dataset, where N is specified by the user. The selected records are displayed in a formatted table showing key columns: Candidate name, Exam type, Score, Result, and Exam Date.

### Program Logic (3-5 sentences)
The program reads the entire CSV dataset into memory and prompts the user for the desired sample size with validation. It uses the Fisher-Yates shuffle algorithm to randomly select N records without bias from the dataset. The selected records are displayed in a formatted ASCII table showing key information (candidate name, exam type, score, pass/fail result, and exam date) with proper column alignment and truncation for long values. The program then displays statistics including the sample size, population size, percentage sampled, and remaining records.

### How to Run

**Java:**
```bash
javac MP16_RandomSampler.java
java MP16_RandomSampler
# Enter: Sample_Data-Prog-2-csv.csv
# Enter sample size: 10
```

**JavaScript:**
```bash
node MP16_RandomSampler.js
# Enter: Sample_Data-Prog-2-csv.csv
# Enter sample size: 10
```

### Sample Output
```
============================================================
  MP16: RANDOM DATASET SAMPLER
============================================================

Enter CSV file path: Sample_Data-Prog-2-csv.csv
[INFO] Reading CSV file...
[INFO] Successfully loaded 168 records.

Enter sample size (1-168): 10
[INFO] Generating random sample...

[INFO] Displaying 10 randomly sampled records:

========================================================================
Candidate            | Exam                          | Score | Result
========================================================================
Malvin,Allchin       | Cybersecurity                 | 858   | PASS
Mariska,Shawyer      | Network Security              | 869   | PASS
Moe,Treadway         | Information Technology Specia | 760   | PASS
Juli,McCully         | JavaScript                    | 700   | PASS
Kristel,Dog          | Artificial Intelligence       | 610   | FAIL
Udell,Farris         | JavaScript                    | 392   | FAIL
Bealle,Rentz         | Device Configuration and Mana | 672   | FAIL
========================================================================

============================================================
  SAMPLING STATISTICS
============================================================
Sample Size: 10
Population Size: 168
Sample Percentage: 5.95%
Remaining Records: 158
============================================================
```

### Key Features
- Fisher-Yates shuffle algorithm for unbiased sampling
- User input validation
- Formatted table display with truncation
- Statistical summary
- Proper error handling

---

## Dataset Information

**File:** Sample_Data-Prog-2-csv.csv  
**Total Records:** 168 exam results  
**Data Period:** 03/14/2026  
**Institution:** University of Perpetual Help System DALTA, Molino Campus

**Columns:**
- Candidate: Student name
- Student/Faculty/NTE: Student status
- Column1: Reserved field
- Exam: Exam type taken
- Language: Exam language
- Exam Date: Date exam was taken
- Score: Numeric score achieved
- Result: PASS or FAIL
- Time Used: Duration to complete exam

**Sample Exams Represented:**
- Python, JavaScript, HTML and CSS
- Data Analytics, Databases
- Cybersecurity
- Artificial Intelligence
- Information Technology Specialist in Networking
- Device Configuration and Management (Windows 11)

---

## Code Quality

All programs include:
✓ Comprehensive code comments explaining variables, functions, and logic  
✓ Proper error handling for missing files and invalid input  
✓ Formatted output for readability  
✓ CSV parsing that handles quoted fields and embedded commas  
✓ Input validation with user-friendly error messages  
✓ Consistent coding style and structure  

---

## Testing Results

| Program | Java | JavaScript | Status |
|---------|------|-----------|--------|
| MP14 | ✓ Compiles | ✓ Runs | PASS |
| MP15 | ✓ Compiles | ✓ Runs | PASS |
| MP16 | ✓ Compiles | ✓ Runs | PASS |

All programs successfully read the CSV file, process data correctly, and produce properly formatted output.

---

## Files Included

- `MP14_KeywordCounter.java` - Java keyword counter
- `MP14_KeywordCounter.js` - JavaScript keyword counter
- `MP15_ExportFirst50.java` - Java export first 50 rows
- `MP15_ExportFirst50.js` - JavaScript export first 50 rows
- `MP16_RandomSampler.java` - Java random sampler
- `MP16_RandomSampler.js` - JavaScript random sampler
- `README.md` - This documentation
- `Sample_Data-Prog-2-csv.csv` - Test dataset

---

**Date:** March 18, 2026  
**Student:** Siso, Cris Joaquin E.  
**Course:** Programming 2 - Machine Problems
