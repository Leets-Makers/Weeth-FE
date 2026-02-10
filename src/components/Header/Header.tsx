import styled from 'styled-components';

import LeftButton from '@/components/Header/LeftButton';

interface HeaderProps {
  isWaiting?: boolean;
}

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  padding: 25px 0 10px 25px;
  box-sizing: border-box;

  position: sticky;
  z-index: 10;
  top: 0;
`;

const Header = ({ isWaiting = false }: HeaderProps) => {
  return (
    <HeaderWrapper>
      <LeftButton isWaiting={isWaiting} />
    </HeaderWrapper>
  );
};

export default Header;
