import AddFile from '@/assets/images/ic_add_folder.svg?react';
import { useRef, useState } from 'react';
import { useDraggable } from '@/hooks/useDraggable';
import useMarkdownEditor from '@/hooks/useMarkdownEditor';
import ContentPost from '@/components/Board/ContentPost';
import MarkdownTap from '@/components/Board/MarkdownTap';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import { MarkdownLink, CustomCheckbox } from '@/components/Board/MarkdownLink';
import markdownActions from '@/constants/markdownAction';
import * as S from '@/styles/board/Markdown.styled';

const Markdown = () => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const { onMouseDown, onMouseMove, onMouseUp, onMouseLeave } =
    useDraggable(scrollerRef);

  const [markdown, setMarkdown] = useState('');
  const { textareaRef, insertText } = useMarkdownEditor(markdown, setMarkdown);
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');

  return (
    <S.Container>
      <S.MarkdownTapContainer
        ref={scrollerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        <S.StyledImg aria-label="파일 추가">
          <AddFile />
        </S.StyledImg>
        <S.VerticalDivider />
        <S.StyledImg aria-label="파일 추가">
          <AddFile />
        </S.StyledImg>
        {markdownActions.map((action) => {
          if (action === 'divider') return <S.VerticalDivider key="divider" />;

          const { icon: Icon, label, insert } = action;
          const [prefix, suffix] = insert;

          return (
            <S.StyledImg
              key={label}
              aria-label={label}
              onClick={() => insertText(prefix, suffix)}
            >
              <Icon />
            </S.StyledImg>
          );
        })}
      </S.MarkdownTapContainer>
      <MarkdownTap activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'write' ? (
        <ContentPost
          textareaRef={textareaRef}
          value={markdown}
          onChange={setMarkdown}
        />
      ) : (
        <S.PreviewContainer>
          <S.PreviewWrapper>
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkBreaks, remarkGfm]}
              components={{
                a: MarkdownLink,
                input: CustomCheckbox,
              }}
            >
              {markdown || '미리볼 내용이 없습니다.'}
            </ReactMarkdown>
          </S.PreviewWrapper>
        </S.PreviewContainer>
      )}
    </S.Container>
  );
};

export default Markdown;
