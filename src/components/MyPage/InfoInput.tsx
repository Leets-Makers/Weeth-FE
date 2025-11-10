import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '@/theme/designTokens';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 26px;
  font-size: 16px;
`;

const Label = styled.div<{ isProfile?: boolean }>`
  width: 42px;
  text-align: left;
  color: ${(props) =>
    props.isProfile
      ? colors.semantic.text.normal
      : colors.semantic.text.alternative};
`;

const Input = styled.input`
  width: 257px;
  height: 45px;
  box-sizing: border-box;
  padding-left: 10px;
  outline: none;
  border: none;
  border-radius: 4px;
  background-color: ${colors.semantic.container.neutral};
  color: ${colors.semantic.text.normal};
  font-size: 16px;

  &::placeholder {
    color: ${colors.semantic.container.neutral};
  }
`;

const NoEdit = styled(Input).attrs({ readOnly: true })`
  color: ${colors.semantic.text.alternative};
`;

const InfoInput = ({
  text,
  origValue,
  editValue = () => {},
  isProfile,
}: {
  text: string;
  origValue: string | number[];
  editValue?: (val: string | number) => void;
  isProfile?: boolean;
}) => {
  const [value, setValue] = useState(origValue);

  const inputType = 'text';

  const validateValue = (val: string): boolean => {
    if (val === '') return true;
    const numberRegex = /^[0-9]*$/;
    const koreanRegex = /^[ㄱ-ㅎ가-힣]*$/;
    const koreanEnglishRegex = /^[ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z]*$/;

    switch (text) {
      case '이름':
        return koreanEnglishRegex.test(val) && val.length <= 5;
      case '학번':
        return numberRegex.test(val) && val.length <= 9;
      case '핸드폰':
        return numberRegex.test(val) && val.length <= 11;
      case '메일':
        return !koreanRegex.test(val);
      default:
        return true;
    }
  };

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    if (text === '핸드폰' || text === '학번') {
      val = val.replace(/[^0-9]/g, ''); // 숫자 외 제거
    }

    if (validateValue(val)) {
      setValue(val);
      editValue(val);
    }
  };

  useEffect(() => {
    setValue(origValue);
  }, [origValue]);

  const isReadonly = text === '로그인' || text === '기수' || text === '역할';

  return (
    <Container>
      <Label isProfile={isProfile}>{text}</Label>
      {isReadonly ? (
        <NoEdit value={value as string} type="text" />
      ) : (
        <Input
          value={value as string}
          onChange={onChangeValue}
          type={inputType}
        />
      )}
    </Container>
  );
};

export default InfoInput;
