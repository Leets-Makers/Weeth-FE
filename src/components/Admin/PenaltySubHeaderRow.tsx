import { styled } from 'styled-components';
import { subColumns } from '@/constants/admin/penaltyColumns';
import { StatusCell } from '@/components/Admin/MemberListTableRow';
import { getStatusColor } from '@/components/Admin/StatusIndicator';
import typography from '@/theme/typography';

export const SubHeaderRow = styled.tr`
  ${typography.admin.Sub2};
  color: ${({ theme }) => theme.semantic.text.alternative};
  background-color: ${({ theme }) => theme.semantic.container.neutral};
  border-bottom: 1px solid ${({ theme }) => theme.semantic.line};
`;

export const HeaderCell = styled.th`
  ${typography.admin.Sub2}
  padding: 15px 25px;
  text-align: left;
  white-space: nowrap;
`;

const PenaltySubHeaderRow: React.FC = () => {
  return (
    <SubHeaderRow>
      <StatusCell $statusColor={getStatusColor('상태 없음')} />
      {subColumns.map((column, idx) => (
        <HeaderCell key={idx}>{column.header || ''}</HeaderCell>
      ))}
    </SubHeaderRow>
  );
};

export default PenaltySubHeaderRow;
