import AttendMain from '@/components/Attendance/AttendMain';
import useCustomBack from '@/hooks/useCustomBack';
import { pcResponsive } from '@/styles';
import { units } from '@/theme/designTokens';
import styled from 'styled-components';

export const AttendContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-width: ${units.device.mobile}px;
  ${pcResponsive}
  box-sizing: border-box;
  margin-bottom: 50px;
  padding: 0 ${units.padding['450']}px;
`;

const Attendance: React.FC = () => {
  useCustomBack('/home');

  return (
    <AttendContainer>
      <AttendMain />
    </AttendContainer>
  );
};

export default Attendance;
