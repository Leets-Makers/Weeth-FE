import api from '@/api/api';

export const deleteUser = async () => {
  return api.delete('/api/v1/users');
};

export default deleteUser;
