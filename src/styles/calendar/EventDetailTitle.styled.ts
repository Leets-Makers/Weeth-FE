import theme from '@/styles/theme';
import { units, colors } from '@/theme/designTokens';
import typography from '@/theme/typography';
import styled from 'styled-components';
import KebabButton from '@/assets/images/ic_board_detail_kebabButton.svg?react';

export const KebabIcon = styled(KebabButton)`
  cursor: pointer;
  padding: 8px;
`;

export const EventTitleWrapper = styled.div`
  padding: 0 ${units.padding['450']}px;
  box-sizing: border-box;
`;

export const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div`
  ${typography.H3};
  padding-bottom: 10px;
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: normal;
`;

export const Writer = styled.div`
  ${typography.Caption2};
  color: ${colors.semantic.text.alternative};
`;

export const WriteInfo = styled.div`
  display: flex;
  align-items: center;

  div {
    margin-right: 10px;
  }
`;

export const TextButton = styled.div<{ $isLast?: boolean }>`
  width: calc(100% - 8px);
  box-sizing: border-box;
  padding: 12px 0 12px 16px;
  margin: 0 4px;
  border-bottom: ${(props) =>
    props.$isLast ? 'none' : `1px solid ${theme.color.gray[30]}`};
  color: ${(props) => (props.$isLast ? theme.color.negative : 'white')};
`;
