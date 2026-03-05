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
          combat: null,
        },
        recentEvents: [],
      }),
    ).not.toThrow();
  });

  it('fails fast when snapshot required state fields are missing', () => {
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
    ).toThrow();
  });
});
