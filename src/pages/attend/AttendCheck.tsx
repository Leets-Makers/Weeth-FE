import AttendCheckMain from '@/components/AttendCheck/AttendCheckMain';
import useCustomBack from '@/hooks/useCustomBack';
import React from 'react';
import MobileGNB from '@/components/Navigation/MobileGNB';
import { AttendContainer } from './Attendance';

const AttendCheck: React.FC = () => {
  useCustomBack('/attendance');
  return (
    <div style={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
      <AttendContainer>
        <MobileGNB />
        <AttendCheckMain />
      </AttendContainer>
    </div>
  );
};

export default AttendCheck;
