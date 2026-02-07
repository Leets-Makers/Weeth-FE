import Breadcrumb from '@/components/common/Breadcrumb';
import StudyBoardSearch from '@/components/Board/StudyBoardSearch';
import StudyLogListItem from '@/components/Board/StudyLogListItem';
import formatDate from '@/hooks/formatDate';
import * as S from '@/styles/board/PartBoard.styled';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useNoticesInfinite from '@/hooks/queries/board/useNoticesInfinite';
import Loading from '@/components/common/Loading';
import { SearchContent } from '@/types/search';
import useCustomBack from '@/hooks/useCustomBack';
import { useSmartCombinedLoading } from '@/hooks/useSmartLoading';
import { BoardContent } from '@/types/board';
import { BreadcrumbPadding } from '@/styles/breadCrum';
import useUserData from '@/hooks/queries/useUserData';
import BoardWriteFloatingButton from '@/components/Board/BoardWriteFloatingButton';

const BoardNotice = () => {
  useCustomBack('/board');

  const { data: userInfo } = useUserData();

  const navigate = useNavigate();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const [searchMode, setSearchMode] = useState(false);
  const [searchResults, setSearchResults] = useState<BoardContent[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: loading,
  } = useNoticesInfinite();

  const posts = data?.pages.flatMap((page) => page.content) ?? [];

  const combinedSmartLoading = useSmartCombinedLoading(
    searchLoading,
    isFetchingNextPage,
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
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
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (loading) {
    return <Loading />;
  }

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
      <BreadcrumbPadding>
        <Breadcrumb
          items={[{ label: '게시판', path: '/board' }, { label: '공지사항' }]}
        />
      </BreadcrumbPadding>
      <StudyBoardSearch
        requestType="notices"
        onSearchDone={handleSearchDone}
        onClear={handleSearchClear}
        onLoading={setSearchLoading}
      />
      {combinedSmartLoading ? (
        <Loading />
      ) : (
        <S.PostContainer>
          {list.map((post) => (
            <React.Fragment key={post.id}>
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
            </React.Fragment>
          ))}
          {hasNextPage && (
            <div
              ref={observerRef}
              style={{ height: '20px', backgroundColor: 'transparent' }}
            />
          )}
          {!hasNextPage && posts.length > 10 && (
            <S.Text>마지막 게시물입니다.</S.Text>
          )}
        </S.PostContainer>
      )}
      {userInfo?.role === 'ADMIN' && <BoardWriteFloatingButton />}
    </S.Container>
  );
};

export default BoardNotice;
