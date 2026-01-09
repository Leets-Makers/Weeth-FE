import { colors, units } from '@/theme/designTokens';
import styled from 'styled-components';
import typography from '@/theme/typography';
import { pcResponsive } from '..';

export const MemberContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 ${units.padding['450']}px;
  min-width: ${units.device.mobile}px;
  ${pcResponsive}
  box-sizing: border-box;
  margin-bottom: 50px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Search = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  padding: ${units.padding['450']}px 0;
  gap: ${units.padding['200']}px;
  width: 345px;
  box-sizing: border-box;
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${units.padding['200']}px ${units.padding['200']}px
    ${units.padding['200']}px ${units.padding['400']}px;
  border-radius: ${units.radius.sm}px;
  background-color: ${colors.semantic.container.neutral};
`;

export const SearchInput = styled.input`
  ${typography.Body1};
  border: none;
  outline: none;
  background-color: transparent;
  padding: 0;
  margin: 0;
  color: ${colors.semantic.text.normal};
  width: 100%;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  box-shadow: none;

  &::placeholder {
    ${typography.Body1};
    color: ${colors.semantic.text.alternative};
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export const DividerLine = styled.img`
  width: 1px;
  height: 100%;
  margin: 0 ${units.padding['200']}px;
  background-color: ${colors.semantic.line};
`;

export const SearchButton = styled.img`
  cursor: pointer;
`;
