import ReceiptList from '@/components/Receipt/ReceiptList';
import useCustomBack from '@/hooks/useCustomBack';

import { StyledDues } from '@/styles/dues/Dues.styled';
import { PageHeader } from './attend/Penalty';

const Receipt: React.FC = () => {
  useCustomBack('/dues');

  return (
    <StyledDues>
      <PageHeader>영수증</PageHeader>
      <ReceiptList />
    </StyledDues>
  );
};

export default Receipt;
