import { useFormContext } from 'react-hook-form';

import { useCharacterBuilderEffectsProcessor } from '../../model/context/effectsProcessorContext';
import { getOriginById } from '../../schemas/characterBuilderSchema';
import { CharacterBuilderFormData } from '../../schemas/characterBuilderSchema';
import { Card } from '../ui/Card';
import { FeatEffectControls } from '../ui/FeatEffectControls';
import { FeatEffectRenderer } from '../ui/FeatEffectRenderer';

interface FeatStepProps {
  className?: string;
}

export function FeatStep({ className }: FeatStepProps) {
  const { watch } = useFormContext<CharacterBuilderFormData>();
  const effectsProcessor = useCharacterBuilderEffectsProcessor();
  const selectedOriginId = watch('origin');

  // Obtém a origem selecionada
  const origin = selectedOriginId ? getOriginById(selectedOriginId) : null;

  // Processa os efeitos da origem para obter talentos
  const processedEffects = origin ? effectsProcessor.processOriginEffects(origin) : [];
  const featEffects = processedEffects.filter((effect) => effect.type === 'passive_providesFeat');

  // Processa os efeitos dos talentos fornecidos pela origem
  const featInternalEffects = origin ? effectsProcessor.processFeatEffectsFromOrigin(origin) : [];
  const groupedFeatEffects = featInternalEffects.reduce<
    Record<string, (typeof featInternalEffects)[number][]>
  >((acc, effect) => {
    const featId = effect.parentFeatId || 'unknown';
    if (!acc[featId]) {
      acc[featId] = [];
    }
    acc[featId].push(effect);
    return acc;
  }, {});

  if (!origin) {
    return (
      <div className={className}>
        <Card className="p-6 text-center">
          <h3 className="text-text-secondary mb-2 text-lg font-medium">Selecione uma Origem</h3>
          <p className="text-text-secondary text-sm">
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
          <h3 className="text-text-secondary mb-2 text-lg font-medium">
            Nenhum Talento Disponível
          </h3>
          <p className="text-text-secondary text-sm">
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
          <h2 className="text-text-primary mb-2 text-2xl font-bold">Talentos da Origem</h2>
          <p className="text-text-secondary">
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
                  <h3 className="text-text-primary text-lg font-medium">{effect.name}</h3>
                  {effect.requiresChoice && (
                    <span className="bg-info/20 text-info rounded px-2 py-1 text-sm">
                      Requer Escolha
                    </span>
                  )}
                </div>

                {effect.description && (
                  <p className="text-text-secondary mb-3 text-sm">{effect.description}</p>
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
              <h3 className="text-text-primary mb-4 text-xl font-bold">Efeitos dos Talentos</h3>
              <p className="text-text-secondary mb-4">
                Os talentos fornecidos pela sua origem concedem os seguintes benefícios:
              </p>
            </div>

            {/* Agrupa efeitos por talento */}
            {Object.entries(groupedFeatEffects).map(([featId, effects]) => (
              <Card key={featId} className="p-4">
                <div className="mb-4">
                  <h4 className="text-text-primary text-lg font-medium">
                    {effects[0]?.parentFeatName || 'Talento'}
                  </h4>
                  <p className="text-text-secondary text-sm">Efeitos do talento</p>
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
            <div className="border-feedback-positive/50 bg-feedback-positive/10 rounded-lg border p-4 text-center">
              <span className="text-feedback-positive font-medium">
                ✓ Todos os talentos foram processados!
              </span>
            </div>
          ) : (
            <div className="border-feedback-warning/50 bg-feedback-warning/10 rounded-lg border p-4 text-center">
              <span className="text-feedback-warning font-medium">
                ⚠ Complete as seleções de talentos para continuar
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
