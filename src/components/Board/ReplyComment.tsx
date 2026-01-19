import parse from 'html-react-parser';
import ReplyArrowImage from '@/assets/images/ic_reply.svg?react';
import MenuImage from '@/assets/images/ic_comment_delete.svg?react';
import * as S from '@/styles/board/Comment.styled';
import deleteComment from '@/api/deleteComment';
import formatDateTime from '@/hooks/formatDateTime';
import useGetUserName from '@/hooks/useGetNameAndRole';
import setPositionIcon from '@/hooks/setPositionIcon';
import { useCallback } from 'react';
import convertLinksInText from '@/hooks/convertLinksInText';
import { originFile } from '@/pages/board/part/PartEdit';
import PostFile from '@/components/Board/PostFile';
import { toastError, toastSuccess } from '@/components/common/ToastMessage';
import {
  useCloseSelectModal,
  useOpenSelectModal,
} from '@/stores/selectModalStore';

interface ReplyCommentProps {
  name: string;
  content: string;
  time: string;
  commentId: number;
  postId: number;
  path: string;
  position: string;
  role: string;
  onDelete: () => void;
  fileUrls: originFile[];
}

const ReplyComment = ({
  name,
  content,
  time,
  postId,
  commentId,
  path,
  position,
  role,
  fileUrls,
  onDelete,
}: ReplyCommentProps) => {
  const formattedTime = formatDateTime(time);
  const isMyComment = name === useGetUserName();

  const openSelectModal = useOpenSelectModal();
  const closeSelectModal = useCloseSelectModal();

  const handleDeleteComment = async () => {
    try {
      await deleteComment(path, postId, commentId);
      onDelete();
      closeSelectModal();
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  const onClickMenu = () => {
    openSelectModal({
      title: '댓글 삭제',
      content: '댓글을 정말 삭제하시겠습니까?',
      onDelete: handleDeleteComment,
    });
  };

  const onClickDownload = useCallback((fileUrl: string, fileName: string) => {
    fetch(fileUrl, { method: 'GET' })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
          a.remove();
        }, 1000);
        toastSuccess('저장되었습니다');
      })
      .catch((err) => {
        toastError('저장에 실패했습니다');
        console.error('err', err);
      });
  }, []);

  return (
    <S.ReplyCommentContainer>
      <ReplyArrowImage />
      <S.ReplyContentContainer>
        <S.ReplyHeaderContainer>
          <S.NameText>
            <S.PositionIcon
              src={setPositionIcon(role, position)}
              alt="포지션 아이콘"
            />
            {name}
          </S.NameText>
          {isMyComment && (
            <S.ReplyImageButton onClick={onClickMenu}>
              <MenuImage />
            </S.ReplyImageButton>
          )}
        </S.ReplyHeaderContainer>

        <S.ContentContainer>
          <S.ContentText>{parse(convertLinksInText(content))}</S.ContentText>
          {fileUrls.length > 0 && (
            <S.FileListContainer>
              {fileUrls.map((file) => (
                <PostFile
                  key={file.fileId}
                  fileName={file.fileName}
                  isDownload
                  onClick={() => onClickDownload(file.fileUrl, file.fileName)}
                  isComment
                />
              ))}
            </S.FileListContainer>
          )}
        </S.ContentContainer>
        <S.DateText>{formattedTime}</S.DateText>
      </S.ReplyContentContainer>
    </S.ReplyCommentContainer>
  );
};

export default ReplyComment;
