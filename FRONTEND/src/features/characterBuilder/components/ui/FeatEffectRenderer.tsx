import React from 'react';
import { ProcessedEffect } from '../../types/effectTypes';
import { Badge } from './Badge';
import { cn } from '@/shared/lib/utils/cn';
import { proficiencyTagVariants } from '../../styles';
import { ProficiencyControls } from './ProficiencyControls';

interface FeatEffectRendererProps {
  effect: ProcessedEffect & {
    parentFeatId?: string;
    parentFeatName?: string;
    fromOriginFeat?: boolean;
  };
}

export const FeatEffectRenderer: React.FC<FeatEffectRendererProps> = ({ effect }) => {
  // Renderiza diferentes tipos de efeitos de talentos

  if (effect.type === 'passive_grantProficiency') {
    return (
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
        <div className="mb-2 flex items-start gap-2">
          <Badge className={cn(proficiencyTagVariants({ state: 'granted' }))}>Proficiência</Badge>
          <div className="flex-1">
            <div className="font-medium text-blue-800">{effect.name}</div>
            {effect.description && (
              <div className="mt-1 text-sm text-blue-600">{effect.description}</div>
            )}
          </div>
        </div>
        <ProficiencyControls effect={effect} />
      </div>
    );
  }

  if (effect.type === 'passive_modifyAbilityScore') {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-3">
        <div className="mb-2 flex items-start gap-2">
          <Badge className={cn(proficiencyTagVariants({ state: 'granted' }))}>Atributo</Badge>
          <div className="flex-1">
            <div className="font-medium text-green-800">{effect.name}</div>
            {effect.description && (
              <div className="mt-1 text-sm text-green-600">{effect.description}</div>
            )}
          </div>
        </div>
        {/* Aqui você pode adicionar controles específicos para modificação de atributos */}
        <div className="text-sm text-green-700">
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
      <div className="rounded-lg border border-red-200 bg-red-50 p-3">
        <div className="mb-2 flex items-start gap-2">
          <Badge className={cn(proficiencyTagVariants({ state: 'granted' }))}>Vida</Badge>
          <div className="flex-1">
            <div className="font-medium text-red-800">{effect.name}</div>
            {effect.description && (
              <div className="mt-1 text-sm text-red-600">{effect.description}</div>
            )}
          </div>
        </div>
        <div className="text-sm text-red-700">
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
      <div className="rounded-lg border border-purple-200 bg-purple-50 p-3">
        <div className="mb-2 flex items-start gap-2">
          <Badge className={cn(proficiencyTagVariants({ state: 'granted' }))}>Magia</Badge>
          <div className="flex-1">
            <div className="font-medium text-purple-800">{effect.name}</div>
            {effect.description && (
              <div className="mt-1 text-sm text-purple-600">{effect.description}</div>
            )}
          </div>
        </div>
        <div className="text-sm text-purple-700">
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
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
      <div className="mb-2 flex items-start gap-2">
        <Badge className={cn(proficiencyTagVariants({ state: 'granted' }))}>
          {effect.type.replace('passive_', '').replace(/([A-Z])/g, ' $1')}
        </Badge>
        <div className="flex-1">
          <div className="font-medium text-gray-800">{effect.name}</div>
          {effect.description && (
            <div className="mt-1 text-sm text-gray-600">{effect.description}</div>
          )}
        </div>
      </div>
      {effect.requiresChoice && (
        <div className="mt-2 text-sm text-gray-600">Este efeito requer escolha do usuário.</div>
      )}
    </div>
  );
};
