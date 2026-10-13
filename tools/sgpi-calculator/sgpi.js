// SGPI maths for the SGPI Calculator.
// No DOM code here, so these functions can be tested with Node.

// Grade points for each grade.
export const GRADE_POINTS = {
  "O": 10,
  "A+": 9,
  "A": 8,
  "B+": 7,
  "B": 6,
  "C": 5,
  "D": 4,
  "F": 0,
};

// Grade point for one grade, e.g. "A+" -> 9. Unknown grade -> null.
export function gradePoint(grade) {
  if (Object.hasOwn(GRADE_POINTS, grade)) {
    return GRADE_POINTS[grade];
  }
  return null;
}

// SGPI for a list of subjects like [{ credits: 4, grade: "O" }, ...]
export function sgpi(subjects) {
  let total = 0;
  for (const subject of subjects) {
    total += gradePoint(subject.grade);
  }
  return total / subjects.length;
}
