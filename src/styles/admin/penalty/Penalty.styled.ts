import theme from '@/styles/theme';
import { styled } from 'styled-components';

// penaltyListTable.tsx
export const TableWrapper = styled.div<{ hasData: boolean }>`
  font-size: 18px;
  border-collapse: collapse;

  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: ${(props) => (props.hasData ? 'auto' : '100%')};
  }

  margin: 0;
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 20px;
`;

export const TableContainer = styled.div`
  min-width: 950px;
  background-color: #fff;
  border: 1px solid #f2f2f2;
  border-radius: 8px;
  box-shadow: 0px 3px 8px rgba(133, 141, 138, 0.2);
  padding-top: 10px;
  padding: 20px;
  box-sizing: border-box;
`;

export const Row = styled.tr<{ isSelected: boolean }>`
  border-bottom: 1px solid #dedede;
  cursor: pointer;
  background-color: ${(props) =>
    props.isSelected ? '#e9e9e9' : 'transparent'};
`;

export const Cell = styled.td`
  padding: 15px 25px;
  text-align: left;
  white-space: nowrap;
`;

export const HeaderCell = styled.th`
  text-align: left;
  padding: 15px 25px;
  border-bottom: 1px solid #dedede;
  font-weight: bold;
  white-space: nowrap;
`;

export const EmptyCell = styled.td`
  width: 150px;
`;

export const NoDataCell = styled.div`
  color: ${theme.color.gray[65]};
  padding: 20px;
  letter-spacing: 1px;
  text-align: center;
`;

export const Input = styled.input`
  width: 100%;
  max-width: 300px;
  background-color: transparent;
  border: none;
  font-size: 18px;
  outline: none;
  box-sizing: border-box;
`;

export const ButtonWrapper = styled.div`
  grid-area: actions;
  display: flex;
  justify-content: flex-end;
`;

// penaltyDetail.tsx
export const DetailContainer = styled.td`
  display: grid;
  grid-template-columns:
    minmax(390px, auto) minmax(40px, 0.9fr) minmax(40px, 0.9fr) minmax(
      70px,
      1fr
    )
    minmax(60px, 1fr);
  grid-template-areas: ' reason penalty warning penaltyDate actions';
  padding-left: 120px;
  border-bottom: 1px solid #dedede;
  background-color: #ffffff;
  align-items: center;
  box-sizing: border-box;
`;

export const DetailText = styled.div`
  font-size: 18px;
`;
