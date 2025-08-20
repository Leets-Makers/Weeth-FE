import theme from '@/styles/theme';
import styled from 'styled-components';
import RefreshIcon from '@/assets/images/ic_study_refresh.svg?react';
import open from '@/assets/images/ic_study_open.svg';
import close from '@/assets/images/ic_study_close.svg';
import { useEffect, useRef, useState } from 'react';
import { useDraggable } from '@/hooks/useDraggable';
import getStudyLists from '@/api/useGetStudyList';
import { RealPart } from '@/types/part';
import { useParams } from 'react-router-dom';
import { toastError } from '@/components/common/ToastMessage';

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
  background-color: ${theme.color.gray[18]};
  border-radius: 10px;
  border: ${({ expanded }) =>
    expanded ? `1px solid ${theme.color.gray[65]}` : `none`};
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

interface StudyTagProps {
  selectedTag: string | null;
  onSelectTag: (tag: string) => void;
  onRefresh?: () => void;
}

const ExpandableTagList = ({
  selectedTag,
  onSelectTag,
  onRefresh,
}: StudyTagProps) => {
  const [studyList, setStudyList] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const { onMouseDown, onMouseMove, onMouseUp, onMouseLeave } =
    useDraggable(scrollerRef);
  const { part } = useParams<{ part: RealPart }>();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!part) return;

    (async () => {
      try {
        const names = await getStudyLists(part);
        setStudyList(names);
      } catch (e) {
        toastError('스터디 목록을 불러오지 못했습니다.');
        console.error(e);
      }
    })();
  }, [part, isRefreshing]);

  const handleRefreshClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRefreshing(true);
    onRefresh?.();
    requestAnimationFrame(() => setIsRefreshing(false));
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
          onClick={handleRefreshClick}
        >
          <RefreshIcon />
        </StudyTag>
        {studyList.map((tag) => (
          <StudyTag
            key={tag}
            selected={selectedTag === tag}
            onClick={() => {
              if (selectedTag === tag) {
                onSelectTag('');
              } else {
                onSelectTag(tag);
              }
            }}
          >
            {tag}
          </StudyTag>
        ))}
      </ScrollContainer>
      <ExpandableButton onClick={handleToggle} expanded={isOpen}>
        {isOpen ? (
          <img src={close} alt="close" />
        ) : (
          <img src={open} alt="open" />
        )}
      </ExpandableButton>
    </Container>
  );
};

export default ExpandableTagList;
