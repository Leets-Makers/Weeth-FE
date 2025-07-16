import theme from '@/styles/theme';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 23.125rem;
  max-width: 23.125rem;
  margin-bottom: 3.125rem;
`;

export const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
  padding-top: 0.625rem;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.625rem 0.9375rem;
  gap: 0.625rem;
`;

export const NoticeTextContainer = styled.div`
  padding-left: 0.3125rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const NoticeTitleText = styled.div`
  font-size: 1.1875rem;
  font-family: ${theme.font.semiBold};
  line-height: 1;
`;

export const AllText = styled.div`
  font-size: 0.75rem;
  line-height: 1.25rem;
  color: ${theme.color.gray[65]};
  cursor: pointer;
  margin-top: 0.1875rem;
`;

export const ScrollContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 0.9375rem;
  cursor: grab;

  &::-webkit-scrollbar {
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 0.25rem;
    background: ${theme.color.gray[65]};
  }
`;

export const NoticeCard = styled.div`
  flex: 0 0 auto;
  width: 17.125rem;
  height: 7.5rem;
  box-sizing: border-box;
  background-color: ${theme.color.gray[18]};
  color: white;
  border-radius: 0.625rem;
  padding: 1.125rem 0.9375rem 0.625rem 0.9375rem;
  gap: 0.9375rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;

  &:nth-child(1) {
    background-color: #291f1f;
    color: white;
    border: 1px solid ${theme.color.negativeDark};
  }

  &:hover {
    filter: brightness(1.2);
  }

  transition: filter 0.2s ease-in-out;
`;

export const NoticeTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0;
`;

export const NoticeTitle = styled.div`
  font-size: 1rem;
  font-family: ${theme.font.semiBold};
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const NoticeContent = styled.p`
  font-size: 0.75rem;
  line-height: 1;
  color: ${theme.color.gray[65]};
  font-family: ${theme.font.regular};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`;

export const NoticeBottomRow = styled.div`
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
`;

export const ReadMoreText = styled.p`
  margin: 0;
  font-size: 0.75rem;
  line-height: 1.25rem;
  color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  gap: 0.3125rem;
`;

export const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.125rem;
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
  padding-left: 0.3125rem;
  color: white;
  font-size: 1.1875rem;
  font-family: ${theme.font.semiBold};
  line-height: 1;
  margin: 0;
`;

export const PartList = styled.div`
  display: flex;
  gap: 0.9375rem;
`;

export const PartItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
`;

export const PartImage = styled.img`
  width: 4.75rem;
  height: 4.75rem;
`;

export const PartLabel = styled.p`
  margin: 0;
  font-family: ${theme.font.semiBold};
  font-size: 1.125rem;
  line-height: 1;
  color: ${theme.color.gray[80]};
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
  padding-left: 0.3125rem;
  margin: 0;
  font-family: ${theme.font.regular};
`;

export const EduCard = styled.div`
  flex: 0 0 auto;
  width: 11.3125rem;
  height: 7.9375rem;
  box-sizing: border-box;
  border-radius: 0.625rem;
  border: 1px solid ${theme.color.gray[20]};
  background-color: ${theme.color.gray[18]};
  padding: 0.9375rem 0.9375rem 0.625rem 0.9375rem;
  gap: 0.9375rem;
  display: flex;
  flex-direction: column;
`;

export const EduPart = styled.div`
  display: flex;
  gap: 0.3125rem;
`;

export const EduCardTitle = styled.p`
  font-size: 1rem;
  font-family: ${theme.font.semiBold};
  color: ${theme.color.gray[100]};
  line-height: 100%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin: 0;
`;
