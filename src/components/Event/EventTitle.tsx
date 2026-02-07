/* eslint-disable no-console */
import { deleteEvent } from '@/api/EventAdminAPI';
import type { EventDetailData } from '@/types/event';
import * as S from '@/styles/calendar/EventDetailTitle.styled';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { EVENT_QUERY_KEYS } from '@/constants/queryKeys';
import Tag from '@/components/Event/Tag';
import { useOpenSelectModal } from '@/stores/selectModalStore';
import { useCloseMenuModal, useOpenMenuModal } from '@/stores/menuModalStore';
import { formatDateTime } from '@/hooks/formatDate';
import { toastSuccess, toastError } from '../common/ToastMessage';
import Breadcrumb from '../common/Breadcrumb';

const EventTitle = ({
  data,
  isAdmin,
}: {
  data: EventDetailData;
  isAdmin: boolean;
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id, type } = useParams();
  const url = new URL(window.location.href);
  const pathArray = url.pathname.split('/');
  const path = pathArray[1];

  const openSelectModal = useOpenSelectModal();

  const openMenuModal = useOpenMenuModal();
  const closeMenuModal = useCloseMenuModal();

  const handleDelete = async () => {
    try {
      await deleteEvent(data.id, path);
      await queryClient.invalidateQueries({ queryKey: ['schedule'] });
      if (type && id) {
        await queryClient.invalidateQueries({
          queryKey: EVENT_QUERY_KEYS.detail(type, id),
          refetchType: 'none',
        });
      }
      toastSuccess('삭제가 완료되었습니다.');
      navigate('/calendar');
    } catch (err) {
      toastError('삭제 중 오류가 발생했습니다.');
      console.error(err);
    }
  };

  const handleMenu = () => {
    openMenuModal({
      topPadding: true,
      children: (
        <>
          <S.TextButton
            onClick={() => {
              closeMenuModal();
              navigate(`/${type}/${id}/edit`);
            }}
          >
            수정
          </S.TextButton>
          <S.TextButton
            $isLast
            onClick={() => {
              closeMenuModal();
              openSelectModal({
                title: '일정 삭제',
                content: '정말 삭제하시겠습니까?',
                onDelete: handleDelete,
              });
            }}
          >
            삭제
          </S.TextButton>
        </>
      ),
    });
  };

  return (
    <S.EventTitleWrapper>
      <Breadcrumb
        items={[
          { label: '캘린더', path: '/calendar' },
          { label: '일정 상세', path: `/${type}/${id}` },
        ]}
        hasTitle
      />

      <S.SpaceBetween>
        <S.Title>{data.title}</S.Title>
        {isAdmin && <S.KebabIcon onClick={() => handleMenu()} />}
      </S.SpaceBetween>

      <S.WriteInfo>
        {type === 'meetings' && <Tag />}
        <S.Writer>{data.name}</S.Writer>
        <S.Writer>{formatDateTime(data.createdAt)}</S.Writer>
      </S.WriteInfo>
    </S.EventTitleWrapper>
  );
};

export default EventTitle;
