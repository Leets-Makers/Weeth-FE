import styled from 'styled-components';
import theme from '@/styles/theme';
import { pcResponsive } from '@/styles';
import { colors, units } from '@/theme/designTokens';
import typography from '@/theme/typography';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${units.padding['400']}px ${units.padding['450']}px;
  gap: ${units.margin['300']}px;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;

  ${pcResponsive}
`;

export const PostTopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const PostContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const StudyTagContainer = styled.div`
  display: flex;
  gap: 5px;
`;

export const TitleContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

export const CommentContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const TitleText = styled.div`
  ${typography.Sub2};
  color: ${colors.semantic.text.strong};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Divider = styled.span`
  width: 1px;
  height: 10px;
  background-color: ${theme.color.gray[30]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContentText = styled.div`
  color: ${colors.semantic.text.alternative};
  ${typography.Caption2};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 2px;
`;

export const LightText = styled.div`
  color: ${colors.semantic.text.alternative};
  ${typography.Caption2};
`;

export const CommentsText = styled(LightText)`
  width: 8px;
  height: 14px;
  margin-left: 2px;
`;

export const NameText = styled(LightText)`
  display: flex;
  align-items: center;
`;

export const ImgContainer = styled.img`
  height: 12px;
  width: 12px;
  filter: brightness(0) saturate(100%) invert(67%) sepia(0%) saturate(187%)
    hue-rotate(0deg) brightness(92%) contrast(92%);
`;

export const PositionIcon = styled.img`
  height: 1rem;
  width: 1rem;
  border-radius: 2px;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const BottomInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 16px;
  box-sizing: border-box;
`;

export const PartContainer = styled.div`
  display: flex;
  gap: 5px;
`;
