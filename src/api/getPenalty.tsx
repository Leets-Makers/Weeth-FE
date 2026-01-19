import api from '@/api/api';

export interface Penalty {
  penaltyId?: number;
  penaltyType: 'PENALTY' | 'WARNING';
  penaltyDescription: string;
  time: string;
}

export interface UserPenaltyData {
  userId: number;
  penaltyCount: number;
  warningCount: number;
  name: string;
  Penalties: Penalty[];
}

const getPenalty = async (): Promise<UserPenaltyData> => {
  const response = await api.get(`/api/v1/penalties`);
  return response.data.data;
};

export default getPenalty;
