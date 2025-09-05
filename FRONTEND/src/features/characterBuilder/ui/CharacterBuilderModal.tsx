import { useState, useEffect } from 'react';

import { FaQuestionCircle } from 'react-icons/fa';

import { MinimizeIcon, PlusCircleIcon, XMarkIcon } from '@/shared/ui/Icons';
import { Modal } from '@/shared/ui/Modal';

import { Badge } from './badge';
import { Button } from './button';
import { Card } from './card';

// Dados mock para as opções
const SPECIES = [
  {
    id: 'human',
    name: 'Humano',
    description: 'Versátil e adaptável, com bônus em todas as áreas.',
  },
  {
    id: 'elf',
    name: 'Elfo',
    description: 'Gracioso e sábio, com afinidade mágica natural.',
  },
  {
    id: 'dwarf',
    name: 'Anão',
    description: 'Resistente e forte, especialista em artesanato.',
  },
  {
    id: 'halfling',
    name: 'Halfling',
    description: 'Pequeno mas corajoso, com sorte natural.',
  },
  {
    id: 'orc',
    name: 'Orc',
    description: 'Feroz e poderoso, especialista em combate.',
  },
  {
    id: 'tiefling',
    name: 'Tiefling',
    description: 'Descendente infernal com poderes únicos.',
  },
];

const BACKGROUNDS = [
  {
    id: 'noble',
    name: 'Nobre',
    description: 'Nasceu em berço de ouro, com conexões políticas.',
  },
  {
    id: 'soldier',
    name: 'Soldado',
    description: 'Veterano de guerra com treinamento militar.',
  },
  {
    id: 'criminal',
    name: 'Criminoso',
    description: 'Viveu nas ruas, especialista em atividades ilícitas.',
  },
  {
    id: 'scholar',
    name: 'Erudito',
    description: 'Dedicou a vida aos estudos e conhecimento.',
  },
  {
    id: 'merchant',
    name: 'Comerciante',
    description: 'Experiente em negócios e relações sociais.',
  },
  {
    id: 'hermit',
    name: 'Eremita',
    description: 'Isolado da sociedade, com sabedoria única.',
  },
];

const CLASSES = [
  {
    id: 'warrior',
    name: 'Guerreiro',
    description: 'Especialista em combate corpo a corpo e defesa.',
  },
  {
    id: 'mage',
    name: 'Mago',
    description: 'Manipulador das artes arcanas e magias poderosas.',
  },
  {
    id: 'rogue',
    name: 'Ladino',
    description: 'Mestre da furtividade e ataques precisos.',
  },
  {
    id: 'cleric',
    name: 'Clérigo',
    description: 'Curandeiro divino com poderes sagrados.',
  },
  {
    id: 'ranger',
    name: 'Patrulheiro',
    description: 'Explorador especializado em combate à distância.',
  },
  {
    id: 'bard',
    name: 'Bardo',
    description: 'Artista versátil com magias de apoio.',
  },
];

// Definições para o Point Buy
type Attributes = {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
};

// Valores padrão para os atributos (todos começam em 8)
const DEFAULT_ATTRIBUTES: Attributes = {
  strength: 8,
  dexterity: 8,
  constitution: 8,
  intelligence: 8,
  wisdom: 8,
  charisma: 8,
};

type Selection = {
  species?: string;
  background?: string;
  class?: string;
  attributes?: Attributes;
};

type Step = 'species' | 'background' | 'class' | 'attributes';

const STEPS: { id: Step; name: string; title: string }[] = [
  { id: 'species', name: 'Espécie', title: 'Escolha sua Espécie' },
  { id: 'background', name: 'Background', title: 'Escolha seu Background' },
  { id: 'class', name: 'Classe', title: 'Escolha sua Classe' },
  { id: 'attributes', name: 'Atributos', title: 'Distribua seus Pontos de Atributo' },
];

type OptionCardProps = {
  id: string;
  name: string;
  description: string;
  isSelected: boolean;
  onSelect: () => void;
};

function OptionCard({ name, description, isSelected, onSelect }: OptionCardProps) {
  return (
    <Card
      className={`cursor-pointer p-6 transition-all duration-200 hover:scale-[1.02] ${
        isSelected
          ? 'bg-accent border-accent-primary shadow-accent-primary/20 shadow-lg'
          : 'bg-surface-1 hover:bg-surface-2 border-surface-2'
      }`}
      onClick={onSelect}
      style={{
        backgroundColor: isSelected ? 'var(--color-accent-primary)' : 'var(--color-surface-1)',
        borderColor: isSelected ? 'var(--color-accent-primary)' : 'var(--color-surface-2)',
      }}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-primary font-medium" style={{ color: 'var(--color-text-primary)' }}>
          {name}
        </h3>
        {isSelected && (
          <Badge
            className="bg-positive text-surface-0"
            style={{
              backgroundColor: 'var(--color-feedback-positive)',
              color: 'var(--color-surface-1)',
            }}
          >
            Selecionado
          </Badge>
        )}
      </div>
      <p className="text-secondary text-sm" style={{ color: 'var(--color-text-secondary)' }}>
        {description}
      </p>
    </Card>
  );
}

