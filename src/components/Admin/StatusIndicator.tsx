import theme from '@/styles/theme';
import styled from 'styled-components';

interface StatusIndicatorProps {
  status: '승인 완료' | '대기 중' | '추방' | '상태 없음';
}

export const StatusDot = styled.span<{
  status: '승인 완료' | '대기 중' | '추방' | '상태 없음';
}>`
  width: 4px;
  height: 4px;
  background-color: ${(props) => getStatusColor(props.status)(props)};
`;

const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #333;
`;

export const getStatusColor =
  (status: '승인 완료' | '대기 중' | '추방' | '상태 없음') =>
  ({ theme }: { theme: any }) => {
    switch (status) {
      case '승인 완료':
        return theme.semantic.brand.primary;
      case '대기 중':
        return theme.semantic.state.caution;
      case '추방':
        return theme.semantic.state.error;
      default:
        return '#e6fcf7';
    }
  };

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  return (
    <StatusWrapper>
      <StatusDot status={status} />
      {status}
    </StatusWrapper>
  );
};

export default StatusIndicator;
