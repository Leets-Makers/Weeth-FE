import { useNavigate } from 'react-router-dom';
import BE from '@/assets/images/ic_BE.svg';
import D from '@/assets/images/ic_DE.svg';
import FE from '@/assets/images/ic_FE.svg';
import PM from '@/assets/images/ic_PM.svg';
import Master from '@/assets/images/ic_Master_BW.svg';
import * as S from '@/styles/member/MemberItem.styled';
import { Member } from '@/types/member';

const MemberItem: React.FC<Member> = ({
  id,
  name,
  cardinals,
  position,
  role,
}) => {
  let positionIcon;
  let positionName;
  const navi = useNavigate();

  if (position === 'FE') {
    positionName = '프론트엔드';
    positionIcon = FE;
  } else if (position === 'BE') {
    positionName = '백엔드';
    positionIcon = BE;
  } else if (position === 'D') {
    positionName = '디자이너';
    positionIcon = D;
  } else if (position === 'PM') {
    positionName = 'PM';
    positionIcon = PM;
  }

  const onClickMember = () => {
    navi(`/member/${id}`);
  };

  return (
    <S.Wrapper>
      <S.Content onClick={onClickMember}>
        <S.TextWrapper>
          <S.Title>{name}</S.Title>
          <S.Caption>
            <img src={positionIcon} alt={positionName} loading="lazy" />
            {role === 'ADMIN' ? (
              <img src={Master} alt="master" loading="lazy" />
            ) : null}
            <span>{positionName}</span>
            <span>|</span>
            <span>{cardinals.map((num) => `${num}기`).join(' · ')}</span>
          </S.Caption>
        </S.TextWrapper>
      </S.Content>
    </S.Wrapper>
  );
};

export default MemberItem;
