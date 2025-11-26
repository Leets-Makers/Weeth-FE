import { colors } from '@/theme/designTokens';
import typography from '@/theme/typography';
import styled from 'styled-components';

const Container = styled.footer`
  width: 100%;
  height: 285px;
  display: flex;
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

const Footer = () => {
  return (
    <Container>
      <LeetsInfo>
        <InfoList>
          <InfoTitle>Leets Makers</InfoTitle>
          <LeetsLink href="/home/admin">Weeth Admin</LeetsLink>
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
    </Container>
  );
};
export default Footer;
