import theme from '@/styles/theme';
import styled from 'styled-components';

const StyledText = styled.div`
  color: ${theme.color.main};
  font-size: 16px;
  font-family: ${theme.font.semiBold};
  cursor: pointer;
`;

const AdminButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return <StyledText onClick={onClick}>{text}</StyledText>;
};

export default AdminButton;
