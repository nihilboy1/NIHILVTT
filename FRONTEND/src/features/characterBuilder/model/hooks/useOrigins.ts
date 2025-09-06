import { useEffect, useState } from 'react';

import { Origin, fetchOrigins, fetchOriginById } from '@/shared/api/characterDataApi';

/**
 * Hook para buscar e gerenciar origens do personagem
 */
export function useOrigins() {
  const [origins, setOrigins] = useState<Origin[]>([]);
  const [selectedOriginId, setSelectedOriginId] = useState<string | null>(null);
  const [selectedOrigin, setSelectedOrigin] = useState<Origin | null>(null);

  // Estados de loading e erro para todas as origens
  const [isLoadingOrigins, setIsLoadingOrigins] = useState<boolean>(true);
  const [isErrorOrigins, setIsErrorOrigins] = useState<boolean>(false);
  const [originsError, setOriginsError] = useState<Error | null>(null);

  // Estados de loading e erro para origem selecionada
  const [isLoadingSelectedOrigin, setIsLoadingSelectedOrigin] = useState<boolean>(false);
  const [isErrorSelectedOrigin, setIsErrorSelectedOrigin] = useState<boolean>(false);
  const [selectedOriginError, setSelectedOriginError] = useState<Error | null>(null);

  // Efeito para buscar todas as origens
  useEffect(() => {
    const loadOrigins = async () => {
      setIsLoadingOrigins(true);
      setIsErrorOrigins(false);
      setOriginsError(null);

      try {
        const result = await fetchOrigins();
        setOrigins(result);
      } catch (error) {
        setIsErrorOrigins(true);
        setOriginsError(error instanceof Error ? error : new Error(String(error)));
      } finally {
        setIsLoadingOrigins(false);
      }
    };

    loadOrigins();
  }, []);

  // Efeito para buscar uma origem específica quando um ID é selecionado
  useEffect(() => {
    if (!selectedOriginId) {
      setSelectedOrigin(null);
      return;
    }

    // Primeiro tenta encontrar a origem na lista já carregada
    const originFromList = origins.find((origin) => origin.id === selectedOriginId);
    if (originFromList) {
      setSelectedOrigin(originFromList);
      return;
    }

    // Se não encontrar na lista, busca na API
    const loadSelectedOrigin = async () => {
      setIsLoadingSelectedOrigin(true);
      setIsErrorSelectedOrigin(false);
      setSelectedOriginError(null);

      try {
        const result = await fetchOriginById(selectedOriginId);
        setSelectedOrigin(result);
      } catch (error) {
        setIsErrorSelectedOrigin(true);
        setSelectedOriginError(error instanceof Error ? error : new Error(String(error)));
      } finally {
        setIsLoadingSelectedOrigin(false);
      }
    };

    loadSelectedOrigin();
  }, [selectedOriginId, origins]);

  // Seleciona uma origem pelo ID
  const selectOrigin = (id: string) => {
    setSelectedOriginId(id);
  };

  return {
    // Lista de origens
    origins,
    isLoadingOrigins,
    isErrorOrigins,
    originsError,

    // Origem selecionada
    selectedOrigin,
    isLoadingSelectedOrigin,
    isErrorSelectedOrigin,
    selectedOriginError,

    // Ações
    selectOrigin,
  };
}