type SidebarProps = {
  currentStep: Step;
  selections: Selection;
  onStepChange: (step: Step) => void;
};

function Sidebar({ currentStep, selections, onStepChange }: SidebarProps) {
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

type MainContentProps = {
  currentStep: Step;
  selections: Selection;
  onSelect: (step: Step, id: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
};

// Tabela de custo do Point Buy
const ATTRIBUTE_COST = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7,
  15: 9,
};

// Lista de atributos para exibição
const ATTRIBUTES = [
  { id: 'strength', name: 'Força', abbr: 'FOR' },
  { id: 'dexterity', name: 'Destreza', abbr: 'DES' },
  { id: 'constitution', name: 'Constituição', abbr: 'CON' },
  { id: 'intelligence', name: 'Inteligência', abbr: 'INT' },
  { id: 'wisdom', name: 'Sabedoria', abbr: 'SAB' },
  { id: 'charisma', name: 'Carisma', abbr: 'CAR' },
];

// Componente para o selector de atributo
type AttributeSelectorProps = {
  name: string;
  abbr: string;
  value: number;
  onChange: (value: number) => void;
  isDisabled?: boolean;
};

function AttributeSelector({
  name,
  abbr,
  value,
  onChange,
  isDisabled = false,
}: AttributeSelectorProps) {
  const handleIncrease = () => {
    if (value < 15 && !isDisabled) {
      onChange(value + 1);
    }
  };

  const handleDecrease = () => {
    if (value > 8 && !isDisabled) {
      onChange(value - 1);
    }
  };

  const cost = ATTRIBUTE_COST[value as keyof typeof ATTRIBUTE_COST];

  // Calcular o modificador
  const modifier = Math.floor((value - 10) / 2);
  const modifierDisplay = modifier >= 0 ? `+${modifier}` : `${modifier}`;

  return (
    <div
      className="rounded-lg p-3"
      style={{
        backgroundColor: 'var(--color-surface-1)',
        borderColor: 'var(--color-surface-2)',
        borderWidth: '1px',
      }}
    >
      <div className="mb-2 flex items-center justify-between">
        {/* Informações do atributo */}
        <div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-lg font-medium" style={{ color: 'var(--color-text-primary)' }}>
              {name}
            </h3>
            <span
              className="rounded px-1.5 py-0.5 text-xs font-bold"
              style={{
                backgroundColor: 'var(--color-surface-2)',
                color: 'var(--color-text-secondary)',
              }}
            >
              {abbr}
            </span>
          </div>
          <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
            Custo: {cost} pontos
          </p>
        </div>

        {/* Valor e modificador */}
        <div className="flex flex-col items-center">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-md text-xl font-bold"
            style={{
              backgroundColor: 'var(--color-accent-secondary)',
              color: 'var(--color-text-primary)',
            }}
          >
            {value}
          </div>
          <div
            className="mt-0.5 text-sm font-medium"
            style={{ color: 'var(--color-accent-primary)' }}
          >
            {modifierDisplay}
          </div>
        </div>
      </div>

      {/* Controles abaixo do valor */}
      <div className="mt-2 flex gap-2">
        <button
          onClick={handleDecrease}
          disabled={value <= 8 || isDisabled}
          className="flex h-8 flex-1 items-center justify-center rounded-md text-sm font-bold"
          style={{
            backgroundColor:
              value > 8 && !isDisabled ? 'var(--color-accent-primary)' : 'var(--color-surface-2)',
            color:
              value > 8 && !isDisabled
                ? 'var(--color-text-primary)'
                : 'var(--color-text-secondary)',
            cursor: value > 8 && !isDisabled ? 'pointer' : 'not-allowed',
            border: 'none',
            outline: 'none',
          }}
        >
          <MinimizeIcon size={14} />
        </button>

        <button
          onClick={handleIncrease}
          disabled={value >= 15 || isDisabled}
          className="flex h-8 flex-1 items-center justify-center rounded-md text-sm font-bold"
          style={{
            backgroundColor:
              value < 15 && !isDisabled ? 'var(--color-accent-primary)' : 'var(--color-surface-2)',
            color:
              value < 15 && !isDisabled
                ? 'var(--color-text-primary)'
                : 'var(--color-text-secondary)',
            cursor: value < 15 && !isDisabled ? 'pointer' : 'not-allowed',
            border: 'none',
            outline: 'none',
          }}
        >
          <PlusCircleIcon size={14} />
        </button>
      </div>
    </div>
  );
}

// Componente da seção de Point Buy
interface AttributesPointBuyProps {
  attributes: Attributes;
  onAttributesChange: (attributes: Attributes) => void;
}

function AttributesPointBuySection({ attributes, onAttributesChange }: AttributesPointBuyProps) {
  const [remainingPoints, setRemainingPoints] = useState(27);
  const [currentAttributes, setCurrentAttributes] = useState<Attributes>(attributes);

  // Calcula os pontos gastos baseado nos atributos atuais
  const calculateUsedPoints = (attrs: Attributes) => {
    return Object.values(attrs).reduce(
      (total, value) => total + ATTRIBUTE_COST[value as keyof typeof ATTRIBUTE_COST],
      0,
    );
  };

  // Atualiza os pontos restantes quando os atributos mudam
  useEffect(() => {
    const usedPoints = calculateUsedPoints(currentAttributes);
    setRemainingPoints(27 - usedPoints);
    onAttributesChange(currentAttributes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAttributes]);

  // Handler para alteração de atributo
  const handleAttributeChange = (attributeId: keyof Attributes, newValue: number) => {
    // Primeiro verifica se a mudança é possível com os pontos disponíveis
    const oldValue = currentAttributes[attributeId];
    const oldCost = ATTRIBUTE_COST[oldValue as keyof typeof ATTRIBUTE_COST];
    const newCost = ATTRIBUTE_COST[newValue as keyof typeof ATTRIBUTE_COST];
    const pointDifference = newCost - oldCost;

    // Se aumentar o atributo, verifica se há pontos suficientes
    if (newValue > oldValue && pointDifference > remainingPoints) {
      return; // Não há pontos suficientes para essa alteração
    }

    setCurrentAttributes((prev) => ({
      ...prev,
      [attributeId]: newValue,
    }));
  };

  // Limpa a seleção voltando para os valores padrão
  const handleReset = () => {
    setCurrentAttributes(DEFAULT_ATTRIBUTES);
  };

  return (
    <div className="flex flex-col space-y-8">
      {/* Seção de informações do Point Buy */}
      <div
        className="w-full rounded-lg border p-4"
        style={{ backgroundColor: 'var(--color-surface-1)', borderColor: 'var(--color-surface-2)' }}
      >
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-xl font-medium" style={{ color: 'var(--color-text-primary)' }}>
            Sistema Point Buy
          </h3>
          <div
            className="inline-flex items-center gap-2 rounded-sm px-4 py-2 font-medium"
            style={{
              backgroundColor:
                remainingPoints >= 0
                  ? 'var(--color-feedback-positive)'
                  : 'var(--color-feedback-negative)',
              color: 'var(--color-surface-0)',
            }}
          >
            <span className="text-surface-0 text-sm">
              {remainingPoints >= 0
                ? `${remainingPoints} pontos restantes`
                : `${Math.abs(remainingPoints)} pontos excedidos`}
            </span>
            {remainingPoints >= 0 ? (
              <span className="text-surface-0">✓</span>
            ) : (
              <XMarkIcon className="text-surface-0" size={1.5} />
            )}
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Distribua 27 pontos entre seus atributos. Os valores começam em 8 (sem custo) e podem ir
            até 15.
          </p>
          <div className="group relative">
            <FaQuestionCircle
              style={{ color: 'var(--color-accent-primary)', cursor: 'help' }}
              size={16}
            />
            <div
              className="absolute bottom-full left-1/2 mb-2 w-60 -translate-x-1/2 transform opacity-0 transition-opacity group-hover:opacity-100"
              style={{
                backgroundColor: 'var(--color-surface-2)',
                color: 'var(--color-text-secondary)',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                width: '200px',
                zIndex: 50,
              }}
            >
              <p className="mb-2 text-xs font-medium">
                No sistema Point Buy, cada valor de atributo tem um custo específico em pontos:
              </p>
              <p className="text-xs">Valor 8 (mod -1): 0 pontos</p>
              <p className="text-xs">Valor 9 (mod -1): 1 ponto</p>
              <p className="text-xs">Valor 10 (mod +0): 2 pontos</p>
              <p className="text-xs">Valor 11 (mod +0): 3 pontos</p>
              <p className="text-xs">Valor 12 (mod +1): 4 pontos</p>
              <p className="text-xs">Valor 13 (mod +1): 5 pontos</p>
              <p className="text-xs">Valor 14 (mod +2): 7 pontos</p>
              <p className="text-xs">Valor 15 (mod +2): 9 pontos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Grade de seletores de atributos */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ATTRIBUTES.map((attribute) => (
          <AttributeSelector
            key={attribute.id}
            name={attribute.name}
            abbr={attribute.abbr}
            value={currentAttributes[attribute.id as keyof Attributes]}
            onChange={(value) => handleAttributeChange(attribute.id as keyof Attributes, value)}
            isDisabled={remainingPoints < 0}
          />
        ))}
      </div>

      {/* Botão de reset */}
      <div className="flex justify-center pt-4">
        <Button
          onClick={handleReset}
          variant="outline"
          className="flex items-center gap-2 px-6"
          style={{
            borderColor: 'var(--color-surface-2)',
            color: 'var(--color-text-primary)',
          }}
        >
          <XMarkIcon size={1.5} />
          Reiniciar Pontos
        </Button>
      </div>
    </div>
  );
}

function MainContent({
  currentStep,
  selections,
  onSelect,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
}: MainContentProps) {
  const currentStepData = STEPS.find((step) => step.id === currentStep)!;

  let options;
  switch (currentStep) {
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
      // Não precisamos de options para este caso
      break;
  }

  const selectedId = selections[currentStep];

  return (
    <div className="hide-scrollbar bg-surface-1 mb-5 h-fit flex-1 overflow-y-auto border-l p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4">
          <h2
            className="iceberg-regular text-primary text-3xl"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {currentStepData.title}
          </h2>
          <p className="text-secondary text-lg" style={{ color: 'var(--color-text-secondary)' }}>
            {currentStep === 'attributes'
              ? 'Distribua seus pontos entre os atributos usando o sistema de Point Buy.'
              : 'Selecione uma das opções abaixo para continuar.'}
          </p>
        </div>

        {currentStep === 'attributes' ? (
          <div className="bg-surface-1 rounded-lg p-2">
            <AttributesPointBuySection
              attributes={selections.attributes || DEFAULT_ATTRIBUTES}
              onAttributesChange={(attrs) => onSelect('attributes', JSON.stringify(attrs))}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {options?.map((option) => (
              <OptionCard
                key={option.id}
                id={option.id}
                name={option.name}
                description={option.description}
                isSelected={selectedId === option.id}
                onSelect={() => onSelect(currentStep, option.id)}
              />
            ))}
          </div>
        )}

        <div className="flex justify-between pt-8">
          <Button
            onClick={onPrevious}
            disabled={!canGoPrevious}
            variant="outline"
            className="px-6"
            style={{
              borderColor: 'var(--color-surface-2)',
              color: canGoPrevious ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
            }}
          >
            Anterior
          </Button>

          <Button
            onClick={onNext}
            disabled={!canGoNext}
            className="px-6"
            style={{
              backgroundColor: canGoNext ? 'var(--color-accent-primary)' : 'var(--color-surface-2)',
              color: canGoNext ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
            }}
          >
            {currentStep === 'attributes' ? 'Finalizar' : 'Próximo'}
          </Button>
        </div>
      </div>
    </div>
  );
}

interface CharacterBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  zIndex?: number;
}

