import api from '@/api/api';

const BASE_URL = import.meta.env.VITE_API_URL;

const deletePost = async (postId: number, path: string) => {
  const url =
    path === 'notices'
      ? `${BASE_URL}/api/v1/admin/${path}/${postId}`
      : `${BASE_URL}/api/v1/board/${postId}`;

  return api.delete(url);
};

export default deletePost;
