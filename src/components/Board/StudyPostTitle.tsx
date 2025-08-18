import { MOBILE, pcResponsive } from '@/styles';
import theme from '@/styles/theme';
import styled from 'styled-components';

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  gap: 10px;
  width: 100%;
  max-width: ${MOBILE};
  box-sizing: border-box;

  ${pcResponsive}
`;

const Title = styled.div`
  font-size: 12px;
  color: ${theme.color.gray[65]};
  font-family: ${theme.font.semiBold};
`;

const TitleInput = styled.input`
  height: 52px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 15px 10px;
  background-color: ${theme.color.gray[18]};
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  color: ${theme.color.gray[100]};
  font-size: 16px;
  font-family: ${theme.font.semiBold};
  border: none;

  &::placeholder {
    color: ${theme.color.gray[65]};
  }

  &:focus {
    outline: none;
    box-shadow: none !important;
    border: none;
  }
`;

const StudyPostTitle = ({
  title,
  setTitle,
}: {
  title: string;
  setTitle: (value: string) => void;
}) => {
  return (
    <TitleWrapper>
      <Title>제목</Title>
      <TitleInput
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </TitleWrapper>
  );
};

export default StudyPostTitle;
