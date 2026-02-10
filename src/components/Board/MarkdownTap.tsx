import theme from '@/styles/theme';
import { colors } from '@/theme/designTokens';
import typography from '@/theme/typography';
import styled from 'styled-components';

const TabContainer = styled.div`
  display: flex;
  height: 39px;
  border-bottom: 2px solid ${theme.color.gray[20]};
  position: relative;
  box-sizing: border-box;
  flex-shrink: 0;
  padding-right: 10px;
`;

const TabTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  position: relative;
`;

const TabText = styled.div<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 10px 15px 0px 15px;
  ${typography.Sub2};
  color: ${({ $isActive }) =>
    $isActive ? colors.semantic.text.strong : theme.color.gray[65]};
  cursor: pointer;
`;

const Underline = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${colors.semantic.text.strong};
  margin-top: 6px;
  position: absolute;
  bottom: -2px;
`;

interface MarkdownTapProps {
  activeTab: 'write' | 'preview';
  setActiveTab: (tab: 'write' | 'preview') => void;
}

const MarkdownTap = ({ activeTab, setActiveTab }: MarkdownTapProps) => {
  return (
    <TabContainer>
      <TabTextContainer onClick={() => setActiveTab('write')}>
        <TabText $isActive={activeTab === 'write'}>작성</TabText>
        {activeTab === 'write' && <Underline />}
      </TabTextContainer>
      <TabTextContainer onClick={() => setActiveTab('preview')}>
        <TabText $isActive={activeTab === 'preview'}>미리보기</TabText>
        {activeTab === 'preview' && <Underline />}
      </TabTextContainer>
    </TabContainer>
  );
};

export default MarkdownTap;
