import theme from '@/styles/theme';
import styled from 'styled-components';

const StyledText = styled.div`
  color: ${theme.color.main};
  font-size: 14px;
  font-family: ${theme.font.semiBold};
`;

const PostButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return <StyledText onClick={onClick}>{text}</StyledText>;
};

export default PostButton;
