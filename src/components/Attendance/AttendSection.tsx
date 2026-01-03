import { useNavigate } from 'react-router-dom';
import RightArrow from '@/assets/images/ic_right.svg?react';
import { colors } from '@/theme/designTokens';

import * as S from '@/styles/attend/AttendMain.styled';

interface AttendSectionProps {
  isAttend?: boolean;
  title: string;
  link: string;
  children: React.ReactNode;
}

const AttendSection: React.FC<AttendSectionProps> = ({
  isAttend = true,
  title,
  link,
  children,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
  };

  return (
    <S.StyledBox
      $isAttend={isAttend}
      onClick={isAttend ? handleClick : undefined}
    >
      <S.BoxHeader>
        <S.CaptionText>{title}</S.CaptionText>

        {/* isAttend = true일 때는 화살표 버튼만 따로 동작 */}
        {isAttend && (
          <RightArrow
            width={6.58}
            height={11.17}
            color={colors.semantic.icon.nomal}
          />
        )}
      </S.BoxHeader>

      {children}
    </S.StyledBox>
  );
};

export default AttendSection;
