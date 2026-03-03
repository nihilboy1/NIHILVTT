const AUTH_API_BASE_URL = import.meta.env.VITE_AUTH_API_BASE_URL || 'http://localhost:8080';

export function getGameSessionWebSocketUrl(): string {
  const normalized = AUTH_API_BASE_URL.replace(/\/+$/, '');
  if (normalized.startsWith('https://')) {
    return normalized.replace(/^https:/, 'wss:') + '/ws';
  }
  if (normalized.startsWith('http://')) {
    return normalized.replace(/^http:/, 'ws:') + '/ws';
  }
  return normalized + '/ws';
}
