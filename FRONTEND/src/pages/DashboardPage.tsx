import { ChangeEvent, useEffect, useRef, useState } from 'react';

import Cropper, { Area, Point } from 'react-easy-crop';
import { FaRegUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { useAuthStore } from '@/features/auth/model/authStore';
import { useGameStore } from '@/features/game/model/gameStore';
import { ActiveGamesList } from '@/features/game/ui/ActiveGamesList';
import { getCroppedImageBlob } from '@/shared/lib/utils/imageCrop';
import { formatUserTag } from '@/shared/lib/utils/nameUtils';
import { AppButton } from '@/shared/ui/AppButton';
import { CardSection } from '@/shared/ui/CardSection';
import { Modal } from '@/shared/ui/Modal';
import { PageShell } from '@/shared/ui/PageShell';
import { Spinner } from '@/shared/ui/Spinner';
import { StatusAlert } from '@/shared/ui/StatusAlert';

import 'react-easy-crop/react-easy-crop.css';

const DELETE_GAME_PHRASE = 'excluir jogo';
const MAX_GAME_COVER_FILE_SIZE_BYTES = 10_000_000;
const MAX_GAME_COVER_FILE_SIZE_LABEL = '10MB';

function revokeIfBlobUrl(url: string | null) {
  if (url && url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
}

export default function DashboardPage() {
  const { user, isLoading } = useAuthStore();
  const {
    games,
    myJoinRequests,
    ownedPendingJoinRequests,
    isLoadingGames,
    isLoadingJoinRequests,
    isSubmittingJoinRequest,
    isJoiningGame,
    isDeletingGame,
    isUploadingGameCover,
    isReviewingJoinRequest,
    error,
    fetchActiveGames,
    fetchJoinRequests,
    submitJoinRequest,
    approveJoinRequest,
    rejectJoinRequest,
    joinGameById,
    deleteGameById,
    uploadGameCover,
    clearError,
  } = useGameStore();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [joinCode, setJoinCode] = useState('');
  const [gamePendingDeletion, setGamePendingDeletion] = useState<{
    id: number;
    title: string;
  } | null>(null);
  const [deleteGamePhrase, setDeleteGamePhrase] = useState('');
  const [deleteGameError, setDeleteGameError] = useState<string | null>(null);
  const [gamePendingCoverUpload, setGamePendingCoverUpload] = useState<{
    id: number;
    title: string;
  } | null>(null);
  const [coverCropImageSrc, setCoverCropImageSrc] = useState<string | null>(null);
  const [isCoverCropOpen, setIsCoverCropOpen] = useState(false);
  const [coverCrop, setCoverCrop] = useState<Point>({ x: 0, y: 0 });
  const [coverZoom, setCoverZoom] = useState(1);
  const [coverCroppedAreaPixels, setCoverCroppedAreaPixels] = useState<Area | null>(null);
  const [coverModalError, setCoverModalError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    void fetchActiveGames();
    void fetchJoinRequests();
    const interval = window.setInterval(() => {
      void fetchJoinRequests();
    }, 5000);

    return () => {
      window.clearInterval(interval);
    };
  }, [user, fetchActiveGames, fetchJoinRequests]);

  useEffect(() => {
    return () => {
      revokeIfBlobUrl(coverCropImageSrc);
    };
  }, [coverCropImageSrc]);

  useEffect(() => {
    if (!error) {
      return;
    }

    toast.error(error, { duration: 2600 });
  }, [error]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    return null;
  }

  const handleJoinByCode = async () => {
    if (!joinCode.trim()) {
      return;
    }
    clearError();
    const created = await submitJoinRequest(joinCode);
    if (created) {
      setJoinCode('');
      void fetchJoinRequests();
    }
  };

  const handleJoinFromList = async (gameId: number) => {
    clearError();
    const joined = await joinGameById(gameId);
    if (joined) {
      navigate(`/game/${joined.id}`);
    }
  };

  const onCoverCropComplete = (_: Area, areaPixels: Area) => {
    setCoverCroppedAreaPixels(areaPixels);
  };

  const handleDeleteGameRequest = (gameId: number, title: string) => {
    clearError();
    setDeleteGamePhrase('');
    setDeleteGameError(null);
    setGamePendingDeletion({ id: gameId, title });
  };

  const handleCopyJoinCode = async (joinCodeToCopy: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(joinCodeToCopy);
      } else {
        const helper = document.createElement('textarea');
        helper.value = joinCodeToCopy;
        helper.setAttribute('readonly', 'true');
        helper.style.position = 'absolute';
        helper.style.left = '-9999px';
        document.body.appendChild(helper);
        helper.select();
        document.execCommand('copy');
        document.body.removeChild(helper);
      }

      toast.success('Código de mesa copiado.', { duration: 1600 });
    } catch {
      toast.error('Não foi possível copiar o código da mesa.', { duration: 2200 });
    }
  };

  const handleCoverFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      setCoverModalError('Selecione um arquivo de imagem valido.');
      toast.error('Selecione um arquivo de imagem válido para a capa da mesa.', { duration: 2200 });
      event.target.value = '';
      return;
    }

    if (file.size > MAX_GAME_COVER_FILE_SIZE_BYTES) {
      setCoverModalError(`A imagem deve ter no máximo ${MAX_GAME_COVER_FILE_SIZE_LABEL}.`);
      toast.error(
        `A imagem selecionada excede o limite de ${MAX_GAME_COVER_FILE_SIZE_LABEL}. Escolha um arquivo menor.`,
        { duration: 2600 },
      );
      event.target.value = '';
      return;
    }

    const nextPreviewUrl = URL.createObjectURL(file);
    setCoverCropImageSrc((previous) => {
      revokeIfBlobUrl(previous);
      return nextPreviewUrl;
    });
    setCoverCrop({ x: 0, y: 0 });
    setCoverZoom(1);
    setCoverCroppedAreaPixels(null);
    setCoverModalError(null);
    setIsCoverCropOpen(true);

    event.target.value = '';
  };

  const handleCoverUploadRequest = (game: { id: number; title: string }) => {
    clearError();
    setCoverModalError(null);
    setGamePendingCoverUpload({ id: game.id, title: game.title });
    fileInputRef.current?.click();
  };

  const handleConfirmCoverCrop = async () => {
    if (!gamePendingCoverUpload || !coverCropImageSrc || !coverCroppedAreaPixels) {
      setCoverModalError('Nao foi possivel aplicar o enquadramento da imagem.');
      return;
    }

    try {
      const blob = await getCroppedImageBlob(coverCropImageSrc, coverCroppedAreaPixels);
      const file = new File([blob], `game-cover-${Date.now()}.jpg`, { type: 'image/jpeg' });
      const updated = await uploadGameCover(gamePendingCoverUpload.id, file);
      if (updated) {
        setIsCoverCropOpen(false);
        setCoverCropImageSrc((previous) => {
          revokeIfBlobUrl(previous);
          return null;
        });
        setCoverCroppedAreaPixels(null);
        setGamePendingCoverUpload(null);
        setCoverModalError(null);
      }
    } catch (error) {
      console.error('[DashboardPage][cover] failed to process or upload cover', error);
      setCoverModalError('Nao foi possivel processar ou enviar a capa da mesa.');
    }
  };

  const handleConfirmDeleteGame = async () => {
    if (!gamePendingDeletion) {
      return;
    }

    if (deleteGamePhrase.trim().toLowerCase() !== DELETE_GAME_PHRASE) {
      setDeleteGameError('O texto de confirmação está incorreto.');
      return;
    }

    setDeleteGameError(null);
    clearError();
    const deleted = await deleteGameById(gamePendingDeletion.id);
    if (deleted) {
      setGamePendingDeletion(null);
      setDeleteGamePhrase('');
    }
  };

  const statusLabel = (status: string) => {
    if (status === 'PENDING') return 'Pendente';
    if (status === 'APPROVED') return 'Aprovado';
    if (status === 'REJECTED') return 'Rejeitado';
    return status;
  };

  const approvedGameIds = new Set(
    myJoinRequests
      .filter((request) => request.status === 'APPROVED')
      .map((request) => request.game.id),
  );
  const pendingMyJoinRequests = myJoinRequests.filter((request) => request.status === 'PENDING');
  const pendingGameIds = new Set(pendingMyJoinRequests.map((request) => request.game.id));
  const visibleGames = games.filter(
    (game) =>
      game.owner.id === user.id || approvedGameIds.has(game.id) || pendingGameIds.has(game.id),
  );

  const canJoinGame = (gameId: number, ownerId: number) => {
    if (ownerId === user.id) return true;
    return approvedGameIds.has(gameId);
  };

  return (
    <PageShell
      className="text-text-primary flex flex-col items-center p-4 sm:p-8"
      withSquares={false}
    >
      <CardSection className="bg-surface-1/90 surface-elevated-shadow w-full max-w-5xl border-transparent backdrop-blur-md">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="iceberg-regular text-text-primary mb-2 text-5xl">
              Bem-vindo, {formatUserTag(user.name, user.id)}!
            </h1>
            <p className="text-text-secondary text-lg">Este é o seu Dashboard.</p>
          </div>

          <AppButton
            onClick={() => navigate('/profile')}
            variant="primary"
            className="border-accent-primary bg-accent-primary hover:bg-accent-primary-hover flex items-center gap-2 px-3 py-2 hover:scale-105"
            title="Ir para o perfil"
          >
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt="Foto de perfil"
                className="h-7 w-7 rounded-full border border-white object-cover"
              />
            ) : (
              <span className="bg-surface-2 text-text-secondary flex h-7 w-7 items-center justify-center rounded-full border border-white">
                <FaRegUser size={14} />
              </span>
            )}
            <span>Perfil</span>
          </AppButton>
        </div>

        <CardSection className="bg-surface-0/70">
          <div className="border-surface-2 bg-surface-0/60 mb-4 rounded-md border p-3">
            <p className="text-text-primary mb-2 text-sm font-semibold">
              Solicitar acesso por código
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <input
                value={joinCode}
                onChange={(event) => setJoinCode(event.target.value.toUpperCase())}
                placeholder="Ex.: AB12CD"
                maxLength={12}
                className="border-surface-2 bg-text-primary text-surface-0 w-full rounded-sm border p-2 sm:w-52"
              />
              <AppButton
                variant="secondary"
                onClick={() => void handleJoinByCode()}
                isLoading={isSubmittingJoinRequest}
                loadingText="ENVIANDO..."
                disabled={!joinCode.trim()}
              >
                Solicitar acesso
              </AppButton>
            </div>
          </div>

          {pendingMyJoinRequests.length > 0 ? (
            <div className="border-surface-2 bg-surface-0/60 mb-4 rounded-md border p-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="text-text-primary text-sm font-semibold">
                  Minhas solicitações pendentes
                </p>
                {isLoadingJoinRequests ? (
                  <span className="text-text-secondary text-xs">Atualizando...</span>
                ) : null}
              </div>
              <div className="space-y-2">
                {pendingMyJoinRequests.slice(0, 6).map((request) => (
                  <div key={request.id} className="border-surface-2 rounded border p-2 text-sm">
                    <p className="text-text-primary font-semibold">{request.game.title}</p>
                    <p className="text-text-secondary">Status: {statusLabel(request.status)}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {ownedPendingJoinRequests.length > 0 ? (
            <div className="border-surface-2 bg-surface-0/60 mb-4 rounded-md border p-3">
              <p className="text-text-primary mb-2 text-sm font-semibold">
                Solicitações pendentes para seus jogos
              </p>
              <div className="space-y-2">
                {ownedPendingJoinRequests.slice(0, 10).map((request) => (
                  <div
                    key={request.id}
                    className="border-surface-2 flex flex-wrap items-center justify-between gap-2 rounded border p-2 text-sm"
                  >
                    <div>
                      <p className="text-text-primary font-semibold">
                        {formatUserTag(request.requester.name, request.requester.id)}
                      </p>
                      <p className="text-text-secondary">
                        quer entrar em {request.game.title} ({request.game.joinCode})
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <AppButton
                        variant="secondary"
                        isLoading={isReviewingJoinRequest}
                        loadingText="..."
                        onClick={() => {
                          void approveJoinRequest(request.game.id, request.id);
                        }}
                      >
                        Aprovar
                      </AppButton>
                      <AppButton
                        variant="danger"
                        isLoading={isReviewingJoinRequest}
                        loadingText="..."
                        onClick={() => {
                          void rejectJoinRequest(request.game.id, request.id);
                        }}
                      >
                        Rejeitar
                      </AppButton>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-text-primary text-2xl font-semibold">Jogos Ativos</h2>
            <div className="flex items-center gap-2">
              <AppButton
                variant="secondary"
                onClick={() => {
                  clearError();
                  void fetchActiveGames();
                }}
                disabled={isLoadingGames}
              >
                Atualizar
              </AppButton>
              <AppButton variant="primary" onClick={() => navigate('/games/new')}>
                Criar novo jogo
              </AppButton>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleCoverFileChange}
            className="hidden"
          />
          <ActiveGamesList
            games={visibleGames}
            currentUserId={user.id}
            isLoading={isLoadingGames}
            isJoining={isJoiningGame}
            isDeleting={isDeletingGame}
            canJoin={(game) => canJoinGame(game.id, game.owner.id)}
            onJoin={(game) => {
              void handleJoinFromList(game.id);
            }}
            onDelete={(game) => {
              handleDeleteGameRequest(game.id, game.title);
            }}
            onEditCover={(game) => {
              handleCoverUploadRequest({ id: game.id, title: game.title });
            }}
            onCopyJoinCode={(game) => {
              void handleCopyJoinCode(game.joinCode);
            }}
          />
        </CardSection>
      </CardSection>

      <Modal
        isOpen={isCoverCropOpen}
        onClose={() => {
          if (isUploadingGameCover) return;
          setIsCoverCropOpen(false);
          setCoverCropImageSrc((previous) => {
            revokeIfBlobUrl(previous);
            return null;
          });
          setCoverCroppedAreaPixels(null);
          setCoverModalError(null);
          setGamePendingCoverUpload(null);
        }}
        title={`Ajustar capa${gamePendingCoverUpload ? `: ${gamePendingCoverUpload.title}` : ''}`}
        hideFooter
      >
        <div className="space-y-4">
          <p className="text-text-secondary text-sm">
            Arraste a imagem e ajuste o zoom para definir um enquadramento mais horizontal para a
            capa da mesa.
          </p>

          {coverModalError ? (
            <StatusAlert tone="error" className="px-3 py-2">
              {coverModalError}
            </StatusAlert>
          ) : null}

          <div className="border-surface-2 bg-surface-0 relative h-[360px] w-full overflow-hidden rounded-xl border">
            {coverCropImageSrc ? (
              <Cropper
                image={coverCropImageSrc}
                crop={coverCrop}
                zoom={coverZoom}
                aspect={16 / 10}
                showGrid={false}
                onCropChange={setCoverCrop}
                onZoomChange={setCoverZoom}
                onCropComplete={onCoverCropComplete}
              />
            ) : null}
          </div>

          <div>
            <label
              htmlFor="dashboard-cover-zoom"
              className="text-text-secondary mb-1 block text-sm"
            >
              Zoom
            </label>
            <input
              id="dashboard-cover-zoom"
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={coverZoom}
              onChange={(event) => setCoverZoom(Number(event.target.value))}
              className="w-full"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <AppButton
              onClick={() => {
                setIsCoverCropOpen(false);
                setCoverCropImageSrc((previous) => {
                  revokeIfBlobUrl(previous);
                  return null;
                });
                setCoverCroppedAreaPixels(null);
                setCoverModalError(null);
                setGamePendingCoverUpload(null);
              }}
              disabled={isUploadingGameCover}
              variant="secondary"
            >
              Cancelar
            </AppButton>
            <AppButton
              onClick={() => {
                void handleConfirmCoverCrop();
              }}
              variant="primary"
              isLoading={isUploadingGameCover}
              loadingText="ENVIANDO..."
            >
              Confirmar capa
            </AppButton>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={Boolean(gamePendingDeletion)}
        overlayClassName="overlay-danger"
        onClose={() => {
          if (isDeletingGame) return;
          setGamePendingDeletion(null);
          setDeleteGamePhrase('');
          setDeleteGameError(null);
        }}
        title="Confirmar exclusão de jogo"
        hideFooter
      >
        <div className="space-y-4">
          <p className="text-text-secondary text-sm">
            Esta ação é irreversível e apaga a mesa, personagens, tokens, chat e todo o estado
            vinculado ao jogo{' '}
            <span className="text-text-primary font-semibold">{gamePendingDeletion?.title}</span>.
          </p>

          {deleteGameError ? (
            <StatusAlert tone="error" className="px-3 py-2">
              {deleteGameError}
            </StatusAlert>
          ) : null}

          <div>
            <label htmlFor="delete-game-phrase" className="text-text-secondary mb-1 block text-sm">
              Digite exatamente: <span className="font-semibold">{DELETE_GAME_PHRASE}</span>
            </label>
            <input
              id="delete-game-phrase"
              type="text"
              value={deleteGamePhrase}
              onChange={(event) => setDeleteGamePhrase(event.target.value)}
              aria-invalid={Boolean(deleteGameError)}
              className="border-surface-2 bg-text-primary text-surface-0 w-full rounded-sm border p-2"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <AppButton
              disabled={isDeletingGame}
              onClick={() => {
                setGamePendingDeletion(null);
                setDeleteGamePhrase('');
                setDeleteGameError(null);
              }}
              variant="secondary"
            >
              Cancelar
            </AppButton>
            <AppButton
              disabled={!deleteGamePhrase.trim() || isDeletingGame}
              onClick={() => {
                void handleConfirmDeleteGame();
              }}
              variant="danger"
              isLoading={isDeletingGame}
              loadingText="EXCLUINDO..."
            >
              Excluir jogo permanentemente
            </AppButton>
          </div>
        </div>
      </Modal>
    </PageShell>
  );
}
