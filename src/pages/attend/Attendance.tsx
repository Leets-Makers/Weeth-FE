import AttendMain from '@/components/Attendance/AttendMain';
import useCustomBack from '@/hooks/useCustomBack';
import useSetHeader from '@/hooks/useSetHeader';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Attendance: React.FC = () => {
  useCustomBack('/home');
  const navigate = useNavigate();

  const handleRightButton = useCallback(() => {
    navigate(`/admin/attendance`);
  }, [navigate]);

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
