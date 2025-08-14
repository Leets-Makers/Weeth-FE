import dayjs from 'dayjs';

const formatMMDD = (iso?: string) => {
  if (!iso) return '00/00';
  const d = dayjs(iso);
  return d.isValid() ? d.format('MM/DD') : '00/00';
};

export default formatMMDD;
