import { colors, units } from '@/theme/designTokens';
import typography from '@/theme/typography';
import styled from 'styled-components';
import Logo from '@/assets/images/logo/logo_full_Origin.svg?react';
import React from 'react';

const Container = styled.footer<{ $isMobile: boolean }>`
  width: 100%;
  height: 285px;
  background-color: ${colors.dark.neutral[100]};
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  max-width: ${({ $isMobile }) =>
    $isMobile ? '100%' : `${units.device.desktop}px`};

  padding: ${({ $isMobile }) =>
    $isMobile ? '0 18px 26px 18px' : '0 15px 26px 15px'};

  display: flex;
  flex-direction: column;
`;

const LeetsInfo = styled.div`
  margin-top: 26px;
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
`;

const LogoGrey = styled(Logo)`
  path,
  circle {
    fill: ${({ color }) => color ?? 'inherit'} !important;
  }
  margin-top: 67px;
`;

const Footer = React.memo(({ isMobile }: { isMobile: boolean }) => {
  return (
    <Container $isMobile={isMobile}>
      <Wrapper $isMobile={isMobile}>
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
            <LeetsLink
              href="mailto:leets.makers@gmail.com?subject=[weeth]문의사항."
              target="_blank"
            >
              문의 메일
            </LeetsLink>
          </InfoList>
          <InfoList>
            <InfoTitle>Leets</InfoTitle>
            <LeetsLink href="https://www.leets.land/" target="_blank">
              Leets Site
            </LeetsLink>
            <LeetsLink
              href="mailto:leetsland@gmail.com?subject=[Leets]문의사항."
              target="_blank"
            >
              문의 메일
            </LeetsLink>
          </InfoList>
        </LeetsInfo>
        <LogoGrey
          color={colors.semantic.text.alternative}
          width={90}
          height={40}
        />
        <CopyRight>© Weeth ALL RIGHTS RESERVED.</CopyRight>
      </Wrapper>
    </Container>
  );
});
export default Footer;
