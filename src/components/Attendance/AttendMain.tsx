/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import isBetween from 'dayjs/plugin/isBetween';

import * as S from '@/styles/attend/AttendMain.styled';
import {
  PenaltyContainer,
  NoPenaltyInfo,
} from '@/styles/attend/PenaltyInfo.styled';

import useGetAttend from '@/api/useGetAttend';
import useGetPenalty from '@/api/useGetPenalty';
import { useSmartCombinedLoading } from '@/hooks/useSmartLoading';

import AttendRate from '@/components/Attendance/AttendRate';
import { AttendInfo, NoAttnedInfo } from '@/components/Attendance/AttendInfo';
import {
  MyPenaltyInfo,
  PenaltyInfo,
} from '@/components/Attendance/PenaltyInfo';
import ModalAttend from '@/components/Attendance/ModalAttend';
import Loading from '@/components/common/Loading';
import RightArrowButton from '@/components/common/RightArrowButton';

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

interface AttendSectionProps {
  title: string;
  link: string;
  children: React.ReactNode;
}

const AttendSection: React.FC<AttendSectionProps> = ({
  title,
  link,
  children,
}) => (
  <S.StyledBox>
    <S.BoxHeader>
      <S.CaptionText>{title}</S.CaptionText>
      <RightArrowButton to={link} />
    </S.BoxHeader>
    {children}
  </S.StyledBox>
);

const AttendMain: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isAttend, setIsAttend] = useState(false);
  const [hasPenalty, setHasPenalty] = useState(false);

  const { penaltyInfo, isLoading: penaltyLoading } = useGetPenalty();
  const {
    attendInfo,
    hasSchedule,
    isLoading: attendLoading,
  } = useGetAttend(isAttend);

  useEffect(() => {
    setHasPenalty(
      (penaltyInfo?.penaltyCount ?? 0) > 0 ||
        (penaltyInfo?.warningCount ?? 0) > 0,
    );
  }, [penaltyInfo]);

  useEffect(() => {
    if (attendInfo?.status === 'ATTEND') {
      setIsAttend(true);
    }
  }, [attendInfo?.status]);

  const smartLoading = useSmartCombinedLoading(attendLoading, penaltyLoading);
  if (smartLoading) return <Loading />;

  const { title, location, startDateTime, endDateTime, isWithinTimeRange } =
    getAttendTimeInfo(attendInfo);

  const handleOpenModal = () => {
    if (isWithinTimeRange) setModalOpen(true);
  };

  const handleCloseModal = () => setModalOpen(false);

  return (
    <S.StyledAttend>
      <AttendRate attendRate={attendInfo?.attendanceRate} />

      {/* 오늘의 출석 */}
      <AttendSection title="오늘의 출석" link="/attendCheck">
        {hasSchedule && attendInfo ? (
          <AttendInfo
            title={title}
            location={location}
            startDateTime={startDateTime}
            endDateTime={endDateTime}
            isWithinTimeRange={isWithinTimeRange}
            handleOpenModal={handleOpenModal}
            isAttend={isAttend}
          />
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
          <>
            <MyPenaltyInfo
              penaltyCount={penaltyInfo?.penaltyCount || 0}
              warningCount={penaltyInfo?.warningCount || 0}
            />
            <PenaltyInfo />
          </>
        ) : (
          <PenaltyContainer>
            <NoPenaltyInfo>
              <S.TitleText>페널티를 받은 이력이 없네요!</S.TitleText>
            </NoPenaltyInfo>
          </PenaltyContainer>
        )}
      </AttendSection>

      {/* 출석 모달 */}
      <ModalAttend
        title={title}
        location={location}
        startDateTime={startDateTime}
        endDateTime={endDateTime}
        open={modalOpen}
        close={handleCloseModal}
        handleAttend={setIsAttend}
      />
    </S.StyledAttend>
  );
};

export default AttendMain;
