import { FaCheck } from 'react-icons/fa';
import { ProcessedEffect } from '../../../../types/effectTypes';
import { ProficiencyTag } from '../components/ProficiencyTag';
import { cn } from '@/shared/lib/utils/cn';
import { effectCardVariants } from '@/features/characterBuilder/styles';

interface ProficiencyControlsOriginProps {
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
 * Controles para proficiências específicos do OriginOptionCard
 * Versão melhorada do componente inline original
 */
export function ProficiencyControlsOrigin({ effect }: ProficiencyControlsOriginProps) {
  const { choose, proficiencyType, selected, on, proficiencies } = effect;

  const proficiencyTypeNames: Record<string, string> = {
    skill: 'Perícia',
    tool: 'Ferramenta',
    weaponType: 'Tipo de Arma',
    armorType: 'Tipo de Armadura',
    musicalInstrument: 'Instrumento Musical',
    savingThrow: 'Teste de Resistência',
  };

  const skillNames: Record<string, string> = {
    acrobatics: 'Acrobacia',
    animalHandling: 'Adestrar Animais',
    arcana: 'Arcana',
    athletics: 'Atletismo',
    deception: 'Enganação',
    history: 'História',
    insight: 'Intuição',
    intimidation: 'Intimidação',
    investigation: 'Investigação',
    medicine: 'Medicina',
    nature: 'Natureza',
    perception: 'Percepção',
    performance: 'Atuação',
    persuasion: 'Persuasão',
    religion: 'Religião',
    sleightOfHand: 'Prestidigitação',
    stealth: 'Furtividade',
    survival: 'Sobrevivência',
  };

  const getDisplayName = (id: string) => {
    if (proficiencyType === 'skill') {
      return skillNames[id] || id;
    }
    return id;
  };

  // Caso especial: proficiência em iniciativa
  if (on === 'initiative') {
    return (
      <div className={cn(effectCardVariants({ type: 'info' }))}>
        <h4 className="text-text-primary bg-accent-primary bg-opacity-10 mb-2 flex items-center rounded-md px-3 py-1.5 font-medium">
          <FaCheck className="text-accent-primary mr-2" />
          Proficiência Garantida
        </h4>
        <p className="text-text-secondary mb-3 text-sm">
          Você automaticamente ganha proficiência em:
        </p>
        <div className="flex flex-wrap gap-2">
          <div className="animate-fadeIn">
            <ProficiencyTag name="Iniciativa" state="granted" />
          </div>
        </div>
      </div>
    );
  }

  // Proficiências garantidas automaticamente
  if (proficiencies && Array.isArray(proficiencies) && proficiencies.length > 0) {
    return (
      <div className={cn(effectCardVariants({ type: 'info' }))}>
        <h4 className="text-text-primary bg-accent-primary bg-opacity-10 mb-2 flex items-center rounded-md px-3 py-1.5 font-medium">
          <FaCheck className="text-accent-primary mr-2" />
          Proficiências Garantidas
        </h4>
        <p className="text-text-secondary mb-3 text-sm">
          Você automaticamente ganha proficiência{' '}
          {proficiencies.length === 1 ? 'na perícia' : 'nas perícias'}:
        </p>
        <div className="flex flex-wrap gap-2">
          {proficiencies.map((prof: string, index) => (
            <div
              key={prof}
              className="animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProficiencyTag name={getDisplayName(prof)} state="granted" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Proficiências selecionadas
  if (Array.isArray(selected) && selected.length > 0) {
    return (
      <div className={cn(effectCardVariants({ type: 'info' }))}>
        <h4 className="text-text-primary bg-accent-primary bg-opacity-10 mb-2 flex items-center rounded-md px-3 py-1.5 font-medium">
          <FaCheck className="text-accent-primary mr-2" />
          Proficiências Garantidas
        </h4>
        <p className="text-text-secondary mb-3 text-sm">
          Você automaticamente ganha proficiência{' '}
          {selected.length === 1 ? 'na perícia' : 'nas perícias'}:
        </p>
        <div className="flex flex-wrap gap-2">
          {selected.map((prof: string, index) => (
            <div
              key={prof}
              className="animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProficiencyTag name={getDisplayName(prof)} state="granted" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Todas as proficiências quando count = 'all'
  if (choose && choose.count === 'all' && Array.isArray(choose.from)) {
    return (
      <div className={cn(effectCardVariants({ type: 'info' }))}>
        <h4 className="text-text-primary bg-accent-primary bg-opacity-10 mb-2 flex items-center rounded-md px-3 py-1.5 font-medium">
          <FaCheck className="text-accent-primary mr-2" />
          Proficiências Garantidas
        </h4>
        <p className="text-text-secondary mb-3 text-sm">
          Você automaticamente ganha proficiência em todas as perícias:
        </p>
        <div className="flex flex-wrap gap-2">
          {choose.from.map((prof: string, index) => (
            <div
              key={prof}
              className="animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProficiencyTag name={getDisplayName(prof)} state="granted" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Se não tem escolhas, retorna null
  if (!choose) return null;

  // Caso com escolhas limitadas
  return (
    <>
      <p className="text-text-secondary text-sm">
        Você ganha proficiência em {typeof choose.count === 'number' ? choose.count : 'todas'}{' '}
        {typeof choose.count === 'number' && choose.count === 1
          ? proficiencyTypeNames[proficiencyType]?.toLowerCase() || proficiencyType
          : (proficiencyTypeNames[proficiencyType] || proficiencyType) + 's'}
        .
      </p>

      {choose.from && Array.isArray(choose.from) && typeof choose.count === 'number' && (
        <div className={cn(effectCardVariants({ type: 'info' }), 'mt-2')}>
          <h4 className="text-text-primary bg-accent-primary bg-opacity-10 mb-2 flex items-center rounded-md px-3 py-1.5 font-medium">
            <FaCheck className="text-accent-primary mr-2" />
            Proficiências Garantidas
          </h4>
          <p className="text-text-secondary mb-3 text-sm">
            Você automaticamente ganha proficiência nestas perícias:
          </p>
          <div className="flex flex-wrap gap-2">
            {choose.from.slice(0, choose.count).map((option: string, index) => (
              <div
                key={option}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProficiencyTag name={getDisplayName(option)} state="granted" />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
