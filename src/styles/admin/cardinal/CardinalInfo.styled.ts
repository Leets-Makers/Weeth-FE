import { styled } from 'styled-components';
import { BoxWrapper } from '@/components/Admin/TotalDues';
import Box, { Description } from '@/components/Admin/Box';
import { colors, units } from '@/theme/designTokens';

export const CardinalBoxWrapper = styled(BoxWrapper)`
  padding: 0 0 20px 0;
  box-sizing: border-box;
  min-width: 1400px;
`;

export const TotalBox = styled(Box)`
  background-color: ${({ theme }) => theme.color.gray[18]};

  ${Description} {
    color: ${({ theme }) => theme.semantic.text.inverse};
  }
`;

export const ScrollContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 10px;
  overflow-x: auto;
  scroll-behavior: smooth;
  max-width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;
