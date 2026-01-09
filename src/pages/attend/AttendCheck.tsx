import AttendCheckMain from '@/components/AttendCheck/AttendCheckMain';
import useCustomBack from '@/hooks/useCustomBack';
import React from 'react';
import Breadcrumb from '@/components/common/Breadcrumb';
import { AttendContainer } from './Attendance';

const AttendCheck: React.FC = () => {
  useCustomBack('/attendance');
  return (
    <AttendContainer>
      <Breadcrumb
        items={[
          { label: '출석', path: '/attendance' },
          { label: '출석 조회', path: '/attendCheck' },
        ]}
        hasTitle
      />
      <AttendCheckMain />
    </AttendContainer>
  );
};

export default AttendCheck;
