import styled from 'styled-components';
import SearchIcon from '@/assets/images/ic_admin_search.svg';
import { units } from '@/theme/designTokens';

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 492px;
  margin-top: 2%;

  input {
    width: 100%;
    padding: 13px 40px 13px 52px;
    border: none;
    outline: none;
    border-radius: ${units.radius.sm}px;
    font-size: 18px;

    &::placeholder {
      color: ${({ theme }) => theme.semantic.text.alternative};
    }
  }
`;

const SearchIconWrapper = styled.img`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
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
