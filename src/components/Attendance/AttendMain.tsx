/* eslint-disable no-nested-ternary */
import { useState } from 'react';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import isBetween from 'dayjs/plugin/isBetween';

import * as S from '@/styles/attend/AttendMain.styled';

import AttendRate from '@/components/Attendance/AttendRate';
import { AttendInfo, NoAttnedInfo } from '@/components/Attendance/AttendInfo';
import {
  MyPenaltyInfo,
  PenaltyInfo,
} from '@/components/Attendance/PenaltyInfo';
import ModalAttend from '@/components/Attendance/ModalAttend';

import AttendanceCodeModal from '@/components/Modal/AttendanceCodeModal';
import AttendSection from '@/components/Attendance/AttendSection';
import useAttendData from '@/hooks/queries/attend/useAttendData';
import usePenaltyData from '@/hooks/queries/attend/usePenaltyData';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(isBetween);
dayjs.locale('ko');

// 일정 시간 처리 함수
const getAttendTimeInfo = (attendInfo?: any) => {
  if (!attendInfo) {
    return {
      title: 'No title',
      location: 'No location',
      startDateTime: '',
      endDateTime: '',
      isWithinTimeRange: false,
    };
  }

  const startDate = dayjs(attendInfo.start);
  const endDate = dayjs(attendInfo.end);
  const startDateTime = startDate.format('YYYY년 MMMM D일');
  const startTime = startDate.locale('en').format('h:mm A');
  const endTime = endDate.locale('en').format('h:mm A');
  const endDateTime = `(${startTime} ~ ${endTime})`;

  const current = dayjs();
  const isWithinTimeRange = current.isBetween(
    startDate.subtract(10, 'minute'),
    endDate,
    'minute',
    '[]',
  );

  return {
    title: attendInfo.title,
    location: attendInfo.location,
    startDateTime,
    endDateTime,
    isWithinTimeRange,
  };
};

const AttendMain: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [codeModalOpen, setCodeModalOpen] = useState(false);

  const { data: penaltyInfo } = usePenaltyData();
  const { data: attendInfo } = useAttendData();

  const hasSchedule = attendInfo?.title !== null;

  const isAttend = attendInfo?.status === 'ATTEND' || false;

  const hasPenalty =
    (penaltyInfo?.penaltyCount ?? 0) > 0 ||
    (penaltyInfo?.warningCount ?? 0) > 0;

  const { title, location, startDateTime, endDateTime, isWithinTimeRange } =
    getAttendTimeInfo(attendInfo);

  const handleOpenModal = () => {
    if (isWithinTimeRange) setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  return (
    <S.StyledAttend>
      <AttendanceCodeModal
        code={attendInfo?.code?.toString() || '0000'}
        open={codeModalOpen}
        onClose={() => setCodeModalOpen(false)}
      />
      <AttendRate attendRate={attendInfo?.attendanceRate ?? 0} />

      {/* 오늘의 출석 */}
      <AttendSection isAttend={false} title="오늘의 출석" link="/attendCheck">
        {hasSchedule ? (
          <div style={{ width: '100%' }}>
            <AttendInfo
              title={title}
              location={location}
              startDateTime={startDateTime}
              endDateTime={endDateTime}
              isWithinTimeRange={isWithinTimeRange}
              handleOpenModal={handleOpenModal}
              handleOpenCodeModal={() => setCodeModalOpen(true)}
              isAttend={isAttend}
              isAdmin={attendInfo?.code !== null}
            />
          </div>
        ) : (
          <NoAttnedInfo />
        )}
      </AttendSection>

      {/* 출석 기록 */}
      <AttendSection title="출석" link="/attendCheck">
        <S.TitleText>출석 기록</S.TitleText>
      </AttendSection>

      {/* 페널티 */}
      <AttendSection title="페널티" link="/penalty">
        {penaltyInfo?.penaltyCount == null ? (
          <S.TitleText>등록된 데이터가 없습니다.</S.TitleText>
        ) : hasPenalty ? (
          <MyPenaltyInfo
            penaltyCount={penaltyInfo?.penaltyCount || 0}
            warningCount={penaltyInfo?.warningCount || 0}
          />
        ) : (
          <S.TitleText>페널티를 받은 이력이 없네요!</S.TitleText>
        )}
        <PenaltyInfo />
      </AttendSection>

      {/* 출석 모달 */}
      <ModalAttend
        title={title}
        location={location}
        startDateTime={startDateTime}
        endDateTime={endDateTime}
        open={modalOpen}
        close={handleCloseModal}
      />
    </S.StyledAttend>
  );
};

export default AttendMain;
