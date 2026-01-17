import styled from 'styled-components';
import NavHeader from '@/components/Admin/NavHeader';
import NavMenuList from '@/components/Admin/NavMenuList';

const NavMenuWrapper = styled.div`
  width: 250px;
  background-color: ${({ theme }) => theme.semantic.backGround};
  border: 1px solid ${({ theme }) => theme.semantic.line};
  overflow-y: auto;
`;

const NavMenu: React.FC = () => {
  return (
    <NavMenuWrapper>
      <NavHeader />
      <NavMenuList />
    </NavMenuWrapper>
  );
};

export default NavMenu;
