import BoardPageTemplate from '@/components/Board/BoardPageTemplate';

const BoardDesign = () => (
  <BoardPageTemplate
    part="design"
    headerTitle="디자인"
    navigateToPost={(id) => `/board/design/${id}`}
  />
);

export default BoardDesign;
