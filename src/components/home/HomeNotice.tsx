/* eslint-disable react/no-unstable-nested-components */

import { useNavigate } from 'react-router-dom';
import * as S from '@/styles/home/HomeNotice.styled';

const MAX_CONTENT_LENGTH = 30;

const HomeNotice = ({
  title,
  content,
  id,
}: {
  title: string;
  content: string;
  id: number;
}) => {
  const navi = useNavigate();

  const formatContent = (text: string) => {
    return text.length > MAX_CONTENT_LENGTH
      ? `${text.substring(0, MAX_CONTENT_LENGTH)}...`
      : text;
  };

  const handleNotice = () => {
    if (id) {
      navi(`/board/notices/${id}`);
    }
  };

  const NoticeTextBlock = () => (
    <>
      <S.BoldText>{title}</S.BoldText>
      <S.NormalText>{formatContent(content)}</S.NormalText>
      <S.Spacer />
    </>
  );

  const repeatedKeys = ['first', 'second'];

  return (
    <S.AnimationLayout onClick={handleNotice}>
      <S.FlowBox>
        <S.FlowText>
          <S.Label>📢 공지</S.Label>
          <S.TextWrapper>
            <S.TextTrack>
              {repeatedKeys.map((key) => (
                <span key={`notice-${id}-${key}`}>
                  <NoticeTextBlock />
                </span>
              ))}
            </S.TextTrack>
          </S.TextWrapper>
        </S.FlowText>
      </S.FlowBox>
    </S.AnimationLayout>
  );
};

export default HomeNotice;
