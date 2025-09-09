const ROLE_MAP: Record<string, string> = {
  PM: '기획자',
  D: '디자이너',
  FE: '프론트엔드',
  BE: '백엔드',
};

const positionMapper = (code: string): string => {
  return ROLE_MAP[code] ?? code;
};

export default positionMapper;
