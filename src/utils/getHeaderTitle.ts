const getHeaderTitle = (category: string, part: string) => {
  const partMap: Record<string, string> = {
    ALL: '전체',
    FE: 'FE',
    BE: 'BE',
    D: '디자인',
    PM: 'PM',
  };

  const partLabel = partMap[part] || part;

  if (category === 'study') {
    return `${partLabel} 스터디`;
  }
  if (category === 'article') {
    return `${partLabel} 아티클`;
  }
  return `${partLabel} ${category}`;
};

export default getHeaderTitle;
