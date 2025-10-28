import ReceiptMain from '@/components/Receipt/ReceiptMain';
import useCustomBack from '@/hooks/useCustomBack';
import useSetHeader from '@/hooks/useSetHeader';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  margin-bottom: 50px;
`;

const Receipt: React.FC = () => {
  useCustomBack('/dues');

  useSetHeader({
    title: '영수증',
    rightButtonType: 'none',
    isAccessible: true,
  });

  return (
    <Container>
      <ReceiptMain />
    </Container>
  );
};

export default Receipt;
