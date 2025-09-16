export type ApiPenaltyType = 'PENALTY' | 'WARNING' | 'AUTO_PENALTY';

export interface PenaltyItem {
  userId: number;
  penaltyType: ApiPenaltyType;
  penaltyDescription: string;
}
