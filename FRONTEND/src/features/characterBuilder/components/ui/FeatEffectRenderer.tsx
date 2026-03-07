import { cn } from '@/shared/lib/utils/cn';

import { proficiencyTagVariants } from '../../styles';
import { ProcessedEffect } from '../../types/effectTypes';

import { Badge } from './Badge';
import { ProficiencyControls } from './ProficiencyControls';

interface FeatEffectRendererProps {
  effect: ProcessedEffect & {
    parentFeatId?: string;
    parentFeatName?: string;
    fromOriginFeat?: boolean;
  };
}

export function FeatEffectRenderer({ effect }: FeatEffectRendererProps) {
  // Renderiza diferentes tipos de efeitos de talentos

  if (effect.type === 'passive_grantProficiency') {
    return (
      <div className="border-info/50 bg-info/10 rounded-lg border p-3">
        <div className="mb-2 flex items-start gap-2">
          <Badge className={cn(proficiencyTagVariants({ state: 'granted' }))}>Proficiência</Badge>
          <div className="flex-1">
            <div className="text-info font-medium">{effect.name}</div>
            {effect.description && (
              <div className="text-info mt-1 text-sm">{effect.description}</div>
            )}
          </div>
        </div>
        <ProficiencyControls effect={effect} />
      </div>
    );
  }

  if (effect.type === 'passive_modifyAbilityScore') {
    return (
      <div className="border-feedback-positive/50 bg-feedback-positive/10 rounded-lg border p-3">
        <div className="mb-2 flex items-start gap-2">
          <Badge className={cn(proficiencyTagVariants({ state: 'granted' }))}>Atributo</Badge>
          <div className="flex-1">
            <div className="text-feedback-positive font-medium">{effect.name}</div>
            {effect.description && (
              <div className="text-feedback-positive mt-1 text-sm">{effect.description}</div>
            )}
          </div>
        </div>
        {/* Aqui você pode adicionar controles específicos para modificação de atributos */}
        <div className="text-feedback-positive text-sm">
          {effect.choices && effect.choices[0] && (
            <div>
              Melhoria: +{effect.choices[0].value} em {effect.choices[0].pick?.amount} atributo(s)
              {effect.choices[0].pick?.from && (
                <div className="mt-1">Opções: {effect.choices[0].pick.from.join(', ')}</div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (effect.type === 'passive_modifyUserHP') {
    return (
      <div className="border-feedback-negative/55 bg-feedback-negative/15 rounded-lg border p-3">
        <div className="mb-2 flex items-start gap-2">
          <Badge className={cn(proficiencyTagVariants({ state: 'granted' }))}>Vida</Badge>
          <div className="flex-1">
            <div className="text-feedback-negative font-medium">{effect.name}</div>
            {effect.description && (
              <div className="text-feedback-negative mt-1 text-sm">{effect.description}</div>
            )}
          </div>
        </div>
        <div className="text-feedback-negative text-sm">
          {effect.operation === 'multiply' && effect.multiplierProperty === 'level' && (
            <div>
              +{effect.amount} pontos de vida por nível (total: +{effect.amount * 2} no nível 1)
            </div>
          )}
          {effect.operation === 'add' && <div>+{effect.amount} pontos de vida</div>}
        </div>
      </div>
    );
  }

  if (effect.type === 'passive_providesSpellKnowledge') {
    return (
      <div className="border-accent-secondary/55 bg-accent-secondary/15 rounded-lg border p-3">
        <div className="mb-2 flex items-start gap-2">
          <Badge className={cn(proficiencyTagVariants({ state: 'granted' }))}>Magia</Badge>
          <div className="flex-1">
            <div className="text-accent-secondary font-medium">{effect.name}</div>
            {effect.description && (
              <div className="text-accent-secondary mt-1 text-sm">{effect.description}</div>
            )}
          </div>
        </div>
        <div className="text-accent-secondary text-sm">
          {effect.amount && <div>Aprende {effect.amount} magia(s)</div>}
          {effect.filter && (
            <div className="mt-1">
              Filtros:
              {effect.filter.level !== undefined && ` Nível ${effect.filter.level}`}
              {effect.filter.class && ` da classe ${effect.filter.class}`}
            </div>
          )}
          {effect.castingAbilityOptions && (
            <div className="mt-1">
              Atributo de conjuração: {effect.castingAbilityOptions.join(', ')}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Efeito genérico para tipos não especificamente tratados
  return (
    <div className="border-surface-3 bg-surface-1/70 rounded-lg border p-3">
      <div className="mb-2 flex items-start gap-2">
        <Badge className={cn(proficiencyTagVariants({ state: 'granted' }))}>
          {effect.type.replace('passive_', '').replace(/([A-Z])/g, ' $1')}
        </Badge>
        <div className="flex-1">
          <div className="text-text-primary font-medium">{effect.name}</div>
          {effect.description && (
            <div className="text-text-secondary mt-1 text-sm">{effect.description}</div>
          )}
        </div>
      </div>
      {effect.requiresChoice && (
        <div className="text-text-secondary mt-2 text-sm">
          Este efeito requer escolha do usuário.
        </div>
      )}
    </div>
  );
}
