// base
export interface AttendBase {
  title: string;
  location: string;
  start: string;
  end: string;
}

type AttendStatus = 'ATTEND' | 'PENDING' | 'ABSENT';

// 출석 조회
export interface AttendCheckItemProps {
  attend: AttendStatus;
  title: string;
  date: string;
  place: string;
}

export interface MeetingProps extends AttendBase {
  id: number;
  status: AttendStatus;
}

// attend main
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
  onSuccessAttend: () => void;
}
