import { colors } from '@/theme/designTokens';
import typography from '@/theme/typography';
import styled from 'styled-components';
import Logo from '@/assets/images/logo/logo_full_Origin.svg?react';

const Container = styled.footer`
  width: 100%;
  height: 285px;
  display: flex;
  flex-direction: column;
  background-color: ${colors.dark.neutral[100]};
`;

const LeetsInfo = styled.div`
  gap: 16px;
  display: flex;
  flex-direction: row;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const InfoTitle = styled.div`
  ${typography.Body2};
  color: ${colors.semantic.text.normal};
`;

const LeetsLink = styled.a`
  ${typography.Body2};
  color: ${colors.semantic.text.alternative};
  text-decoration: none;
`;

const CopyRight = styled.div`
  ${typography.Caption1};
  color: ${colors.semantic.text.alternative};
  margin-bottom: 26px;
`;

const LogoGrey = styled(Logo)`
  path,
  circle {
    fill: ${({ color }) => color ?? 'inherit'} !important;
  }
  margin-top: 67px;
`;

const Footer = () => {
  return (
    <Container>
      <LeetsInfo>
        <InfoList>
          <InfoTitle>Leets Makers</InfoTitle>
          <LeetsLink href="/admin">Weeth Admin</LeetsLink>
          <LeetsLink
            href="https://leets-makers.framer.website/"
            target="_blank"
          >
            Leets Makers Site
          </LeetsLink>
          <LeetsLink>문의 메일</LeetsLink>
        </InfoList>
        <InfoList>
          <InfoTitle>Leets</InfoTitle>
          <LeetsLink href="https://www.leets.land/">Leets Site</LeetsLink>
        </InfoList>
      </LeetsInfo>
      <LogoGrey
        color={colors.semantic.text.alternative}
        width={90}
        height={40}
      />
      <CopyRight>© Weeth ALL RIGHTS RESERVED.</CopyRight>
    </Container>
  );
};
export default Footer;
