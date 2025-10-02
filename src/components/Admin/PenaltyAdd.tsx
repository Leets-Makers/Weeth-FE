import Button from '@/components/Admin/Button';
import * as S from '@/styles/admin/penalty/PenaltyAdd.styled';
import { ButtonWrapper } from '@/styles/admin/DuesRegisterDropDown.styled';
import { useState } from 'react';
import { useMemberContext } from '@/components/Admin/context/MemberContext';
import PenaltyMemberDropdown from '@/components/Admin/PenaltyMemberDropdown';
import { getPenaltyApi, postPenaltyApi } from '@/api/admin/penalty/penalty.api';
import {
  Penalty,
  PenaltyAction,
  PenaltyState,
} from '@/components/Admin/context/PenaltyReducer';
import formatDate from '@/utils/admin/dateUtils';
import PenaltyRadioGroup, { PenaltyType } from './PenaltyRadioGroup';
import { ApiPenaltyType } from '@/types/adminPenalty';

import { toastError, toastSuccess } from '@/components/common/ToastMessage';

interface PenaltyAddProps {
  dispatch: React.Dispatch<PenaltyAction>;
}

const PenaltyAdd: React.FC<PenaltyAddProps> = ({ dispatch }) => {
  const { members, selectedCardinal } = useMemberContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string>('');
  const [penaltyDescription, setPenaltyDescription] = useState<string>('');
  const [type, setType] = useState<PenaltyType>('penalty'); // 탭 상태 (페널티/경고)

  const filteredMembers = members.filter((member) =>
    member.name.includes(searchTerm),
  );

  const toApiType = (t: PenaltyType): ApiPenaltyType =>
    t === 'warning' ? 'WARNING' : 'PENALTY';

  const toLabel = (t: PenaltyType) => (t === 'warning' ? '경고' : '페널티');

  const label = toLabel(type);
  const apiType = toApiType(type);

  const handleSelectMember = (name: string) => {
    setSelectedMember(name);
    setSearchTerm(name);
    setIsDropdownOpen(false);
  };

  const handleReset = () => {
    setSelectedMember('');
    setSearchTerm('');
    setPenaltyDescription('');
  };

  const normalizeToPenaltyState = (data: any): PenaltyState => {
    const groups = Array.isArray(data) ? data : data ? [data] : [];
    const users = groups.flatMap((g: any) => g?.responses ?? []);

    return users.reduce((acc: PenaltyState, u: any) => {
      const list = Array.isArray(u?.Penalties) ? u.Penalties : [];
      acc[u.userId] = list.map((p: any) => {
        const isAuto = p.penaltyType === 'AUTO_PENALTY';
        return {
          penaltyId: p.penaltyId,
          penaltyType: isAuto ? 'PENALTY' : p.penaltyType,
          penaltyDescription: p.penaltyDescription,
          time: p.time,
          isAuto,
        };
      });
      return acc;
    }, {} as PenaltyState);
  };

  const handleAddPenalty = async () => {
    const member = members.find((m) => m.name === selectedMember);
    if (!member) {
      toastError('선택한 멤버를 찾을 수 없습니다.');
      return;
    }

    if (!selectedMember || !penaltyDescription.trim()) {
      toastError(`멤버 이름과 ${label} 사유를 입력해주세요.`);
      return;
    }

    try {
      const res = await postPenaltyApi({
        userId: member.id,
        penaltyType: apiType,
        penaltyDescription,
      });
      if (res.code === 200) {
        toastSuccess(`${label}가 성공적으로 부여되었습니다.`);

        const penaltyTime = res.data?.time
          ? formatDate(res.data.time)
          : formatDate(new Date().toISOString());

        // dispatch({
        //   type: 'ADD_PENALTY',
        //   userId: member.id,
        //   payload: {
        //     penaltyId: res.data?.penaltyId ?? Date.now(),
        //     penaltyType: apiType,
        //     penaltyDescription,
        //     time: penaltyTime,
        //   },
        // });

        if (selectedCardinal != null) {
          const response = await getPenaltyApi(selectedCardinal);
          if (response.code === 200 || response.code === 0) {
            const normalized = normalizeToPenaltyState(response.data);
            dispatch({ type: 'SET_PENALTY', payload: normalized });
          }
        }

        handleReset();
      } else {
        toastError(`${label} 부여에 실패했습니다.: ${res.message}`);
      }
    } catch (error) {
      console.error(`${label} 부여 오류: `, error);
      toastError(`${label} 부여에 실패했습니다.`);
    }
  };

  return (
    <S.PenaltyWrapper>
      <S.TitleWrapper>
        <S.Title>{label} 추가</S.Title>
      </S.TitleWrapper>
      <S.Line />
      <S.ItemWrapper>
        <PenaltyRadioGroup value={type} onChange={setType} />
        <S.InputWrapper>
          <S.SubTitle>이름</S.SubTitle>
          <S.Input
            placeholder="이름"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsDropdownOpen(true);
            }}
            onFocus={() => setIsDropdownOpen(true)}
            onBlur={() => setIsDropdownOpen(false)}
          />
          {isDropdownOpen && (
            <PenaltyMemberDropdown
              members={filteredMembers}
              onSelect={handleSelectMember}
            />
          )}
        </S.InputWrapper>
        <S.InputWrapper>
          <S.SubTitle>{label} 사유</S.SubTitle>
          <S.Input
            placeholder="ex) 미션 과제 미제출"
            value={penaltyDescription}
            onChange={(e) => setPenaltyDescription(e.target.value)}
          />
        </S.InputWrapper>
        <ButtonWrapper>
          <Button
            description="초기화"
            color="#323232"
            width="75px"
            borderRadius="4px"
            onClick={handleReset}
          />
          <Button
            description="추가"
            color="#ff5858"
            width="62px"
            borderRadius="4px"
            onClick={handleAddPenalty}
          />
        </ButtonWrapper>
      </S.ItemWrapper>
    </S.PenaltyWrapper>
  );
};

export default PenaltyAdd;
