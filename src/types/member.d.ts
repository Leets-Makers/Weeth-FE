export interface Member {
  id: number;
  name: string;
  cardinals: number[];
  position: string;
  role: 'USER' | 'ADMIN';
}

export interface MemberDetail {
  id: number;
  name: string;
  email: string;
  studentId: string;
  department: string;
  cardinals: number[];
  position: 'D' | 'FE' | 'BE';
  role: 'ADMIN' | 'USER';
}
