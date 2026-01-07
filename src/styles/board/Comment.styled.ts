import theme from '@/styles/theme';
import styled from 'styled-components';
import { MOBILE, pcResponsive } from '@/styles';
import { colors, units } from '@/theme/designTokens';
import typography from '@/theme/typography';

export const CommentContainer = styled.div<{ $isSelect: boolean }>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: ${units.padding['400']}px ${units.padding['450']}px;
  background-color: ${(props) =>
    props.$isSelect ? '#508FFF1A' : 'transparent'};
  transition: background-color 0.3s ease;
  word-break: break-all;

  width: 100%;
  max-width: ${MOBILE};

  ${pcResponsive}
`;

export const CommentContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${units.margin['200']}px;
`;

export const CommentTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.3125rem;
  align-items: start;
`;

export const NameText = styled.div`
  ${typography.Sub2};
  color: ${colors.semantic.text.strong};
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const PositionIcon = styled.img`
  height: 1.25rem;
  width: 1.25rem;
  margin-right: 5px;
`;

export const ContentText = styled.div`
  ${typography.Body1};
  color: ${colors.semantic.text.normal};

  a {
    color: ${colors.semantic.brand.primary};
    text-decoration: none;
  }

  a:hover {
    color: ${theme.color.mainDark};
  }
`;

export const FileListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const DateText = styled.div`
  ${typography.Caption2};
  color: ${colors.semantic.text.alternative};
`;

export const ImageButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

export const ReplyCommentContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 15px;
  align-items: flex-start;
  word-break: break-all;

  width: 100%;
  max-width: ${MOBILE};

  ${pcResponsive}
`;

export const ReplyArrow = styled.img`
  width: 20px;
  height: 20px;
`;

export const ReplyContentContainer = styled.div`
  flex: 1;
  background-color: ${colors.semantic.container.neutral};
  border-radius: ${units.radius.lg}px;
  padding: ${units.padding['400']}px;
  display: flex;
  flex-direction: column;
  position: relative;
  gap: ${units.margin['200']}px;
`;

export const ReplyHeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ReplyImageButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;
