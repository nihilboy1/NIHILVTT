import { useEffect, useMemo, useState } from 'react';

import {
  FIXED_GAME_MAX_PLAYERS,
  FIXED_GAME_SYSTEM_LABEL,
  type GamePlayer,
  type Game,
} from '@/entities/game/model/schemas/game.schema';
import { useAuthStore } from '@/features/auth/model/authStore';
import { clearGameChatHistory } from '@/features/game/model/gameSessionApi';
import { applyGameSessionEvent } from '@/features/game/model/gameSessionEventHandlers';
import { useGameStore } from '@/features/game/model/gameStore';
import { formatUserTag } from '@/shared/lib/utils/nameUtils';
import { AppButton } from '@/shared/ui/AppButton';
import { ConfirmationModal } from '@/shared/ui/ConfirmationModal';

type GameSettingsPanelProps = {
  game: Game | null;
  isLeavingGame: boolean;
  onLeaveGame: () => void;
};

type Participant = Pick<GamePlayer, 'id' | 'name' | 'isOwner'>;

export function GameSettingsPanel({
  game,
  isLeavingGame,
  onLeaveGame,
}: GameSettingsPanelProps) {
  const [isLeaveConfirmOpen, setIsLeaveConfirmOpen] = useState(false);
  const [isClearChatConfirmOpen, setIsClearChatConfirmOpen] = useState(false);
  const [isClearingChatHistory, setIsClearingChatHistory] = useState(false);
  const [isRevokeConfirmOpen, setIsRevokeConfirmOpen] = useState(false);
  const [playerPendingRevoke, setPlayerPendingRevoke] = useState<Participant | null>(null);
  const [nicknameInput, setNicknameInput] = useState('');

  const loggedUser = useAuthStore((state) => state.user);
  const updateNicknameForGame = useGameStore((state) => state.updateNicknameForGame);
  const isUpdatingNickname = useGameStore((state) => state.isUpdatingNickname);
  const revokeMemberAccess = useGameStore((state) => state.revokeMemberAccess);
  const isRevokingMemberAccess = useGameStore((state) => state.isRevokingMemberAccess);

  const currentMembershipNickname = useMemo(() => {
    if (!game || !loggedUser) {
      return '';
    }

    const currentPlayer = game.players.find((player) => player.id === loggedUser.id);
    return currentPlayer?.name ?? loggedUser.name;
  }, [game, loggedUser]);

  const isOwner = Boolean(game && loggedUser && game.owner.id === loggedUser.id);

  const participants = useMemo(() => {
    if (!game) {
      return [] as Participant[];
    }
    return game.players.length
      ? game.players
      : [{ id: game.owner.id, name: game.owner.name, isOwner: true }];
  }, [game]);

  useEffect(() => {
    if (!game) {
      setNicknameInput('');
      return;
    }

    setNicknameInput(currentMembershipNickname || loggedUser?.name || '');
  }, [game, currentMembershipNickname, loggedUser?.name]);

  if (!game) {
    return (
      <div className="p-4 text-sm text-text-secondary">
        Carregando informações do jogo...
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto p-4">
      <section className="rounded-lg border border-surface-2 bg-surface-0/60 p-4">
        <h3 className="mb-2 text-lg font-semibold text-text-primary">Informações do jogo</h3>
        <p className="mb-2 text-sm text-text-secondary">
          <span className="font-semibold text-text-primary">Você está logado como:</span>{' '}
          {loggedUser ? formatUserTag(loggedUser.name, loggedUser.id) : 'Usuário'}
        </p>
        <p className="text-sm text-text-secondary">
          <span className="font-semibold text-text-primary">Jogo:</span> {game.title}
        </p>
        <p className="text-sm text-text-secondary">
          <span className="font-semibold text-text-primary">Código:</span> {game.joinCode}
        </p>
        <p className="text-sm text-text-secondary">
          <span className="font-semibold text-text-primary">Sistema:</span> {FIXED_GAME_SYSTEM_LABEL}
        </p>
        <p className="text-sm text-text-secondary">
          <span className="font-semibold text-text-primary">Participantes:</span>{' '}
          {game.currentPlayers}/{game.maxPlayers}
        </p>
        <p className="text-xs text-text-secondary">
          Limite fixo desta mesa: 1 mestre + 5 jogadores (total de {FIXED_GAME_MAX_PLAYERS}).
        </p>
        <div className="mt-3 rounded-md border border-surface-2 bg-surface-1/60 p-3">
          <p className="mb-2 text-sm font-semibold text-text-primary">Participantes</p>
          <ul className="space-y-2 text-sm text-text-secondary">
            {participants.map((player) => {
              const canRevoke = isOwner && !player.isOwner;
              return (
                <li key={player.id} className="flex items-center justify-between gap-2">
                  <span>
                    {formatUserTag(player.name, player.id)}
                    {player.isOwner ? ' (Mestre)' : ''}
                  </span>
                  {canRevoke ? (
                    <AppButton
                      variant="danger"
                      isLoading={isRevokingMemberAccess && playerPendingRevoke?.id === player.id}
                      loadingText="REMOVENDO..."
                      onClick={() => {
                        setPlayerPendingRevoke(player);
                        setIsRevokeConfirmOpen(true);
                      }}
                    >
                      Expulsar jogador
                    </AppButton>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {isOwner ? (
        <section className="rounded-lg border border-surface-2 bg-surface-0/60 p-4">
          <h3 className="mb-2 text-lg font-semibold text-text-primary">Configurações do mestre</h3>
          <div className="rounded-md border border-feedback-negative/40 bg-feedback-negative/10 p-3">
            <p className="mb-2 text-sm font-semibold text-text-primary">Histórico do chat</p>
            <p className="mb-3 text-xs text-text-secondary">
              Esta ação remove todas as mensagens do chat para todos os participantes da mesa.
            </p>
            <AppButton
              variant="danger"
              isLoading={isClearingChatHistory}
              loadingText="LIMPANDO..."
              onClick={() => setIsClearChatConfirmOpen(true)}
            >
              Limpar histórico do chat
            </AppButton>
          </div>
        </section>
      ) : null}

      <section className="rounded-lg border border-surface-2 bg-surface-0/60 p-4">
        <h3 className="mb-2 text-lg font-semibold text-text-primary">Identidade no jogo</h3>
        <p className="mb-3 text-sm text-text-secondary">
          Esse nickname vale apenas para este jogo e será usado no chat.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="text"
            value={nicknameInput}
            onChange={(event) => setNicknameInput(event.target.value)}
            placeholder="Digite seu nickname neste jogo"
            maxLength={30}
            className="w-full rounded-sm border border-surface-2 bg-text-primary p-2 text-surface-0 sm:w-64"
          />
          <AppButton
            variant="secondary"
            isLoading={isUpdatingNickname}
            loadingText="SALVANDO..."
            onClick={() => {
              void updateNicknameForGame(game.id, nicknameInput);
            }}
            disabled={!nicknameInput.trim() || nicknameInput.trim() === currentMembershipNickname.trim()}
          >
            Salvar nickname
          </AppButton>
        </div>
      </section>

      <section className="rounded-lg border border-surface-2 bg-surface-0/60 p-4">
        <h3 className="mb-2 text-lg font-semibold text-text-primary">Ações do jogo</h3>
        <p className="mb-3 text-sm text-text-secondary">
          Você pode sair deste jogo e voltar ao dashboard quando quiser.
        </p>
        <AppButton
          variant="secondary"
          isLoading={isLeavingGame}
          loadingText="SAINDO..."
          onClick={() => setIsLeaveConfirmOpen(true)}
        >
          Sair do jogo
        </AppButton>
      </section>

      <ConfirmationModal
        isOpen={isLeaveConfirmOpen}
        title="Voltar ao dashboard"
        content="Deseja sair deste jogo agora e voltar ao dashboard?"
        confirmText="Sair agora"
        cancelText="Continuar no jogo"
        onConfirm={() => {
          onLeaveGame();
          setIsLeaveConfirmOpen(false);
        }}
        onCancel={() => setIsLeaveConfirmOpen(false)}
      />

      <ConfirmationModal
        isOpen={isClearChatConfirmOpen}
        title="Limpar histórico do chat"
        content="Deseja realmente limpar todo o histórico do chat desta mesa? Esta ação afeta todos os jogadores."
        confirmText="Limpar histórico"
        cancelText="Cancelar"
        onConfirm={() => {
          setIsClearingChatHistory(true);
          void clearGameChatHistory(game.id)
            .then((event) => {
              applyGameSessionEvent(event);
              setIsClearChatConfirmOpen(false);
            })
            .finally(() => {
              setIsClearingChatHistory(false);
            });
        }}
        onCancel={() => setIsClearChatConfirmOpen(false)}
      />

      <ConfirmationModal
        isOpen={isRevokeConfirmOpen}
        title="Expulsar jogador"
        content={`Deseja expulsar ${playerPendingRevoke ? formatUserTag(playerPendingRevoke.name, playerPendingRevoke.id) : 'este jogador'} deste jogo?`}
        confirmText="Expulsar jogador"
        cancelText="Cancelar"
        onConfirm={() => {
          if (playerPendingRevoke) {
            void revokeMemberAccess(game.id, playerPendingRevoke.id);
          }
          setPlayerPendingRevoke(null);
          setIsRevokeConfirmOpen(false);
        }}
        onCancel={() => {
          setPlayerPendingRevoke(null);
          setIsRevokeConfirmOpen(false);
        }}
      />
    </div>
  );
}
