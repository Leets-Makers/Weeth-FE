import ReceiptList from '@/components/Receipt/ReceiptList';
import useCustomBack from '@/hooks/useCustomBack';

import { StyledDues } from '@/styles/dues/Dues.styled';
import Breadcrumb from '@/components/common/Breadcrumb';
import { DuesHeaderContainer } from '@/components/Dues/DuesTitle';
import { PageHeader } from './attend/Penalty';

const Receipt: React.FC = () => {
  useCustomBack('/dues');

  return (
    <StyledDues>
      <DuesHeaderContainer>
        <Breadcrumb
          items={[
            { label: '회비', path: '/dues' },
            { label: '영수증', path: '/receipt' },
          ]}
          hasTitle
        />
        <PageHeader>영수증</PageHeader>
      </DuesHeaderContainer>
      <ReceiptList />
    </StyledDues>
  );
};

export default Receipt;
