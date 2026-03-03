import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

jest.mock('@/shared/lib/hooks/useDismissable', () => ({
  useDismissable: jest.fn(),
}));

jest.mock('@/entities/character/model/schemas/character.schema', () => ({
  CharacterTypeEnum: {
    enum: {
      Player: 'Player',
      NPC: 'NPC',
      Object: 'Object',
    },
  },
}));

import { HPControlModal } from '@/features/characterUpdateHp/ui/HPControlModal';

const baseCharacter = {
  id: 'char-1',
  name: 'Goblin',
  type: 'NPC',
  combatStats: {
    currentHp: 7,
    maxHp: 12,
    tempHp: 3,
  },
} as const;

describe('HPControlModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza nome e valores de HP/THP em duas linhas', () => {
    render(
      <HPControlModal
        tokenId="token-1"
        character={baseCharacter as never}
        isOpen
        onClose={jest.fn()}
        onHPChange={jest.fn()}
        onTempHpChange={jest.fn()}
      />,
    );

    expect(screen.getByRole('dialog', { name: 'Controle de Vida' })).toBeInTheDocument();
    expect(screen.getByText('Goblin')).toBeInTheDocument();
    expect(screen.getByTestId('current-hp-display')).toHaveTextContent('7');
    expect(screen.getByTestId('max-hp-display')).toHaveTextContent('12');
    expect(screen.getByTestId('temp-hp-display')).toHaveTextContent('3');
    expect(screen.getByLabelText('Quantidade para aplicar')).toHaveValue(1);
  });

  it('aplica dano usando o valor atual do input', () => {
    const onHPChange = jest.fn();

    render(
      <HPControlModal
        tokenId="token-1"
        character={baseCharacter as never}
        isOpen
        onClose={jest.fn()}
        onHPChange={onHPChange}
        onTempHpChange={jest.fn()}
      />,
    );

    fireEvent.change(screen.getByLabelText('Quantidade para aplicar'), {
      target: { value: '5' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Aplicar dano' }));

    expect(onHPChange).toHaveBeenCalledWith('token-1', 'damage', 5);
  });

  it('aplica cura usando o valor atual do input', () => {
    const onHPChange = jest.fn();

    render(
      <HPControlModal
        tokenId="token-1"
        character={baseCharacter as never}
        isOpen
        onClose={jest.fn()}
        onHPChange={onHPChange}
        onTempHpChange={jest.fn()}
      />,
    );

    fireEvent.change(screen.getByLabelText('Quantidade para aplicar'), {
      target: { value: '2' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Aplicar cura' }));

    expect(onHPChange).toHaveBeenCalledWith('token-1', 'heal', 2);
  });

  it('concede HP temporario usando o valor atual do input', () => {
    const onTempHpChange = jest.fn();

    render(
      <HPControlModal
        tokenId="token-1"
        character={baseCharacter as never}
        isOpen
        onClose={jest.fn()}
        onHPChange={jest.fn()}
        onTempHpChange={onTempHpChange}
      />,
    );

    fireEvent.change(screen.getByLabelText('Quantidade para aplicar'), {
      target: { value: '4' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Conceder HP temporário' }));

    expect(onTempHpChange).toHaveBeenCalledWith('token-1', 4);
  });

  it('bloqueia alteracoes para nao-mestres', () => {
    const onHPChange = jest.fn();
    const onTempHpChange = jest.fn();

    render(
      <HPControlModal
        tokenId="token-1"
        character={baseCharacter as never}
        isOpen
        onClose={jest.fn()}
        onHPChange={onHPChange}
        onTempHpChange={onTempHpChange}
        canModifyHp={false}
      />,
    );

    expect(screen.getByText('Somente o mestre')).toBeInTheDocument();
    expect(screen.getByLabelText('Quantidade para aplicar')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Aplicar dano' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Aplicar cura' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Conceder HP temporário' })).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: 'Aplicar dano' }));

    expect(onHPChange).not.toHaveBeenCalled();
    expect(onTempHpChange).not.toHaveBeenCalled();
  });

  it('respeita o espaco da sidebar direita no posicionamento', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 1024,
    });

    render(
      <HPControlModal
        tokenId="token-1"
        character={baseCharacter as never}
        isOpen
        onClose={jest.fn()}
        onHPChange={jest.fn()}
        onTempHpChange={jest.fn()}
        rightSidebarVisible
      />,
    );

    expect(screen.getByRole('dialog', { name: 'Controle de Vida' })).toHaveStyle({
      right: '25rem',
      bottom: '1rem',
      position: 'fixed',
    });
  });
});
