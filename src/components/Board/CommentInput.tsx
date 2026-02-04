import { useState, useEffect, Dispatch, SetStateAction, useRef } from 'react';
import styled from 'styled-components';
import CommentSend from '@/assets/images/ic_comment_send.svg';
import usePostComment from '@/hooks/mutation/usePostComment';
import { toastError } from '@/components/common/ToastMessage';
import PostFile from '@/components/Board/PostFile';
import FileUploader from '@/components/Board/FileUploader';
import { pcResponsive } from '@/styles';
import { colors, units } from '@/theme/designTokens';
import typography from '@/theme/typography';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: ${units.device.mobile}px;

  ${pcResponsive}
`;

const FileListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 15px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const CommentContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  padding: 10px 10px 22px 10px;
  gap: 10px;
  background-color: ${colors.dark.neutral[100]};
  color: white;
  box-sizing: border-box;
`;

const Input = styled.textarea`
  flex: 1;
  width: 255px;
  box-sizing: border-box;
  resize: none;
  border: none;
  outline: none;
  border-radius: ${units.radius.sm}px;
  padding: ${units.padding['200']}px 15px;
  background-color: ${colors.semantic.container.neutral};
  color: ${colors.semantic.text.normal};
  ${typography.Body1};
  white-space: pre-wrap;
  word-break: break-word;

  &::placeholder {
    ${typography.Body1};
  }
`;

const SendButton = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const CommentInput = ({
  postId,
  boardPath,
  initialParentCommentId = null,
  onCommentSuccess,
  files,
  setFiles,
}: {
  postId: number;
  boardPath: 'board' | 'notices';
  initialParentCommentId?: number | null;
  onCommentSuccess?: () => void;
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
}) => {
  const [inputValue, setInputValue] = useState('');
  const [parentCommentId, setParentCommentId] = useState<number | null>(null);
  const submittingRef = useRef(false);

  const postCommentMutation = usePostComment({
    onSuccess: () => {
      setInputValue('');
      setFiles([]);
      setParentCommentId(null);
      onCommentSuccess?.();
    },
    onError: (message) => {
      toastError(message);
    },
    onSettled: () => {
      submittingRef.current = false;
    },
  });

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const autoResize = (el: HTMLTextAreaElement) => {
    const elem = el;
    elem.style.height = 'auto';
    elem.style.height = `${elem.scrollHeight}px`;
  };

  useEffect(() => {
    if (inputRef.current) autoResize(inputRef.current);
  }, [inputValue]);

  useEffect(() => {
    setParentCommentId(initialParentCommentId);

    if (initialParentCommentId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [initialParentCommentId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    autoResize(e.currentTarget);
  };

  const onClickSend = () => {
    if (submittingRef.current || postCommentMutation.isPending) return;
    if (inputValue.trim() === '') {
      toastError('댓글을 입력하세요.');
      return;
    }

    submittingRef.current = true;
    postCommentMutation.mutate({
      postId,
      content: inputValue,
      parentCommentId: parentCommentId ?? undefined,
      files,
      boardPath,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      onClickSend();
    }
  };

  const handleDeleteFile = (targetFile: File) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== targetFile));
  };

  return (
    <Container>
      {files.length > 0 && (
        <FileListContainer>
          {files.map((file) => (
            <PostFile
              key={`${file.name}-${file.lastModified}`}
              fileName={file.name}
              isDownload={false}
              onClick={() => handleDeleteFile(file)}
            />
          ))}
        </FileListContainer>
      )}

      <CommentContainer>
        <FileUploader files={files} setFiles={setFiles} isComment />
        <Input
          ref={inputRef}
          rows={1}
          placeholder={
            parentCommentId ? '대댓글을 입력하세요.' : '댓글을 입력하세요.'
          }
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <SendButton
          src={CommentSend}
          alt="댓글 입력 버튼"
          onClick={onClickSend}
        />
      </CommentContainer>
    </Container>
  );
};

export default CommentInput;
