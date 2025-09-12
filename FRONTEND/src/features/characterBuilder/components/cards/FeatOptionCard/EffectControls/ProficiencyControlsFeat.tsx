import { ProcessedEffect } from '../../../../types/effectTypes';
import { ProficiencyTag } from '../../OriginOptionCard/components/ProficiencyTag';
import {
  getSkillNameTranslation,
  getToolNameTranslation,
} from '../../../../lib/translationHelpers';

interface ProficiencyControlsFeatProps {
  effect: ProcessedEffect & {
    proficiencyType: string;
    choose?: {
      from: string[];
      count: number | 'all';
    };
    on?: string;
    proficiencies?: string[];
    selected?: string | string[];
  };
}

/**
 * Controles para proficiências específicos do FeatOptionCard
 * Versão data-driven que usa apenas os dados dos efeitos processados
 * Similar ao ProficiencyControlsOrigin, mas adaptado para talentos
 */
export function ProficiencyControlsFeat({ effect }: ProficiencyControlsFeatProps) {
  const { choose, proficiencyType, selected, on, proficiencies } = effect;

  const getDisplayName = (id: string) => {
    if (proficiencyType === 'skill') {
      return getSkillNameTranslation(id);
    } else if (proficiencyType === 'tool') {
      return getToolNameTranslation(id);
    }
    return id;
  };

  // Determina as proficiências que serão concedidas baseando-se apenas nos dados do efeito
  let grantedProficiencies: string[] = [];

  // Caso 1: Proficiências fixas definidas diretamente no efeito
  if (proficiencies && Array.isArray(proficiencies)) {
    grantedProficiencies = proficiencies;
  }
  // Caso 2: Proficiências já selecionadas/processadas pelo hook
  else if (Array.isArray(selected) && selected.length > 0) {
    grantedProficiencies = selected;
  }
  // Caso 3: Choose onde não há escolha real (count >= from.length ou count === 'all')
  else if (choose && Array.isArray(choose.from)) {
    const { count, from } = choose;
    if (count === 'all' || (typeof count === 'number' && count >= from.length)) {
      grantedProficiencies = from;
    }
    // Se há escolha real, será tratado pela UI de seleção (não implementada aqui)
    // Talentos tipicamente requerem mais escolhas do usuário do que origens
  }

  // Se não há proficiências para exibir, retorna null
  if (grantedProficiencies.length === 0) {
    return null;
  }

  // Caso especial: proficiência em iniciativa
  if (on === 'initiative') {
    return (
      <div className="bg-transparent">
        <div className="flex flex-wrap gap-2">
          <div className="animate-fadeIn">
            <ProficiencyTag name="Iniciativa" state="granted" />
          </div>
        </div>
      </div>
    );
  }

  // Renderiza as proficiências garantidas
  return (
    <div className="bg-transparent">
      <div className="flex flex-wrap gap-2">
        {grantedProficiencies.map((prof: string, index) => (
          <div key={prof} className="animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>
            <ProficiencyTag name={getDisplayName(prof)} state="granted" />
          </div>
        ))}
      </div>
    </div>
  );
}