export function CharacterBuilderModal({
  isOpen,
  onClose,
  zIndex = 100,
}: CharacterBuilderModalProps) {
  const [currentStep, setCurrentStep] = useState<Step>('species');
  const [selections, setSelections] = useState<Selection>({});

  const handleSelect = (step: Step, value: string) => {
    if (step === 'attributes') {
      try {
        const attributes = JSON.parse(value) as Attributes;
        setSelections((prev) => ({ ...prev, [step]: attributes }));
      } catch (e) {
        console.error('Erro ao processar atributos:', e);
      }
    } else {
      setSelections((prev) => ({ ...prev, [step]: value }));
    }
  };

  const handleStepChange = (step: Step) => {
    setCurrentStep(step);
  };

  const getCurrentStepIndex = () => {
    return STEPS.findIndex((step) => step.id === currentStep);
  };

  const handleNext = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1].id);
    } else {
      // Finalizar - todas as seleções estão completas
      onClose();
    }
  };

  const handlePrevious = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1].id);
    }
  };

  const canGoNext =
    currentStep === 'attributes' ? !!selections.attributes : !!selections[currentStep];
  const canGoPrevious = getCurrentStepIndex() > 0;

  return (
    <Modal
      isOpen={isOpen}
      fullscreen={true}
      onClose={onClose}
      title="Construtor de Personagem"
      zIndex={zIndex}
      modalClassName="w-[100vw] h-[100vh] p-0"
      hideFooter={true}
    >
      <div className="flex h-screen" style={{ backgroundColor: 'var(--color-surface-1)' }}>
        <Sidebar
          currentStep={currentStep}
          selections={selections}
          onStepChange={handleStepChange}
        />
        <MainContent
          currentStep={currentStep}
          selections={selections}
          onSelect={handleSelect}
          onNext={handleNext}
          onPrevious={handlePrevious}
          canGoNext={canGoNext}
          canGoPrevious={canGoPrevious}
        />
      </div>
    </Modal>
  );
}
