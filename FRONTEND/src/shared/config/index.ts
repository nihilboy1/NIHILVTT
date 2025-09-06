// Configurações do ambiente
// Obtém as variáveis de ambiente do arquivo .env através do Vite

// URL base da API
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3333';

// Outras configurações da aplicação
export const APP_NAME = 'NIHIL VTT';

// Configurações de timeout para requisições
export const API_TIMEOUT = 10000; // 10 segundos

// Adicione outras configurações conforme necessário
