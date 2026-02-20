export type GradeMap = { [key: string]: { value: number; desc: string } };

export const gradePoints2021: GradeMap = {
  O: { value: 10, desc: 'Outstanding' },
  'A+': { value: 9, desc: 'Excellent' },
  A: { value: 8, desc: 'Very Good' },
  'B+': { value: 7, desc: 'Good' },
  B: { value: 6, desc: 'Above Average' },
  C: { value: 5, desc: 'Average' },
  P: { value: 4, desc: 'Pass' },
  F: { value: 0, desc: 'Fail' },
};

export const gradePoints2018: GradeMap = {
  S: { value: 10, desc: 'Outstanding' },
  A: { value: 9, desc: 'Excellent' },
  B: { value: 8, desc: 'Very Good' },
  C: { value: 7, desc: 'Good' },
  D: { value: 6, desc: 'Above Average' },
  E: { value: 4, desc: 'Average' },
  F: { value: 0, desc: 'Fail' },
};

export function getGradePoints(scheme: '2018' | '2021' = '2021') {
  return scheme === '2018' ? gradePoints2018 : gradePoints2021;
}

export default gradePoints2021;
