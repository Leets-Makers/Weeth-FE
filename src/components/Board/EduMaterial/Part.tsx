import styled from 'styled-components';

interface PartProps {
  part: 'PM' | 'D' | 'FE' | 'BE';
}

const colorMap = {
  PM: {
    background: '#6F50CB1A',
    color: '#6F50CB',
  },
  D: {
    background: '#D968D31A',
    color: '#D968D3',
  },
  FE: {
    background: '#FF58581A',
    color: '#FF5858',
  },
  BE: {
    background: '#508FFF1A',
    color: '#508FFF',
  },
};

const Container = styled.div<PartProps>`
  flex: 0 0 auto;
  width: 38px;
  height: 20px;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 5px 10px;
  gap: 10px;
  font-family: ${({ theme }) => theme.font.semiBold};
  font-size: 12px;
  line-height: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ part }) => colorMap[part].background};
  color: ${({ part }) => colorMap[part].color};
  margin: 0;
`;

const Part = ({ part }: PartProps) => {
  return <Container part={part}>{part}</Container>;
};

export default Part;
