import { CLASSES } from '@/shared/constants/characterData/classes';
import { CustomScrollbar } from '@/shared/ui/CustomScrollbar';
import { PHB2024ORIGINS, PHB2024SPECIES } from '@nihilvtt/datamodeling/data';

import { Selection, Step, STEPS } from '../../constants/steps';

interface SidebarProps {
  currentStep: Step;
  selections: Selection;
  onStepChange: (step: Step) => void;
}

export function Sidebar({ currentStep, selections, onStepChange }: SidebarProps) {
  // Usamos os dados fixos de origens e espécies diretamente
  const origins = PHB2024ORIGINS;
  const species = PHB2024SPECIES;
  // Verifica se um passo específico está completo
  const isStepComplete = (stepId: Step): boolean => {
    switch (stepId) {
      case 'species':
        return !!selections[stepId] && String(selections[stepId]).length > 0;
      case 'origin':
        return !!selections[stepId] && String(selections[stepId]).length > 0;
      case 'class':
        return !!selections[stepId] && String(selections[stepId]).length > 0;
      case 'attributes':
        // Para atributos, verifica se todos os 27 pontos foram distribuídos
        if (!selections[stepId]) return false;

        // Calculando o custo total dos atributos
        const points = Object.values(selections[stepId] as Record<string, number>).reduce(
          (total, value) => {
            const cost =
              {
                8: 0,
                9: 1,
                10: 2,
                11: 3,
                12: 4,
                13: 5,
                14: 7,
                15: 9,
              }[value] || 0;
            return total + cost;
          },
          0,
        );

        return points === 27; // Deve usar exatamente todos os pontos
      case 'personal-info':
        return !!selections[stepId]?.name && String(selections[stepId]?.name).length > 0;
      default:
        return false;
    }
  };

  // Conta quantos passos estão completos
  const completedStepsCount = STEPS.filter((step) => isStepComplete(step.id)).length;

  const getSelectionName = (step: Step) => {
    const selectedId = selections[step];
    if (!selectedId) return null;

    let options;
    switch (step) {
      case 'species':
        options = species.map((specie) => ({
          id: specie.id,
          name: Array.isArray(specie.name) ? specie.name[0] : specie.name,
        }));
        break;
      case 'origin':
        options = origins.map((origin) => ({
          id: origin.id,
          name: Array.isArray(origin.name) ? origin.name[0] : origin.name,
        }));
        break;
      case 'class':
        options = CLASSES;
        break;
      case 'attributes':
        return 'Pontos distribuídos';
      case 'personal-info':
        return selections['personal-info']?.name || 'Sem nome definido';
    }

    return options?.find((opt) => opt.id === selectedId)?.name;
  };

  return (
    <CustomScrollbar className="border-surface-2 bg-surface-1 flex h-full w-80 flex-col border-r p-6">
      <div className="mb-8">
        <h1 className="iceberg-regular text-text-primary mb-2 text-2xl">Criador de Personagem</h1>
        <p className="text-text-secondary text-sm">Configure seu personagem seguindo as etapas</p>
      </div>

      <nav className="flex-1 space-y-3">
        {STEPS.map((step, index) => {
          const isActive = currentStep === step.id;
          const selectionName = getSelectionName(step.id);

          // Verifica se o passo está completo usando a função isStepComplete
          const stepCompleted = isStepComplete(step.id);

          return (
            <button
              key={step.id}
              onClick={() => onStepChange(step.id)}
              className={`text-text-primary w-full rounded-lg p-4 text-left transition-all duration-200 ${
                isActive ? 'bg-accent-primary' : 'hover:bg-surface-2'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                      stepCompleted
                        ? 'bg-feedback-positive text-surface-0'
                        : isActive
                          ? 'text-accent-primary bg-white'
                          : 'bg-surface-2 text-text-secondary'
                    }`}
                  >
                    {stepCompleted ? '✓' : index + 1}
                  </span>
                  <span className="font-medium">{step.name}</span>
                </div>
              </div>
              {selectionName && (
                <div className="mt-2 ml-9">
                  <span className={`text-xs ${isActive ? 'text-white/80' : 'text-text-secondary'}`}>
                    {selectionName}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      <div className="border-surface-2 mt-10 mb-auto border-t pt-6">
        <div className="text-text-secondary mt-auto mb-2 text-sm">Progresso</div>
        <div className="bg-surface-2 h-2 w-full rounded-full">
          <div
            className="bg-accent-primary h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(completedStepsCount / 5) * 100}%`,
            }}
          />
        </div>
        <div className="text-text-secondary mt-1 text-xs">
          {completedStepsCount} de 5 concluídos
        </div>
      </div>
    </CustomScrollbar>
  );
}
