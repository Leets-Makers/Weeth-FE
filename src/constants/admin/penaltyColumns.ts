// 페널티 테이블 컬럼

export const columns = [
  { key: 'name', header: '이름' },
  { key: 'position', header: '역할' },
  { key: 'department', header: '학과' },
  { key: 'studentId', header: '학번' },
  { key: 'penaltyCount', header: '페널티' },
  { key: 'warningCount', header: '경고' },
  { key: 'LatestPenalty', header: '최근 페널티' },
  { key: 'empty', header: '' },
] as const;
