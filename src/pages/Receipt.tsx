import ReceiptList from '@/components/Receipt/ReceiptList';
import useCustomBack from '@/hooks/useCustomBack';

import { StyledDues } from '@/styles/dues/Dues.styled';

const Receipt: React.FC = () => {
  useCustomBack('/dues');

  return (
    <StyledDues>
      <ReceiptList />
    </StyledDues>
  );
};

export default Receipt;
