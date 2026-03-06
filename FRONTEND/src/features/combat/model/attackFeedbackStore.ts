import { create } from 'zustand';

export interface AttackFeedbackEntry {
  id: string;
  tokenId: string;
  hit: boolean;
  attackTotal: number;
  targetArmorClass: number;
  damageApplied: number;
}

interface AttackFeedbackStoreState {
  feedbackByTokenId: Record<string, AttackFeedbackEntry | undefined>;
  pushFeedback: (entry: AttackFeedbackEntry) => void;
  clearFeedbackForToken: (tokenId: string) => void;
  clearAllFeedback: () => void;
}

const FEEDBACK_DURATION_MS = 1600;
const feedbackTimers = new Map<string, ReturnType<typeof setTimeout>>();

function clearTimer(tokenId: string): void {
  const timer = feedbackTimers.get(tokenId);
  if (!timer) {
    return;
  }
  clearTimeout(timer);
  feedbackTimers.delete(tokenId);
}

export const useAttackFeedbackStore = create<AttackFeedbackStoreState>((set) => ({
  feedbackByTokenId: {},

  pushFeedback: (entry) => {
    clearTimer(entry.tokenId);

    set((state) => ({
      feedbackByTokenId: {
        ...state.feedbackByTokenId,
        [entry.tokenId]: entry,
      },
    }));

    const timer = setTimeout(() => {
      set((state) => {
        if (!state.feedbackByTokenId[entry.tokenId]) {
          return state;
        }

        const next = { ...state.feedbackByTokenId };
        delete next[entry.tokenId];
        return { feedbackByTokenId: next };
      });
      feedbackTimers.delete(entry.tokenId);
    }, FEEDBACK_DURATION_MS);

    feedbackTimers.set(entry.tokenId, timer);
  },

  clearFeedbackForToken: (tokenId) => {
    clearTimer(tokenId);
    set((state) => {
      if (!state.feedbackByTokenId[tokenId]) {
        return state;
      }
      const next = { ...state.feedbackByTokenId };
      delete next[tokenId];
      return { feedbackByTokenId: next };
    });
  },

  clearAllFeedback: () => {
    for (const tokenId of feedbackTimers.keys()) {
      clearTimer(tokenId);
    }
    set({ feedbackByTokenId: {} });
  },
}));
