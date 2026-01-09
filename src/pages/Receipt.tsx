import ReceiptList from '@/components/Receipt/ReceiptList';
import useCustomBack from '@/hooks/useCustomBack';

import { StyledDues } from '@/styles/dues/Dues.styled';
import Breadcrumb from '@/components/common/Breadcrumb';
import { HeaderContainer, PageHeader } from '@/styles';

const Receipt: React.FC = () => {
  useCustomBack('/dues');

  return (
    <StyledDues>
      <HeaderContainer>
        <Breadcrumb
          items={[
            { label: '회비', path: '/dues' },
            { label: '영수증', path: '/receipt' },
          ]}
          hasTitle
        />
        <PageHeader>영수증</PageHeader>
      </HeaderContainer>
      <ReceiptList />
    </StyledDues>
  );
};

export default Receipt;
