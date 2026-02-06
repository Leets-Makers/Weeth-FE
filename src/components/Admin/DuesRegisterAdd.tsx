import { useRef, useState } from 'react';
import * as S from '@/styles/admin/DuesRegisterAdd.styled';
import adminReceipts from '@/api/admin/dues/adminReceipts';
import inputFields from '@/constants/admin/duesRegisterAddConstants';
import RemoveIcon from '@/assets/images/ic_admin_input_remove.svg?react';
import useDuesFileUpload from '@/hooks/admin/handleFileChange';
import { ExpenditureRecordProps } from '@/components/Admin/ExpenditureRecord';
import DuesInput from '@/components/Admin/DuesInput';
import Button from '@/components/Admin/Button';
import DirectCardinalDropdown from '@/components/Admin/DirectCardinal';
import { useTheme } from 'styled-components';
import { units } from '@/theme/designTokens';
import DuesActionButtons from '@/components/Admin/DuesActionButtons';

const DuesRegisterAdd: React.FC = () => {
  const [selectedCardinal, setSelectedCardinal] = useState<null | number>(null);
  const [customCardinal, setCustomCardinal] = useState('');
  const [description, setDescription] = useState('');
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [isCustomInput, setIsCustomInput] = useState(false);

  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    uploadedFiles,
    setUploadedFiles,
    handleFileChange,
    handleRemoveFile,
  } = useDuesFileUpload();

  const handleSelectCardinal = (value: number, isCustom: boolean) => {
    setSelectedCardinal(value);
    setIsCustomInput(isCustom);

    if (isCustom) {
      setCustomCardinal('');
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setCustomCardinal(`${value}기`);
    }
  };

  const handleCustomCardinalBlur = () => {
    const cardinalNumber = Number(customCardinal.trim().replace('기', ''));
    if (!Number.isNaN(cardinalNumber) && cardinalNumber > 0) {
      setCustomCardinal(`${cardinalNumber}기`);
    }
  };

  const handleRegister = async () => {
    const validateInputs = () => {
      if (!selectedCardinal && !customCardinal.trim()) {
        alert('기수를 선택하거나 입력해야 합니다.');
        return false;
      }

      if (!description.trim()) {
        alert('사용 내용을 입력해주세요.');
        return false;
      }

      if (!source.trim()) {
        alert('사용처를 입력해주세요.');
        return false;
      }

      const amountNumber = Number(amount);
      if (Number.isNaN(amountNumber) || amountNumber <= 0) {
        alert('사용 금액을 올바르게 입력해주세요.');
        return false;
      }

      return true;
    };

    if (!validateInputs()) return;

    const cardinal =
      selectedCardinal ?? Number(customCardinal.replace('기', ''));
    const formattedDate = date;

    const requestData: ExpenditureRecordProps = {
      description,
      source,
      amount: Number(amount),
      date: formattedDate,
      cardinal,
      files: uploadedFiles,
    };

    try {
      const res = await adminReceipts(requestData);
      if (res.code === 200) {
        alert('회비 사용 내역이 등록되었습니다.');
        window.location.reload();
      }

      setDescription('');
      setSource('');
      setAmount('');
      setDate('');
      setCustomCardinal('');
      setSelectedCardinal(null);
      setUploadedFiles([]);
    } catch (error: any) {
      console.error('등록 실패:', error);
      alert(error.message);
    }
  };

  const getInputValue = (id: string) => {
    if (id === 'date') return date;
    if (id === 'content') return description;
    if (id === 'amount') return amount;
    return source;
  };

  const handleDateChange = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, '');

    let formattedDate = onlyNumbers;

    if (onlyNumbers.length > 4) {
      formattedDate = `${onlyNumbers.slice(0, 4)}-${onlyNumbers.slice(4, 6)}`;
    }
    if (onlyNumbers.length > 6) {
      formattedDate += `-${onlyNumbers.slice(6, 8)}`;
    }

    setDate(formattedDate);
  };

  const setInputValue = (id: string, value: string) => {
    if (id === 'date') handleDateChange(value);
    else if (id === 'content') setDescription(value);
    else if (id === 'amount') setAmount(value);
    else setSource(value);
  };

  return (
    <S.Wrapper>
      <S.Title>회비 사용 내역 추가</S.Title>
      <S.SubTitle $required>기수</S.SubTitle>
      <S.CardinalWrapper>
        <div>
          <DirectCardinalDropdown
            selectedCardinal={selectedCardinal}
            setSelectedCardinal={handleSelectCardinal}
            variant="button"
            placeholder="기수"
          />
        </div>
        <S.DuesInputWrapper>
          <DuesInput
            width="95%"
            placeholder={
              isCustomInput
                ? '직접 입력'
                : customCardinal || '기수를 선택하세요'
            }
            value={isCustomInput ? customCardinal : ''}
            onChange={(e) => setCustomCardinal(e.target.value)}
            onBlur={handleCustomCardinalBlur}
            readOnly={!isCustomInput}
            ref={inputRef}
          />
        </S.DuesInputWrapper>
      </S.CardinalWrapper>

      {inputFields.map((field) => (
        <div key={field.id}>
          <S.SubTitle>{field.title}</S.SubTitle>
          <S.DescriptionWrapper>
            <DuesInput
              width={field.width}
              placeholder={field.placeholder}
              value={getInputValue(field.id)}
              onChange={(e) => setInputValue(field.id, e.target.value)}
            />
          </S.DescriptionWrapper>
        </div>
      ))}

      <S.SubTitle>영수증 첨부</S.SubTitle>
      <S.DescriptionWrapper>
        <S.FileWrapper>
          <S.ButtonWrapper>
            <input
              id="file-upload"
              type="file"
              accept="image/jpeg, image/png, image/heic, application/pdf"
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
                onClick={() => document.getElementById('file-upload')?.click()}
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
                />
                <S.StyledCloseButton disabled>
                  <RemoveIcon />
                </S.StyledCloseButton>
              </S.InputContainer>
            ) : (
              uploadedFiles.map((file) => (
                <S.InputContainer key={file.fileId || file.fileName}>
                  <S.StyledDuesInput
                    width="90%"
                    placeholder={file.fileName}
                    readOnly
                    $hasFile={true}
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

      <S.SaveButton>
        <DuesActionButtons onSubmit={handleRegister} />
      </S.SaveButton>
    </S.Wrapper>
  );
};

export default DuesRegisterAdd;
