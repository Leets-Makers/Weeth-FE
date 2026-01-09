import theme from '@/styles/theme';
import { colors, units } from '@/theme/designTokens';
import typography from '@/theme/typography';
import styled from 'styled-components';

export const EventEditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 ${units.padding['450']}px;
  padding-bottom: 40px;
`;

export const EventEditorContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${units.margin['300']}px;
  width: 100%;
`;

export const Bold = styled.div`
  display: flex;
  margin-right: auto;
  padding-top: 15px;
  font-family: ${theme.font.semiBold};
  font-size: 16px;
`;

export const Description = styled.div`
  color: ${theme.color.gray[65]};
`;

export const Align = styled.div`
  display: flex;
  gap: 11px;
`;

export const Help = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${colors.semantic.icon.alternative};
  cursor: pointer;
`;

export const DefaultStyle = styled.div`
  height: 50px;
  width: 345px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Meeting = styled(DefaultStyle)`
  padding: 13px ${units.padding['400']}px;
`;

export const CardinalWrapper = styled(DefaultStyle)`
  padding: 10px 13px;
`;

export const DateTime = styled(DefaultStyle)`
  padding: 5px ${units.padding['400']}px;
  ${typography.Body1};
  gap: 10px;
  height: auto;
  min-height: 50px;
  align-items: center;
`;

export const Time = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

export const CardinalTagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  width: 100%;
  row-gap: 5px;
`;

export const Cardinal = styled.div`
  display: flex;
  gap: 10px;
  padding: 13px 10px;
  margin-left: auto;
`;

export const CardinalList = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 238px;
  gap: 5px;
  box-sizing: border-box;
`;

export const TimeBlock = styled.div`
  background-color: ${colors.semantic.backGround};
  height: 40px;
  box-sizing: border-box;
  padding: 10px;
  ${typography.Body1};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${units.radius.sm}px;
  cursor: pointer;
`;

export const Line = styled.div`
  width: 345px;
  border-bottom: 1px solid ${theme.color.gray[30]};
`;

export const TextAreaWrapper = styled.div`
  width: 345px;
  background-color: ${theme.color.gray[18]};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

export const TextArea = styled.textarea`
  height: 229px;
  width: 325px;
  padding: ${units.padding['300']}px ${units.padding['200']}px
    ${units.padding['300']}px ${units.padding['400']}px;
  border-radius: ${units.radius.lg}px;
  resize: none;
  border: none;
  outline: none;
  background-color: ${colors.semantic.container.neutral};
  color: ${colors.semantic.text.strong};
  ${typography.Body1};

  &::placeholder {
    color: ${colors.semantic.text.alternative};
  }

  &::-webkit-scrollbar {
    width: 5px;
    margin: 15px 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export const Error = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0px;
`;
