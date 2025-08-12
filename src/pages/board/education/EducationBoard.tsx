import Header from '@/components/Header/Header';
import CardinalDropdown from '@/components/Board/CardinalDropdown';
import StudyBoardSearch from '@/components/Board/StudyBoardSearch';
import StudyLogListItem from '@/components/Board/StudyLogListItem';
import formatDate from '@/hooks/formatDate';
import * as S from '@/styles/board/PartBoard.styled';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EduPartTap from '@/components/Board/EduPartTap';
import useGetEducationBoard from '@/api/useGetEducationBoard';
import useCustomBack from '@/hooks/useCustomBack';

type Part = 'FE' | 'BE' | 'D' | 'PM' | 'ALL';

const EducationBoard = () => {
  const [selectedCardinal, setSelectedCardinal] = useState<number | null>(null);

  const navigate = useNavigate();
  const observerRef = useRef<HTMLDivElement | null>(null);
  const { part: partParam } = useParams<{ part: Part }>();
  const part = partParam as Part;
  useCustomBack('/board');

  const handleTabChange = (nextPart: Part) => {
    if (nextPart !== part) {
      navigate(`/board/education/${nextPart}`, { replace: true });
    }
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetEducationBoard({
      part: part as Part,
      cardinalNumber: selectedCardinal || undefined,
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
    navigate(`/board/education/${part}/post`);
  };

  const handleDetail = (id: number) => {
    navigate(`/board/education/${part}/${id}`);
  };

  return (
    <S.Container>
      <Header
        isAccessible
        RightButtonType="ADMINWRITING"
        onClickRightButton={handleRightButton}
      >
        교육자료
      </Header>
      <EduPartTap activePart={part} onPartChange={handleTabChange} />
      <S.InformationContainer>
        <S.DropdownContainer>
          <CardinalDropdown
            origValue={selectedCardinal}
            editValue={setSelectedCardinal}
            isMember
          />
        </S.DropdownContainer>
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
                parts={(post.parts as Part[]) ?? [part]}
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

export default EducationBoard;
