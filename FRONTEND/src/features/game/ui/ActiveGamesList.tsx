import {
  FIXED_GAME_SYSTEM_LABEL,
  type Game,
} from '@/entities/game/model/schemas/game.schema';
import { AppButton } from '@/shared/ui/AppButton';
import { DeleteIcon } from '@/shared/ui/Icons';
import { Spinner } from '@/shared/ui/Spinner';
import { formatUserTag } from '@/shared/lib/utils/nameUtils';

type ActiveGamesListProps = {
  games: Game[];
  currentUserId: number;
  isLoading: boolean;
  isJoining?: boolean;
  isDeleting?: boolean;
  onJoin?: (game: Game) => void;
  onDelete?: (game: Game) => void;
  onEditCover?: (game: Game) => void;
  onCopyJoinCode?: (game: Game) => void;
  canJoin?: (game: Game) => boolean;
};

export function ActiveGamesList({
  games,
  currentUserId,
  isLoading,
  isJoining = false,
  isDeleting = false,
  onJoin,
  onDelete,
  onEditCover,
  onCopyJoinCode,
  canJoin,
}: ActiveGamesListProps) {
  if (isLoading) {
    return (
      <div className="py-4">
        <Spinner />
      </div>
    );
  }

  if (!games.length) {
    return (
      <p className="text-sm text-text-secondary">
        Nenhum jogo ativo no momento. Crie o primeiro jogo para começar.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {games.map((game) => (
        <article
          key={game.id}
          className="relative flex min-h-[13rem] overflow-hidden rounded-lg border border-surface-2 bg-surface-0/60"
        >
          <div className="flex w-[40%] min-w-0 flex-none flex-col p-4">
            <div>
              <h3 className="text-lg font-semibold text-text-primary">{game.title}</h3>
              <p className="mt-1 text-sm text-text-secondary">
                Mestre: {formatUserTag(game.owner.name, game.owner.id)}
              </p>
              {game.description ? (
                <p className="mt-2 text-sm text-text-secondary">{game.description}</p>
              ) : null}
              <div className="mt-3 space-y-2 text-xs text-text-secondary">
                <div>
                  <p className="font-medium text-text-primary">Jogadores</p>
                  <div className="mt-1 space-y-1">
                    {(game.players.length ? game.players : [{ id: game.owner.id, name: game.owner.name, isOwner: true }]).map((player) => (
                      <p key={player.id}>
                        {formatUserTag(player.name, player.id)}{player.isOwner ? ' (Mestre)' : ''}
                      </p>
                    ))}
                  </div>
                </div>
                <p>{game.currentPlayers}/{game.maxPlayers} participantes</p>
                <div className="flex items-center gap-2">
                  <span>Sistema:</span>
                  <span className="inline-flex items-center rounded-sm bg-feedback-negative/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-feedback-negative">
                    {FIXED_GAME_SYSTEM_LABEL}
                  </span>
                </div>
                <p>Limite: 1 mestre + 5 jogadores</p>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-text-primary">Código:</span>
                  <button
                    type="button"
                    onClick={() => onCopyJoinCode?.(game)}
                    disabled={!onCopyJoinCode}
                    className="inline-flex items-center rounded-sm border border-white/70 bg-surface-0/35 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-text-primary transition-colors hover:bg-surface-0/55 hover:border-white disabled:cursor-default disabled:opacity-100"
                    title={`Copiar código da mesa ${game.joinCode}`}
                    aria-label={`Copiar código da mesa ${game.joinCode}`}
                  >
                    {game.joinCode}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-auto flex items-center justify-between gap-3 pt-4">
              {(() => {
                const joinAllowed = canJoin ? canJoin(game) : Boolean(onJoin);
                return (
                  <AppButton
                    variant="secondary"
                    disabled={!onJoin || !joinAllowed}
                    isLoading={isJoining}
                    loadingText="ENTRANDO..."
                    onClick={() => onJoin?.(game)}
                  >
                    {joinAllowed ? 'ENTRAR' : 'AGUARDANDO APROVAÇÃO'}
                  </AppButton>
                );
              })()}
              {game.owner.id === currentUserId ? (
                <button
                  type="button"
                  title="Excluir jogo"
                  aria-label={`Excluir jogo ${game.title}`}
                  disabled={!onDelete || isDeleting}
                  onClick={() => onDelete?.(game)}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-transparent bg-surface-0/70 text-feedback-negative transition-colors hover:bg-feedback-negative/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <DeleteIcon className="h-4 w-4" />
                </button>
              ) : null}
            </div>
          </div>

          <div className="flex min-w-0 flex-1 items-center border-l border-surface-2 p-3">
            <div className="flex w-full flex-col justify-center gap-2">
              <div className="px-1 text-right">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-text-secondary">
                  Capa da mesa
                </p>
              </div>
              <button
                type="button"
                disabled={game.owner.id !== currentUserId || !onEditCover}
                onClick={() => onEditCover?.(game)}
                className="group relative aspect-[16/10] w-full overflow-hidden rounded-md border border-surface-2 bg-surface-1 text-left disabled:cursor-default"
              >
                {game.coverImageUrl ? (
                  <img
                    src={game.coverImageUrl}
                    alt={`Capa da mesa ${game.title}`}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/35 via-surface-2 to-surface-1" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-surface-0/70 via-surface-0/5 to-transparent" />
                <div className="absolute bottom-2 right-2 z-[1] rounded-sm bg-surface-0/50 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.1em] text-text-secondary transition-colors duration-150 group-hover:bg-surface-0/70 group-hover:text-text-primary">
                  {game.owner.id === currentUserId
                    ? game.coverImageUrl
                      ? 'Trocar capa'
                      : 'Enviar capa'
                    : game.coverImageUrl
                      ? 'Capa ativa'
                      : 'Sem capa'}
                </div>
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
