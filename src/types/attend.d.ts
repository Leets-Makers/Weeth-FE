// base
export interface AttendBase {
  title: string;
  location: string;
  start: string;
  end: string;
}

type AttendStatus = 'ATTEND' | 'PENDING' | 'ABSENT';

// domain
export interface Attendance extends AttendBase {
  id: number;
  weekNumber: number;
  status: AttendStatus;
}

export interface AttendInfo extends AttendBase {
  attendanceRate: number;
  status: AttendStatus;
  code?: number;
}

// api
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface AttendData {
  attendanceCount: number;
  total: number;
  absenceCount: number;
  attendances: Attendance[];
}

// ui props
export interface AttendInfoProps
  extends Pick<AttendBase, 'title' | 'location'> {
  startDateTime: string;
  endDateTime: string;
  isWithinTimeRange: boolean;
  handleOpenModal: () => void;
  handleOpenCodeModal: () => void;
  isAttend: boolean;
  isAdmin: boolean;
}

export interface ModalAttendProps
  extends Pick<AttendBase, 'title' | 'location'> {
  startDateTime: string;
  endDateTime: string;
  open: boolean;
  close: () => void;
  handleAttend: (attended: boolean) => void;
}
