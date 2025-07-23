import theme from '@/styles/theme';
import styled from 'styled-components';

const StyledText = styled.div`
  background-color: ${theme.color.mainMiddle};
  width: 57px;
  height: 32px;
  padding: 0px 10px;
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.color.gray[100]};
  cursor: pointer;
  font-size: 14px;
  font-family: ${theme.font.semiBold};
`;

const WritingButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return <StyledText onClick={onClick}>{text}</StyledText>;
};

export default WritingButton;
