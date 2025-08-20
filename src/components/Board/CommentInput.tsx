import { useState, useEffect, Dispatch, SetStateAction, useRef } from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';
import CommentSend from '@/assets/images/ic_comment_send.svg';
import createComment from '@/api/postComment';
import { toastError } from '@/components/common/ToastMessage';
import PostFile from '@/components/Board/PostFile';
import FileUploader from '@/components/Board/FileUploader';
import { MOBILE, pcResponsive } from '@/styles';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${MOBILE};
  ${pcResponsive}
`;

const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 15px;
  gap: 10px;
  background-color: ${theme.color.gray[18]}50;
`;

const CommentContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  padding: 10px 10px 22px 10px;
  gap: 10px;
  background-color: ${theme.color.gray[18]};
  color: white;
  box-sizing: border-box;
`;

const Input = styled.textarea`
  flex: 1;
  width: 271px;
  min-height: 33px;
  box-sizing: border-box;
  resize: none;
  border: none;
  outline: none;
  border-radius: 20px;
  padding: 7px 15px;
  gap: 10px;
  background-color: ${theme.color.gray[30]};
  color: white;
  font-size: 16px;
  font-family: ${theme.font.medium};
  white-space: pre-wrap;
  word-break: break-word;

  &::placeholder {
    color: white;
    font-family: ${theme.font.medium};
  }
`;

const SendButton = styled.img`
  width: 32px;
  height: 32px;
  cursor: pointer;
`;

const CommentInput = ({
  postId,
  initialParentCommentId = null,
  onCommentSuccess,
  files,
  setFiles,
}: {
  postId: number;
  initialParentCommentId?: number | null;
  onCommentSuccess?: () => void;
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
}) => {
  const [inputValue, setInputValue] = useState('');
  const [parentCommentId, setParentCommentId] = useState<number | null>(null);
  const [sending, setSending] = useState(false);

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

  const onClickSend = async () => {
    if (sending) return;
    if (inputValue.trim() === '') {
      toastError('댓글을 입력하세요.');
      return;
    }

    setSending(true);
    try {
      await createComment(
        postId,
        inputValue,
        parentCommentId ?? undefined,
        files,
      );
      setInputValue('');
      setFiles([]);
      if (onCommentSuccess) onCommentSuccess();
    } catch (error: any) {
      console.error(
        '댓글 작성 중 에러:',
        error.response?.data?.message || error.message,
      );
      toastError('댓글 작성에 실패했습니다.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onClickSend();
    }
  };

  const handleDeleteFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  return (
    <Container>
      {files.length > 0 && (
        <FileContainer>
          {files.map((file) => (
            <PostFile
              key={file.name}
              fileName={file.name}
              isDownload={false}
              onClick={() => handleDeleteFile(file.name)}
            />
          ))}
        </FileContainer>
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
