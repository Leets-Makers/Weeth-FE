import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DropdownMenu from '@/components/Button/DropdownMenu';
import InfoInput from '@/components/MyPage/InfoInput';
import useCustomBack from '@/hooks/useCustomBack';
import useGetUserInfo from '@/api/useGetUserInfo';
import usePatchUserInfo from '@/api/usePatchMyInfo';
import { toastInfo, toastSuccess } from '@/components/common/ToastMessage';

import Loading from '@/components/common/Loading';
import useSmartLoading from '@/hooks/useSmartLoading';
import EditGNB from '@/components/Navigation/EditGNB';
import {
  useCloseSelectModal,
  useOpenSelectModal,
} from '@/stores/selectModalStore';
import { ResponsiveContainer } from '@/styles';
import typography from '@/theme/typography';
import { colors } from '@/theme/designTokens';

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.div`
  ${typography.Sub1};
  color: ${colors.semantic.text.alternative};
  margin: 24px 0 10px 25px;
`;

const Error = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0px;
  ${typography.Sub1};
`;

const MyPageEdit = () => {
  useCustomBack('/mypage');

  const { userInfo, loading } = useGetUserInfo();
  const [userData, setUserData] = useState<{ key: string; value: any }[]>([]);

  const navi = useNavigate();
  const openSelectModal = useOpenSelectModal();
  const closeSelectModal = useCloseSelectModal();

  const positionMap: Record<string, string> = {
    FE: '프론트엔드',
    BE: '백엔드',
    D: '디자인',
    PM: 'PM',
  };

  const position = userInfo?.position ? positionMap[userInfo.position] : '';

  useEffect(() => {
    if (userInfo) {
      setUserData([
        { key: 'name', value: userInfo.name },
        { key: 'studentId', value: userInfo.studentId },
        { key: 'department', value: userInfo.department },
        { key: 'tel', value: userInfo.tel },
        { key: 'cardinals', value: userInfo.cardinals },
        { key: 'position', value: userInfo.position },
        { key: 'email', value: userInfo.email },
      ]);
    }
  }, [userInfo]);

  const editValue = (key: string, value: string | number | number[]) => {
    const newuserData = userData.map((item) =>
      item.key === key ? { ...item, value } : item,
    );
    setUserData(newuserData);
  };

  const { updateInfo } = usePatchUserInfo();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateUserData = (data: any[]) => {
    if (data.some((item) => !item.value)) {
      toastInfo('모든 항목을 입력해 주세요.');
      return false;
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const item of userData) {
      if (item.key === 'email' && !emailRegex.test(item.value)) {
        toastInfo('올바른 이메일 형식이 아닙니다.');
        return false;
      }
      if (item.key === 'tel' && item.value.length < 11) {
        toastInfo('올바른 전화번호 형식이 아닙니다');
        return false;
      }
      if (item.key === 'studentId' && item.value.length < 9) {
        toastInfo('올바른 학번 형식이 아닙니다');
        return false;
      }
    }

    return true;
  };

  const onSave = async () => {
    try {
      const data = userData.reduce((acc: any, item: any) => {
        acc[item.key] = item.value;
        return acc;
      }, {});

      const response = await updateInfo(data);

      if (response?.data?.code === 400) {
        // TODO: 에러 코드에 따른 세분화
        toastInfo(response?.data?.message);
        return;
      }

      if (response?.data?.code === 200) {
        toastSuccess('저장이 완료되었습니다.');
        navi('/mypage');
      } else {
        toastInfo('저장 중 오류가 발생했습니다.');
      }
    } catch (err: any) {
      // TODO: 에러 코드에 따른 세분화
      toastInfo(err);
    } finally {
      closeSelectModal();
    }
  };

  const { loading: smartLoading } = useSmartLoading(
    new Promise<void>((resolve) => {
      if (!loading) resolve();
    }),
  );

  if (smartLoading) {
    return <Loading />;
  }

  return (
    <ResponsiveContainer>
      <EditGNB
        onClickButton={() => {
          if (validateUserData(userData)) {
            openSelectModal({
              title: '정보 수정',
              content: '변경사항을 저장하시겠습니까?',
              onDelete: onSave,
              buttonContent: '저장',
            });
          }
        }}
      />

      {userInfo ? (
        <InfoWrapper>
          <Title>개인정보</Title>
          <InfoInput
            text="이름"
            origValue={userInfo.name}
            editValue={(value) => editValue('name', value)}
          />
          <InfoInput
            text="핸드폰"
            origValue={userInfo.tel}
            editValue={(value) => editValue('tel', value)}
          />
          <InfoInput
            text="메일"
            origValue={userInfo.email}
            editValue={(value) => editValue('email', value)}
          />

          <Title>활동정보</Title>
          <DropdownMenu
            text="학과"
            origValue={userInfo.department}
            editValue={(value) => editValue('department', value)}
          />
          <InfoInput
            text="학번"
            origValue={userInfo.studentId}
            editValue={(value) => editValue('studentId', value)}
          />
          <InfoInput text="기수" origValue={userInfo.cardinals} />
          <InfoInput text="역할" origValue={position} />
        </InfoWrapper>
      ) : (
        <Error>데이터를 불러오는 중 문제가 발생했습니다.</Error>
      )}
    </ResponsiveContainer>
  );
};

export default MyPageEdit;
