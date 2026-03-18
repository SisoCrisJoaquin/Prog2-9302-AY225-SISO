# Quick Reference - Machine Problems 14, 15, 16

## 📋 Files Created

```
MIDTERM-LAB-3/
├── MP14_KeywordCounter.java         ← Search for keywords
├── MP14_KeywordCounter.js
├── MP15_ExportFirst50.java          ← Extract first 50 rows
├── MP15_ExportFirst50.js
├── MP16_RandomSampler.java          ← Random sample generator
├── MP16_RandomSampler.js
├── README_MachinProblems.md         ← Full documentation
├── README_Submission_Summary.md     ← Submission details
├── Sample_Data-Prog-2-csv.csv       ← Test dataset (169 records)
└── MP15_Export_*.csv                ← Generated export files
```

---

## 🚀 Quick Start

### MP14: Count Keyword Occurrences
```bash
javac MP14_KeywordCounter.java
java MP14_KeywordCounter
# Input: Sample_Data-Prog-2-csv.csv
# Input: Python
# Output: Found X occurrences
```

### MP15: Export First 50 Rows
```bash
javac MP15_ExportFirst50.java
java MP15_ExportFirst50
# Input: Sample_Data-Prog-2-csv.csv
# Output: MP15_Export_[timestamp].csv created
```

### MP16: Random Sampler
```bash
javac MP16_RandomSampler.java
java MP16_RandomSampler
# Input: Sample_Data-Prog-2-csv.csv
# Input: 10 (sample size)
# Output: Table with 10 random records
```

---

## 📊 Test Results

| Program | Java | JavaScript | Records | Status |
|---------|------|-----------|---------|--------|
| MP14 | ✓ | ✓ | 169 | PASS |
| MP15 | ✓ | ✓ | 50/169 | PASS |
| MP16 | ✓ | ✓ | 8/169 | PASS |

---

## 💻 Features

✓ CSV file path user input  
✓ Proper CSV parsing (header+data)  
✓ Error handling (file not found, invalid input)  
✓ Formatted output with separators  
✓ Comprehensive code comments  
✓ Both Java and JavaScript versions  
✓ Identical functionality across languages  

---

## 📝 Code Comments

All programs include:
- Function/method documentation
- Variable explanations
- Processing logic descriptions
- CSV handling notes
- Error handling comments

---

## 🧪 Dataset

**File:** Sample_Data-Prog-2-csv.csv  
**Total Records:** 169  
**Data Type:** Exam results  
**Key Columns:** Candidate, Exam, Score, Result, Exam Date

---

## ⚠️ Important Notes

1. **File Path:** Enter exact path to CSV file (e.g., `Sample_Data-Prog-2-csv.csv`)
2. **Line Numbers:** Header on line 7, data from line 8
3. **MP15 Output:** Files saved to same directory with timestamp
4. **MP16 Sampling:** Uses Fisher-Yates algorithm for true randomness
5. **Error Messages:** Clearly indicate problems (missing file, invalid input)

---

## 📚 Documentation Files

- `README_MachinProblems.md` - Detailed explanation of each program
- `README_Submission_Summary.md` - Complete submission details
- Code comments - Inline documentation in all source files

---

**Status:** ✅ READY FOR SUBMISSION  
**Date:** March 18, 2026  
**Student:** Siso, Cris Joaquin E.
