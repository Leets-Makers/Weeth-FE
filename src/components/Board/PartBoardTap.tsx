import * as S from '@/styles/board/PartBoard.styled';

interface PartBoardTapProps {
  activeTab: 'StudyLog' | 'Article';
  onTabChange: (tab: 'StudyLog' | 'Article') => void;
}

const PartBoardTap = ({ activeTab, onTabChange }: PartBoardTapProps) => {
  return (
    <S.TabContainerWrapper>
      <S.TabContainer>
        <S.TabTextContainer onClick={() => onTabChange('StudyLog')}>
          <S.TabText>스터디로그</S.TabText>
          {activeTab === 'StudyLog' && <S.Underline />}
        </S.TabTextContainer>
        <S.TabTextContainer onClick={() => onTabChange('Article')}>
          <S.TabText>아티클</S.TabText>
          {activeTab === 'Article' && <S.Underline />}
        </S.TabTextContainer>
      </S.TabContainer>
    </S.TabContainerWrapper>
  );
};

export default PartBoardTap;
