import theme from '@/styles/theme';
import styled from 'styled-components';
import { PC, pcResponsive } from '@/styles';
import { colors, units } from '@/theme/designTokens';
import typography from '@/theme/typography';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-width: ${units.device.mobile}px;
  ${pcResponsive}
  box-sizing: border-box;
  margin-bottom: 50px;
`;

export const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${units.margin['400']}px;

  ${pcResponsive}
`;

export const BoardTitle = styled.div`
  display: flex;
  flex-direction: column;
  ${typography.H2}
  color: ${colors.semantic.text.normal};
  padding: 0 ${units.padding['450']}px;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  padding: 0 ${units.padding['450']}px;

  ${pcResponsive}
`;

export const PartPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  gap: ${units.margin['300']}px;
  padding: 0 ${units.padding['450']}px;

  ${pcResponsive}
`;

export const NoticePreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 0;
  gap: ${units.margin['300']}px;

  ${pcResponsive}
`;

export const NoticeTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${colors.dark.neutral['600']};

  ${pcResponsive}
`;

export const NoticeTitleText = styled.div`
  ${typography.Sub1};
  color: ${colors.dark.neutral['600']};
  line-height: 1;
`;

export const AllText = styled.div`
  ${typography.Caption2};
  color: ${colors.semantic.text.alternative};
  cursor: pointer;
  display: flex;
  align-items: center;

  ${pcResponsive}
`;

export const ScrollContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: ${units.margin['300']}px;
  cursor: grab;
  padding-left: ${units.padding['450']}px;

  &::-webkit-scrollbar {
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 0.25rem;
    background: ${colors.semantic.button.neutral};
  }
`;

export const PartBoardContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: ${units.margin['300']}px;

  @media (min-width: ${units.device.desktop}px) {
    overflow: visible;
    width: 100%;
  }
`;

export const EduScrollContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: ${units.margin['300']}px;
  cursor: grab;
  padding-left: ${units.padding['450']}px;

  &::-webkit-scrollbar {
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 0.25rem;
    background: ${colors.semantic.button.neutral};
  }

  @media (min-width: ${PC}) {
    width: 970px;
    gap: 15px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    overflow: visible;
    cursor: default;
  }
`;

export const NoticeCard = styled.div`
  flex: 0 0 auto;
  width: 278px;
  box-sizing: border-box;
  background-color: ${colors.dark.neutral['300']};
  color: white;
  border-radius: ${units.radius.lg}px;
  padding: ${units.padding['400']}px;
  gap: 15px;
  display: flex;
  flex-direction: column;
  text-decoration: none;

  &:hover {
    filter: brightness(1.2);
  }

  transition: filter 0.2s ease-in-out;
`;

export const NoticeTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const NoticeTitle = styled.div`
  ${typography.Sub2};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${colors.semantic.text.strong};
`;

export const NoticeContent = styled.p`
  ${typography.Caption2};
  color: ${colors.semantic.text.alternative};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;

  height: 31px;
`;

export const NoticeBottomRow = styled.div`
  display: flex;
  flex-direction: row;
  flex: 0 0 auto;
  justify-content: space-between;
`;

export const PositionIcon = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 5px;
`;

export const NoticeNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  ${typography.Caption2};
  color: ${colors.semantic.text.alternative};
`;

export const Divider = styled.span`
  margin: 0 5px;
  width: 1px;
  height: 10px;
  background-color: ${colors.semantic.line};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ReadMoreText = styled.p`
  margin: 0;
  font-size: 0.75rem;
  line-height: 1.25rem;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
`;

export const EduDateContainer = styled.p`
  margin: 0;
  ${typography.Caption2};
  color: ${colors.semantic.text.alternative};
  display: flex;
  align-items: center;
`;

export const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const FloatingButton = styled.div`
  position: fixed;
  right: 16px;
  bottom: 24px;
  width: 44px;
  height: 45px;
  cursor: pointer;
  border: none;
  z-index: 1000;

  svg {
    width: 44px;
    height: 45px;
  }
`;

export const CommentsText = styled.p`
  font-size: 0.75rem;
  line-height: 0.875rem;
  color: rgba(255, 255, 255, 0.5);
  font-family: ${theme.font.regular};
  margin: 0;
`;

export const ImgContainer = styled.img`
  width: 0.75rem;
  height: 0.75rem;
`;

export const PartTitleText = styled.p`
  display: flex;
  margin: 0;
  ${typography.Sub1};
  color: ${colors.dark.neutral['600']};
`;

export const PartList = styled.div`
  display: flex;
  gap: ${units.margin['300']}px;
  width: 100%;
`;

export const PartItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  width: 100%;

  @media (min-width: ${units.device.desktop}px) {
    width: 100%;
  }

  ${pcResponsive}
`;

export const PartImage = styled.img`
  width: 4.75rem;
  height: 4.75rem;
`;

export const PartIcon = styled.div`
  width: 100%;
  min-width: 73px;
  height: 73px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  svg {
    width: 73px;
    height: 73px;
    flex-shrink: 0;
  }

  @media (min-width: ${units.device.desktop}px) {
    width: 100%;
    height: 100%;

    svg {
      width: 185.5px;
      height: 73px;
      flex-shrink: 0;
    }
  }
`;

export const PartBackground = styled.div`
  width: 100%;
  height: 73px;
  background-color: ${colors.semantic.container.neutral};
  border-radius: ${units.radius.lg}px;
  display: flex;
  box-sizing: border-box;
  align-items: flex-start;
  justify-content: center;
  padding-top: 11px;
  overflow: hidden;
`;

export const PartLabel = styled.p`
  margin: 0;
  ${typography.Sub1};
  line-height: 1;
  color: ${colors.dark.neutral['700']};
`;

export const EduTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;
`;

export const EduAddContent = styled.p`
  font-size: 0.75rem;
  line-height: 1;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  font-family: ${theme.font.regular};
`;

export const EduCard = styled.div`
  flex: 0 0 auto;
  width: 228px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: ${colors.semantic.container.neutral};
  padding: ${units.padding['400']}px ${units.padding['450']}px;
  gap: ${units.margin['300']}px;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    filter: brightness(1.2);
  }
`;

export const NoticeTopRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const EduPart = styled.div`
  display: flex;
  gap: 0.3125rem;
  ${typography.Caption1};
`;

export const EduCardTitle = styled.p`
  ${typography.Sub2};
  color: white;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0;
`;

export const Text = styled.div`
  text-align: center;
  margin: 10px;
  font-family: ${theme.font.semiBold};
`;

export const PostListContainer = styled.div`
  margin: 0 0.46875rem;
`;

export const PostListItemContainer = styled.div`
  padding: 0 0.3125rem;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${theme.color.gray[20]};
  }
`;

export const Line = styled.div`
  border: 1px solid;
  margin: 0 0.3125rem;
  color: ${(props) => props.theme.color.gray[18]};
`;

export const TextButton = styled.div<{ $isFirst?: boolean; $isLast?: boolean }>`
  width: 144px;
  height: 40px;
  box-sizing: border-box;
  padding: ${units.padding['200']}px 16px;
  ${({ $isFirst }) => $isFirst && `margin-top: ${units.padding['100']}px;`}
  ${({ $isLast }) => $isLast && `margin-bottom: ${units.padding['100']}px;`}
  color: white;
  cursor: pointer;
  &:hover {
    background-color: ${colors.semantic.button['neutral-interaction']};
  }
`;
