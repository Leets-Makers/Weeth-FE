import api from '@/api/api';

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  studentId: string;
  tel: string;
  department: string;
  cardinals: number[];
  position: 'D' | 'FE' | 'BE' | string;
  role: 'USER' | 'ADMIN' | string;
}

export const getUserInfo = async (): Promise<UserInfo> => {
  const response = await api.get('/api/v1/users');
  return response.data.data;
};
