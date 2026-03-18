# Programming 2 Machine Problems - Submission Summary

**Student:** Siso, Cris Joaquin E.  
**Date:** March 18, 2026  
**Course:** Programming 2  
**Assignment:** Machine Problems 14, 15, 16 (CSV Dataset Processing)

---

## ✅ Completion Status

### All Requirements Met:
- ✓ MP14: Count Keyword Occurrences (Java + JavaScript)
- ✓ MP15: Export First 50 Rows to CSV (Java + JavaScript)
- ✓ MP16: Random Dataset Sampler (Java + JavaScript)
- ✓ All programs ask for CSV file path before processing
- ✓ Proper CSV parsing with quote handling
- ✓ Comprehensive code comments for variables, functions, and logic
- ✓ Clear, formatted output
- ✓ Error handling implemented
- ✓ Documentation and README included

---

## Files Delivered

### Machine Problem 14: Keyword Counter
- `MP14_KeywordCounter.java` (168 lines, fully commented)
- `MP14_KeywordCounter.js` (167 lines, fully commented)

**Purpose:** Search entire CSV dataset and count keyword occurrences  
**Logic:** Case-insensitive substring search across all fields

### Machine Problem 15: Export First 50 Rows
- `MP15_ExportFirst50.java` (193 lines, fully commented)
- `MP15_ExportFirst50.js` (190 lines, fully commented)

**Purpose:** Extract first 50 data records and export to new CSV  
**Logic:** Preserve format with timestamped filename (MP15_Export_YYYY-MM-DD_HH-MM-SS.csv)

### Machine Problem 16: Random Sampler
- `MP16_RandomSampler.java` (221 lines, fully commented)
- `MP16_RandomSampler.js` (216 lines, fully commented)

**Purpose:** Randomly sample N records and display in formatted table  
**Logic:** Fisher-Yates shuffle for unbiased sampling

### Documentation
- `README_MachinProblems.md` - Full documentation with sample outputs
- `README_Submission_Summary.md` - This file

---

## Test Results

### MP14 (Keyword Counter)
```
Keyword: "Cybersecurity"
Total Occurrences: 18
Total Records: 169
Percentage: 10.65%
STATUS: ✓ PASS
```

### MP15 (Export First 50 Rows)
```
Source Records: 169
Rows Exported: 50
Header: Included
Output File: MP15_Export_2026-03-18_14-49-22.csv
STATUS: ✓ PASS
```

### MP16 (Random Sampler)
```
Sample Size: 8
Population Size: 169
Sample Percentage: 4.73%
Display: Formatted table (8 random records shown)
STATUS: ✓ PASS
```

---

## Dataset Information

**File:** Sample_Data-Prog-2-csv.csv  
**Format:** CSV with quoted fields  
**Records:** 169 (1 header + 168 exam records)  
**Source:** University of Perpetual Help System DALTA, Molino Campus  
**Data Date:** 03/14/2026

**Columns:**
- Candidate (Student name)
- Student/Faculty/NTE (Status)
- Column1 (Reserved)
- Exam (Exam type)
- Language (Language)
- Exam Date (Date)
- Score (Numeric)
- Result (PASS/FAIL)
- Time Used (Duration)

---

## Code Quality Checklist

### Comments & Documentation
- ✓ All functions documented with purpose
- ✓ Variables explained with purpose
- ✓ Processing logic clearly commented
- ✓ CSV handling documented
- ✓ Error conditions explained

### Error Handling
- ✓ File not found errors
- ✓ Invalid input validation
- ✓ Empty dataset detection
- ✓ Sample size range validation
- ✓ Exception catching and reporting

### CSV Processing
- ✓ Correct header identification (line 7)
- ✓ Proper data row parsing (lines 8+)
- ✓ Quoted field handling
- ✓ Embedded comma handling
- ✓ Format preservation on export

### Output Formatting
- ✓ Centered headers with separators
- ✓ Aligned data in tables
- ✓ Statistics displayed clearly
- ✓ Status messages for user feedback
- ✓ Consistent styling across programs

