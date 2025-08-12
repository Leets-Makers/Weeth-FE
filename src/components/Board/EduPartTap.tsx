import * as S from '@/styles/board/PartBoard.styled';

type Part = 'ALL' | 'FE' | 'BE' | 'D' | 'PM';

interface EduPartTapProps {
  activePart: Part;
  onPartChange: (part: Part) => void;
}

const PARTS: Part[] = ['ALL', 'FE', 'BE', 'D', 'PM'];

const EduPartTap = ({ activePart, onPartChange }: EduPartTapProps) => {
  return (
    <S.TabContainerWrapper>
      <S.TabContainer>
        {PARTS.map((p) => (
          <S.TabTextContainer key={p} onClick={() => onPartChange(p)}>
            <S.TabText>{p}</S.TabText>
            {activePart === p && <S.Underline />}
          </S.TabTextContainer>
        ))}
      </S.TabContainer>
    </S.TabContainerWrapper>
  );
};

export default EduPartTap;
