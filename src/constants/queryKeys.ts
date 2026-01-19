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
    list: ['attnedCheck', 'list'],
  },
  penalty: {
    all: ['penalty'],
    list: ['penalty', 'list'],
  },
};

export const DUES_QUERY_KEYS = {
  dues: {
    all: ['dues'],
    list: ['dues', 'list'],
  },
};

export const BOARD_QUERY_KEYS = {};

export const EVENT_QUERY_KEYS = {};

export const ADMIN_QUERY_KEYS = {};
