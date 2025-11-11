import { useNavigate } from 'react-router-dom';
import RightArrow from '@/assets/images/ic_right.svg?react';
import { colors } from '@/theme/designTokens';

const RightArrowButton = ({ to }: { to: string }) => {
  const navigate = useNavigate();
  return (
    <RightArrow
      width={6.58}
      height={11.17}
      color={colors.semantic.icon.alternative}
      onClick={() => navigate(to)}
      style={{ padding: '6px 9px', cursor: 'pointer' }}
    />
  );
};
export default RightArrowButton;
