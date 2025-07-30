import BoardPageTemplate from '@/components/Board/BoardPageTemplate';

const BoardBack = () => (
  <BoardPageTemplate
    part="back"
    headerTitle="백엔드"
    navigateToPost={(id) => `/board/back/${id}`}
  />
);

export default BoardBack;
