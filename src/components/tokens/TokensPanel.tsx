import React from 'react';
import { TokenType } from '../../types/index'; // Ajustar o caminho do tipo
import { UserCircleIcon, BugAntIcon } from '../icons'; // Ajustar o caminho do componente
import { TokenTemplateListItem } from '../token/TokenTemplateListItem'; // Ajustar o caminho do componente
import { useTokens } from '../../contexts/TokensContext'; // Ajustar o caminho do contexto
import { useModal } from '../../contexts/ModalContext'; // Ajustar o caminho do contexto

export function TokensPanel() {
  const { tokens, gridInstanceCounts } = useTokens();
  const { openModal } = useModal();

  const actionButtonClass = "w-full px-4 py-3 bg-accent-primary hover:bg-accent-primary-hover text-accent-primary-text font-semibold rounded-md transition-colors flex items-center justify-center space-x-2 text-sm cursor-pointer";

  return (
    <div className="flex-grow p-4 overflow-y-scroll space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Criar Novo Modelo de Token</h3>
        <div className="space-y-3">
          <button
            onClick={() => openModal('simpleName', { type: TokenType.PLAYER, title: "Nome do Novo Jogador" })}
            className={actionButtonClass}
            aria-label="Criar novo modelo de personagem jogável"
          >
            <UserCircleIcon className="w-5 h-5" />
            <span>Personagem Jogável</span>
          </button>
          <button
            onClick={() => openModal('simpleName', { type: TokenType.MONSTER_NPC, title: "Nome do Novo Monstro/NPC" })}
            className={actionButtonClass}
            aria-label="Criar novo modelo de monstro ou NPC"
          >
            <BugAntIcon className="w-5 h-5" />
            <span>Monstro / NPC</span>
          </button>
          {/* Object creation button can be added here if needed in future */}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3 mt-6 pt-4 border-t border-border-inactive">
          Modelos de Token
        </h3>
        {tokens.length === 0 ? (
          <p className="text-text-secondary">Nenhum modelo de token criado ainda.</p>
        ) : (
          <ul className="space-y-2" aria-label="Lista de modelos de token">
            {tokens.map(tokenInfo => (
              <TokenTemplateListItem
                key={tokenInfo.id}
                tokenInfo={tokenInfo}
                instanceCount={gridInstanceCounts.get(tokenInfo.id) || 0}
                openTokenSheetModal={() => openModal('tokenSheet', { tokenId: tokenInfo.id })} // Usar openModal
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
