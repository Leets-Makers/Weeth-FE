import { useEffect, useState } from 'react';

import check from '@/assets/images/ic_check.svg';
import warning from '@/assets/images/ic_warning.svg';

import * as S from '@/styles/attend/AttendMain.styled';
import { AttendProject } from '@/styles/attend/AttendInfo.styled';
import {
  PenaltyContainer,
  NoPenaltyInfo,
} from '@/styles/attend/PenaltyInfo.styled';

import useGetAttend from '@/api/useGetAttend';
import useGetPenalty from '@/api/useGetPenalty';

import { AttendInfo, NoAttnedInfo } from '@/components/Attendance/AttendInfo';
import AttendRate from '@/components/Attendance/AttendRate';
import {
  MyPenaltyInfo,
  PenaltyInfo,
} from '@/components/Attendance/PenaltyInfo';
import Loading from '@/components/common/Loading';
import ModalAttend from '@/components/Attendance/ModalAttend';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import isBetween from 'dayjs/plugin/isBetween';
import { useSmartCombinedLoading } from '@/hooks/useSmartLoading';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.locale('ko');
dayjs.extend(isBetween);

const AttendMain: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [hasPenalty, setHasPenalty] = useState<boolean>(false);

  const { penaltyInfo, isLoading: penaltyLoading } = useGetPenalty();
  const [isAttend, setIsAttend] = useState(false);
  const {
    attendInfo,
    hasSchedule,
    isLoading: attendLoading,
  } = useGetAttend(isAttend);

  useEffect(() => {
    const has =
      (penaltyInfo?.penaltyCount ?? 0) > 0 ||
      (penaltyInfo?.warningCount ?? 0) > 0;
    setHasPenalty(has);
  }, [penaltyInfo?.penaltyCount, penaltyInfo?.warningCount]);

  useEffect(() => {
    if (attendInfo?.status === 'ATTEND') {
      setIsAttend(true);
    }
  }, [attendInfo?.status]);

  const smartLoading = useSmartCombinedLoading(attendLoading, penaltyLoading);
  if (smartLoading) return <Loading />;

  let title = 'Loading...';
  let location = 'Loading...';
  let startDateTime = 'Loading...';
  let endDateTime = 'Loading...';
  let isWithinTimeRange = false;

  if (attendInfo) {
    title = attendInfo.title || 'No title';
    location = attendInfo.location || 'No location';

    const startDate = attendInfo.start ? dayjs(attendInfo.start) : dayjs();
    const endDate = attendInfo.end ? dayjs(attendInfo.end) : dayjs();

    startDateTime = startDate.format('YYYY년 MMMM D일');
    const startTime = startDate.locale('en').format('h:mm A');
    const endTime = endDate.locale('en').format('h:mm A');

    endDateTime = `(${startTime} ~ ${endTime})`;

    const current = dayjs();
    const adjustedStart = startDate.subtract(10, 'minute');
    isWithinTimeRange = current.isBetween(
      adjustedStart,
      endDate,
      'minute',
      '[]',
    );
  }

  const handleOpenModal = () => {
    if (isWithinTimeRange) {
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <S.StyledAttend>
      <AttendRate attendRate={attendInfo?.attendanceRate} />
      <S.StyledBox>
        <img src={check} alt="v" />
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
      </S.StyledBox>
      <S.StyledBox>
        <img src={warning} alt="!" />
        {penaltyInfo?.penaltyCount === null ? (
          <S.SemiBold>
            <AttendProject>등록된 데이터가 없습니다.</AttendProject>
          </S.SemiBold>
        ) : (
          <>
            {hasPenalty ? (
              <MyPenaltyInfo
                penaltyCount={penaltyInfo?.penaltyCount || 0}
                warningCount={penaltyInfo?.warningCount || 0}
              />
            ) : (
              <PenaltyContainer>
                <NoPenaltyInfo>
                  <S.SemiBold>페널티를 받은 이력이 없네요!</S.SemiBold>
                </NoPenaltyInfo>
              </PenaltyContainer>
            )}
            <PenaltyInfo />
          </>
        )}
      </S.StyledBox>
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
