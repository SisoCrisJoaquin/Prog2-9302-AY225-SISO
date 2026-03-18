# 3x3 Matrix Determinant Solver

## Student Information
- **Name:** Siso, Cris Joaquin E.
- **Course:** Math 101 – Linear Algebra
- **School:** University of Perpetual Help System DALTA, Molino Campus
- **Assignment:** Programming Assignment 1 – 3x3 Matrix Determinant Solver
- **Date Completed:** March 18, 2026

---

## Assigned Matrix

```
┌               ┐
│   5   2   6  │
│   3   4   1  │
│   2   3   5  │
└               ┘
```

---

## Solution Method

This program computes the determinant of the assigned 3×3 matrix using **cofactor expansion along the first row**:

$$\det(A) = a_{11}M_{11} - a_{12}M_{12} + a_{13}M_{13}$$

Where:
- $M_{11}$, $M_{12}$, $M_{13}$ are the 2×2 minors obtained by removing row 0 and columns 0, 1, 2 respectively
- Each minor is calculated using the 2×2 determinant formula: $\det = ad - bc$

### Step-by-Step Calculation:

**Step 1 – Minor M₁₁:** Remove row 0 and column 0
```
det([4,1],[3,5]) = (4×5) - (1×3) = 20 - 3 = 17
```

**Step 2 – Minor M₁₂:** Remove row 0 and column 1
```
det([3,1],[2,5]) = (3×5) - (1×2) = 15 - 2 = 13
```

**Step 3 – Minor M₁₃:** Remove row 0 and column 2
```
det([3,4],[2,3]) = (3×3) - (4×2) = 9 - 8 = 1
```

**Cofactor Terms:**
```
C₁₁ = (+1) × 5 × 17 = 85
C₁₂ = (-1) × 2 × 13 = -26
C₁₃ = (+1) × 6 × 1 = 6
```

**Final Determinant:**
```
det(M) = 85 + (-26) + 6 = 65
```

---

## How to Run

### Java Program

```bash
javac MIDTERMLAB2.java
java DeterminantSolver
```

### JavaScript Program

Requires Node.js to be installed on your system.

```bash
node MIDTERMLAB2.js
```

---

## Sample Output

Both programs produce identical console output:

```
====================================================
  3x3 MATRIX DETERMINANT SOLVER
  Student: Siso, Cris Joaquin E.
  Assigned Matrix:
====================================================
┌               ┐
│   5   2   6  │
│   3   4   1  │
│   2   3   5  │
└               ┘
====================================================
  Step 1 — Minor M₁₁: det([4,1],[3,5]) = (4×5)-(1×3) = 17
  Step 2 — Minor M₁₂: det([3,1],[2,5]) = (3×5)-(1×2) = 13
  Step 3 — Minor M₁₃: det([3,4],[2,3]) = (3×3)-(4×2) = 1

  Cofactor C₁₁ = (+1) × 5 × 17 = 85
  Cofactor C₁₂ = (-1) × 2 × 13 = -26
  Cofactor C₁₃ = (+1) × 6 × 1 = 6

  det(M) = 85 + (-26) + 6
====================================================
  ✓  DETERMINANT = 65
====================================================
```

---

## Final Result

**The determinant of the assigned matrix is: `65`**

Since the determinant is non-zero (65 ≠ 0), the matrix is **invertible** (non-singular).

---

## Files Included

- `MIDTERMLAB2.java` – Java implementation of the determinant solver
- `MIDTERMLAB2.js` – JavaScript implementation of the determinant solver
- `README.md` – This documentation file

---

## Key Concepts

1. **Cofactor Expansion:** A method to calculate determinants by expanding along a row or column
2. **2×2 Determinant:** The basic formula $\det = ad - bc$ for a 2×2 matrix
3. **Minor:** A submatrix obtained by deleting rows and columns
4. **Singular Matrix:** A matrix with determinant = 0 (non-invertible)
5. **Non-Singular Matrix:** A matrix with determinant ≠ 0 (invertible)

