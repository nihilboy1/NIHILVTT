import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Cropper, { Area, Point } from 'react-easy-crop';
import { useNavigate } from 'react-router-dom';

import { normalizeAuthError } from '@/features/auth/model/authErrors';
import { useAuthStore } from '@/features/auth/model/authStore';
import caretLeftIcon from '@/shared/assets/caret-left.svg';
import signOutIcon from '@/shared/assets/sign-out.svg';
import trashIcon from '@/shared/assets/trash.svg';
import { getCroppedImageBlob } from '@/shared/lib/utils/imageCrop';
import { formatUserTag } from '@/shared/lib/utils/nameUtils';
import { AppButton } from '@/shared/ui/AppButton';
import { CardSection } from '@/shared/ui/CardSection';
import { Modal } from '@/shared/ui/Modal';
import { PageShell } from '@/shared/ui/PageShell';
import { PasswordInput } from '@/shared/ui/PasswordInput';
import { Spinner } from '@/shared/ui/Spinner';
import { StatusAlert } from '@/shared/ui/StatusAlert';

import 'react-easy-crop/react-easy-crop.css';

const DELETE_PHRASE = 'eu desejo excluir minha conta';
const PAGE_ERROR_ID = 'profile-page-error';
const SAVE_MODAL_ERROR_ID = 'profile-save-modal-error';
const DELETE_MODAL_ERROR_ID = 'profile-delete-modal-error';

