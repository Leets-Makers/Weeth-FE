/**
 * 특정 멤버의 확장된 페널티 상세 행
 */

import PenaltySubHeaderRow from '@/components/Admin/PenaltySubHeaderRow';
import PenaltyDetail from '@/components/Admin/PenaltyDetail';
import formatDate from '@/utils/admin/dateUtils';
import { columns } from '@/constants/admin/penaltyColumns';
import { PenaltyState } from '@/components/Admin/context/PenaltyReducer';

interface ExpandedPenaltyRowProps {
  memberId: number;
  penaltyData: PenaltyState;
  onRefresh: () => Promise<void>;
}

const ExpandedPenaltyRow: React.FC<ExpandedPenaltyRowProps> = ({
  memberId,
  penaltyData,
  onRefresh,
}) => {
  const penalties = penaltyData[memberId] ?? [];

  if (!penalties.length) return null;

  return (
    <>
      <PenaltySubHeaderRow />

      {penalties.map((penalty) => (
        <tr key={`${memberId}-${penalty.penaltyId}`}>
          <td colSpan={columns.length + 2}>
            <PenaltyDetail
              penaltyData={{
                penaltyId: penalty.penaltyId,
                penaltyType: penalty.penaltyType,
                isAuto: penalty.isAuto,
                penaltyDescription: penalty.penaltyDescription,
                time: formatDate(penalty.time),
              }}
              onRefresh={onRefresh}
            />
          </td>
        </tr>
      ))}
    </>
  );
};

export default ExpandedPenaltyRow;
