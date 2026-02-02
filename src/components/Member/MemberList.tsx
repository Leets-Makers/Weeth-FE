import { useEffect, useRef, useMemo } from 'react';
import MemberItem from '@/components/Member/MemberItem';
import { useSearchParams } from 'react-router-dom';
import theme from '@/styles/theme';
import styled from 'styled-components';
import useMemberData from '@/hooks/queries/useAllMemberData';
import { Member } from '@/types/member';
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
  searchResults: Member[] | undefined;
  loading: boolean;
}) => {
  const [searchParams] = useSearchParams();
  const cardinal = searchParams.get('cardinal');
  const isSearch = searchParams.get('search') !== null;
  const selectedCardinal = cardinal ? Number(cardinal) : null;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useMemberData(selectedCardinal ?? null);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const members = useMemo(() => {
    return data?.pages.flatMap((page) => page.content) ?? [];
  }, [data]);

  useEffect(() => {
    const element = observerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // 중복 요청 방지
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(element);

    // eslint-disable-next-line consistent-return
    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (!isSearch && searchLoading) {
    return (
      <List>
        <Loading />
      </List>
    );
  }

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
              key={user.id}
              id={user.id}
              name={user.name}
              cardinals={user.cardinals}
              position={user.position}
              role={user.role}
            />
          ))
        : members.map((user) => (
            <MemberItem
              key={user.id}
              id={user.id}
              name={user.name}
              cardinals={user.cardinals}
              position={user.position}
              role={user.role}
            />
          ))}

      {!isSearch && hasNextPage && (
        <div
          ref={observerRef}
          style={{ height: '20px', backgroundColor: 'transparent' }}
        />
      )}

      {isFetchingNextPage && <Loading />}

      {!isSearch && !hasNextPage && members.length > 0 && (
        <Error>마지막 멤버입니다.</Error>
      )}

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
