import theme from '@/styles/theme';
import styled from 'styled-components';
import AddFile from '@/assets/images/ic_add_folder.svg?react';
import Heading from '@/assets/images/ic_markdown_heading.svg?react';
import Bold from '@/assets/images/ic_markdown_bold.svg?react';
import Italic from '@/assets/images/ic_markdown_italic.svg?react';
import Align from '@/assets/images/ic_markdown_align.svg?react';
import Code from '@/assets/images/ic_markdown_code.svg?react';
import LinkIcon from '@/assets/images/ic_markdown_link.svg?react';
import OrderedList from '@/assets/images/ic_markdown_orderedList.svg?react';
import UnorderedList from '@/assets/images/ic_markdown_unorderedList.svg?react';
import TaskList from '@/assets/images/ic_markdown_taskList.svg?react';
import { useRef } from 'react';
import { useDraggable } from '@/hooks/useDraggable';
import MarkdownTap from './MarkdownTap';
import ContentPost from './ContentPost';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: ${theme.color.gray[18]};
  width: 345px;
  height: 403.12px;
  box-sizing: border-box;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
`;

const MarkdownTapContainer = styled.div`
  display: flex;
  height: 44px;
  box-sizing: border-box;
  overflow-x: auto;
  cursor: grab;
  border-bottom: 1px solid ${theme.color.gray[30]};
  border-radius: 10px 10px 0 0;
  padding: 2px 8px;
  display: flex;
  align-items: center;
  background-color: #3567c0;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledImg = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 5px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0000001a;
  }
`;

const VerticalDivider = styled.div`
  width: 1px;
  height: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  flex-shrink: 0;
  margin: 0 5px;
`;

const Markdown = () => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const { onMouseDown, onMouseMove, onMouseUp, onMouseLeave } =
    useDraggable(scrollerRef);

  return (
    <Container>
      <MarkdownTapContainer
        ref={scrollerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        <StyledImg>
          <AddFile />
        </StyledImg>
        <VerticalDivider />
        <StyledImg>
          <Heading />
        </StyledImg>
        <StyledImg>
          <Bold />
        </StyledImg>
        <StyledImg>
          <Italic />
        </StyledImg>
        <StyledImg>
          <Align />
        </StyledImg>
        <StyledImg>
          <Code />
        </StyledImg>
        <StyledImg>
          <LinkIcon />
        </StyledImg>
        <VerticalDivider />
        <StyledImg>
          <OrderedList />
        </StyledImg>
        <StyledImg>
          <UnorderedList />
        </StyledImg>
        <StyledImg>
          <TaskList />
        </StyledImg>
      </MarkdownTapContainer>
      <MarkdownTap />
      <ContentPost />
    </Container>
  );
};

export default Markdown;
