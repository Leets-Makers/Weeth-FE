import Header from '@/components/Header/Header';
import StudyBoardSearch from '@/components/Board/StudyBoardSearch';
import StudyLogListItem from '@/components/Board/StudyLogListItem';
import formatDate from '@/hooks/formatDate';
import * as S from '@/styles/board/PartBoard.styled';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetBoardInfo from '@/api/useGetBoardInfo';
import Loading from '@/components/common/Loading';
import { BoardContent } from '@/pages/Board';
import { SearchContent } from '@/types/search';
import useGetUserInfo from '@/api/useGetGlobaluserInfo';

interface Content {
  id: number;
  name: string;
  title: string;
  content: string;
  time: string;
  commentCount: number;
  hasFile: boolean;
  position: string;
  role: string;
  isNew: boolean;
  studyName: string;
  week: number;
}

const BoardNotice = () => {
  const { isAdmin } = useGetUserInfo();

  const navigate = useNavigate();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const [posts, setPosts] = useState<Content[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [observerLoading, setObserverLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const [searchMode, setSearchMode] = useState(false);
  const [searchResults, setSearchResults] = useState<BoardContent[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const path = 'notices';

  const fetchData = async () => {
    if (!observerLoading && hasMore) {
      setObserverLoading(true);
      await useGetBoardInfo(
        path,
        pageNumber,
        setPosts,
        setHasMore,
        setObserverLoading,
      );
      setPageNumber((prevPage) => prevPage + 1);
      setObserverLoading(false);
      if (loading) setLoading(false);
    }
  };

  useEffect(() => {
    // 초기 데이터 로드드
    fetchData();
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting) {
          // 추가 데이터 로드
          fetchData();
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.1 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore, observerLoading, pageNumber]);

  if (loading) {
    return <Loading />;
  }

  const handleRightButton = () => {
    navigate(`/board/notices/post`);
  };

  const handleDetail = (postId: number) => {
    navigate(`/board/notices/${postId}`);
  };

  const handleSearchDone = (result: SearchContent[]) => {
    setSearchMode(true);
    setSearchResults(result);
  };
  const handleSearchClear = () => {
    setSearchMode(false);
    setSearchResults([]);
  };

  const list = searchMode ? searchResults : posts;

  return (
    <S.Container>
      <Header
        isAccessible={isAdmin}
        RightButtonType="WRITING"
        onClickRightButton={handleRightButton}
      >
        공지사항
      </Header>
      <S.SearchContainer>
        <StudyBoardSearch
          requestType="notices"
          onSearchDone={handleSearchDone}
          onClear={handleSearchClear}
          onLoading={setSearchLoading}
        />
      </S.SearchContainer>
      {searchLoading ? (
        <Loading />
      ) : (
        <S.PostContainer>
          <S.TotalPostNumber>
            {searchMode
              ? `검색 결과 ${list.length}개`
              : `게시글 ${posts.length}개`}
          </S.TotalPostNumber>
          {list.map((post) => (
            <>
              <S.PostListItemContainer key={post.id}>
                <StudyLogListItem
                  name={post.name}
                  time={formatDate(post.time)}
                  title={post.title}
                  content={post.content}
                  totalComments={post.commentCount}
                  hasFile={post.hasFile}
                  position={post.position}
                  role={post.role}
                  isNew={post.isNew}
                  studyName={post.studyName}
                  week={post.week}
                  onClick={() => handleDetail(post.id)}
                />
              </S.PostListItemContainer>
              <S.Line />
            </>
          ))}
          {hasMore && (
            <div
              ref={observerRef}
              style={{ height: '20px', backgroundColor: 'transparent' }}
            />
          )}
          {!hasMore && posts.length > 10 && (
            <S.Text>마지막 게시물입니다.</S.Text>
          )}
        </S.PostContainer>
      )}
    </S.Container>
  );
};

export default BoardNotice;
