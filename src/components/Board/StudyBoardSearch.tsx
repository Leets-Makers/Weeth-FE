import styled from 'styled-components';
import DividerLine from '@/assets/images/ic_search_divider.svg';
import Delete from '@/assets/images/ic_circle_close.svg';
import search from '@/assets/images/ic_search.svg';
import { useState } from 'react';
import {
  useGetPartSearch,
  useGetEduSearch,
  useGetNoticeSearch,
} from '@/api/useGetBoardSearch';
import { toastError } from '@/components/common/ToastMessage';
import {
  EduSearchContent,
  PartSearchContent,
  NoticeSearchContent,
  SearchRequestType,
  SearchContent,
} from '@/types/search';
import {
  mapEduToBoard,
  mapNoticeToBoard,
  mapPartToBoard,
} from '@/utils/searchMappers';
import { pcResponsive } from '@/styles';
import { colors, units } from '@/theme/designTokens';
import typography from '@/theme/typography';

const Container = styled.div`
  display: flex;
  padding: 0 ${units.padding['450']}px;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;

  ${pcResponsive}
`;

const Search = styled.div<{ isFocused: boolean }>`
  display: flex;
  align-items: center;
  height: 40px;
  justify-content: space-between;
  border-radius: ${units.radius.sm}px;
  border: ${(props) =>
    props.isFocused
      ? `1px solid ${colors.semantic.brand.secondary}`
      : '1px solid transparent'};
  padding: ${units.padding['200']}px ${units.padding['200']}px
    ${units.padding['200']}px ${units.padding['400']}px;
  box-sizing: border-box;
  background-color: ${colors.semantic.container.neutral};
`;

const SearchRightButton = styled.div`
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  caret-color: ${colors.semantic.brand.secondary};
  ${typography.Body1};
  color: ${colors.semantic.text.normal};
  justify-content: center;
  width: 100%;

  &::placeholder {
    ${typography.Body1};
    color: ${colors.semantic.text.alternative};
  }
`;

const Divider = styled.img`
  margin: 0 12px;
`;

const SearchButton = styled.img<{ disabled?: boolean }>`
  cursor: pointer;
  filter: ${(props) =>
    props.disabled
      ? 'brightness(0) saturate(100%) invert(67%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(93%) contrast(86%)'
      : 'none'};
`;

type SearchProps = {
  requestType: SearchRequestType;
  onSearchDone: (posts: SearchContent[]) => void;
  onClear: () => void;
  onLoading?: (loading: boolean) => void;
};

const StudyBoardSearch = ({
  requestType,
  onSearchDone,
  onClear,
  onLoading,
}: SearchProps) => {
  const [keyword, setKeyword] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const fetchData = async () => {
    const q = keyword.trim();
    if (!q) return;

    onLoading?.(true);
    try {
      if (requestType === 'part') {
        await useGetPartSearch(q, 0, (rows) => {
          const normalized = (rows as PartSearchContent[]).map(mapPartToBoard);
          onSearchDone(normalized);
        });
      } else if (requestType === 'education') {
        await useGetEduSearch(q, 0, (rows) => {
          const normalized = (rows as EduSearchContent[]).map(mapEduToBoard);
          onSearchDone(normalized);
        });
      } else {
        await useGetNoticeSearch(q, 0, (rows) => {
          const normalized = (rows as NoticeSearchContent[]).map(
            mapNoticeToBoard,
          );
          onSearchDone(normalized);
        });
      }
    } catch (error) {
      toastError('데이터를 불러오지 못했습니다.');
      console.error(error);
    } finally {
      onLoading?.(false);
    }
  };

  const handleSearch = () => {
    if (!keyword.trim()) return;
    fetchData();
  };

  const handleDelete = () => {
    setKeyword('');
    onClear();
  };

  return (
    <Container>
      <Search isFocused={isFocused}>
        <SearchInput
          placeholder="제목, 내용 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
        />
        <SearchRightButton>
          {keyword && (
            <SearchButton
              src={Delete}
              alt="검색어 삭제"
              onClick={handleDelete}
            />
          )}
          <Divider src={DividerLine} alt="구분선" />
          <SearchButton
            src={search}
            alt="search"
            onClick={handleSearch}
            disabled={!keyword}
          />
        </SearchRightButton>
      </Search>
    </Container>
  );
};

export default StudyBoardSearch;
