import { useNavigate } from 'react-router-dom';

import calendar from '@/assets/images/ic_home_calendar.svg';
import attend from '@/assets/images/ic_home_attend.svg';
import board from '@/assets/images/ic_home_board.svg';
import * as S from '@/styles/home/HomeMain.styled';
import { CURRENT_YEAR, CURRENT_MONTH } from '@/constants/dateConstants';

const HomeMain: React.FC = () => {
  const navi = useNavigate();

  return (
    <S.StyledHomeMain>
      <S.GridContainer>
        <S.CalendarItem
          onClick={() => {
            navi(`/calendar?year=${CURRENT_YEAR}&month=${CURRENT_MONTH}`);
          }}
        >
          캘린더
          <S.PlaceholderImage src={calendar} alt="캘린더 이미지" />
        </S.CalendarItem>
        <S.PenaltyItem
          onClick={() => {
            navi(`/attendance`);
          }}
        >
          출석
          <S.PlaceholderImage src={attend} alt="출석 이미지" />
        </S.PenaltyItem>
        <S.BoardItem
          onClick={() => {
            navi(`/board`);
          }}
        >
          게시판
          <S.PlaceholderImage src={board} alt="게시판 이미지" />
        </S.BoardItem>
        <S.MemberItem
          onClick={() => {
            navi(`/member?cardinal=0`);
          }}
        >
          멤버
        </S.MemberItem>
        <S.DuesItem
          onClick={() => {
            navi(`/dues`);
          }}
        >
          회비
        </S.DuesItem>
      </S.GridContainer>
    </S.StyledHomeMain>
  );
};

export default HomeMain;
