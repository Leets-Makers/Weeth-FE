import { styled } from 'styled-components';

export const DetailRow = styled.tr`
  background-color: #f9f9f9;
  border-bottom: 1px solid #dedede;
`;

export const DetailCell = styled.td`
  padding: 10px 25px;
  text-align: left;
  vertical-align: middle;
  white-space: nowrap;
`;

export const EmptyCell = styled.td`
  width: 30px;
`;

export const DetailText = styled.div`
  font-size: 18px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
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
