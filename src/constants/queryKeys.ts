export const USER_QUERY_KEYS = {
  user: {
    all: ['user'],
    me: ['user', 'me'],
    byId: (userId: string) => ['user', userId],
  },
  member: {
    all: ['member'],
    list: (cardinal: number | null) => ['member', 'list', cardinal],
    byId: (memberId: number) => ['member', memberId],
  },
};

export const ATTEND_QUERY_KEYS = {
  attend: {
    all: ['attend'],
    me: ['attend', 'me'],
  },
  attendCheck: {
    all: ['attendCheck'],
    list: ['attendCheck', 'list'],
  },
  penalty: {
    all: ['penalty'],
    list: ['penalty', 'list'],
  },
};

export const DUES_QUERY_KEYS = {
  dues: {
    all: ['dues'],
    byCardinal: (cardinal: number) => ['dues', 'cardinal', cardinal],
  },
};

export const CARDINAL_QUERY_KEYS = {
  cardinal: {
    all: ['cardinal'],
    list: ['cardinal', 'list'],
  },
};

export const BOARD_QUERY_KEYS = {
  detail: (path: string, id: number) => ['board', 'detail', path, id],
  notices: {
    all: ['board', 'notices'],
    recent: ['board', 'notices', 'recent'],
    list: (pageNumber: number) => ['board', 'notices', 'list', pageNumber],
  },
  partBoard: (query: object) => ['board', 'part', query],
  educationBoard: (query: object) => ['board', 'education', query],
  search: {
    part: (keyword: string) => ['board', 'search', 'part', keyword],
    education: (keyword: string) => ['board', 'search', 'education', keyword],
    notice: (keyword: string) => ['board', 'search', 'notice', keyword],
  },
  studyList: (part: string) => ['board', 'studyList', part],
};

export const SCHEDULE_QUERY_KEYS = {
  monthly: (start: string, end: string) => ['schedule', 'monthly', start, end],
  yearly: (year: number, semester: number) => [
    'schedule',
    'yearly',
    year,
    semester,
  ],
};

export const EVENT_QUERY_KEYS = {
  detail: (type: string | undefined, id: string | undefined) => [
    'event',
    type,
    id,
  ],
};

export const ADMIN_QUERY_KEYS = {};
