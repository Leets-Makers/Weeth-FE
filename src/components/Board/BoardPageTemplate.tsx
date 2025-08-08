import Header from '@/components/Header/Header';
import PartBoardTap from '@/components/Board/PartBoardTap';
import CardinalDropdown from '@/components/Board/CardinalDropdown';
import WeekDropdown from '@/components/Board/WeekDropdown';
import ExpandableTagList from '@/components/Board/ExpandableTagList';
import StudyBoardSearch from '@/components/Board/StudyBoardSearch';
import StudyLogListItem from '@/components/Board/StudyLogListItem';
import formatDate from '@/hooks/formatDate';
import * as S from '@/styles/board/PartBoard.styled';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGetPartBoard from '@/api/useGetPartBoard';

interface BoardPageTemplateProps {
  part: 'FE' | 'BE' | 'D' | 'PM' | 'ALL';
  headerTitle: string;
}

const BoardPageTemplate = ({ part, headerTitle }: BoardPageTemplateProps) => {
  const [selectedCardinal, setSelectedCardinal] = useState<number | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<'StudyLog' | 'Article'>(
    'StudyLog',
  );
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const navigate = useNavigate();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetPartBoard({
      part,
      category: activeCategory === 'StudyLog' ? 'StudyLog' : 'Article',
      cardinalNumber: selectedCardinal || undefined,
      week: selectedWeek || undefined,
      studyName: selectedTag || undefined,
      pageSize: 10,
      pageNumber: 0,
    });

  const posts = data?.pages.flatMap((page) => page.content) ?? [];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleRightButton = () => {
    navigate(`/board//${part}/write`);
  };

  const handleDetail = (id: number) => {
    const categoryPrefix = activeCategory === 'StudyLog' ? 'study' : 'article';
    navigate(`/board/${categoryPrefix}/${part}/${id}`);
  };

  return (
    <S.Container>
      <Header
        isAccessible
        RightButtonType="WRITING"
        onClickRightButton={handleRightButton}
      >
        {headerTitle}
      </Header>
      <PartBoardTap
        activeTab={activeCategory}
        onTabChange={setActiveCategory}
      />
      <S.InformationContainer>
        <S.DropdownContainer>
          <CardinalDropdown
            origValue={selectedCardinal}
            editValue={setSelectedCardinal}
            isMember
          />
          <WeekDropdown
            origWeek={selectedWeek}
            editWeek={setSelectedWeek}
            isEntire
          />
        </S.DropdownContainer>
        <ExpandableTagList
          selectedTag={selectedTag}
          onSelectTag={setSelectedTag}
        />
      </S.InformationContainer>
      <StudyBoardSearch />
      <S.PostContainer>
        <S.TotalPostNumber>게시글 {posts.length}개</S.TotalPostNumber>
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
                isNew={post.isNew}
                studyName={post.studyName}
                week={post.week}
                onClick={() => handleDetail(post.id)}
              />
            </S.PostListItemContainer>
            <S.Line />
          </>
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
    </S.Container>
  );
};

export default BoardPageTemplate;
