import BoardPageTemplate from '@/components/Board/BoardPageTemplate';

const BoardEntire = () => (
  <BoardPageTemplate
    part="entire"
    headerTitle="전체"
    navigateToPost={(id) => `/board/entire/${id}`}
  />
);

export default BoardEntire;
