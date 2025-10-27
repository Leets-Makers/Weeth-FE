import { useEffect, useState } from 'react';
import { MemberData } from '@/components/Admin/context/MemberContext';
import { PenaltyState } from '@/components/Admin/context/PenaltyReducer';
import { getLatestPenaltyDate } from '@/utils/admin/getLatestPenaltyDate';

export const useFilteredMembers = (
  penaltyData: PenaltyState,
  members: MemberData[],
  selectedCardinal: number | null,
  searchName: string,
) => {
  const [filteredMembers, setFilteredMembers] = useState<MemberData[]>([]);

  useEffect(() => {
    if (!penaltyData || !members.length) return;

    let penalizedMembers = Object.keys(penaltyData)
      .map((userId) => {
        const numericUserId = Number(userId);

        const matchedMember = members.find(
          (member) => member.id === numericUserId,
        );

        if (!matchedMember) return null;

        const list = penaltyData[numericUserId] ?? [];

        const { penalty, warning } = list.reduce(
          (acc, p) => {
            const t = (p as any).penaltyType;
            if (t === 'WARNING') acc.warning += 1;
            else acc.penalty += 1;
            return acc;
          },
          { penalty: 0, warning: 0 },
        );
        return {
          ...matchedMember,
          penaltyCount: penalty,
          warningCount: warning,
          LatestPenalty: getLatestPenaltyDate(list),
        };
      })
      .filter(Boolean) as MemberData[];

    if (selectedCardinal) {
      penalizedMembers = penalizedMembers.filter((member) => {
        let cardinalNumbers: number[] = [];
        if (typeof member.cardinals === 'string') {
          cardinalNumbers = (member.cardinals as string).split('.').map(Number);
        } else if (Array.isArray(member.cardinals)) {
          cardinalNumbers = member.cardinals;
        }
        return cardinalNumbers.includes(selectedCardinal);
      });
    }

    if (searchName.trim()) {
      penalizedMembers = penalizedMembers.filter((member) =>
        member.name.toLowerCase().includes(searchName.toLowerCase()),
      );
    }

    setFilteredMembers(penalizedMembers);
  }, [penaltyData, members, selectedCardinal, searchName]);

  return filteredMembers;
};
