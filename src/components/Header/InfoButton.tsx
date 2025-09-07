import icInfo from '@/assets/images/ic_info.svg';
import styled from 'styled-components';

const ImgButton = styled.img`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

const InfoButton = ({ onClick }: { onClick: () => void }) => {
  return <ImgButton onClick={onClick} src={icInfo} alt="info" />;
};

export default InfoButton;
