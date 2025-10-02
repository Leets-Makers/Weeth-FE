import Header from '@/components/Header/Header';
import PartBoardTap from '@/components/Board/PartBoardTap';
import CardinalDropdown from '@/components/Board/CardinalDropdown';
import WeekDropdown from '@/components/Board/WeekDropdown';
import ExpandableTagList from '@/components/Board/ExpandableTagList';
import StudyBoardSearch from '@/components/Board/StudyBoardSearch';
import StudyLogListItem from '@/components/Board/StudyLogListItem';
import formatDate from '@/hooks/formatDate';
import * as S from '@/styles/board/PartBoard.styled';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import useGetPartBoard from '@/api/useGetPartBoard';
import { BoardContent } from '@/pages/Board';
import Loading from '@/components/common/Loading';
import { SearchContent } from '@/types/search';
import useGetUserInfo from '@/api/useGetUserInfo';
import useCustomBack from '@/hooks/useCustomBack';

type CatEnum = 'StudyLog' | 'Article';
type CatSlug = 'study' | 'article';
const slugToEnum = (s?: string): CatEnum =>
  s === 'article' ? 'Article' : 'StudyLog';
const enumToSlug = (c: CatEnum): CatSlug =>
  c === 'Article' ? 'article' : 'study';

type Part = 'FE' | 'BE' | 'D' | 'PM' | 'ALL';

const PartBoard = () => {
  useCustomBack('/board');

  const { userInfo } = useGetUserInfo();

  const [selectedCardinal, setSelectedCardinal] = useState<number | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const [searchMode, setSearchMode] = useState(false);
  const [searchResults, setSearchResults] = useState<BoardContent[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { category: categorySlug = 'study', part } = useParams<{
    category: CatSlug;
    part: Part;
  }>();
  const activeCategory = useMemo(
    () => slugToEnum(categorySlug),
    [categorySlug],
  );
  const isStudyLog = activeCategory === 'StudyLog';

  const canWrite = useMemo(() => {
    if (!userInfo) return false;
    if (userInfo.role === 'ADMIN') return true;

    return part === 'ALL' || userInfo.position === part;
  }, [userInfo, part]);

  useEffect(() => {
    const c = searchParams.get('cardinal');
    const w = searchParams.get('week');
    const t = searchParams.get('tag');

    setSelectedCardinal(c ? Number(c) : null);
    setSelectedWeek(w ? Number(w) : null);
    setSelectedTag(t ?? null);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (selectedCardinal != null)
      params.set('cardinal', String(selectedCardinal));
    else params.delete('cardinal');

    if (selectedWeek != null) params.set('week', String(selectedWeek));
    else params.delete('week');

    if (selectedTag) params.set('tag', selectedTag);
    else params.delete('tag');

    setSearchParams(params, { replace: true });
  }, [
    selectedCardinal,
    selectedWeek,
    selectedTag,
    searchParams,
    setSearchParams,
  ]);

  const handleTabChange = (cat: CatEnum) => {
    navigate(`/board/${enumToSlug(cat)}/${part}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetPartBoard({
      part: part as Part,
      category: activeCategory === 'StudyLog' ? 'StudyLog' : 'Article',
      cardinalNumber: selectedCardinal || undefined,
      week: selectedWeek || undefined,
      studyName: selectedTag || undefined,
      pageSize: 10,
      pageNumber: 0,
    });

  const posts = data?.pages.flatMap((page) => page.content) ?? [];
  const handleSearchDone = (result: SearchContent[]) => {
    setSearchMode(true);
    setSearchResults(result);
    setSelectedCardinal(null);
    setSelectedWeek(null);
    setSelectedTag(null);
  };

  const handleSearchClear = () => {
    setSearchMode(false);
    setSearchResults([]);
  };

  useEffect(() => {
    setSearchMode(false);
    setSearchResults([]);
  }, [activeCategory, part]);

  const list = searchMode ? searchResults : posts;

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
    const slug = enumToSlug(activeCategory);
    navigate(`/board/${slug}/${part}/post`);
  };

  const handleDetail = (id: number) => {
    const categoryPrefix = activeCategory === 'StudyLog' ? 'study' : 'article';
    navigate(`/board/${categoryPrefix}/${part}/${id}`);
  };

  const handleRefreshFilters = () => {
    setSelectedCardinal(null);
    setSelectedWeek(null);
    setSelectedTag(null);
  };

  return (
    <S.Container>
      <Header
        isAccessible={canWrite}
        RightButtonType="WRITING"
        onClickRightButton={handleRightButton}
      >
        {part}
      </Header>
      <PartBoardTap activeTab={activeCategory} onTabChange={handleTabChange} />
      <S.InformationContainer>
        <S.DropdownContainer>
          <CardinalDropdown
            origValue={selectedCardinal}
            editValue={setSelectedCardinal}
            isMember
          />
          {isStudyLog && (
            <WeekDropdown
              origWeek={selectedWeek}
              editWeek={setSelectedWeek}
              isEntire
            />
          )}
        </S.DropdownContainer>
        {isStudyLog && (
          <ExpandableTagList
            selectedTag={selectedTag}
            onSelectTag={setSelectedTag}
            onRefresh={handleRefreshFilters}
          />
        )}
      </S.InformationContainer>
      <StudyBoardSearch
        requestType="part"
        onSearchDone={handleSearchDone}
        onClear={handleSearchClear}
        onLoading={setSearchLoading}
      />
      {searchLoading ? (
        <Loading />
      ) : (
        <S.PostContainer>
          <S.TotalPostNumber>
            {searchMode
              ? `검색 결과 ${list.length}개`
              : `게시글 ${list.length}개`}
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
                  isStudy={isStudyLog}
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
      )}
    </S.Container>
  );
};

export default PartBoard;
