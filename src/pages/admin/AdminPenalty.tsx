import TotalCardinal from '@/components/Admin/CardinalWrapper';
import { MemberProvider } from '@/components/Admin/context/MemberContext';
import {
  penaltyReducer,
  PenaltyState,
} from '@/components/Admin/context/PenaltyReducer';
import NavMenu from '@/components/Admin/NavMenu';
import PenaltyAdd from '@/components/Admin/PenaltyAdd';
import PenaltyListTable from '@/components/Admin/PenaltyListTable';
import SearchBar from '@/components/Admin/SearchBar';
import TopBar from '@/components/Admin/TopBar';
import AdminOnly from '@/components/common/AdminOnly';
import {
  PageWrapper,
  ContentWrapper,
  Container,
} from '@/styles/admin/AdminLayout.styled';
import { useReducer, useState } from 'react';
import styled from 'styled-components';

export const PenaltyContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 20px;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 30px 0px 30px;
`;

const AdminPenalty: React.FC = () => {
  const [selectedCardinal, setSelectedCardinal] = useState<null | number>(null);
  const [searchName, setSearchName] = useState<string>('');
  const [penaltyData, dispatch] = useReducer(
    penaltyReducer,
    {} as PenaltyState,
  );

  return (
    <MemberProvider>
      <AdminOnly isAdminPage />
      <PageWrapper>
        <NavMenu />
        <ContentWrapper>
          <TopBar
            title="페널티 관리"
            description="기수를 선택하고, 해당 멤버에 대한 페널티를 수정하는 페이지입니다."
          />
          <TopContainer>
            <TotalCardinal
              selectedCardinal={selectedCardinal}
              setSelectedCardinal={setSelectedCardinal}
              autoSelectLatest
            />
            <SearchBar
              searchName={searchName}
              setSearchName={setSearchName}
              isPenaltyPage
            />
          </TopContainer>
          <PenaltyContainer>
            {/* 왼쪽 섹션 - 페널티/경고 조회 */}
            <PenaltyListTable
              selectedCardinal={selectedCardinal}
              searchName={searchName}
              penaltyData={penaltyData}
              dispatch={dispatch}
            />

            {/* 오른쪽 섹션 - 페널티/경고 부여 */}
            <PenaltyAdd dispatch={dispatch} />
          </PenaltyContainer>
        </ContentWrapper>
      </PageWrapper>
    </MemberProvider>
  );
};
export default AdminPenalty;
