import parse from 'html-react-parser';
import ReplyArrowImage from '@/assets/images/ic_reply.svg';
import MenuImage from '@/assets/images/ic_comment_delete.svg';
import * as S from '@/styles/board/Comment.styled';
import deleteComment from '@/api/deleteComment';
import formatDateTime from '@/hooks/formatDateTime';
import useGetUserName from '@/hooks/useGetUserName';
import setPositionIcon from '@/hooks/setPositionIcon';
import { useCallback, useState } from 'react';
import SelectModal from '@/components/Modal/SelectModal';
import convertLinksInText from '@/hooks/convertLinksInText';
import { originFile } from '@/pages/board/part/PartEdit';
import PostFile from '@/components/Board/PostFile';
import { toastError, toastSuccess } from '@/components/common/ToastMessage';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <S.ReplyCommentContainer>
      <S.ReplyArrow src={ReplyArrowImage} alt="답댓글 화살표" />
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
              <img src={MenuImage} alt="메뉴 버튼" />
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
      {isModalOpen && (
        <SelectModal
          title="댓글 삭제"
          content="댓글을 정말 삭제하시겠습니까?"
          onClose={handleCloseModal}
          onDelete={handleDeleteComment}
        />
      )}
    </S.ReplyCommentContainer>
  );
};

export default ReplyComment;
