import { BACKGROUNDS } from '@/shared/constants/characterData/backgrounds';
import { CLASSES } from '@/shared/constants/characterData/classes';
import { SPECIES } from '@/shared/constants/characterData/species';

import { Selection, Step, STEPS } from '../../constants/steps';

interface SidebarProps {
  currentStep: Step;
  selections: Selection;
  onStepChange: (step: Step) => void;
}

export function Sidebar({ currentStep, selections, onStepChange }: SidebarProps) {
  const getSelectionName = (step: Step) => {
    const selectedId = selections[step];
    if (!selectedId) return null;

    let options;
    switch (step) {
      case 'species':
        options = SPECIES;
        break;
      case 'background':
        options = BACKGROUNDS;
        break;
      case 'class':
        options = CLASSES;
        break;
      case 'attributes':
        return 'Pontos distribuídos';
    }

    return options?.find((opt) => opt.id === selectedId)?.name;
  };

  return (
    <div
      className="bg-surface-1 border-surface-2 flex h-full w-80 flex-col border-r p-6"
      style={{
        backgroundColor: 'var(--color-surface-1)',
        borderColor: 'var(--color-surface-2)',
      }}
    >
      <div className="mb-8">
        <h1
          className="iceberg-regular text-primary mb-2 text-2xl"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Criador de Personagem
        </h1>
        <p className="text-secondary text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          Configure seu personagem seguindo as etapas
        </p>
      </div>

      <nav className="flex-1 space-y-3">
        {STEPS.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = !!selections[step.id];
          const selectionName = getSelectionName(step.id);

          return (
            <button
              key={step.id}
              onClick={() => onStepChange(step.id)}
              className={`w-full rounded-lg p-4 text-left transition-all duration-200 ${
                isActive ? 'bg-accent-primary text-primary-foreground' : 'hover:bg-surface-2'
              }`}
              style={{
                backgroundColor: isActive ? 'var(--color-accent-primary)' : 'transparent',
                color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-primary)',
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                      isCompleted
                        ? 'bg-positive text-surface-0'
                        : isActive
                          ? 'text-accent-primary bg-white'
                          : 'bg-surface-2 text-text-secondary'
                    }`}
                    style={{
                      backgroundColor: isCompleted
                        ? 'var(--color-feedback-positive)'
                        : isActive
                          ? 'white'
                          : 'var(--color-surface-2)',
                      color: isCompleted
                        ? 'var(--color-surface-0)'
                        : isActive
                          ? 'var(--color-accent-primary)'
                          : 'var(--color-text-secondary)',
                    }}
                  >
                    {isCompleted ? '✓' : index + 1}
                  </span>
                  <span className="font-medium">{step.name}</span>
                </div>
              </div>
              {selectionName && (
                <div className="mt-2 ml-9">
                  <span
                    className="text-xs"
                    style={{
                      color: isActive ? 'rgba(255,255,255,0.8)' : 'var(--color-text-secondary)',
                    }}
                  >
                    {selectionName}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      <div
        className="border-surface-2 mt-10 mb-auto border-t pt-6"
        style={{ borderColor: 'var(--color-surface-2)' }}
      >
        <div
          className="text-secondary mt-auto mb-2 text-sm"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Progresso
        </div>
        <div
          className="bg-surface-2 h-2 w-full rounded-full"
          style={{ backgroundColor: 'var(--color-surface-2)' }}
        >
          <div
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(Object.values(selections).filter(Boolean).length / 4) * 100}%`,
              backgroundColor: 'var(--color-accent-primary)',
            }}
          />
        </div>
        <div
          className="text-secondary mt-1 text-xs"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {Object.values(selections).filter(Boolean).length} de 4 concluídos
        </div>
      </div>
    </div>
  );
}
