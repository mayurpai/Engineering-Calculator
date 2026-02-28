export type GradeMap = { [key: string]: { value: number; desc: string } };

export const gradePoints2021: GradeMap = {
  O: { value: 10, desc: 'Outstanding (90-100)' },
  'A+': { value: 9, desc: 'Excellent (80-89)' },
  A: { value: 8, desc: 'Very Good (70-79)' },
  'B+': { value: 7, desc: 'Good (60-69)' },
  B: { value: 6, desc: 'Above Average (55-59)' },
  C: { value: 5, desc: 'Average (50-54)' },
  P: { value: 4, desc: 'Pass (40-49)' },
  F: { value: 0, desc: 'Fail (0-39)' },
};

export const gradePoints2018: GradeMap = {
  S: { value: 10, desc: 'Outstanding (90-100)' },
  A: { value: 9, desc: 'Excellent (80-89)' },
  B: { value: 8, desc: 'Very Good (70-79)' },
  C: { value: 7, desc: 'Good (60-69)' },
  D: { value: 6, desc: 'Above Average (45-59)' },
  E: { value: 4, desc: 'Average (40-44)' },
  F: { value: 0, desc: 'Fail (0-39)' },
};

export function getGradePoints(scheme: '2018' | '2021' | '2022' = '2021') {
  return scheme === '2018' ? gradePoints2018 : gradePoints2021;
}

export default gradePoints2021;
