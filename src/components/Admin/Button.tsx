import styled from 'styled-components';
import theme from '@/styles/theme';
import typography from '@/theme/typography';

interface ButtonProps {
  color: string;
  description: string;
  width: string;
  onClick?: () => void;
  borderRadius?: string;
  disabled?: boolean; // 버튼 비활성화 여부
  textColor?: string; // 텍스트 색상
  $typo?:
    | typeof typography.admin.Button1
    | typeof typography.admin.Button2
    | typeof typography.Button1
    | typeof typography.Button2;
}

const Wrapper = styled.div<{
  color: string;
  width: string;
  borderRadius?: string;
}>`
  width: ${(props) => props.width || '64px'};
  height: 48px;
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: ${({ borderRadius }) => borderRadius || '0px'};
`;

const Description = styled.div<{
  $textColor?: string;
  $typo?:
    | typeof typography.admin.Button1
    | typeof typography.admin.Button2
    | typeof typography.Button1
    | typeof typography.Button2;
}>`
  ${({ $typo }) => $typo || typography.admin.Button1};
  color: ${({ $textColor }) => $textColor ?? theme.color.gray[100]};
`;

const Button: React.FC<ButtonProps> = ({
  color,
  description,
  width,
  onClick,
  borderRadius,
  disabled = false,
  textColor,
  $typo,
}) => {
  return (
    <Wrapper
      color={color}
      width={width}
      onClick={onClick}
      borderRadius={borderRadius}
      style={{
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      <Description $textColor={textColor} $typo={$typo}>
        {description}
      </Description>
    </Wrapper>
  );
};
export default Button;
