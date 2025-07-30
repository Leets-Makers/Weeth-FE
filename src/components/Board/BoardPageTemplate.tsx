import Header from '@/components/Header/Header';
import PartBoardTap from '@/components/Board/PartBoardTap';
import CardinalDropdown from '@/components/Board/CardinalDropdown';
import WeekDropdown from '@/components/Board/WeekDropdown';
import ExpandableTagList from '@/components/Board/ExpandableTagList';
import StudyBoardSearch from '@/components/Board/StudyBoardSearch';
import StudyLogListItem from '@/components/Board/StudyLogListItem';
import formatDate from '@/hooks/formatDate';
import * as S from '@/styles/board/PartBoard.styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

interface BoardPageTemplateProps {
  part: 'front' | 'back' | 'design' | 'entire' | 'pm';
  headerTitle: string;
  navigateToPost: (id: number) => string;
}

const BoardPageTemplate = ({
  part,
  headerTitle,
  navigateToPost,
}: BoardPageTemplateProps) => {
  const [selectedCardinal, setSelectedCardinal] = useState<number | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const url = new URL(window.location.href);
  const pathArray = url.pathname.split('/');
  const path = pathArray[1];
  const navigate = useNavigate();

  const handleRightButton = () => {
    navigate(`/board/${part}/write`);
  };

  const { posts, observerRef, hasMore } = useInfiniteScroll({
    path,
  });

  return (
    <S.Container>
      <Header
        isAccessible
        RightButtonType="WRITING"
        onClickRightButton={handleRightButton}
      >
        {headerTitle}
      </Header>
      <PartBoardTap />
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
        <ExpandableTagList />
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
                onClick={() => navigate(navigateToPost(post.id))}
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

export default BoardPageTemplate;
