import { useState } from 'react';

import { useFormContext } from 'react-hook-form';

import { CharacterBuilderFormData } from '../../schemas/characterBuilderSchema';

export function PersonalInfoSection() {
  // Hook para acessar o contexto do formulário
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<CharacterBuilderFormData>();

  // Observando os campos de URL para mostrar as previews
  const tokenUrl = watch('personal-info.tokenUrl');
  const splashartUrl = watch('personal-info.splashartUrl');

  // Estados para controlar a visualização das imagens
  const [showTokenPreview, setShowTokenPreview] = useState(!!tokenUrl);
  const [showSplashartPreview, setShowSplashartPreview] = useState(!!splashartUrl);
  const [tokenImageStatus, setTokenImageStatus] = useState<'loading' | 'error' | 'success'>(
    tokenUrl ? 'loading' : 'error',
  );
  const [splashartImageStatus, setSplashartImageStatus] = useState<'loading' | 'error' | 'success'>(
    splashartUrl ? 'loading' : 'error',
  );

  // Funções de utilidade para validação de URL
  const isValidUrl = (url?: string) => {
    return url && (url.startsWith('http://') || url.startsWith('https://'));
  };

  // Efeitos para atualizar o status da visualização quando as URLs mudam
  const handleTokenUrlChange = (url?: string) => {
    if (isValidUrl(url)) {
      setShowTokenPreview(true);
      setTokenImageStatus('loading');
    } else {
      setShowTokenPreview(false);
      setTokenImageStatus('error');
    }
  };

  const handleSplashartUrlChange = (url?: string) => {
    if (isValidUrl(url)) {
      setShowSplashartPreview(true);
      setSplashartImageStatus('loading');
    } else {
      setShowSplashartPreview(false);
      setSplashartImageStatus('error');
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <label
            htmlFor="character-name"
            className="text-primary text-lg font-medium"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Nome do Personagem
          </label>
          <span
            className="rounded px-1.5 py-0.5 text-xs"
            style={{
              backgroundColor: 'var(--color-feedback-negative)',
              color: 'var(--color-surface-0)',
            }}
          >
            Obrigatório
          </span>
        </div>
        <div>
          <input
            id="character-name"
            type="text"
            className={`bg-surface-2 w-full rounded-md border px-4 py-2 ${
              errors['personal-info']?.name ? 'border-red-500' : 'border-gray-300'
            }`}
            style={{
              backgroundColor: 'var(--color-surface-2)',
              borderColor: errors['personal-info']?.name
                ? 'var(--color-feedback-negative)'
                : 'var(--color-surface-3)',
              color: 'var(--color-text-primary)',
            }}
            placeholder="Digite o nome do seu personagem"
            {...register('personal-info.name')}
          />
          {errors['personal-info']?.name && (
            <p className="mt-1 text-sm text-red-500">{errors['personal-info']?.name?.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div
          className="text-primary text-lg font-medium"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Imagens do Personagem
        </div>

        {/* Token Image */}
        <div className="space-y-3">
          <label
            htmlFor="token-url"
            className="text-primary font-medium"
            style={{ color: 'var(--color-text-primary)' }}
          >
            URL do Token (imagem quadrada)
          </label>
          <div className="flex items-start gap-4">
            <div
              className="bg-surface-2 relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-md border-2 border-dashed"
              style={{
                borderColor: 'var(--color-surface-3)',
                backgroundColor: 'var(--color-surface-2)',
              }}
            >
              {tokenUrl && showTokenPreview ? (
                <>
                  <img
                    src={tokenUrl}
                    alt="Preview do token"
                    className="h-full w-full object-cover"
                    onError={() => {
                      setShowTokenPreview(false);
                      setTokenImageStatus('error');
                    }}
                    onLoad={(e) => {
                      // Verificando se a imagem carregou corretamente
                      const img = e.target as HTMLImageElement;
                      if (img.naturalWidth === 0 || img.naturalHeight === 0) {
                        setShowTokenPreview(false);
                        setTokenImageStatus('error');
                      } else {
                        setTokenImageStatus('success');
                      }
                    }}
                  />
                  <div className="bg-surface-2 bg-opacity-50 absolute inset-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100">
                    <a
                      href={tokenUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary bg-accent-primary rounded-md px-2 py-1 text-xs"
                      style={{
                        backgroundColor: 'var(--color-accent-primary)',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      Ver original
                    </a>
                  </div>
                </>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center p-2 text-center">
                  <span
                    className="text-secondary mb-1 text-xs"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    Token
                  </span>
                  <span
                    className="text-secondary text-xs"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    Quadrado 256x256px
                  </span>
                </div>
              )}
            </div>
            <div className="flex-grow space-y-2">
              <div className="flex items-center">
                <input
                  id="token-url"
                  type="url"
                  className={`bg-surface-2 flex-grow rounded-l-md border px-3 py-1 text-sm ${
                    errors['personal-info']?.tokenUrl ? 'border-red-500' : 'border-gray-300'
                  }`}
                  style={{
                    backgroundColor: 'var(--color-surface-2)',
                    borderColor: errors['personal-info']?.tokenUrl
                      ? 'var(--color-feedback-negative)'
                      : 'var(--color-surface-3)',
                    color: 'var(--color-text-primary)',
                  }}
                  placeholder="https://exemplo.com/imagem-token.png"
                  {...register('personal-info.tokenUrl', {
                    onChange: (e) => handleTokenUrlChange(e.target.value),
                  })}
                />
                {tokenUrl && (
                  <div className="ml-2 flex-shrink-0">
                    {tokenImageStatus === 'loading' && (
                      <div className="border-t-accent-primary h-4 w-4 animate-spin rounded-full border-2 border-gray-300" />
                    )}
                    {tokenImageStatus === 'success' && (
                      <div
                        className="bg-positive h-4 w-4 rounded-full"
                        style={{ backgroundColor: 'var(--color-feedback-positive)' }}
                      />
                    )}
                    {tokenImageStatus === 'error' && (
                      <div
                        className="bg-negative h-4 w-4 rounded-full"
                        style={{ backgroundColor: 'var(--color-feedback-negative)' }}
                      />
                    )}
                  </div>
                )}
              </div>
              <p
                className="text-secondary text-xs"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Cole o link de uma imagem para o token do personagem
              </p>
              {errors['personal-info']?.tokenUrl && (
                <p className="text-sm text-red-500">{errors['personal-info']?.tokenUrl?.message}</p>
              )}
              {tokenUrl && showTokenPreview && (
                <button
                  onClick={() => setShowTokenPreview(false)}
                  className="text-secondary text-xs underline"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Ocultar imagem
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Splashart Image */}
        <div className="space-y-3">
          <label
            htmlFor="splashart-url"
            className="text-primary font-medium"
            style={{ color: 'var(--color-text-primary)' }}
          >
            URL da Splashart (arte do personagem)
          </label>
          <div className="flex items-start gap-4">
            <div
              className="bg-surface-2 relative w-32 flex-shrink-0 overflow-hidden rounded-md border-2 border-dashed"
              style={{
                borderColor: 'var(--color-surface-3)',
                backgroundColor: 'var(--color-surface-2)',
                height: '11.5rem', // Aumentando a altura para melhorar a proporção
              }}
            >
              {splashartUrl && showSplashartPreview ? (
                <>
                  <img
                    src={splashartUrl}
                    alt="Preview da splashart"
                    className="h-full w-full object-cover"
                    onError={() => {
                      setShowSplashartPreview(false);
                      setSplashartImageStatus('error');
                    }}
                    onLoad={(e) => {
                      // Verificando se a imagem carregou corretamente
                      const img = e.target as HTMLImageElement;
                      if (img.naturalWidth === 0 || img.naturalHeight === 0) {
                        setShowSplashartPreview(false);
                        setSplashartImageStatus('error');
                      } else {
                        setSplashartImageStatus('success');
                      }
                    }}
                  />
                  <div className="bg-surface-2 bg-opacity-50 absolute inset-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100">
                    <a
                      href={splashartUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary bg-accent-primary rounded-md px-2 py-1 text-xs"
                      style={{
                        backgroundColor: 'var(--color-accent-primary)',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      Ver original
                    </a>
                  </div>
                </>
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center p-2 text-center">
                  <span
                    className="text-secondary mb-1 text-xs"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    Splashart
                  </span>
                  <span
                    className="text-secondary text-xs"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    Arte do personagem
                  </span>
                </div>
              )}
            </div>
            <div className="flex-grow space-y-2">
              <div className="flex items-center">
                <input
                  id="splashart-url"
                  type="url"
                  className={`bg-surface-2 flex-grow rounded-l-md border px-3 py-1 text-sm ${
                    errors['personal-info']?.splashartUrl ? 'border-red-500' : 'border-gray-300'
                  }`}
                  style={{
                    backgroundColor: 'var(--color-surface-2)',
                    borderColor: errors['personal-info']?.splashartUrl
                      ? 'var(--color-feedback-negative)'
                      : 'var(--color-surface-3)',
                    color: 'var(--color-text-primary)',
                  }}
                  placeholder="https://exemplo.com/splashart.jpg"
                  {...register('personal-info.splashartUrl', {
                    onChange: (e) => handleSplashartUrlChange(e.target.value),
                  })}
                />
                {splashartUrl && (
                  <div className="ml-2 flex-shrink-0">
                    {splashartImageStatus === 'loading' && (
                      <div className="border-t-accent-primary h-4 w-4 animate-spin rounded-full border-2 border-gray-300" />
                    )}
                    {splashartImageStatus === 'success' && (
                      <div
                        className="bg-positive h-4 w-4 rounded-full"
                        style={{ backgroundColor: 'var(--color-feedback-positive)' }}
                      />
                    )}
                    {splashartImageStatus === 'error' && (
                      <div
                        className="bg-negative h-4 w-4 rounded-full"
                        style={{ backgroundColor: 'var(--color-feedback-negative)' }}
                      />
                    )}
                  </div>
                )}
              </div>
              <p
                className="text-secondary text-xs"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Cole o link de uma imagem para a arte completa do personagem
              </p>
              {errors['personal-info']?.splashartUrl && (
                <p className="text-sm text-red-500">
                  {errors['personal-info']?.splashartUrl?.message}
                </p>
              )}
              {splashartUrl && showSplashartPreview && (
                <button
                  onClick={() => setShowSplashartPreview(false)}
                  className="text-secondary text-xs underline"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Ocultar imagem
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label
          htmlFor="character-lore"
          className="text-primary text-lg font-medium"
          style={{ color: 'var(--color-text-primary)' }}
        >
          História do Personagem
        </label>
        <div>
          <textarea
            id="character-lore"
            className={`bg-surface-2 w-full rounded-md border px-4 py-2 ${
              errors['personal-info']?.lore ? 'border-red-500' : 'border-gray-300'
            }`}
            style={{
              backgroundColor: 'var(--color-surface-2)',
              borderColor: errors['personal-info']?.lore
                ? 'var(--color-feedback-negative)'
                : 'var(--color-surface-3)',
              color: 'var(--color-text-primary)',
              minHeight: '200px',
            }}
            placeholder="Conte um pouco sobre a história do seu personagem..."
            {...register('personal-info.lore')}
          />
          {errors['personal-info']?.lore && (
            <p className="mt-1 text-sm text-red-500">{errors['personal-info']?.lore?.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
