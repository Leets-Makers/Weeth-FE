import { MemberData } from '@/components/Admin/context/MemberContext';
import * as S from '@/styles/admin/cardinal/CardinalModal.styled';
import ButtonGroup from '@/components/Admin/ButtonGroup';
import StatusIndicator from '@/components/Admin/StatusIndicator';
import CommonModal from '@/components/Admin/Modal/CommonModal';
import useAdminActions from '@/hooks/admin/useAdminActions';
import { useState } from 'react';
import getHighestCardinal from '@/utils/admin/getHighestCardinal';
import CardinalEditModal from '@/components/Admin/Modal/CardinalEditModal';
import Button from '@/components/Button/Button';
import { useTheme } from 'styled-components';
import { units } from '@/theme/designTokens';
import typography from '@/theme/typography';

interface MemberDetailModalProps {
  data: MemberData;
  onClose: () => void;
}

const MemberDetailModal: React.FC<MemberDetailModalProps> = ({
  data,
  onClose,
}) => {
  const { handleAction } = useAdminActions();
  const [isCardinalModalOpen, setIsCardinalModalOpen] = useState(false);
  const theme = useTheme();

  const isApproved = data.status === '승인 완료';

  const roleChangeButton =
    data.role === 'ADMIN'
      ? {
          label: '사용자로 변경',
          onClick: () => handleAction('사용자로 변경', [data.id]),
        }
      : {
          label: '관리자로 변경',
          onClick: () => handleAction('관리자로 변경', [data.id]),
        };

  const buttons = [
    {
      label: '가입 승인',
      onClick: () => handleAction('가입 승인', [data.id]),
      disabled: isApproved,
    },
    roleChangeButton,
    {
      label: '비밀번호 초기화',
      onClick: () => handleAction('비밀번호 초기화', [data.id]),
    },
    {
      label: '유저 추방',
      onClick: () => handleAction('유저 추방', [data.id]),
    },
    {
      label: '기수 변경',
      onClick: () => setIsCardinalModalOpen(true),
      style: {
        backgroundColor: isCardinalModalOpen
          ? theme.semantic.button['neutral-interaction']
          : theme.semantic.button.neutral,
      },
    },
  ];

  const memberInfo = [
    { label: '직급', value: data.role },
    { label: '역할', value: data.position },
    { label: '학과', value: data.department },
    { label: '전화번호', value: data.tel },
    { label: '학번', value: data.studentId },
    { label: '이메일', value: data.email },
  ];

  const activityInfoGroup1 = [
    { label: '활동기수', value: data.cardinals },
    { label: '상태', value: data.membershipType },
    { label: '가입일', value: data.createdAt },
  ];

  const activityInfoGroup2 = [
    { label: '출석', value: data.attendanceCount },
    { label: '결석', value: data.absenceCount },
    { label: '페널티', value: data.penaltyCount },
  ];

  return (
    <>
      <CommonModal
        isOpen
        onClose={onClose}
        title="멤버 관리 상세"
        top="40%"
        height="60%"
        footer={
          <S.FooterContainer>
            <ButtonGroup buttons={buttons} />
            <Button
              onClick={onClose}
              color={theme.semantic.button.primary}
              textcolor={theme.semantic.text.inverse}
              width="55px"
              height="45px"
              borderRadius={`${units.radius.md}px`}
              $typo={typography.admin.Button1}
            >
              완료
            </Button>
          </S.FooterContainer>
        }
      >
        <S.ContentWrapper>
          <S.ModalContent>
            <S.FontStyle
              $typo={typography.admin.Caption1}
              color={theme.semantic.text.alternative}
            >
              회원정보
            </S.FontStyle>
            <S.NameStatusWrapper>
              <S.FontStyle
                $typo={typography.admin.H3}
                color={theme.semantic.text.strong}
              >
                {data.name} &nbsp;
                {getHighestCardinal(data.cardinals)}
              </S.FontStyle>
              <StatusIndicator status={data.status} />
            </S.NameStatusWrapper>
            <S.FlexWrapper>
              <S.LabelFlex>
                {memberInfo.map((info) => (
                  <S.FontStyle
                    key={info.label}
                    $typo={typography.admin.Body1}
                    color={theme.semantic.text.alternative}
                  >
                    {info.label}
                  </S.FontStyle>
                ))}
              </S.LabelFlex>
              <S.DataFlex>
                {memberInfo.map((info) => (
                  <S.FontStyle
                    key={info.label}
                    $typo={typography.admin.Body1}
                    color={
                      info.label === '페널티'
                        ? theme.semantic.state.error
                        : undefined
                    }
                  >
                    {info.value}
                  </S.FontStyle>
                ))}
              </S.DataFlex>
            </S.FlexWrapper>
          </S.ModalContent>
          <S.ActivityContent>
            <S.FontStyle
              $typo={typography.admin.Caption1}
              color={theme.semantic.text.alternative}
            >
              활동정보
            </S.FontStyle>
            <S.FlexWrapper>
              <S.LabelFlex>
                <S.ActivityInfoGroup $gap="26px">
                  {activityInfoGroup1.map((info) => (
                    <S.FontStyle
                      key={info.label}
                      $typo={typography.admin.Body1}
                      color={theme.semantic.text.alternative}
                    >
                      {info.label}
                    </S.FontStyle>
                  ))}
                </S.ActivityInfoGroup>
                <S.ActivityInfoGroup $gap="8px">
                  {activityInfoGroup2.map((info) => (
                    <S.FontStyle
                      key={info.label}
                      $typo={typography.admin.Body1}
                      color={theme.semantic.text.alternative}
                    >
                      {info.label}
                    </S.FontStyle>
                  ))}
                </S.ActivityInfoGroup>
              </S.LabelFlex>
              <S.DataFlex>
                <S.ActivityInfoGroup $gap="26px">
                  {activityInfoGroup1.map((info) => (
                    <S.FontStyle
                      key={info.label}
                      $typo={typography.admin.Body1}
                    >
                      {info.value}
                    </S.FontStyle>
                  ))}
                </S.ActivityInfoGroup>
                <S.ActivityInfoGroup $gap="8px">
                  {activityInfoGroup2.map((info) => (
                    <S.FontStyle
                      key={info.label}
                      $typo={typography.admin.Body1}
                      color={
                        info.label === '페널티'
                          ? theme.semantic.state.error
                          : undefined
                      }
                    >
                      {info.value}
                    </S.FontStyle>
                  ))}
                </S.ActivityInfoGroup>
              </S.DataFlex>
            </S.FlexWrapper>
          </S.ActivityContent>
        </S.ContentWrapper>
      </CommonModal>
      {isCardinalModalOpen && (
        <CardinalEditModal
          isOpen={isCardinalModalOpen}
          onClose={() => setIsCardinalModalOpen(false)}
          selectedUserIds={[data.id]}
          top="35%"
          left="35%"
        />
      )}
    </>
  );
};

export default MemberDetailModal;