function revokeIfBlobUrl(url: string) {
  if (url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const {
    user,
    isLoading,
    authError,
    clearAuthError,
    updateProfile,
    deleteAccount,
    logout,
  } = useAuthStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState('');
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarMarkedForRemoval, setAvatarMarkedForRemoval] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [isSaveConfirmOpen, setIsSaveConfirmOpen] = useState(false);
  const [savePassword, setSavePassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [showSavePassword, setShowSavePassword] = useState(false);

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deletePhrase, setDeletePhrase] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeletePassword, setShowDeletePassword] = useState(false);

  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const [pageError, setPageError] = useState<string | null>(null);
  const [localSuccess, setLocalSuccess] = useState<string | null>(null);
  const [saveModalError, setSaveModalError] = useState<string | null>(null);
  const [deleteModalError, setDeleteModalError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
      return;
    }

    if (user) {
      setName(user.name);
      setAvatarFile(null);
      setAvatarMarkedForRemoval(false);
      setAvatarPreviewUrl((previous) => {
        revokeIfBlobUrl(previous);
        return user.avatarUrl || '';
      });
    }
  }, [isLoading, user, navigate]);

  useEffect(() => {
    return () => {
      revokeIfBlobUrl(avatarPreviewUrl);
    };
  }, [avatarPreviewUrl]);

  const hasNameChanged = useMemo(() => (user ? name.trim() !== user.name : false), [name, user]);
  const hasAvatarChanged = useMemo(
    () => avatarFile !== null || (avatarMarkedForRemoval && Boolean(user?.avatarUrl)),
    [avatarFile, avatarMarkedForRemoval, user],
  );
  const hasPasswordChange = newPassword.trim().length > 0;
  const hasProfileChanges = hasNameChanged || hasPasswordChange;

  const [saveMode, setSaveMode] = useState<'profile' | 'avatar'>('profile');

  const isDeleteEnabled = deletePassword.trim().length > 0 && !isDeleting;

  const onCropComplete = useCallback((_: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const openSaveConfirm = (mode: 'profile' | 'avatar') => {
    clearAuthError();
    setPageError(null);
    setSaveModalError(null);
    setLocalSuccess(null);

    if (mode === 'profile') {
      if (hasPasswordChange && newPassword !== confirmNewPassword) {
        setPageError('As novas senhas não coincidem.');
        return;
      }

      if (hasPasswordChange && newPassword.length < 8) {
        setPageError('A nova senha deve ter pelo menos 8 caracteres.');
        return;
      }

      if (!hasProfileChanges) {
        return;
      }
    }

    if (mode === 'avatar' && !hasAvatarChanged) {
      return;
    }

    setSaveMode(mode);
    setSavePassword('');
    setIsSaveConfirmOpen(true);
  };

  const handleSaveChanges = async () => {
    if (!user) return;

    if (!savePassword.trim()) {
      setSaveModalError('Informe sua senha atual para confirmar as alterações.');
      return;
    }

    setIsSaving(true);
    setSaveModalError(null);
    setPageError(null);
    setLocalSuccess(null);
    clearAuthError();

    try {
      await updateProfile({
        name: saveMode === 'profile' && hasNameChanged ? name.trim() : undefined,
        avatarFile: saveMode === 'avatar' ? avatarFile ?? undefined : undefined,
        avatarUrl: saveMode === 'avatar' && avatarMarkedForRemoval ? '' : undefined,
        password: saveMode === 'profile' && hasPasswordChange ? newPassword : undefined,
        currentPassword: savePassword,
      });

      if (saveMode === 'profile') {
        setNewPassword('');
        setConfirmNewPassword('');
      }

      if (saveMode === 'avatar') {
        setAvatarFile(null);
        setAvatarMarkedForRemoval(false);
      }

      setSavePassword('');
      setIsSaveConfirmOpen(false);
      setLocalSuccess(saveMode === 'avatar' ? 'Foto de perfil atualizada com sucesso.' : 'Perfil atualizado com sucesso.');
    } catch (error) {
      const parsedError = normalizeAuthError(error, 'Falha ao salvar alterações.');
      const fieldError =
        parsedError.fieldErrors.currentPassword ||
        parsedError.fieldErrors.avatarFile ||
        parsedError.fieldErrors.avatarUrl ||
        parsedError.fieldErrors.newPassword ||
        parsedError.fieldErrors.name;
      setSaveModalError(fieldError || parsedError.formError);
      clearAuthError();
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setPageError('Selecione um arquivo de imagem válido.');
      return;
    }

    if (file.size > 3_000_000) {
      setPageError('A imagem deve ter no máximo 3MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') return;
      setCropImageSrc(reader.result);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
      setIsCropModalOpen(true);
      setPageError(null);
    };
    reader.readAsDataURL(file);

    event.target.value = '';
  };

  const handleConfirmCrop = async () => {
    if (!cropImageSrc || !croppedAreaPixels) {
      setPageError('Não foi possível aplicar o enquadramento da imagem.');
      return;
    }

    try {
      const blob = await getCroppedImageBlob(cropImageSrc, croppedAreaPixels);
      const file = new File([blob], `avatar-${Date.now()}.jpg`, { type: 'image/jpeg' });
      const nextPreviewUrl = URL.createObjectURL(file);

      setAvatarPreviewUrl((previous) => {
        revokeIfBlobUrl(previous);
        return nextPreviewUrl;
      });
      setAvatarFile(file);
      setAvatarMarkedForRemoval(false);
      setIsCropModalOpen(false);
      setCropImageSrc(null);
    } catch {
      setPageError('Não foi possível processar a imagem selecionada.');
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword.trim()) {
      setDeleteModalError('Informe sua senha atual.');
      return;
    }

    if (deletePhrase.trim().toLowerCase() !== DELETE_PHRASE) {
      setDeleteModalError('O texto de confirmação está incorreto.');
      return;
    }

    setIsDeleting(true);
    setDeleteModalError(null);
    setPageError(null);
    setLocalSuccess(null);
    clearAuthError();

    try {
      await deleteAccount(deletePassword);
      navigate('/login');
    } catch (error) {
      const parsedError = normalizeAuthError(error, 'Falha ao excluir conta.');
      setDeleteModalError(parsedError.fieldErrors.currentPassword || parsedError.formError);
      clearAuthError();
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading || !user) {
    return <Spinner />;
  }

  return (
    <PageShell
      className="p-4 text-text-primary sm:p-8"
      withSquares={false}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 rounded-xl bg-surface-1/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.65)] backdrop-blur-md sm:p-10">
        <div className="flex items-center justify-between gap-4">
          <AppButton
            onClick={() => navigate('/dashboard')}
            variant="secondary"
            className="flex items-center gap-2 text-sm"
          >
            <img src={caretLeftIcon} alt="" aria-hidden="true" className="h-4 w-4 brightness-0 invert drop-shadow-[0_0_0.35px_rgba(255,255,255,0.95)]" />
            <span>Voltar para o dashboard</span>
          </AppButton>

          <h1 className="iceberg-regular text-4xl sm:text-5xl">Perfil</h1>

          <AppButton
            onClick={() => {
              void handleLogout();
            }}
            variant="danger"
            className="flex items-center gap-2 text-sm"
            isLoading={isLoggingOut}
            loadingText="SAINDO..."
          >
            <img src={signOutIcon} alt="" aria-hidden="true" className="h-4 w-4 brightness-0 invert drop-shadow-[0_0_0.35px_rgba(255,255,255,0.95)]" />
            <span>Sair da conta</span>
          </AppButton>
        </div>

        <p className="text-center text-sm text-text-secondary">
          Gerencie suas informações pessoais e configurações de conta.
        </p>
        <p className="text-center text-sm text-text-secondary">
          Identificador: <span className="font-semibold text-text-primary">{formatUserTag(user.name, user.id)}</span>
        </p>

        {(pageError || (!isSaveConfirmOpen && !isDeleteConfirmOpen && authError?.formError)) && (
          <StatusAlert tone="error">
            <span id={PAGE_ERROR_ID}>{pageError || authError?.formError}</span>
          </StatusAlert>
        )}

        {localSuccess && (
          <StatusAlert tone="success">{localSuccess}</StatusAlert>
        )}

        <section className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr]">
          <CardSection>
            <h2 className="mb-4 text-xl font-semibold">Foto de Perfil</h2>

            <div className="mx-auto mb-4 flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border border-surface-2 bg-surface-2">
              {avatarPreviewUrl ? (
                <img src={avatarPreviewUrl} alt="Avatar" className="h-full w-full object-cover" />
              ) : (
                <span className="text-sm text-text-secondary">Sem foto</span>
              )}
            </div>

            <div className="space-y-3">
              <AppButton
                onClick={() => fileInputRef.current?.click()}
                variant="secondary"
                fullWidth
                className="text-sm"
              >
                {avatarPreviewUrl ? 'Trocar Foto' : 'Enviar Foto'}
              </AppButton>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarFile}
                className="hidden"
              />

              <AppButton
                onClick={() => {
                  setAvatarPreviewUrl((previous) => {
                    revokeIfBlobUrl(previous);
                    return '';
                  });
                  setAvatarFile(null);
                  setAvatarMarkedForRemoval(true);
                  setPageError(null);
                }}
                variant="secondary"
                fullWidth
                className="text-sm"
              >
                Remover Foto
              </AppButton>

              <AppButton
                disabled={!hasAvatarChanged}
                onClick={() => openSaveConfirm('avatar')}
                variant="primary"
                fullWidth
                className="text-sm"
                isLoading={isSaving && saveMode === 'avatar'}
                loadingText="SALVANDO..."
              >
                Salvar foto
              </AppButton>
            </div>
          </CardSection>

          <CardSection>
            <h2 className="mb-4 text-xl font-semibold">Dados da Conta</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="profile-name" className="mb-1 block text-sm text-text-secondary">Nome</label>
                <input
                  id="profile-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  aria-describedby={pageError ? PAGE_ERROR_ID : undefined}
                  aria-invalid={Boolean(pageError)}
                  className="w-full rounded-sm border border-surface-2 bg-text-primary p-2 text-surface-0"
                />
              </div>

              <div>
                <label htmlFor="profile-email" className="mb-1 block text-sm text-text-secondary">Email</label>
                <input
                  id="profile-email"
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full cursor-not-allowed rounded-sm border border-surface-2 bg-surface-2 p-2 text-text-secondary"
                />
              </div>

              <div>
                <label htmlFor="profile-new-password" className="mb-1 block text-sm text-text-secondary">Nova senha</label>
                <PasswordInput
                  id="profile-new-password"
                  visible={showNewPassword}
                  onToggleVisibility={() => setShowNewPassword((prev) => !prev)}
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  placeholder="Deixe em branco para manter"
                  autoComplete="new-password"
                  aria-describedby={pageError ? PAGE_ERROR_ID : undefined}
                  aria-invalid={Boolean(pageError)}
                  className="rounded-sm border border-surface-2 bg-text-primary p-2 text-surface-0"
                />
              </div>

              <div>
                <label htmlFor="profile-confirm-new-password" className="mb-1 block text-sm text-text-secondary">Confirmar nova senha</label>
                <PasswordInput
                  id="profile-confirm-new-password"
                  visible={showConfirmNewPassword}
                  onToggleVisibility={() => setShowConfirmNewPassword((prev) => !prev)}
                  value={confirmNewPassword}
                  onChange={(event) => setConfirmNewPassword(event.target.value)}
                  placeholder="Repita a nova senha"
                  autoComplete="new-password"
                  aria-describedby={pageError ? PAGE_ERROR_ID : undefined}
                  aria-invalid={Boolean(pageError)}
                  className="rounded-sm border border-surface-2 bg-text-primary p-2 text-surface-0"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <AppButton
                disabled={!hasProfileChanges}
                onClick={() => openSaveConfirm('profile')}
                variant="primary"
                className="px-5"
                isLoading={isSaving && saveMode === 'profile'}
                loadingText="SALVANDO..."
              >
                SALVAR ALTERAÇÕES
              </AppButton>
            </div>
          </CardSection>
        </section>

        <CardSection variant="danger">
          <h2 className="mb-2 text-xl font-semibold text-feedback-negative">Zona de Perigo</h2>
          <p className="mb-4 text-sm text-text-secondary">
            Esta ação é irreversível. Todos os seus dados de conta serão removidos.
          </p>

          <AppButton
            onClick={() => {
              setDeletePassword('');
              setDeletePhrase('');
              setDeleteModalError(null);
              setPageError(null);
              setIsDeleteConfirmOpen(true);
            }}
            variant="danger"
            className="flex items-center gap-2 px-5"
          >
            <img src={trashIcon} alt="" aria-hidden="true" className="h-4 w-4 brightness-0 invert drop-shadow-[0_0_0.35px_rgba(255,255,255,0.95)]" />
            <span>EXCLUIR CONTA PERMANENTEMENTE</span>
          </AppButton>
        </CardSection>
      </div>

      <Modal
        isOpen={isSaveConfirmOpen}
        onClose={() => {
          if (isSaving) return;
          setIsSaveConfirmOpen(false);
          setSavePassword('');
          setSaveModalError(null);
        }}
        title={saveMode === 'avatar' ? 'Confirmar foto de perfil' : 'Confirmar alterações'}
        hideFooter
      >
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">
            {saveMode === 'avatar'
              ? 'Para salvar a nova foto de perfil, confirme sua senha atual.'
              : 'Para salvar as alterações, confirme sua senha atual.'}
          </p>

          {saveModalError && (
            <StatusAlert tone="error" className="px-3 py-2">
              <span id={SAVE_MODAL_ERROR_ID}>{saveModalError}</span>
            </StatusAlert>
          )}

          <input type="text" name="save_username" autoComplete="username" className="hidden" />
          <input type="password" name="save_fake_password" autoComplete="new-password" className="hidden" />

          <div>
            <label htmlFor="save-current-password" className="mb-1 block text-sm text-text-secondary">Senha atual</label>
            <PasswordInput
              id="save-current-password"
              visible={showSavePassword}
              onToggleVisibility={() => setShowSavePassword((prev) => !prev)}
              name={saveMode === 'avatar' ? 'save_avatar_password' : 'save_profile_password'}
              value={savePassword}
              onChange={(event) => setSavePassword(event.target.value)}
              autoComplete="off"
              data-lpignore="true"
              data-1p-ignore="true"
              readOnly
              onFocus={(event) => event.currentTarget.removeAttribute('readonly')}
              aria-describedby={saveModalError ? SAVE_MODAL_ERROR_ID : undefined}
              aria-invalid={Boolean(saveModalError)}
              className="rounded-sm border border-surface-2 bg-text-primary p-2 text-surface-0"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <AppButton
              disabled={isSaving}
              onClick={() => {
                setIsSaveConfirmOpen(false);
                setSavePassword('');
                setSaveModalError(null);
              }}
              variant="secondary"
            >
              Cancelar
            </AppButton>
            <AppButton
              disabled={!savePassword.trim()}
              onClick={handleSaveChanges}
              variant="primary"
              isLoading={isSaving}
              loadingText="SALVANDO..."
            >
              Confirmar e salvar
            </AppButton>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteConfirmOpen}
        overlayClassName="bg-red-950/30"
        onClose={() => {
          if (isDeleting) return;
          setIsDeleteConfirmOpen(false);
          setDeleteModalError(null);
        }}
        title="Confirmar exclusão de conta"
        hideFooter
      >
        <form className="space-y-4" autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input type="text" name="username" autoComplete="username" className="hidden" />
          <input type="password" name="fake_password" autoComplete="new-password" className="hidden" />
          <p className="text-sm text-text-secondary">
            Digite sua senha atual e confirme o texto para excluir sua conta permanentemente.
          </p>

          {deleteModalError && (
            <StatusAlert tone="error" className="px-3 py-2">
              <span id={DELETE_MODAL_ERROR_ID}>{deleteModalError}</span>
            </StatusAlert>
          )}

          <div>
            <label htmlFor="delete-current-password" className="mb-1 block text-sm text-text-secondary">Senha atual</label>
            <PasswordInput
              id="delete-current-password"
              visible={showDeletePassword}
              onToggleVisibility={() => setShowDeletePassword((prev) => !prev)}
              name="delete_password_input"
              value={deletePassword}
              onChange={(event) => setDeletePassword(event.target.value)}
              autoComplete="off"
              data-lpignore="true"
              data-1p-ignore="true"
              readOnly
              onFocus={(event) => event.currentTarget.removeAttribute('readonly')}
              aria-describedby={deleteModalError ? DELETE_MODAL_ERROR_ID : undefined}
              aria-invalid={Boolean(deleteModalError)}
              className="rounded-sm border border-surface-2 bg-text-primary p-2 text-surface-0"
            />
          </div>

          <div>
            <label htmlFor="delete-confirm-phrase" className="mb-1 block text-sm text-text-secondary">
              Digite exatamente: <span className="font-semibold">{DELETE_PHRASE}</span>
            </label>
            <input
              id="delete-confirm-phrase"
              type="text"
              value={deletePhrase}
              onChange={(event) => setDeletePhrase(event.target.value)}
              aria-describedby={deleteModalError ? DELETE_MODAL_ERROR_ID : undefined}
              aria-invalid={Boolean(deleteModalError)}
              className="w-full rounded-sm border border-surface-2 bg-text-primary p-2 text-surface-0"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <AppButton
              disabled={isDeleting}
              onClick={() => {
                setIsDeleteConfirmOpen(false);
                setDeleteModalError(null);
              }}
              variant="secondary"
            >
              Cancelar
            </AppButton>
            <AppButton
              disabled={!isDeleteEnabled}
              onClick={handleDeleteAccount}
              variant="danger"
              isLoading={isDeleting}
              loadingText="EXCLUINDO..."
            >
              Excluir permanentemente
            </AppButton>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isCropModalOpen}
        onClose={() => {
          setIsCropModalOpen(false);
          setCropImageSrc(null);
          setCroppedAreaPixels(null);
        }}
        title="Ajustar foto de perfil"
        hideFooter
      >
        <div className="space-y-4">
          <p className="text-sm text-text-secondary">Arraste a imagem e ajuste o zoom para definir o enquadramento.</p>

          <div className="relative h-[320px] w-full overflow-hidden rounded-xl border border-surface-2 bg-surface-0">
            {cropImageSrc && (
              <Cropper
                image={cropImageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            )}
          </div>

          <div>
            <label htmlFor="profile-avatar-zoom" className="mb-1 block text-sm text-text-secondary">Zoom</label>
            <input
              id="profile-avatar-zoom"
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(event) => setZoom(Number(event.target.value))}
              className="w-full"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <AppButton
              onClick={() => {
                setIsCropModalOpen(false);
                setCropImageSrc(null);
                setCroppedAreaPixels(null);
              }}
              variant="secondary"
            >
              Cancelar
            </AppButton>
            <AppButton onClick={handleConfirmCrop} variant="primary">
              Confirmar enquadramento
            </AppButton>
          </div>
        </div>
      </Modal>
    </PageShell>
  );
}
