import { colors } from '@/theme/designTokens';
import typography from '@/theme/typography';
import styled from 'styled-components';

export const StyledHomeMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
`;

export const GridContainer = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;

  /* 모바일 (기존 레이아웃 - 2열) */
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    'calendar penalty'
    'board member'
    'board dues';

  /* 태블릿/PC (새로운 레이아웃 - 3열) */
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 180px 180px;
    grid-template-areas:
      'board board penalty'
      'calendar member dues';
  }
`;

export const GridItem = styled.div`
  background-color: ${colors.semantic.container.neutral};

  ${typography.Sub1};
  border-radius: 10px;
  display: flex;
  padding: 20px 10px 10px 15px;
  gap: 34px;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${colors.semantic.container['neutral-interaction']};
    color: ${colors.semantic.text.inverse};
  }
`;

export const CalendarItem = styled(GridItem)`
  grid-area: calendar;
`;

export const PenaltyItem = styled(GridItem)`
  grid-area: penalty;
`;

export const BoardItem = styled(GridItem)`
  grid-area: board;
`;

export const MemberItem = styled(GridItem)`
  grid-area: member;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

export const DuesItem = styled(GridItem)`
  grid-area: dues;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

export const PlaceholderImage = styled.img`
  display: flex;
  align-self: flex-end;
  justify-self: flex-start;
`;
