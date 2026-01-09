import CardinalDropdown from '@/components/common/CardinalDropdown';
import MemberList from '@/components/Member/MemberList';
import useCustomBack from '@/hooks/useCustomBack';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import search from '@/assets/images/ic_search.svg';
import getSearchMember from '@/api/getSearchMember';
import { User } from '@/types/user';
import { toastError } from '@/components/common/ToastMessage';
import Breadcrumb from '@/components/common/Breadcrumb';
import * as S from '@/styles/member/Member.styled';
import { PageHeader } from '@/styles';

const Member = () => {
  useCustomBack('/home');
  const [searchParams] = useSearchParams();
  const cardinal = searchParams.get('cardinal');
  const [selectedCardinal, setSelectedCardinal] = useState<number | null>(
    Number(cardinal) || null,
  );
  const [keyword, setKeyword] = useState<string>('');
  const [searchResults, setSearchResults] = useState<User[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await getSearchMember(keyword);
      setSearchResults(response.data.data);
      navigate(`/member?search=${keyword}`);
    } catch (error) {
      toastError('데이터를 불러오지 못했습니다.');
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    navigate(`/member?cardinal=${selectedCardinal}`);
  }, [selectedCardinal]);

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <S.MemberContainer>
      <Breadcrumb items={[{ label: '멤버', path: '/member' }]} hasTitle />
      <PageHeader>멤버</PageHeader>
      <S.Wrapper>
        <S.Search>
          <CardinalDropdown
            origValue={selectedCardinal}
            editValue={setSelectedCardinal}
            isMember
          />
          <S.SearchBar>
            <S.SearchInput
              placeholder="멤버 이름을 검색하세요"
              value={keyword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setKeyword(e.target.value)
              }
              onKeyDown={handleEnter}
            />
            <S.DividerLine />
            <S.SearchButton src={search} alt={search} onClick={handleSearch} />
          </S.SearchBar>
        </S.Search>
        <MemberList searchResults={searchResults} loading={loading} />
      </S.Wrapper>
    </S.MemberContainer>
  );
};

export default Member;
