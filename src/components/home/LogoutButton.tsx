import styled from 'styled-components';

import Logout from '@/assets/images/ic_logout_white.svg?react';
import useLogout from '@/hooks/useLogout';

const ImgButton = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  width: 24px;
  height: 24px;
`;

const LogoutButton: React.FC = () => {
  const logout = useLogout();

  return (
    <ImgButton onClick={logout}>
      <Logout />
    </ImgButton>
  );
};

export default LogoutButton;
