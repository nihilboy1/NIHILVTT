jest.mock('@/features/auth/model/authSlice', () => ({
  authApi: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

import { parseGameSessionSnapshotPayload } from '@/features/game/model/gameSessionApi';

describe('gameSessionApi snapshot contract', () => {
  it('accepts a snapshot only when session arrays are explicit', () => {
    expect(() =>
      parseGameSessionSnapshotPayload({
        gameId: 1,
        serverVersion: 2,
        state: {
          characters: [],
          tokens: [],
          messages: [],
        },
        recentEvents: [],
      }),
    ).not.toThrow();
  });

  it('fails fast when snapshot arrays are missing', () => {
    expect(() =>
      parseGameSessionSnapshotPayload({
        gameId: 1,
        serverVersion: 2,
        state: {
          characters: [],
          messages: [],
        },
        recentEvents: [],
      }),
    ).toThrow();
  });
});
