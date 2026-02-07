import NavMenu from '@/components/Admin/NavMenu';
import styled from 'styled-components';
import TopBar from '@/components/Admin/TopBar';
import { PageWrapper, ContentWrapper } from '@/styles/admin/AdminLayout.styled';
import TotalDues from '@/components/Admin/TotalDues';
import Expenditure from '@/components/Admin/Expenditure';
import DuesRegisterAdd from '@/components/Admin/DuesRegisterAdd';
import { useState } from 'react';
import DuesRegister from '@/components/Admin/DuesRegister';
import TotalCardinal from '@/components/Admin/CardinalWrapper';
import AdminOnly from '@/components/common/AdminOnly';
import { units } from '@/theme/designTokens';

export const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  min-width: 1400px;
  margin: 20px 30px 0 30px;
  padding-bottom: 30px;
  box-sizing: border-box;
  flex-direction: column;
`;

export const ColumnsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 30px;
  align-items: flex-start;
`;

export const LeftColumn = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const RightColumn = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const CardinalWrapper = styled.div`
  width: 100%;
`;

export const DuesWrapper = styled.div`
  width: 100%;
  padding: 1% 3%;
  background-color: #fff;
  border-radius: ${units.radius.lg}px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DuesRegisterWrapper = styled.div`
  width: 100%;
`;

const AdminDues: React.FC = () => {
  const [selectedCardinal, setSelectedCardinal] = useState<null | number>(null);

  return (
    <PageWrapper>
      <AdminOnly isAdminPage />
      <NavMenu />
      <ContentWrapper>
        <TopBar
          title="회비 관리"
          description="기수 시작시 이월된 회비와 해당 기수 회비를 종합해 회비를 등록해주시기 바랍니다. 회비 등록은 기수당 한 번만 가능합니다."
        />
        <Container>
          <ColumnsWrapper>
            <LeftColumn>
              <CardinalWrapper>
                <TotalCardinal
                  selectedCardinal={selectedCardinal}
                  setSelectedCardinal={setSelectedCardinal}
                  autoSelectLatest
                />
              </CardinalWrapper>
              <DuesWrapper>
                <TotalDues cardinal={selectedCardinal} />
                <Expenditure cardinal={selectedCardinal} />
              </DuesWrapper>
            </LeftColumn>
            <RightColumn>
              <DuesRegisterWrapper>
                <DuesRegister />
              </DuesRegisterWrapper>
              <DuesRegisterWrapper>
                <DuesRegisterAdd />
              </DuesRegisterWrapper>
            </RightColumn>
          </ColumnsWrapper>
        </Container>
      </ContentWrapper>
    </PageWrapper>
  );
};
export default AdminDues;
