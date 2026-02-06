import styled from 'styled-components';
import logo from '@/assets/images/ic_name_logo.svg';

import { colors } from '@/theme/designTokens';
import { useNavigate } from 'react-router-dom';

import HeaderButton from './HeaderButton';

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background-color: ${colors.dark.neutral[200]};
  box-sizing: border-box;
`;

const Logo = styled.img`
  height: 40px;
  cursor: pointer;
`;

const EditGNB = ({
  onClickButton,
  save = false,
}: {
  onClickButton: () => void;
  save?: boolean;
}) => {
  const navi = useNavigate();

  return (
    <Container>
      <Logo src={logo} alt="Weeth" onClick={() => navi('/home')} />
      <HeaderButton onClickButton={onClickButton} save={save} />
    </Container>
  );
};

export default EditGNB;
