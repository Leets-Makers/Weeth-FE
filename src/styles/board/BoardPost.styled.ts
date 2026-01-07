import theme from '@/styles/theme';
import styled from 'styled-components';
import { MOBILE, pcResponsive } from '@/styles';

export const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  ustify-content: center
  width: 100%;
  max-width: ${MOBILE};
  padding-bottom: 1.25rem;

  ul {
    margin: 0;
  }

  ${pcResponsive}
`;

export const TitleInput = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  margin: 0 1.25rem;
  padding: 1.25rem 0;
  color: white;
  font-size: 1rem;
  font-family: ${theme.font.semiBold};

  &::placeholder {
    font-size: 1rem;
    font-family: ${theme.font.semiBold};
  }
`;

export const ContentInput = styled.textarea`
  height: calc(var(--vh, 1vh) * 40);
  background-color: transparent;
  border: none;
  outline: none;
  resize: none;
  margin: 1.25rem 1.25rem 3.125rem 1.25rem;
  color: white;
  font-size: 1rem;

  &::placeholder {
    font-size: 1rem;
  }
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.25rem;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: ${theme.color.gray[65]};
  }
`;
