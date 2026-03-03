import { Client, type IMessage, type StompSubscription } from '@stomp/stompjs';

import { type GameSessionEvent } from '@/features/game/model/gameSessionApi';

type RealtimeHandlers = {
  onEvent: (event: GameSessionEvent) => void;
  onConnectionChange?: (isConnected: boolean) => void;
};

export class GameSessionRealtimeClient {
  private readonly client: Client;
  private readonly handlers: RealtimeHandlers;
  private readonly getAccessToken: () => string | null;
  private activeGameId: number | null = null;
  private eventSubscription: StompSubscription | null = null;

  constructor(handlers: RealtimeHandlers, websocketUrl: string, getAccessToken: () => string | null) {
    this.handlers = handlers;
    this.getAccessToken = getAccessToken;
    this.client = new Client({
      brokerURL: websocketUrl,
      reconnectDelay: 2000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      beforeConnect: () => {
        const token = this.getAccessToken();
        this.client.connectHeaders = token ? { Authorization: `Bearer ${token}` } : {};
      },
      onConnect: () => {
        this.handlers.onConnectionChange?.(true);
        this.subscribeToGameTopic();
      },
      onDisconnect: () => {
        this.handlers.onConnectionChange?.(false);
      },
      onStompError: () => {
        this.handlers.onConnectionChange?.(false);
      },
      onWebSocketError: () => {
        this.handlers.onConnectionChange?.(false);
      },
    });
  }

  connect(gameId: number): void {
    this.activeGameId = gameId;
    if (!this.client.active) {
      this.client.activate();
      return;
    }
    this.subscribeToGameTopic();
  }

  disconnect(): void {
    this.activeGameId = null;
    this.unsubscribe();
    if (this.client.active) {
      void this.client.deactivate();
    }
  }

  private subscribeToGameTopic(): void {
    if (!this.client.connected || this.activeGameId === null) {
      return;
    }

    this.unsubscribe();
    this.eventSubscription = this.client.subscribe(
      `/topic/games.${this.activeGameId}.events`,
      (message: IMessage) => {
        const parsed = this.parseEventPayload(message.body);
        if (!parsed) {
          return;
        }

        try {
          this.handlers.onEvent(parsed);
        } catch (error) {
          console.error('Falha ao aplicar evento realtime da sessão.', error, parsed);
        }
      },
    );
  }

  private unsubscribe(): void {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
      this.eventSubscription = null;
    }
  }

  private parseEventPayload(payload: string): GameSessionEvent | null {
    try {
      return JSON.parse(payload) as GameSessionEvent;
    } catch {
      return null;
    }
  }
}
