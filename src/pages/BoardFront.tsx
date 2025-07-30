import BoardPageTemplate from '@/components/Board/BoardPageTemplate';

const BoardFront = () => (
  <BoardPageTemplate
    part="front"
    headerTitle="프론트엔드"
    navigateToPost={(id) => `/board/front/${id}`}
  />
);

export default BoardFront;
