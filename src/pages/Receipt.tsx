import ReceiptMain from '@/components/Receipt/ReceiptMain';
import useCustomBack from '@/hooks/useCustomBack';
import { units } from '@/theme/designTokens';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 375px;
  max-width: 375px;
  margin-bottom: 50px;
  padding: 0 ${units.padding['450']}px;
`;

const Receipt: React.FC = () => {
  useCustomBack('/dues');

  return (
    <Container>
      <ReceiptMain />
    </Container>
  );
};

export default Receipt;
