/* eslint-disable no-console */
import { deleteEvent } from '@/api/EventAdminAPI';
import { EventDetailData } from '@/pages/EventDetail';
import * as S from '@/styles/calendar/EventDetailTitle.styled';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Tag from '@/components/Event/Tag';
import MenuModal from '@/components/common/MenuModal';
import SelectModal from '@/components/Modal/SelectModal';
import formatDateTime from '@/hooks/formatDateTime';
import { toastSuccess, toastError } from '../common/ToastMessage';
import Breadcrumb from '../common/Breadcrumb';

const EventTitle = ({
  data,
  isAdmin,
}: {
  data: EventDetailData;
  isAdmin: boolean;
}) => {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const navigate = useNavigate();
  console.log(data);
  const { id, type } = useParams();
  const url = new URL(window.location.href);
  const pathArray = url.pathname.split('/');
  const path = pathArray[1];

  const handleDelete = async () => {
    try {
      await deleteEvent(data.id, path);
      toastSuccess('삭제가 완료되었습니다.');
      navigate('/calendar');
    } catch (err) {
      toastError('삭제 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setIsSelectModalOpen(false);
    }
  };

  return (
    <S.EventTitleWrapper>
      <Breadcrumb
        items={[
          { label: '동아리 일정', path: '/calendar' },
          { label: '일정 상세', path: `/${type}/${id}` },
        ]}
        hasTitle
      />

      <S.SpaceBetween>
        <S.Title>{data.title}</S.Title>
        {isAdmin && <S.KebabIcon onClick={() => setIsMenuModalOpen(true)} />}
      </S.SpaceBetween>

      <S.WriteInfo>
        {type === 'meetings' && <Tag />}
        <S.Writer>{data.name}</S.Writer>
        <S.Writer>{formatDateTime(data.createdAt)}</S.Writer>
      </S.WriteInfo>

      {isMenuModalOpen && (
        <MenuModal mobileOnly onClose={() => setIsMenuModalOpen(false)}>
          <S.TextButton onClick={() => navigate(`/${type}/${id}/edit`)}>
            수정
          </S.TextButton>
          <S.TextButton
            $isLast
            onClick={() => {
              setIsMenuModalOpen(false);
              setIsSelectModalOpen(true);
            }}
          >
            삭제
          </S.TextButton>
        </MenuModal>
      )}

      {isSelectModalOpen && (
        <SelectModal
          title="일정 삭제"
          content="정말 삭제하시겠습니까?"
          onClose={() => setIsSelectModalOpen(false)}
          onDelete={handleDelete}
        />
      )}
    </S.EventTitleWrapper>
  );
};

export default EventTitle;
