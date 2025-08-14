import theme from '@/styles/theme';
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

const Container = styled.div`
  display: flex;
  padding: 0px 15px;
  flex-direction: column;
`;

const Search = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid ${theme.color.gray[18]};
  border-radius: 0.25rem;
  padding: 0.4375rem 0.75rem;
  width: 345px;
  box-sizing: border-box;
  transition: border 0.2s;

  &:focus-within {
    border: 1px solid ${theme.color.gray[65]};
  }
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 1rem;
  color: #fff;
  padding: 0;
  width: 14.375rem;

  &::placeholder {
    font-size: 1rem;
    color: ${theme.color.gray[65]};
  }
`;

const Divider = styled.img`
  margin: 0 0.75rem;
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
      console.log(error);
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
      <Search>
        <SearchInput
          placeholder="제목, 내용 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch();
          }}
        />
        <div>
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
        </div>
      </Search>
    </Container>
  );
};

export default StudyBoardSearch;
