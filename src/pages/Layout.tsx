import { MOBILE, pcResponsive } from '@/styles';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Shell = styled.div`
  width: 100%;
  max-width: ${MOBILE};
  margin: 0 auto;
  align-items: center;
  box-sizing: border-box;

  ${pcResponsive}
`;

const BoardLayout = () => {
  return (
    <Shell>
      <Outlet />
    </Shell>
  );
};

export default BoardLayout;
