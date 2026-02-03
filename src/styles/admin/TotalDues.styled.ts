import { units } from '@/theme/designTokens';
import styled from 'styled-components';

export const TotalDuesWrapper = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: ${units.radius.md}px;
  border: 1px solid #dedede;
  margin-top: 20px;

  &:last-child {
    margin-bottom: 20px;
  }
`;

export const TopDues = styled.div`
  width: 100%;
  height: 72px;
  border-bottom: 1px solid #dedede;
  font-size: 24px;
  display: flex;
  align-items: center;
`;

export const Title = styled.div`
  margin-left: 30px;
`;
