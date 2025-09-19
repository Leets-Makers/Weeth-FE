import useGetUserInfo from '@/api/useGetGlobaluserInfo';
import AttendMain from '@/components/Attendance/AttendMain';
import Header from '@/components/Header/Header';
import useCustomBack from '@/hooks/useCustomBack';
import { MOBILE } from '@/styles';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${MOBILE};
  max-width: ${MOBILE};
  margin-bottom: 50px;
`;

const Attendance: React.FC = () => {
  useCustomBack('/home');
  const { isAdmin } = useGetUserInfo();
  const nav = useNavigate();

  const handleRightButton = () => {
    nav(`/admin/attendance`);
  };

  return (
    <Container>
      <Header
        isAccessible={isAdmin}
        RightButtonType="ADMIN"
        onClickRightButton={handleRightButton}
      >
        출석
      </Header>
      <AttendMain />
    </Container>
  );
};

export default Attendance;
