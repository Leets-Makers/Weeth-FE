import api from '@/api/api';

const PATH = '/api/v1/admin/penalties';

// 페널티 조회
const getPenaltyApi = async () => {
  try {
    const response = await api.get(PATH);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '페널티 조회 실패');
  }
};

// 페널티 부여
const postPenaltyApi = async (userId: number, penaltyDescription: string) => {
  try {
    const response = await api.post(PATH, { userId, penaltyDescription });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '페널티 부여 실패');
  }
};
export { getPenaltyApi, postPenaltyApi };

// 패널티 삭제
const deletePenaltyApi = async (penaltyId: number) => {
  try {
    const response = await api.delete(PATH, { params: { penaltyId } });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '페널티 삭제 실패');
  }
};

// 패널티 수정
const patchPenaltyApi = async (
  penaltyId: number,
  penaltyDescription: string,
) => {
  try {
    const response = await api.patch(PATH, { penaltyId, penaltyDescription });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '페널티 수정 실패');
  }
};
export { deletePenaltyApi, patchPenaltyApi };
