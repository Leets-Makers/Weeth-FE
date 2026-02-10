import { colors } from '@/theme/designTokens';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 15px 25px 15px 10px;
`;

const Label = styled.div`
  color: ${colors.semantic.text.alternative};
  width: 76px;
  min-width: 76px;
`;

const Info = styled.div<{ $isLast?: boolean; readOnly?: boolean }>`
  display: flex;
  gap: 3px;
  width: 100%;
  padding-top: 3px;
  color: ${({ readOnly }) =>
    readOnly ? colors.semantic.text.disabled : '#fff'};
  padding-bottom: ${({ $isLast }) => ($isLast ? 0 : '15px')};
  border-bottom: ${({ $isLast }) =>
    $isLast ? 'none' : `1px solid ${colors.semantic.line}`};
`;

const InfoItem = ({
  label,
  isLast,
  readOnly,
  children,
}: {
  label: string;
  isLast?: boolean;
  readOnly?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Info $isLast={isLast} readOnly={readOnly}>
        {children}
      </Info>
    </Container>
  );
};

export default InfoItem;
