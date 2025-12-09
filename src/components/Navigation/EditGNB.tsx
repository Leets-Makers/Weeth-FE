import styled from 'styled-components';
import logo from '@/assets/images/ic_name_logo.svg';

import { colors, units } from '@/theme/designTokens';
import { useNavigate } from 'react-router-dom';

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

const EditGNB = () => {
  const navi = useNavigate();
  return (
    <Container>
      <Logo src={logo} alt="Weeth" onClick={() => navi('/home')} />
      <HeaderButton />
    </Container>
  );
};

export default EditGNB;
