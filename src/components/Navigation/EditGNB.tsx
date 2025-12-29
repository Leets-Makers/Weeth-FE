import styled from 'styled-components';
import logo from '@/assets/images/ic_name_logo.svg';

import { colors, units } from '@/theme/designTokens';
import { useLocation, useNavigate } from 'react-router-dom';

import HeaderButton from './HeaderButton';

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 12px ${units.padding[450]}px;
  background-color: ${colors.dark.neutral[200]};
  box-sizing: border-box;
`;

const Logo = styled.img`
  height: 40px;
  cursor: pointer;
`;

const EditGNB = ({ onClickButton }: { onClickButton: () => void }) => {
  const navi = useNavigate();
  const location = useLocation();
  const isBoard = location.pathname.includes('board');
  return (
    <Container>
      <Logo src={logo} alt="Weeth" onClick={() => navi('/home')} />
      <HeaderButton onClickButton={onClickButton} isBoard={isBoard} />
    </Container>
  );
};

export default EditGNB;
