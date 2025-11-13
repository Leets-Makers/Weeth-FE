import AttendCheckMain from '@/components/AttendCheck/AttendCheckMain';
import useCustomBack from '@/hooks/useCustomBack';
import React from 'react';
import { AttendContainer } from './Attendance';

const AttendCheck: React.FC = () => {
  useCustomBack('/attendance');
  return (
    <AttendContainer>
      <AttendCheckMain />
    </AttendContainer>
  );
};

export default AttendCheck;
