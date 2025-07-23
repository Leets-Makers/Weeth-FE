import useGetBoardInfo from '@/api/useGetBoardInfo';
import CardinalDropdown from '@/components/Board/CardinalDropdown';
import ExpandableTagList from '@/components/Board/ExpandableTagList';
import StudyLogListItem from '@/components/Board/StudyLogListItem';
import WeekDropdown from '@/components/Board/WeekDropdown';
import Header from '@/components/Header/Header';
import formatDate from '@/hooks/formatDate';
import * as S from '@/styles/board/PartBoard.styled';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export interface StudyLog {
  id: number;
  name: string;
  title: string;
  content: string;
  time: string;
  commentCount: number;
  hasFile: boolean;
  position: string;
  role: string;
}

const BoardEntire = () => {
  const [searchParams] = useSearchParams();
  const cardinal = searchParams.get('cardinal');
  const [selectedCardinal, setSelectedCardinal] = useState<number | null>(
    Number(cardinal) || null,
  );
  const [posts, setPosts] = useState<StudyLog[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [observerLoading, setObserverLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'studylog' | 'article'>(
    'studylog',
  );
  const navigate = useNavigate();
  const url = new URL(window.location.href);
  const pathArray = url.pathname.split('/');
  const path = pathArray[1];
  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleRightButton = () => {
    navigate('/board/post');
  };

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
    fetchData();
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting) {
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

  return (
    <S.Container>
      <Header
        isAccessible
        RightButtonType="WRITING"
        onClickRightButton={handleRightButton}
      >
        전체
      </Header>
      <S.TabContainerWrapper>
        <S.TabContainer>
          <S.TabTextContainer onClick={() => setActiveTab('studylog')}>
            <S.TabText>스터디로그</S.TabText>
            {activeTab === 'studylog' && <S.Underline />}
          </S.TabTextContainer>
          <S.TabTextContainer onClick={() => setActiveTab('article')}>
            <S.TabText>아티클</S.TabText>
            {activeTab === 'article' && <S.Underline />}
          </S.TabTextContainer>
        </S.TabContainer>
      </S.TabContainerWrapper>

      <S.InformationContainer>
        <S.DropdownContainer>
          <CardinalDropdown
            origValue={selectedCardinal}
            editValue={setSelectedCardinal}
            isMember
          />
          <WeekDropdown
            origValue={selectedCardinal}
            editValue={setSelectedCardinal}
            isMember
          />
        </S.DropdownContainer>
        <ExpandableTagList />
      </S.InformationContainer>
      <S.PostContainer>
        <S.TotalPostNumber>게시글 8개</S.TotalPostNumber>
        {posts.map((post) => (
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
                onClick={() => navigate(`/board/${post.id}`)}
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
        {!hasMore && posts.length > 10 && <S.Text>마지막 게시물입니다.</S.Text>}
      </S.PostContainer>
    </S.Container>
  );
};

export default BoardEntire;
