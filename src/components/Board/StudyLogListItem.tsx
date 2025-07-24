import Comment from '@/assets/images/ic_comment_count.svg';
import FileIcon from '@/assets/images/ic_file.svg?react';
import NewIcon from '@/assets/images/ic_new_post.svg?react';
import setPositionIcon from '@/hooks/setPositionIcon';
import StudyTag from '@/components/Board/StudyTag';
import WeekTag from '@/components/Board/WeekTag';
import * as S from '@/styles/board/StudyLogListItem.styled';

type ItemProps = {
  name: string;
  time: string;
  title: string;
  content: string;
  onClick: () => void;
  totalComments: number;
  hasFile: boolean;
  position: string;
  role: string;
};

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const StudyLogListItem = ({
  name,
  time,
  title,
  content,
  onClick,
  totalComments,
  hasFile,
  position,
  role,
}: ItemProps) => {
  return (
    <S.Container onClick={onClick} style={{ cursor: 'pointer' }}>
      <S.PostTopSection>
        <S.PostContentContainer>
          <S.TitleContainer>
            <S.TitleText>{title}</S.TitleText>
            <NewIcon />
          </S.TitleContainer>
          <S.ContentText>{truncateText(content, 78)}</S.ContentText>
        </S.PostContentContainer>
        <S.StudyTagContainer>
          <StudyTag />
          <WeekTag />
        </S.StudyTagContainer>
      </S.PostTopSection>

      <S.BottomInfoContainer>
        <S.InfoContainer>
          <S.PositionIcon
            src={setPositionIcon(role, position)}
            alt="포지션 아이콘"
          />
          <S.NameText>{name}</S.NameText>
          <S.Divider />
          <S.NameText>{time}</S.NameText>
          {hasFile && (
            <>
              <S.Divider />
              <FileIcon />
            </>
          )}
        </S.InfoContainer>
        <S.CommentContainer>
          <S.ImgContainer src={Comment} alt="댓글 아이콘" />
          <S.CommentsText>{totalComments}</S.CommentsText>
        </S.CommentContainer>
      </S.BottomInfoContainer>
    </S.Container>
  );
};

export default StudyLogListItem;
