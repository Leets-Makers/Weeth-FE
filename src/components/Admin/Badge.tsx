import styled from 'styled-components';
import { units } from '@/theme/designTokens';
import typography from '@/theme/typography';

interface BadgeProps {
  text?: string;
  isActive?: boolean;
}

const StyledBadge = styled.div<{ $isActive: boolean }>`
  display: inline-flex;
  padding: 4px 8px;
  border-radius: ${units.radius.sm}px;
  ${typography.admin.Caption1};
  white-space: nowrap;

  background-color: ${({ theme, $isActive }) =>
    $isActive
      ? `${theme.semantic.text.inverse}4D` // 30% opacity
      : `${theme.semantic.brand.primary}1A`}; // 10% opacity

  color: ${({ theme, $isActive }) =>
    $isActive ? theme.semantic.text.inverse : theme.semantic.brand.primary};
`;

const Badge: React.FC<BadgeProps> = ({
  text = '이번 주',
  isActive = false,
}) => {
  return <StyledBadge $isActive={isActive}>{text}</StyledBadge>;
};

export default Badge;
