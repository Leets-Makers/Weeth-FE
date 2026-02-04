import { styled } from 'styled-components';
import { subColumns } from '@/constants/admin/penaltyColumns';
import { StatusCell } from '@/components/Admin/MemberListTableRow';
import { getStatusColor } from '@/components/Admin/StatusIndicator';

export const SubHeaderRow = styled.tr`
  background-color: #e6fcf7;
  border-bottom: 1px solid #dedede;
  font-weight: 600;
`;

export const HeaderCell = styled.th`
  padding: 12px 25px;
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
