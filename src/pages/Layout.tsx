import { MOBILE, PC } from '@/styles';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const Shell = styled.div`
  width: 100%;
  max-width: ${MOBILE};
  margin: 0 auto;
  align-items: center;
  box-sizing: border-box;

  @media (min-width: ${PC}) {
    max-width: ${PC};
  }
`;

const BoardLayout = () => {
  return (
    <Shell>
      <Outlet />
    </Shell>
  );
};

export default BoardLayout;
