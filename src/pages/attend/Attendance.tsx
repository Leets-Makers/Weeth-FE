import AttendMain from '@/components/Attendance/AttendMain';
import useCustomBack from '@/hooks/useCustomBack';
import useSetHeader from '@/hooks/useSetHeader';
import { useNavigate } from 'react-router-dom';

const Attendance: React.FC = () => {
  useCustomBack('/home');
  const nav = useNavigate();

  const handleRightButton = () => {
    nav(`/admin/attendance`);
  };
  useSetHeader({
    title: '출석',
    rightButtonType: 'ADMIN',
    onClickRightButton: handleRightButton,
  });

  return (
    <div>
      <AttendMain />
    </div>
  );
};

export default Attendance;
