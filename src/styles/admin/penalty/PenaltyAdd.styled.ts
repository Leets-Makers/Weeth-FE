import { styled } from 'styled-components';
import theme from '@/styles/theme';
import { Wrapper } from '@/styles/admin/DuesRegisterDropDown.styled';

export const TitleWrapper = styled.div`
  padding: 20px 30px;
`;
export const SubTitle = styled.div`
  font-size: 16px;
  margin-left: 10px;
  margin-bottom: 10px;
`;

export const PenaltyWrapper = styled(Wrapper)`
  border-radius: 4px;
  width: 490px;
  // height: max-content;
  min-width: 490px;
  max-height: 471px;
  margin-top: 30px;
  border-top: 0px;
  padding: 0px;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 8px;
`;
export const Input = styled.input`
  width: 100%;
  font-size: 18px;
  font-weight: 500;
  border: 1px solid #dedede;
  border-radius: 4px;
  padding: 12px 16px;
  box-sizing: border-box;
  &:focus {
    outline: 1.5px solid ${theme.color.gray[18]};
  }
`;

export const Title = styled.div`
  font-size: 20px;
`;

export const Line = styled.div`
  border: 1px solid #dedede;
`;

export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  padding: 15px 25px 30px 25px;
`;
