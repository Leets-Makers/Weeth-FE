import {
  deletePenaltyApi,
  patchPenaltyApi,
} from '@/api/admin/penalty/penalty.api';
import React, { useEffect, useRef, useState } from 'react';
import * as S from '@/styles/admin/penalty/Penalty.styled';
import Button from '@/components/Admin/Button';
import { ApiPenaltyType } from '@/types/adminPenalty';
import { toastError, toastSuccess } from '../common/ToastMessage';

interface PenaltyDetailProps {
  penaltyData: {
    penaltyId: number;
    penaltyType: ApiPenaltyType;
    penaltyDescription: string;
    time: string;
    isAuto?: boolean;
  };
  onEdit: (penaltyId: number, updatedDescription: string) => void;
  onDelete: (penaltyId: number) => void;
}

const PenaltyDetail: React.FC<PenaltyDetailProps> = ({
  penaltyData,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(
    penaltyData.penaltyDescription,
  );
  const inputRef = useRef<HTMLInputElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const isPenalty =
    penaltyData.penaltyType === 'PENALTY' ||
    penaltyData.penaltyType === 'AUTO_PENALTY';

  const penaltyCount = isPenalty ? 1 : 0;
  const warningCount = penaltyData.penaltyType === 'WARNING' ? 1 : 0;

  const editDisabled = !!penaltyData.isAuto;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsEditing(false);
      }
    };

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing]);

  const handleDelete = async () => {
    if (!penaltyData.penaltyId) {
      toastError('PenaltyId가 없습니다. 삭제할 수 없습니다.');
      return;
    }

    if (window.confirm('패널티를 삭제하시겠습니까?')) {
      try {
        console.log('penaltyData : ', penaltyData);
        await deletePenaltyApi(penaltyData.penaltyId);
        toastSuccess('패널티가 성공적으로 삭제되었습니다.');
        onDelete(penaltyData.penaltyId);
      } catch (error: any) {
        toastError(error.message || '패널티 삭제 실패');
        console.error('패널티 삭제 오류:', error);
      }
    }
  };

  const handleEdit = async () => {
    if (editDisabled) return;
    if (!isEditing) {
      setIsEditing(true);
    } else {
      try {
        await patchPenaltyApi(penaltyData.penaltyId, newDescription);
        toastSuccess('패널티가 성공적으로 수정되었습니다.');

        onEdit(penaltyData.penaltyId, newDescription);
        setIsEditing(false);
      } catch (error: any) {
        toastError(error.message || '패널티 수정 실패');
        console.error('패널티 수정 오류:', error);
      }
    }
  };

  return (
    <S.DetailContainer>
      {isEditing ? (
        <S.Input
          type="text"
          value={newDescription}
          autoFocus
          onChange={(e) => setNewDescription(String(e.target.value))}
          ref={inputRef}
        />
      ) : (
        <S.DetailText>{penaltyData.penaltyDescription}</S.DetailText>
      )}
      <S.DetailText>{penaltyCount}</S.DetailText>
      <S.DetailText>{warningCount}</S.DetailText>

      <S.DetailText>{penaltyData.time}</S.DetailText>
      <S.ButtonWrapper ref={buttonRef}>
        <Button
          description={isEditing ? '저장' : '수정'}
          color={editDisabled ? '#a6a6a6' : '#2f2f2f'}
          textColor={editDisabled ? '#ccc' : '#ffffff'}
          width="64px"
          disabled={editDisabled}
          onClick={handleEdit}
        />
        <Button
          color="#ff5858"
          description="삭제"
          width="64px"
          onClick={handleDelete}
        />
      </S.ButtonWrapper>
    </S.DetailContainer>
  );
};

export default PenaltyDetail;
