export const USER_QUERY_KEYS = {
  user: {
    all: ['user'],
    me: ['user', 'me'],
    byId: (userId: string) => ['user', userId],
  },
  member: {
    all: ['member'],
    list: (cardinal: number) => ['member', 'list', cardinal],
    byId: (memberId: string) => ['member', memberId],
  },
};

export const ATTEND_QUERY_KEYS = {
  attend: {
    all: ['attend'],
    me: ['attend', 'me'],
  },
  attendCheck: {
    all: ['attendCheck'],
    me: ['attnedCheck', 'me'],
  },
  penalty: {
    all: ['penalty'],
    me: ['penalty', 'me'],
  },
};

export const DUES_QUERY_KEYS = {};

export const BOARD_QUERY_KEYS = {};

export const EVENT_QUERY_KEYS = {};

export const ADMIN_QUERY_KEYS = {};
