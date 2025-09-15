export type ApiPenaltyType = 'PENALTY' | 'WARNING';

export interface PenaltyItem {
  userId: number;
  penaltyType: ApiPenaltyType;
  penaltyDescription: string;
}
