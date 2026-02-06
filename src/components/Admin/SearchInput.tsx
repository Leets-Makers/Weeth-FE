import styled from 'styled-components';
import SearchIcon from '@/assets/images/ic_search.svg';
import { units } from '@/theme/designTokens';
import typography from '@/theme/typography';

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 492px;

  input {
    ${typography.admin.Body1}
    width: 100%;
    height: 48px;
    padding: 0 40px 0 52px;
    border: none;
    outline: none;
    border-radius: ${units.radius.sm}px;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    &::placeholder {
      color: ${({ theme }) => theme.semantic.text.alternative};
    }
  }
`;

const SearchIconWrapper = styled.img`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
`;

const SearchInput: React.FC<{
  searchTerm: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ searchTerm, onSearch }) => {
  return (
    <SearchWrapper>
      <SearchIconWrapper src={SearchIcon} alt="검색 아이콘" />
      <input
        type="text"
        placeholder="Search for name"
        value={searchTerm}
        onChange={onSearch}
      />
    </SearchWrapper>
  );
};

export default SearchInput;
