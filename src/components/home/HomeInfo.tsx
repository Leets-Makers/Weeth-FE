import * as S from '@/styles/home/HomeInfo.styled';
import { StyledHomeMain } from '@/styles/home/HomeMain.styled';
import Caption from '@/components/Button/Caption';
import AdminIcon from '@/assets/images/ic_Master_BW.svg';
import useSetPosition from '@/hooks/useSetPosition';

interface HomeInfoProps {
  position: string;
  cardinal: number | string;
  name: string;
  isAdmin: boolean;
}

const HomeInfo = ({ position, cardinal, name, isAdmin }: HomeInfoProps) => {
  const { userPart } = useSetPosition(position);

  return (
    <StyledHomeMain>
      <S.UserInfo>
        <S.UserContainer>
          <S.Name>
            <Caption color="#ffffff" textcolor="#000000">
              {cardinal}기
            </Caption>
            <div>{name}</div>
          </S.Name>
          <S.NickNameContainer>
            {isAdmin && <S.Admin src={AdminIcon} alt="어드민" />} {userPart}
          </S.NickNameContainer>
        </S.UserContainer>
      </S.UserInfo>
    </StyledHomeMain>
  );
};

export default HomeInfo;
