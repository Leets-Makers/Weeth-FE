export const USER_QUERY_KEYS = {
  user: {
    all: ['user'],
    me: ['user', 'me'],
    byId: (userId: string) => ['user', userId],
  },
};

export const ATTEND_QUERY_KEYS = {
  attend: {
    all: ['attend'],
    me: ['attend', 'me'],
  },
};
