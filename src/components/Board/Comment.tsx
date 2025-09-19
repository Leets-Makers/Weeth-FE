import parse from 'html-react-parser';
import ReplyImage from '@/assets/images/ic_reply_comment.svg';
import MenuImage from '@/assets/images/ic_comment_delete.svg';
import * as S from '@/styles/board/Comment.styled';
import deleteComment from '@/api/deleteComment';
import { useCallback, useState } from 'react';
import formatDateTime from '@/hooks/formatDateTime';
import useGetUserName from '@/hooks/useGetUserName';
import setPositionIcon from '@/hooks/setPositionIcon';
import SelectModal from '@/components/Modal/SelectModal';
import convertLinksInText from '@/hooks/convertLinksInText';
import { originFile } from '@/pages/board/part/PartEdit';
import PostFile from '@/components/Board/PostFile';
import { toastError, toastSuccess } from '@/components/common/ToastMessage';

interface CommentProps {
  name: string;
  content: string;
  time: string;
  postId: number;
  commentId: number;
  path: string;
  position: string;
  role: string;
  fileUrls: originFile[];
  onDelete: () => void;
  onReply: (commentId: number) => void;
  selectedComment: Record<number, boolean>;
}

const Comment = ({
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
  onReply,
  selectedComment,
}: CommentProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClickReply = () => {
    onReply(commentId);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onClickMenu = () => {
    setIsModalOpen(true);
  };

  const handleDeleteComment = async () => {
    try {
      await deleteComment(path, postId, commentId);
      onDelete();
      handleCloseModal();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to delete comment:', error);
    }
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

  const formattedTime = formatDateTime(time);

  const isMyComment = name === useGetUserName();

  return (
    <S.CommentContainer $isSelect={selectedComment?.[commentId] || false}>
      <S.CommentContentContainer>
        <S.NameText>
          <S.PositionIcon
            src={setPositionIcon(role, position)}
            alt="포지션 아이콘"
          />
          {name}
        </S.NameText>
        <S.ContentContainer>
          <S.ContentText>{parse(convertLinksInText(content))}</S.ContentText>
          {fileUrls.length > 0 && (
            <S.ContentText>
              {fileUrls.map((file) => (
                <PostFile
                  key={file.fileId}
                  fileName={file.fileName}
                  isDownload
                  onClick={() => onClickDownload(file.fileUrl, file.fileName)}
                  isComment
                />
              ))}
            </S.ContentText>
          )}
        </S.ContentContainer>
        <S.DateText>{formattedTime}</S.DateText>
      </S.CommentContentContainer>
      <S.ButtonContainer>
        <S.ImageButton onClick={onClickReply}>
          <img src={ReplyImage} alt="답댓글 버튼" />
        </S.ImageButton>
        {isMyComment && (
          <S.ImageButton onClick={onClickMenu}>
            <img src={MenuImage} alt="메뉴 버튼" />
          </S.ImageButton>
        )}
      </S.ButtonContainer>
      {isModalOpen && (
        <SelectModal
          title="댓글 삭제"
          content="댓글을 정말 삭제하시겠습니까?"
          onClose={handleCloseModal}
          onDelete={handleDeleteComment}
        />
      )}
    </S.CommentContainer>
  );
};

export default Comment;
