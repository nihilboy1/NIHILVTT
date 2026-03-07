import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

const mockDraggablePanel = jest.fn();

jest.mock('@/shared/lib/hooks/useDismissable', () => ({
  useDismissable: jest.fn(),
}));

jest.mock('@/shared/ui/DraggablePanel', () => ({
  DraggablePanel: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    initialPosition: { x: number; y: number };
    safeArea: { bottom: number; left: number; right: number; top: number };
    style?: React.CSSProperties;
  }) => {
    mockDraggablePanel({ children, ...props });
    return <div data-testid="draggable-panel">{children}</div>;
  },
}));

jest.mock('@/shared/ui/FloatingPanelDragBar', () => ({
  FloatingPanelDragBar: () => <div data-testid="floating-panel-drag-bar" />,
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
    expect(screen.getByTestId('hp-active-amount')).toHaveTextContent('1');
    expect(screen.getByTestId('floating-panel-drag-bar')).toBeInTheDocument();
  });

  it('aplica dano usando valor definido por preset', () => {
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

    fireEvent.click(screen.getByRole('button', { name: 'Definir valor 5' }));
    fireEvent.click(screen.getByRole('button', { name: 'Aplicar dano' }));

    expect(onHPChange).toHaveBeenCalledWith('token-1', 'damage', 5);
  });

  it('aplica cura usando stepper sem input', () => {
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

    fireEvent.click(screen.getByRole('button', { name: 'Aplicar cura' }));
    fireEvent.click(screen.getByRole('button', { name: 'Aumentar valor' }));
    fireEvent.click(screen.getByRole('button', { name: 'Aplicar cura' }));

    expect(onHPChange).toHaveBeenCalledWith('token-1', 'heal', 2);
  });

  it('memoriza ultimo valor por modo (dano/cura/temp)', () => {
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
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Definir valor 10' }));
    fireEvent.click(screen.getByRole('button', { name: 'Aplicar dano' }));

    fireEvent.click(screen.getByRole('button', { name: 'Aplicar cura' }));
    fireEvent.click(screen.getByRole('button', { name: 'Definir valor 5' }));
    fireEvent.click(screen.getByRole('button', { name: 'Aplicar cura' }));

    fireEvent.click(screen.getByRole('button', { name: 'Conceder HP temporário' }));
    fireEvent.click(screen.getByRole('button', { name: 'Definir valor 20' }));
    fireEvent.click(screen.getByRole('button', { name: 'Conceder HP temporário' }));

    fireEvent.click(screen.getByRole('button', { name: 'Aplicar dano' }));

    expect(onHPChange).toHaveBeenCalledWith('token-1', 'damage', 10);
    expect(onHPChange).toHaveBeenCalledWith('token-1', 'heal', 5);
    expect(onHPChange).toHaveBeenLastCalledWith('token-1', 'damage', 10);
    expect(onTempHpChange).toHaveBeenLastCalledWith('token-1', 20);
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
    expect(screen.getByRole('button', { name: 'Diminuir valor' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Aumentar valor' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Definir valor 10' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Aplicar dano' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Aplicar cura' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Conceder HP temporário' })).toBeDisabled();

    fireEvent.click(screen.getByRole('button', { name: 'Aplicar dano' }));

    expect(onHPChange).not.toHaveBeenCalled();
    expect(onTempHpChange).not.toHaveBeenCalled();
  });

  it('incrementa e decrementa valor em passos de 1 no stepper', () => {
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

    const amountDisplay = screen.getByTestId('hp-active-amount');
    expect(amountDisplay).toHaveTextContent('1');

    fireEvent.click(screen.getByRole('button', { name: 'Aumentar valor' }));
    fireEvent.click(screen.getByRole('button', { name: 'Aumentar valor' }));
    expect(amountDisplay).toHaveTextContent('3');

    fireEvent.click(screen.getByRole('button', { name: 'Diminuir valor' }));
    expect(amountDisplay).toHaveTextContent('2');
  });

  it('configura o DraggablePanel com safeArea e posicao inicial coerentes', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 1024,
    });
    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      value: 768,
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

    expect(mockDraggablePanel).toHaveBeenCalledWith(
      expect.objectContaining({
        initialPosition: { x: 288, y: 648 },
        safeArea: { bottom: 16, left: 80, right: 400, top: 16 },
      }),
    );
  });
});
