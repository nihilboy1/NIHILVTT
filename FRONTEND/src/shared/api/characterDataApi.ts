import { api } from './api';

// Tipos
export interface Origin {
  id: string;
  name: string | string[]; // Pode ser uma string única ou um array de strings
  source: string; // Fonte da origem (ex: "LDJ2024")
  description: string;
  features?: string[]; // Opcional, já que nem todas as origens podem ter isso
  // Adicionar outros campos conforme necessário
}

// Endpoints
const ENDPOINTS = {
  ORIGINS: '/origins',
  // Adicione outros endpoints conforme necessário, ex:
  // CLASSES: '/classes',
  // RACES: '/races',
};

// Função para buscar todas as origens
export const fetchOrigins = async (): Promise<Origin[]> => {
  try {
    const response = await api.get(ENDPOINTS.ORIGINS);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar origens:', error);
    throw error;
  }
};

// Função para buscar uma origem específica pelo ID
export const fetchOriginById = async (id: string): Promise<Origin> => {
  try {
    const response = await api.get(`${ENDPOINTS.ORIGINS}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar origem com ID ${id}:`, error);
    throw error;
  }
};

// Adicione outras funções para buscar outros tipos de dados no futuro
// Ex: fetchClasses, fetchRaces, etc.
