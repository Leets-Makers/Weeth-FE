import AttendMain from '@/components/Attendance/AttendMain';
import useCustomBack from '@/hooks/useCustomBack';
import { MOBILE, pcResponsive } from '@/styles';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${MOBILE};
  min-width: ${MOBILE};
  margin-bottom: 50px;
  ${pcResponsive};
`;

const Attendance: React.FC = () => {
  useCustomBack('/home');

  return (
    <Container>
      <AttendMain />
    </Container>
  );
};

export default Attendance;
