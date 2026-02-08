import {
  deletePenaltyApi,
  patchPenaltyApi,
} from '@/api/admin/penalty/penalty.api';
import React, { useEffect, useRef, useState } from 'react';
import * as S from '@/styles/admin/penalty/PenaltyListTable.styled';
import Button from '@/components/Admin/Button';
import { ApiPenaltyType } from '@/types/adminPenalty';
import { toastError, toastSuccess } from '../common/ToastMessage';
import { useTheme } from 'styled-components';
import typography from '@/theme/typography';

interface PenaltyDetailProps {
  penaltyData: {
    penaltyId: number;
    penaltyType: ApiPenaltyType;
    penaltyDescription: string;
    time: string;
    isAuto?: boolean;
  };
  onRefresh: () => Promise<void>;
}

const PenaltyDetail: React.FC<PenaltyDetailProps> = ({
  penaltyData,
  onRefresh,
}) => {
  const theme = useTheme();
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

  const typeLabel = penaltyData.penaltyType === 'WARNING' ? '경고' : '페널티';

  const editDisabled = !!penaltyData.isAuto;

  const handleCancel = () => {
    setNewDescription(penaltyData.penaltyDescription);
    setIsEditing(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        handleCancel();
      }
    };

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, penaltyData.penaltyDescription]);

  const handleDelete = async () => {
    if (!penaltyData.penaltyId) {
      toastError('PenaltyId가 없습니다. 삭제할 수 없습니다.');
      return;
    }

    if (window.confirm(`${typeLabel}를 삭제하시겠습니까?`)) {
      try {
        console.log('penaltyData : ', penaltyData);
        await deletePenaltyApi(penaltyData.penaltyId);
        toastSuccess(`${typeLabel}가 성공적으로 삭제되었습니다.`);
        await onRefresh();
      } catch (error: any) {
        toastError(error.message || `${typeLabel} 삭제에 실패했습니다.`);
        console.error(`${typeLabel} 삭제 오류:`, error);
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
        toastSuccess(`${typeLabel} 사유가 성공적으로 수정되었습니다.`);
        await onRefresh();
        setIsEditing(false);
      } catch (error: any) {
        toastError(error.message || `${typeLabel} 사유 수정에 실패했습니다.`);
        console.error(`${typeLabel} 수정 오류:`, error);
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
        {isEditing ? (
          <>
            <Button
              description="취소"
              color={theme.semantic.button.neutral}
              textColor={theme.semantic.text.strong}
              width="55px"
              onClick={handleCancel}
              $typo={typography.admin.Button2}
            />
            <Button
              description="저장"
              color={theme.semantic.container.secondary}
              textColor={theme.semantic.text.inverse}
              width="55px"
              onClick={handleEdit}
              $typo={typography.admin.Button2}
            />
          </>
        ) : (
          <>
            <Button
              description="수정"
              color={
                editDisabled
                  ? theme.semantic.button.disabled
                  : theme.semantic.button.neutral
              }
              textColor={
                editDisabled
                  ? theme.semantic.text.disabled
                  : theme.semantic.text.strong
              }
              width="55px"
              disabled={editDisabled}
              onClick={handleEdit}
              $typo={typography.admin.Button2}
            />
            <Button
              color={theme.semantic.state.error}
              textColor={theme.semantic.text.inverse}
              description="삭제"
              width="55px"
              onClick={handleDelete}
              $typo={typography.admin.Button2}
            />
          </>
        )}
      </S.ButtonWrapper>
    </S.DetailContainer>
  );
};

export default PenaltyDetail;
