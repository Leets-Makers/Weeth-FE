export interface EventDetailData {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  location: string;
  cardinal: number;
  code?: number;
  name: string;
  requiredItem: string;
  start: string;
  end: string;
  type?: 'EVENT' | 'MEETING';
}
