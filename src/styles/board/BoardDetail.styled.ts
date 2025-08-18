import styled from 'styled-components';
import theme from '@/styles/theme';
import { MOBILE, PC } from '@/styles';

export const Container = styled.div`
  width: 100%;
  max-width: ${MOBILE};
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding-bottom: 60px;

  @media (min-width: ${PC}) {
    max-width: ${PC};
  }
`;

export const CommentInputContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: ${MOBILE};

  @media (min-width: ${PC}) {
    max-width: ${PC};
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
