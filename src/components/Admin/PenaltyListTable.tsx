import React, { useState } from 'react';
import * as S from '@/styles/admin/penalty/PenaltyListTable.styled';
import {
  PenaltyAction,
  PenaltyState,
} from '@/components/Admin/context/PenaltyReducer';
import { useMemberContext } from '@/components/Admin/context/MemberContext';
import { columns } from '@/constants/admin/penaltyColumns';
import { getStatusColor } from '@/components/Admin/StatusIndicator';
import { StatusCell } from '@/components/Admin/MemberListTableRow';
import { usePenaltyData } from '@/hooks/admin/usePenaltyData';
import useGetUserInfo from '@/api/useGetGlobaluserInfo';
import { getLatestPenaltyDate } from '@/utils/admin/getLatestPenaltyDate';
import { useFilteredMembers } from '@/hooks/admin/usePenaltyFilteredMembers';
import ExpandedPenaltyRow from '@/components/Admin/ExpandedPenaltyRow';

interface PenaltyListTableProps {
  selectedCardinal: number | null;
  searchName: string;
  penaltyData: PenaltyState;
  dispatch: React.Dispatch<PenaltyAction>;
}

const PenaltyListTable: React.FC<PenaltyListTableProps> = ({
  selectedCardinal,
  searchName,
  penaltyData,
  dispatch,
}) => {
  const { members } = useMemberContext();
  const { isAdmin, loading } = useGetUserInfo();

  // 페널티 데이터 가져오기 훅
  const { fetchPenaltyData } = usePenaltyData({
    selectedCardinal,
    isAdmin,
    loading,
    dispatch,
  });

  // 필터링된 멤버 목록 가져오기 훅
  const filteredMembers = useFilteredMembers(
    penaltyData,
    members,
    selectedCardinal,
    searchName,
  );

  // 확장된 행 상태 관리
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  // 행 클릭 시 확장 토글
  const handleRowClick = (userId: number) => {
    setExpandedRow((prev) => (prev === userId ? null : userId));
  };

  // 멤버의 각 컬럼 렌더링
  const renderColumns = (member: Record<string, any>) =>
    columns.map((column) => {
      if (column.key === 'empty') {
        return <S.EmptyCell key={column.key} />;
      }

      if (column.key === 'LatestPenalty') {
        return (
          <S.Cell key={column.key}>
            {getLatestPenaltyDate(penaltyData[member.id])}
          </S.Cell>
        );
      }

      return <S.Cell key={column.key}>{member[column.key]}</S.Cell>;
    });

  return (
    <S.TableContainer>
      <S.TableWrapper hasData={filteredMembers.length > 0}>
        <table>
          {/* 테이블 상단 헤더 */}
          <thead>
            <tr>
              <StatusCell $statusColor={getStatusColor('승인 완료')} />
              {columns.map((column) => (
                <S.HeaderCell key={column.key}>{column.header}</S.HeaderCell>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* 검색된 멤버가 없을 경우 */}
            {filteredMembers.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <S.NoDataCell>검색된 멤버가 없습니다.</S.NoDataCell>
                </td>
              </tr>
            ) : (
              filteredMembers.map((member) => (
                <React.Fragment key={member.id}>
                  <S.Row
                    isSelected={expandedRow === member.id}
                    onClick={() => handleRowClick(member.id)}
                  >
                    <StatusCell $statusColor={getStatusColor(member.status)} />
                    {renderColumns(member)}
                  </S.Row>

                  {expandedRow === member.id && (
                    <ExpandedPenaltyRow
                      memberId={member.id}
                      penaltyData={penaltyData}
                      onRefresh={fetchPenaltyData}
                    />
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>

          {/* 테이블 하단 헤더 */}
          {filteredMembers.length > 0 && (
            <>
              <StatusCell $statusColor={getStatusColor('승인 완료')} />
              {columns.map((column) => (
                <S.HeaderCell key={column.key}>{column.header}</S.HeaderCell>
              ))}
            </>
          )}
        </table>
      </S.TableWrapper>
    </S.TableContainer>
  );
};

export default PenaltyListTable;
