import api from '@/api/api';

const deleteComment = async (
  path: string,
  postId: number,
  commentId: number,
) => {
  return api.delete(`/api/v1/${path}/${postId}/comments/${commentId}`);
};

export default deleteComment;
