export interface Member {
  id: number;
  name: string;
  cardinals: number[];
  position: string;
  role: 'USER' | 'ADMIN';
}
