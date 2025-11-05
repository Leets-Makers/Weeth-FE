import { Dispatch, SetStateAction, useRef, useState } from 'react';
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
import PostFile from '@/components/Board/PostFile';
import FileUploader from '@/components/Board/FileUploader';
import { originFile } from '@/pages/board/part/PartEdit';

interface MarkdownProps {
  content: string;
  setContent: (value: string) => void;
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
  originFiles?: originFile[];
  setOriginFiles?: Dispatch<SetStateAction<originFile[]>>;
}

const Markdown = ({
  content,
  setContent,
  files,
  setFiles,
  originFiles,
  setOriginFiles,
}: MarkdownProps) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const { onMouseDown, onMouseMove, onMouseUp, onMouseLeave } =
    useDraggable(scrollerRef);

  const { textareaRef, insertText } = useMarkdownEditor(content, setContent);
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');

  const handleDeleteFile = (targetFile: File) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== targetFile));
  };

  const handleDeleteOrigin = (fileName: string) => {
    setOriginFiles?.((prev) =>
      (prev ?? []).filter((f) => f.fileName !== fileName),
    );
  };

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
          <FileUploader files={files} setFiles={setFiles} />
        </S.StyledImg>
        <S.VerticalDivider />
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
          value={content}
          onChange={setContent}
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
              {content || '미리 볼 내용이 없습니다.'}
            </ReactMarkdown>
          </S.PreviewWrapper>
        </S.PreviewContainer>
      )}
      <S.FileContainer>
        {originFiles && (
          <>
            {originFiles.map((of) => (
              <PostFile
                key={of.fileName}
                fileName={of.fileName}
                isDownload={false}
                onClick={() => handleDeleteOrigin(of.fileName)}
              />
            ))}
          </>
        )}
        {files.length > 0 && (
          <>
            {files.map((file) => (
              <PostFile
                key={`${file.name}-${file.lastModified}`}
                fileName={file.name}
                isDownload={false}
                onClick={() => handleDeleteFile(file)}
              />
            ))}
          </>
        )}
      </S.FileContainer>
    </S.Container>
  );
};

export default Markdown;
