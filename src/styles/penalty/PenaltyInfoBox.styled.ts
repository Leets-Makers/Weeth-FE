import styled from 'styled-components';
import theme from '@/styles/theme';
import { MOBILE } from '@/styles';

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  max-width: ${MOBILE};
  padding: 17px 0px;
  margin: 20px 15px 10px 15px;

  background-color: ${theme.color.gray[18]};
  border: 1px solid #ffffff1a;
  border-radius: 10px;
`;

export const Half = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const LeftGroup = styled(Half)`
  justify-content: flex-start;
  gap: 8px;
`;

export const RightGroup = styled(Half)`
  justify-content: flex-start;
  gap: 8px;
`;

export const Separator = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1px;
  height: 21px;
  background: #ffffff1a;
`;

export const CountText = styled.span`
  font-size: 18px;
  font-family: ${theme.font.semiBold};
  color: ${theme.color.gray[100]};
  line-height: 1;
  white-space: nowrap;
`;

export const InfoText = styled.span`
  color: #ffffff66;
  font-family: ${theme.font.regular};
  font-size: 14px;
  line-height: 1;
  margin-left: 15px;
`;
