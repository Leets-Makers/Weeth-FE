import theme from '@/styles/theme';
import styled from 'styled-components';
import RereshIcon from '@/assets/images/ic_study_refresh.svg?react';
import open from '@/assets/images/ic_study_open.svg';
import close from '@/assets/images/ic_study_close.svg';
import { useRef, useState } from 'react';
import { useDraggable } from '@/hooks/useDraggable';

export const Container = styled.div`
  display: flex;
  gap: 5px;
`;

export const ScrollContainer = styled.div<{ expanded: boolean }>`
  display: flex;
  flex-wrap: ${({ expanded }) => (expanded ? 'wrap' : 'nowrap')};
  overflow-x: ${({ expanded }) => (expanded ? 'visible' : 'auto')};
  gap: 5px;
  cursor: grab;
  user-select: none;
  flex-shrink: 1;
  flex-grow: 1;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StudyTag = styled.div<{ refresh?: boolean; selected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border: 1px solid ${theme.color.gray[18]};
  border-radius: 24px;
  padding: ${({ refresh }) => (refresh ? '8px 10px' : '8px 15px')};
  gap: 8px;
  color: ${theme.color.gray[100]};
  font-family: ${theme.font.semiBold};
  font-size: 14px;
  white-space: nowrap;
  flex: 0 0 auto;
  box-sizing: border-box;
  transition: filter 0.2s ease-in-out;
  background-color: ${({ selected }) =>
    selected ? `${theme.color.main}` : 'transparent'};
`;

export const ExpandableButton = styled.div<{ expanded: boolean }>`
  width: 40px;
  height: 40px;
  background-color: ${({ expanded }) =>
    expanded ? `${theme.color.main}` : `${theme.color.gray[18]}`};
  border-radius: 10px;
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ExpandableTagList = () => {
  const tags = [
    'React',
    '데이터분석',
    'Framer',
    '알고리즘',
    '자바스크립트',
    '스프링',
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const { onMouseDown, onMouseMove, onMouseUp, onMouseLeave } =
    useDraggable(scrollerRef);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <ScrollContainer
        ref={scrollerRef}
        expanded={isOpen}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        <StudyTag
          refresh
          selected={isRefreshing}
          onMouseDown={() => setIsRefreshing(true)}
          onMouseUp={() => setIsRefreshing(false)}
          onMouseLeave={() => setIsRefreshing(false)}
        >
          <RereshIcon />
        </StudyTag>
        {tags.map((tag) => (
          <StudyTag
            key={tag}
            selected={selectedTag === tag}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </StudyTag>
        ))}
      </ScrollContainer>
      <ExpandableButton onClick={handleToggle} expanded={isOpen}>
        {isOpen ? (
          <img src={open} alt="open" />
        ) : (
          <img src={close} alt="close" />
        )}
      </ExpandableButton>
    </Container>
  );
};

export default ExpandableTagList;
