import { MOBILE, pcResponsive } from '@/styles';
import { colors, units } from '@/theme/designTokens';
import typography from '@/theme/typography';
import styled from 'styled-components';

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${units.margin['200']}px;
  width: 100%;
  max-width: ${MOBILE};
  box-sizing: border-box;

  ${pcResponsive}
`;

const Title = styled.div`
  ${typography.Caption1};
  color: ${colors.semantic.text.alternative};
`;

const TitleInput = styled.input`
  height: 48px;
  width: 100%;
  box-sizing: border-box;
  border-radius: ${units.radius.lg}px;
  padding: ${units.padding['300']}px ${units.padding['400']}px;
  background-color: ${colors.semantic.container.neutral};
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
  color: ${colors.semantic.text.normal};
  ${typography.Body1};
  border: none;

  &::placeholder {
    color: ${colors.semantic.text.alternative};
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
