import theme from '@/styles/theme';
import styled from 'styled-components';
import DividerLine from '@/assets/images/ic_search_divider.svg';
import Delete from '@/assets/images/ic_circle_close.svg';
import search from '@/assets/images/ic_search.svg';
import { useState } from 'react';
import { BoardContent } from '@/pages/Board';
import useGetBoardSearch from '@/api/useGetBoardSearch';
import { toastError } from '@/components/common/ToastMessage';
import * as S from '@/styles/board/Board.styled';
import { useNavigate } from 'react-router-dom';
import formatDate from '@/hooks/formatDate';
import PostListItem from '@/components/Board/PostListItem';
import Loading from '@/components/common/Loading';

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

const StudyBoardSearch = () => {
  const [keyword, setKeyword] = useState('');
  const [posts, setPosts] = useState<BoardContent[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fetchData = async () => {
    if (!keyword.trim()) return;

    setLoading(true);
    try {
      await useGetBoardSearch(keyword, 0, (newPosts) => {
        setPosts(newPosts);
      });
    } catch (error) {
      toastError('데이터를 불러오지 못했습니다.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!keyword.trim()) return;
    setPosts([]);
    fetchData();
  };

  const handleDelete = () => {
    setKeyword('');
    setPosts([]);
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

      {loading ? (
        <Loading />
      ) : (
        <>
          {posts.map((post) => (
            <S.PostListContainer key={post.id}>
              <S.PostListItemContainer>
                <PostListItem
                  name={post.name}
                  time={formatDate(post.time)}
                  title={post.title}
                  content={post.content}
                  totalComments={post.commentCount}
                  hasFile={post.hasFile}
                  position={post.position}
                  role={post.role}
                  onClick={() => navigate(`/board/${post.id}`)}
                />
              </S.PostListItemContainer>
              <S.Line />
            </S.PostListContainer>
          ))}
        </>
      )}
    </Container>
  );
};

export default StudyBoardSearch;
