import styled from 'styled-components';
import open from '@/assets/images/ic_study_open.svg';
import close from '@/assets/images/ic_study_close.svg';
import { useEffect, useRef, useState } from 'react';
import { useDraggable } from '@/hooks/useDraggable';
import useStudyList from '@/hooks/queries/board/useStudyList';
import type { RealPart } from '@/api/board/getStudyList';
import { RealPart as RealPartType } from '@/types/part';
import { useParams } from 'react-router-dom';
import { toastError } from '@/components/common/ToastMessage';
import { colors, units } from '@/theme/designTokens';
import typography from '@/theme/typography';

export const Container = styled.div`
  display: flex;
  gap: ${units.margin['100']}px;
`;

export const ScrollContainer = styled.div<{ $expanded: boolean }>`
  display: flex;
  flex-wrap: ${({ $expanded }) => ($expanded ? 'wrap' : 'nowrap')};
  overflow-x: ${({ $expanded }) => ($expanded ? 'visible' : 'auto')};
  gap: ${units.margin['100']}px;
  cursor: grab;
  user-select: none;
  flex-shrink: 1;
  flex-grow: 1;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StudyTag = styled.div<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid
    ${({ $selected }) =>
      $selected ? colors.semantic.brand.primary : colors.semantic.line};
  border-radius: 24px;
  padding: ${units.padding['200']}px ${units.padding['400']}px;
  color: ${({ $selected }) =>
    $selected ? colors.semantic.text.inverse : colors.semantic.text.normal};
  ${typography.Button2};
  white-space: nowrap;
  flex: 0 0 auto;
  box-sizing: border-box;
  transition: filter 0.2s ease-in-out;
  background-color: ${({ $selected }) =>
    $selected ? `${colors.semantic.brand.primary}` : 'transparent'};
`;

export const ExpandableButton = styled.div<{ $expanded: boolean }>`
  width: 40px;
  height: 40px;
  background-color: ${colors.semantic.button.neutral};
  border-radius: ${units.radius.sm}px;
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
}

const ExpandableTagList = ({ selectedTag, onSelectTag }: StudyTagProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const { onMouseDown, onMouseMove, onMouseUp, onMouseLeave } =
    useDraggable(scrollerRef);
  const { part } = useParams<{ part: RealPartType }>();
  const { data: studyList = [], error } = useStudyList(
    (part as RealPart) ?? 'ALL',
  );

  useEffect(() => {
    if (error) {
      toastError('스터디 목록을 불러오지 못했습니다.');
    }
  }, [error]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <ScrollContainer
        ref={scrollerRef}
        $expanded={isOpen}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        {studyList.map((tag) => (
          <StudyTag
            key={tag}
            $selected={selectedTag === tag}
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
      <ExpandableButton onClick={handleToggle} $expanded={isOpen}>
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
