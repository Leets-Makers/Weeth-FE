import styled from 'styled-components';
import WeethIcon from '@/assets/images/ic_admin_header_logo.svg?react';

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 15px;
  gap: 5px;
`;

const StyledTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
  padding: 10px 10px 10px 20px;
`;

const NavHeader: React.FC = () => {
  return (
    <StyledHeader>
      <WeethIcon style={{ width: 28, height: 'auto', paddingLeft: 10 }} />
      <StyledTitle>WEETH ADMIN</StyledTitle>
    </StyledHeader>
  );
};

export default NavHeader;
