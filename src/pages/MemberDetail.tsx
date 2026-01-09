import useGetMemberDetail from '@/api/useGetMemberDetail';
import FE from '@/assets/images/ic_char_FE.svg';
import BE from '@/assets/images/ic_char_BE.svg';
import D from '@/assets/images/ic_char_DE.svg';
import PM from '@/assets/images/ic_char_PM.svg';
import Master from '@/assets/images/ic_Master.svg';
import clipFE from '@/assets/images/ic_FE_clip.svg';
import clipBE from '@/assets/images/ic_BE_clip.svg';
import clipDE from '@/assets/images/ic_DE_clip.svg';
import clipPM from '@/assets/images/ic_PM_clip.svg';

import CardinalTag from '@/components/common/CardinalTag';
import Loading from '@/components/common/Loading';
import { useMemo } from 'react';

import * as S from '@/styles/member/MemberDetail.styled';
import { colors } from '@/theme/designTokens';
import Breadcrumb from '@/components/common/Breadcrumb';

const MemberDetail = () => {
  const { memberDetail, error, loading } = useGetMemberDetail();

  const positionMap = useMemo(
    () => ({
      FE: {
        char: FE,
        clip: clipFE,
        name: '프론트엔드 파트',
        color: colors.semantic.state.error,
      },
      BE: {
        char: BE,
        clip: clipBE,
        name: '백엔드 파트',
        color: colors.semantic.state.success,
      },
      D: {
        char: D,
        clip: clipDE,
        name: '디자인 파트',
        color: colors.semantic.brand.pink,
      },
      PM: {
        char: PM,
        clip: clipPM,
        name: 'PM 파트',
        color: colors.semantic.brand.purple,
      },
    }),
    [],
  );

  if (loading) return <Loading />;
  if (error)
    return <S.ErrorMessage>멤버 정보를 불러오지 못했습니다.</S.ErrorMessage>;
  if (!memberDetail)
    return <S.ErrorMessage>멤버 정보가 존재하지 않습니다.</S.ErrorMessage>;

  const positionData =
    positionMap[memberDetail.position as keyof typeof positionMap];

  return (
    <>
      <Breadcrumb
        items={[
          { label: '멤버', path: '/member' },
          { label: '멤버 상세', path: `/member/${memberDetail.id}` },
        ]}
      />
      <S.Wrapper>
        {positionData && (
          <>
            <S.PositionCharacter
              src={positionData.char}
              alt={memberDetail.position}
            />
            <S.ClipContainer>
              <S.Clip src={positionData.clip} alt="clip" />
            </S.ClipContainer>
          </>
        )}

        <S.ContentTop>
          <S.Title>
            <span>{memberDetail.name}</span>
            {memberDetail.role === 'ADMIN' && (
              <img src={Master} alt="관리자 아이콘" />
            )}
          </S.Title>
          <S.CardinalList>
            {memberDetail.cardinals?.map((c) => (
              <CardinalTag key={c} type="member" cardinal={c} />
            ))}
          </S.CardinalList>
        </S.ContentTop>

        <S.ContentBottom>
          <S.InfoSection>
            {positionData && (
              <S.Position color={positionData.color}>
                {positionData.name}
              </S.Position>
            )}
            <S.Department>
              <div>{memberDetail.department}</div>
              <S.Gray>|</S.Gray>
              <S.Gray>{memberDetail.studentId}</S.Gray>
            </S.Department>
            <div>{memberDetail.email}</div>
          </S.InfoSection>
        </S.ContentBottom>
      </S.Wrapper>
    </>
  );
};

export default MemberDetail;
