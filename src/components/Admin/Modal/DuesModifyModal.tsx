import { useEffect, useState } from 'react';
import * as S from '@/styles/admin/DuesRegisterAdd.styled';
import CommonModal from '@/components/Admin/Modal/CommonModal';
import RemoveIcon from '@/assets/images/ic_admin_input_remove.svg?react';
import { FileObject } from '@/types/account';
import updateReceipt from '@/api/admin/dues/updateReceipt';
import useDuesFileUpload from '@/hooks/admin/handleFileChange';
import Button from '@/components/Admin/Button';
import DuesInput from '@/components/Admin/DuesInput';
import DuesActionButtons from '@/components/Admin/DuesActionButtons';
import { useTheme } from 'styled-components';
import { units } from '@/theme/designTokens';

interface DuesModifyModalProps {
  onClose: () => void;
  record: {
    id?: number;
    date: string;
    title?: string;
    amount?: number;
    source?: string;
    cardinal: number | null;
    files?: FileObject[];
  };
  onSave: (updatedRecord: any) => void;
}

const DuesModifyModal: React.FC<DuesModifyModalProps> = ({
  onClose,
  record,
  onSave,
}) => {
  const theme = useTheme();
  const [date, setDate] = useState(record.date);
  const [title, setTitle] = useState(record.title);
  const [amount, setAmount] = useState(record.amount);
  const [source, setSource] = useState(record.source);
  const {
    uploadedFiles,
    setUploadedFiles,
    handleFileChange,
    handleRemoveFile,
  } = useDuesFileUpload();

  const handleDateChange = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, '');

    let formattedDate = '';
    if (onlyNumbers.length <= 4) {
      formattedDate = onlyNumbers;
    } else if (onlyNumbers.length <= 6) {
      formattedDate = `${onlyNumbers.slice(0, 4)}-${onlyNumbers.slice(4, 6)}`;
    } else {
      formattedDate = `${onlyNumbers.slice(0, 4)}-${onlyNumbers.slice(4, 6)}-${onlyNumbers.slice(6, 8)}`;
    }

    setDate(formattedDate);
  };

  useEffect(() => {
    if (record.files) {
      setUploadedFiles([...record.files]);
    }
  }, [record.files]);

  const handleSave = async () => {
    if (!record.id) {
      alert('수정할 항목의 ID가 없습니다.');
      return;
    }

    try {
      const updatedRecord = {
        id: record.id,
        date,
        title,
        amount: Number(amount),
        source,
        cardinal: record.cardinal,
        files: [...uploadedFiles],
      };

      await updateReceipt(updatedRecord);
      onSave(updatedRecord);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('회비 수정 실패:', error);
      alert('수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <CommonModal
      isOpen
      onClose={onClose}
      title="회비 지출 기록 수정"
      footer={
        <S.SaveAddButton>
          <DuesActionButtons
            resetText="취소"
            submitText="저장"
            resetWidth="60px"
            submitWidth="60px"
            onReset={onClose}
            onSubmit={handleSave}
          />
        </S.SaveAddButton>
      }
      height="800px"
      top="50%"
    >
      <S.ModalWrapper>
        <S.SubTitle>기수</S.SubTitle>
        <S.CardinalWrapper>
          <S.DuesInputWrapper>
            <DuesInput
              width="95%"
              placeholder={record.cardinal ? `${record.cardinal}기` : ''}
              value=""
              readOnly
              variant="neutral"
            />
          </S.DuesInputWrapper>
        </S.CardinalWrapper>
        <S.SubTitle>일자</S.SubTitle>
        <S.DescriptionWrapper>
          <DuesInput
            width="91%"
            value={date}
            onChange={(e) => handleDateChange(e.target.value)}
            variant="neutral"
          />
        </S.DescriptionWrapper>

        <S.SubTitle>사용 내용</S.SubTitle>
        <S.DescriptionWrapper>
          <DuesInput
            width="91%"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="neutral"
          />
        </S.DescriptionWrapper>

        <S.SubTitle>사용 금액</S.SubTitle>
        <S.DescriptionWrapper>
          <DuesInput
            width="91%"
            value={amount !== undefined ? amount.toString() : ''}
            onChange={(e) =>
              setAmount(e.target.value ? Number(e.target.value) : undefined)
            }
            variant="neutral"
          />
        </S.DescriptionWrapper>

        <S.SubTitle>사용처</S.SubTitle>
        <S.DescriptionWrapper>
          <DuesInput
            width="91%"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            variant="neutral"
          />
        </S.DescriptionWrapper>

        <S.SubTitle>영수증 첨부</S.SubTitle>
        <S.DescriptionWrapper>
          <S.FileWrapper>
            <S.ButtonWrapper>
              <input
                id="modal-file-upload"
                type="file"
                accept="image/*, application/pdf"
                style={{ display: 'none' }}
                multiple
                onChange={(e) => {
                  handleFileChange(e);
                }}
              />
              <S.DuesWrapper>
                <Button
                  description="파일 선택"
                  color={theme.semantic.button.primary}
                  borderRadius={`${units.radius.md}px`}
                  width="91px"
                  onClick={() => {
                    document.getElementById('modal-file-upload')?.click();
                  }}
                />
              </S.DuesWrapper>
            </S.ButtonWrapper>

            <S.InputWrapper>
              {uploadedFiles.length === 0 ? (
                <S.InputContainer>
                  <S.StyledDuesInput
                    width="90%"
                    placeholder="선택된 파일 없음"
                    readOnly
                    $hasFile={false}
                    variant="neutral"
                  />
                  <S.StyledCloseButton disabled>
                    <RemoveIcon />
                  </S.StyledCloseButton>
                </S.InputContainer>
              ) : (
                uploadedFiles.map((file, index) => (
                  <S.InputContainer key={`${file.fileId || file.fileName}-${index}`}>
                    <S.StyledDuesInput
                      width="90%"
                      placeholder={file.fileName}
                      readOnly
                      $hasFile={true}
                      variant="neutral"
                    />
                    <S.StyledCloseButton
                      onClick={() => handleRemoveFile(file.fileName)}
                    >
                      <RemoveIcon />
                    </S.StyledCloseButton>
                  </S.InputContainer>
                ))
              )}
            </S.InputWrapper>
          </S.FileWrapper>
        </S.DescriptionWrapper>
      </S.ModalWrapper>
    </CommonModal>
  );
};

export default DuesModifyModal;
