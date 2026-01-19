import { useEffect, useRef } from 'react';
import MemberItem from '@/components/Member/MemberItem';
import { useSearchParams } from 'react-router-dom';
import theme from '@/styles/theme';
import styled from 'styled-components';
import { User } from '@/types/user';
import useMemberData from '@/hooks/queries/useMemberData';
import Loading from '../common/Loading';

const List = styled.div`
  width: 100%;
  min-width: 339px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Error = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  font-family: ${theme.font.semiBold};
`;

const MemberList = ({
  searchResults,
  loading: searchLoading,
}: {
  searchResults: User[] | undefined;
  loading: boolean;
}) => {
  const [searchParams] = useSearchParams();
  const cardinal = searchParams.get('cardinal');
  const isSearch = searchParams.get('search') !== null;
  const selectedCardinal = cardinal ? Number(cardinal) : null;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useMemberData(selectedCardinal ?? 0);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const members = data?.pages;

  // IntersectionObserver
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(observerRef.current);

    observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // 최초 로딩
  if (!isSearch && searchLoading) {
    return (
      <List>
        <Loading />
      </List>
    );
  }

  // 검색 결과 없음
  if (isSearch && searchResults?.length === 0) {
    return (
      <List>
        <Error>검색된 멤버가 없습니다.</Error>
      </List>
    );
  }

  return (
    <List>
      {isSearch
        ? searchResults?.map((user) => (
            <MemberItem
              key={user.studentId}
              userId={user.id}
              name={user.name}
              cardinal={user.cardinals}
              position={user.position}
              role={user.role}
            />
          ))
        : members.map((user) => (
            <MemberItem
              key={user.studentId}
              userId={user.id}
              name={user.name}
              cardinal={user.cardinals}
              position={user.position}
              role={user.role}
            />
          ))}

      {/* observer target */}
      {!isSearch && hasNextPage && (
        <div
          ref={observerRef}
          style={{ height: '20px', backgroundColor: 'transparent' }}
        />
      )}

      {/* 마지막 페이지 */}
      {!isSearch && !hasNextPage && members.length > 0 && (
        <Error>마지막 멤버입니다.</Error>
      )}

      {/* 멤버 없음 */}
      {!isSearch && !isLoading && members.length === 0 && (
        <Error>
          {selectedCardinal
            ? `${selectedCardinal}기 멤버가 존재하지 않습니다.`
            : '멤버가 존재하지 않습니다.'}
        </Error>
      )}
    </List>
  );
};

export default MemberList;
