import api from '@/api/api';
import { PenaltyItem } from '@/types/adminPenalty';

const PATH = '/api/v1/admin/penalties';

// 페널티 조회
const getPenaltyApi = async (cardinal: number) => {
  try {
    const response = await api.get(PATH, {
      params: cardinal != null ? { cardinal } : undefined,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '페널티 조회 실패');
  }
};

// 페널티 부여
const postPenaltyApi = async (payload: PenaltyItem) => {
  try {
    const res = await api.post(PATH, payload);
    return res.data;
  } catch (err: any) {
    throw new Error(err?.response?.data?.message ?? '페널티 부여 실패');
  }
};

// 페널티 삭제
const deletePenaltyApi = async (penaltyId: number) => {
  try {
    const response = await api.delete(PATH, { params: { penaltyId } });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || '페널티 삭제 실패');
  }
};

// 페널티 수정
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

export { deletePenaltyApi, patchPenaltyApi, postPenaltyApi, getPenaltyApi };
