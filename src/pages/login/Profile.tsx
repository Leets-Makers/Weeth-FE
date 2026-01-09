/* eslint-disable no-console */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import DropdownMenu from '@/components/Button/DropdownMenu';
import Header from '@/components/Header/Header';
import PositionSector from '@/components/Signup/PositionSector';
import useCustomBack from '@/hooks/useCustomBack';
import InfoInput from '@/components/MyPage/InfoInput';
import Line from '@/components/common/Line';

import { colors } from '@/theme/designTokens';
import theme from '@/styles/theme';

import { useOpenSelectModal } from '@/stores/selectModalStore';
import { toastError } from '@/components/common/ToastMessage';

const ProfileContainer = styled.div`
  width: 370px;
  max-width: 370px;
  overflow-x: hidden;
  margin-bottom: 70px;
`;

const ProfileTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  line-height: 40px;
  margin-left: 7%;
  margin-top: 25px;
  margin-bottom: 15px;
`;

const ProfileSubTitle = styled.div`
  font-size: 14px;
  line-height: 20px;
  margin-left: 7%;
  color: ${colors.semantic.text.alternative};
`;

const ProfileButtonContainer = styled.div`
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ProfileButton = styled.button<{ disabled: boolean }>`
  width: 315px;
  height: 50px;
  border-radius: 10px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  color: ${colors.semantic.text.inverse};
  background-color: ${({ disabled }) =>
    disabled ? colors.semantic.button.disabled : colors.semantic.brand.primary};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Content = styled.div``;

const Text = styled.div`
  font-size: 20px;
  font-family: ${theme.font.semiBold};
  margin: 24px 0 10px 25px;
  color: ${colors.semantic.text.alternative};
`;

const InputContainer = styled.div`
  margin-top: 30px;
`;

const Title = ({ children }: { children: React.ReactNode }) => (
  <Content>
    <Text>{children}</Text>
    <Line />
  </Content>
);

interface MemberInfo {
  name?: string;
  studentId?: string;
  department?: string;
  tel?: string;
  cardinal?: string;
  position?: string;
  email?: string;
}

type MemberInfoKeys = keyof MemberInfo;

const roleMapping: Record<string, string> = {
  FE: 'FE',
  BE: 'BE',
  DE: 'D',
  PM: 'PM',
};

const Profile: React.FC = () => {
  const registerMethod = localStorage.getItem('register');
  useCustomBack(registerMethod === 'kakao' ? '/accountcheck' : '/');

  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;

  const openSelectModal = useOpenSelectModal();

  const [memberInfo, setMemberInfo] = useState<MemberInfo>({
    name: '',
    studentId: '',
    department: '',
    tel: '',
    cardinal: '',
    position: '',
    email: '',
  });

  const [isNextEnabled, setIsNextEnabled] = useState(false);

  /* ================= 유틸 ================= */

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.(com|net|org|edu|ac\.kr|co\.kr|go\.kr|or\.kr|kakao\.com)$/.test(
      email,
    );

  const validatePhone = (tel: string) => /^\d{10,11}$/.test(tel);

  const handleChange = (key: MemberInfoKeys, value: string | number) => {
    const next = { ...memberInfo, [key]: String(value) };
    setMemberInfo(next);

    const allFilled = [
      'name',
      'studentId',
      'department',
      'tel',
      'cardinal',
      'position',
      'email',
    ].every(
      (k) =>
        typeof next[k as MemberInfoKeys] === 'string' &&
        next[k as MemberInfoKeys]?.trim() !== '',
    );

    setIsNextEnabled(allFilled);
  };
  const openAlert = (content: string) => {
    openSelectModal({
      title: '알림',
      content,
      type: 'positive',
      visibility: false,
      cancelText: '닫기',
    });
  };

  const handleNextClick = async () => {
    if (!/^\d{9}$/.test(memberInfo.studentId || '')) {
      openAlert('올바른 학번을 입력해 주세요.');
      return;
    }

    if (!validatePhone(memberInfo.tel || '')) {
      openAlert('올바른 휴대폰 번호를 입력해 주세요.');
      return;
    }

    if (memberInfo.email && !validateEmail(memberInfo.email)) {
      openAlert('올바른 이메일을 입력해 주세요.');
      return;
    }

    const mappedData = {
      kakaoId: Number(localStorage.getItem('kakaoId')),
      appleAuthCode: localStorage.getItem('appleAuthCode'),
      ...memberInfo,
      cardinal: Number(memberInfo.cardinal),
      position: roleMapping[memberInfo.position || ''] || memberInfo.position,
    };

    const registerApi = registerMethod === 'apple' ? 'apple' : 'kakao';

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/users/${registerApi}/register`,
        mappedData,
      );

      if (response.data.code === 200) {
        openSelectModal({
          title: '가입 완료',
          content:
            '가입 신청이 완료되었습니다.\n운영진 승인 후 이용 가능합니다.',
          type: 'positive',
          visibility: false,
          cancelText: '확인',
          onDelete: () => {
            navigate('/register-success', { replace: true });
          },
        });
      } else {
        toastError(response.data.message);
      }
    } catch (error) {
      toastError('회원가입 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  return (
    <ProfileContainer>
      <Header isAccessible isComplete={isNextEnabled} RightButtonType="none" />

      <ProfileTitle>회원 정보 입력하기</ProfileTitle>
      <ProfileSubTitle>신규 회원님의 정보를 입력해주세요.</ProfileSubTitle>

      <InputContainer>
        <InfoWrapper>
          <Title>개인정보</Title>
          <InfoInput
            isProfile
            text="이름"
            origValue={memberInfo.name || ''}
            editValue={(v) => handleChange('name', v)}
          />
          <InfoInput
            isProfile
            text="핸드폰"
            origValue={memberInfo.tel || ''}
            editValue={(v) => handleChange('tel', v)}
          />
          <InfoInput
            isProfile
            text="메일"
            origValue={memberInfo.email || ''}
            editValue={(v) => handleChange('email', v)}
          />

          <Title>활동정보</Title>
          <DropdownMenu
            text="학과"
            isProfile
            origValue={memberInfo.department || ''}
            editValue={(v) => handleChange('department', v)}
          />
          <InfoInput
            isProfile
            text="학번"
            origValue={memberInfo.studentId || ''}
            editValue={(v) => handleChange('studentId', v)}
          />
          <DropdownMenu
            isCardinal
            text="기수"
            isProfile
            origValue={memberInfo.cardinal || ''}
            editValue={(v) => handleChange('cardinal', v)}
          />
          <PositionSector
            labelName="역할"
            value={memberInfo.position || ''}
            onChange={(v) => handleChange('position', v)}
          />
        </InfoWrapper>
      </InputContainer>

      <ProfileButtonContainer>
        <ProfileButton onClick={handleNextClick} disabled={!isNextEnabled}>
          작성 완료
        </ProfileButton>
      </ProfileButtonContainer>
    </ProfileContainer>
  );
};

export default Profile;