### Both Languages
- ✓ Java implementation complete
- ✓ JavaScript implementation complete
- ✓ Identical functionality
- ✓ Same logic flow
- ✓ Comparable performance

---

## How to Run

### Java Programs
```bash
cd MIDTERM-LAB-3

# MP14: Count Keyword Occurrences
javac MP14_KeywordCounter.java
java MP14_KeywordCounter
# Input: Sample_Data-Prog-2-csv.csv, then keyword

# MP15: Export First 50 Rows
javac MP15_ExportFirst50.java
java MP15_ExportFirst50
# Input: Sample_Data-Prog-2-csv.csv

# MP16: Random Sampler
javac MP16_RandomSampler.java
java MP16_RandomSampler
# Input: Sample_Data-Prog-2-csv.csv, then sample size
```

### JavaScript Programs
```bash
cd MIDTERM-LAB-3

# MP14: Count Keyword Occurrences
node MP14_KeywordCounter.js
# Input: Sample_Data-Prog-2-csv.csv, then keyword

# MP15: Export First 50 Rows
node MP15_ExportFirst50.js
# Input: Sample_Data-Prog-2-csv.csv

# MP16: Random Sampler
node MP16_RandomSampler.js
# Input: Sample_Data-Prog-2-csv.csv, then sample size
```

---

## Sample Output Examples

### MP14: Keyword Counter
```
Keyword Searched: "Cybersecurity"
Total Occurrences: 18
Total Records: 169
Percentage: 10.65%
```

### MP15: Export First 50 Rows
```
[SUCCESS] CSV export completed!
Output File: .\MP15_Export_2026-03-18_14-49-22.csv
Rows Exported: 50
Header Row: Yes
Total Lines: 51
```

### MP16: Random Sampler
```
Sample Size: 8
Population Size: 169
Sample Percentage: 4.73%
Remaining Records: 161

[Table with 8 randomly selected exam records shown]
```

---

## Technical Details

### Language Features Used

**Java:**
- BufferedReader for file I/O
- ArrayList for dynamic collections
- StringBuilder for string building
- LocalDateTime for timestamping
- Collections.shuffle for random sampling
- Exception handling with try-catch-finally
- String formatting with printf

**JavaScript:**
- fs (File System) module for file I/O
- readline module for user input
- Array methods (map, forEach, filter, sort)
- String template literals
- Async/await patterns
- Object-oriented function design
- Math.random for sampling

### Algorithm Details

**MP14 - Keyword Counting:**
- Time Complexity: O(n*m) where n=records, m=fields per record
- Space Complexity: O(n) for storing records
- Case-insensitive matching

**MP15 - Export First 50:**
- Time Complexity: O(n) to read, O(50) to write
- Space Complexity: O(n) for full dataset in memory
- Timestamped naming prevents overwrites

**MP16 - Random Sampling:**
- Algorithm: Fisher-Yates shuffle
- Time Complexity: O(n) for shuffle + O(k) for selection
- Space Complexity: O(n) for indices array
- Unbiased uniform sampling

---

## Verification Checklist

- [x] All 6 source files created (3 Java + 3 JS)
- [x] Java programs compile without errors
- [x] JavaScript programs run without errors
- [x] CSV file properly parsed (header on line 7, data from line 8)
- [x] All programs ask for file path input
- [x] Error handling tested and working
- [x] Output properly formatted
- [x] Code comments comprehensive
- [x] Documentation complete
- [x] All 3 MPs functional and tested

---

## Notes

- Dataset contains 168 data records plus 1 header row (total 169 records)
- All programs use consistent CSV parsing logic
- Output files for MP15 created with timestamp to prevent overwrites
- Random sampling for MP16 is truly random using Fisher-Yates algorithm
- Code is modular and reusable for other CSV datasets

---

**Submission Date:** March 18, 2026  
**Status:** ✅ COMPLETE AND TESTED  
**Ready for Evaluation:** YES
