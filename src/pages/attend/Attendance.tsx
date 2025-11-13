import AttendMain from '@/components/Attendance/AttendMain';
import MobileGNB from '@/components/Navigation/MobileGNB ';
import useCustomBack from '@/hooks/useCustomBack';
import { pcResponsive } from '@/styles';
import { units } from '@/theme/designTokens';
import styled from 'styled-components';

export const AttendContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px 18px 18px 18px;
  min-width: ${units.device.mobile}px;
  ${pcResponsive}
  box-sizing: border-box;
  margin-bottom: 50px;
`;

const Attendance: React.FC = () => {
  useCustomBack('/home');

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
      }}
    >
      <MobileGNB />
      <AttendContainer>
        <AttendMain />
      </AttendContainer>
    </div>
  );
};

export default Attendance;
