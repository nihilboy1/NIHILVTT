import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

const mockAddCharacterFromSession = jest.fn();
const mockRuntimeCharactersById = {
  'char-1': {
    id: 'char-1',
    name: 'Goblin',
    inventory: {
      items: [],
    },
  },
};

jest.mock('@nihilvtt/datamodeling/data', () => ({
  PHB2024ITEMS: [
    {
      id: 'weapon-espada-grande',
      name: ['Espada Grande', 'Greatsword'],
      type: 'weapon',
    },
    {
      id: 'armor-cota-de-malha',
      name: ['Cota de Malha', 'Chain Mail'],
      type: 'armor',
    },
  ],
}));

jest.mock('@/entities/character/model/store', () => ({
  useCharactersStore: jest.fn((selector: (state: unknown) => unknown) =>
    selector({
      addCharacterFromSession: mockAddCharacterFromSession,
      runtimeCharactersById: mockRuntimeCharactersById,
    }),
  ),
}));

jest.mock('@/features/game/model/gameSessionApi', () => ({
  sendGameAddCharacterInventoryItem: jest.fn(),
}));

jest.mock('@/shared/ui/Modal', () => ({
  Modal: ({ isOpen, title, children }: { isOpen: boolean; title: string; children: React.ReactNode }) =>
    isOpen ? (
      <div role="dialog" aria-label={title}>
        <h3>{title}</h3>
        {children}
      </div>
    ) : null,
}));

import { CompendiumPanel } from '@/widgets/compendiumPanel/ui/CompendiumPanel';

describe('CompendiumPanel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza a UI em PT-BR e não exibe o id técnico no card', () => {
    render(<CompendiumPanel gameId={1} />);

    expect(screen.getByText('Biblioteca')).toBeInTheDocument();
    expect(screen.getByText('Espada Grande')).toBeInTheDocument();
    expect(screen.getByText('Arma')).toBeInTheDocument();
    expect(screen.queryByText('weapon-espada-grande')).not.toBeInTheDocument();
  });

  it('permite buscar por tipo em inglês mesmo com UI em PT-BR', () => {
    render(<CompendiumPanel gameId={1} />);

    fireEvent.change(screen.getByPlaceholderText('Buscar item'), {
      target: { value: 'weapon' },
    });

    expect(screen.getByText('Espada Grande')).toBeInTheDocument();
    expect(screen.queryByText('Cota de Malha')).not.toBeInTheDocument();
  });

  it('abre o seletor de personagem ao clicar em Adicionar sem depender de ficha aberta', () => {
    render(<CompendiumPanel gameId={1} />);

    fireEvent.click(screen.getAllByRole('button', { name: 'Adicionar' })[0]);

    expect(screen.getByRole('dialog', { name: 'Adicionar Cota de Malha' })).toBeInTheDocument();
    expect(screen.getByText('Goblin')).toBeInTheDocument();
  });
});
