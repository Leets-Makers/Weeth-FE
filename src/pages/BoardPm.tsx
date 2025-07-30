import BoardPageTemplate from '@/components/Board/BoardPageTemplate';

const BoardPM = () => (
  <BoardPageTemplate
    part="pm"
    headerTitle="PM"
    navigateToPost={(id) => `/board/pm/${id}`}
  />
);

export default BoardPM;
