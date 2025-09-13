import React from 'react';
import { Card } from '../ui/Card';
import { FeatEffectControls } from '../ui/FeatEffectControls';
import { FeatEffectRenderer } from '../ui/FeatEffectRenderer';
import { useCharacterBuilder } from '../../model/hooks/useCharacterBuilder';
import { getOriginById } from '../../schemas/characterBuilderSchema';

interface FeatStepProps {
  className?: string;
}

export const FeatStep: React.FC<FeatStepProps> = ({ className }) => {
  const { selections, effectsProcessor } = useCharacterBuilder();

  // Obtém a origem selecionada
  const origin = selections.origin ? getOriginById(selections.origin) : null;

  // Processa os efeitos da origem para obter talentos
  const processedEffects = origin ? effectsProcessor.processOriginEffects(origin) : [];
  const featEffects = processedEffects.filter((effect) => effect.type === 'passive_providesFeat');

  // Processa os efeitos dos talentos fornecidos pela origem
  const featInternalEffects = origin ? effectsProcessor.processFeatEffectsFromOrigin(origin) : [];

  if (!origin) {
    return (
      <div className={className}>
        <Card className="p-6 text-center">
          <h3 className="mb-2 text-lg font-medium text-gray-600">Selecione uma Origem</h3>
          <p className="text-sm text-gray-500">
            Primeiro você precisa selecionar uma origem para ver os talentos disponíveis.
          </p>
        </Card>
      </div>
    );
  }

  if (featEffects.length === 0) {
    return (
      <div className={className}>
        <Card className="p-6 text-center">
          <h3 className="mb-2 text-lg font-medium text-gray-600">Nenhum Talento Disponível</h3>
          <p className="text-sm text-gray-500">
            A origem <strong>{Array.isArray(origin.name) ? origin.name[0] : origin.name}</strong>{' '}
            não fornece talentos adicionais neste nível.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-gray-800">Talentos da Origem</h2>
          <p className="text-gray-600">
            Sua origem <strong>{Array.isArray(origin.name) ? origin.name[0] : origin.name}</strong>{' '}
            fornece os seguintes talentos:
          </p>
        </div>

        {/* Lista de efeitos de talentos fornecidos */}
        <div className="space-y-4">
          {featEffects.map((effect) => (
            <Card key={effect.id} className="p-4">
              <div className="flex flex-col">
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="text-lg font-medium text-gray-800">{effect.name}</h3>
                  {effect.requiresChoice && (
                    <span className="rounded bg-blue-100 px-2 py-1 text-sm text-blue-700">
                      Requer Escolha
                    </span>
                  )}
                </div>

                {effect.description && (
                  <p className="mb-3 text-sm text-gray-600">{effect.description}</p>
                )}

                <FeatEffectControls effect={effect} />
              </div>
            </Card>
          ))}
        </div>

        {/* Efeitos dos talentos */}
        {featInternalEffects.length > 0 && (
          <div className="space-y-4">
            <div className="border-t pt-6">
              <h3 className="mb-4 text-xl font-bold text-gray-800">Efeitos dos Talentos</h3>
              <p className="mb-4 text-gray-600">
                Os talentos fornecidos pela sua origem concedem os seguintes benefícios:
              </p>
            </div>

            {/* Agrupa efeitos por talento */}
            {Object.entries(
              featInternalEffects.reduce(
                (acc, effect) => {
                  const featId = effect.parentFeatId || 'unknown';
                  if (!acc[featId]) {
                    acc[featId] = [];
                  }
                  acc[featId].push(effect);
                  return acc;
                },
                {} as Record<string, typeof featInternalEffects>,
              ),
            ).map(([featId, effects]) => (
              <Card key={featId} className="p-4">
                <div className="mb-4">
                  <h4 className="text-lg font-medium text-gray-800">
                    {effects[0]?.parentFeatName || 'Talento'}
                  </h4>
                  <p className="text-sm text-gray-500">Efeitos do talento</p>
                </div>

                <div className="space-y-3">
                  {effects.map((effect) => (
                    <FeatEffectRenderer key={effect.id} effect={effect} />
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Status de validação */}
        <div className="mt-6">
          {effectsProcessor.areAllEffectsSelected([...featEffects, ...featInternalEffects]) ? (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-center">
              <span className="font-medium text-green-700">
                ✓ Todos os talentos foram processados!
              </span>
            </div>
          ) : (
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-center">
              <span className="font-medium text-yellow-700">
                ⚠ Complete as seleções de talentos para continuar
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
