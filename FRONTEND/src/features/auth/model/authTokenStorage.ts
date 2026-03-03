let accessTokenInMemory: string | null = null;

function parseJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;

    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
    const decoded = atob(padded);
    return JSON.parse(decoded) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function getAccessTokenExpirationMs(token: string): number | null {
  const payload = parseJwtPayload(token);
  const exp = payload?.exp;
  if (typeof exp !== 'number') {
    return null;
  }
  return exp * 1000;
}

export function loadAccessTokenExpiryFromStorage(): number | null {
  const token = loadAccessTokenFromStorage();
  if (!token) return null;
  return getAccessTokenExpirationMs(token);
}

export function loadAccessTokenFromStorage(): string | null {
  return accessTokenInMemory;
}

export function saveAccessTokenToStorage(token: string) {
  accessTokenInMemory = token;
}

export function removeAccessTokenFromStorage() {
  accessTokenInMemory = null;
}
