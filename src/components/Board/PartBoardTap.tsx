import { useState } from 'react';
import * as S from '@/styles/board/PartBoard.styled';

const PartBoardTap = () => {
  const [activeTab, setActiveTab] = useState<'studylog' | 'article'>(
    'studylog',
  );
  return (
    <S.TabContainerWrapper>
      <S.TabContainer>
        <S.TabTextContainer onClick={() => setActiveTab('studylog')}>
          <S.TabText>스터디로그</S.TabText>
          {activeTab === 'studylog' && <S.Underline />}
        </S.TabTextContainer>
        <S.TabTextContainer onClick={() => setActiveTab('article')}>
          <S.TabText>아티클</S.TabText>
          {activeTab === 'article' && <S.Underline />}
        </S.TabTextContainer>
      </S.TabContainer>
    </S.TabContainerWrapper>
  );
};

export default PartBoardTap;
