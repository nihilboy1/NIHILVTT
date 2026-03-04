import '@testing-library/jest-dom';
import { fireEvent, render, screen, within } from '@testing-library/react';

const mockAddCharacterFromSession = jest.fn();
const mockOpenModal = jest.fn();
const mockSendGameAddCharacterInventoryItem = jest.fn();

let mockCurrentGame: {
  owner: { id: number; name: string };
  players: Array<{ id: number; name: string }>;
} | null = null;
let mockCurrentUserId: number | null = null;

const mockRuntimeCharactersById = {
  'char-1': {
    id: 'char-1',
    type: 'Player',
    name: 'Goblin',
    image: null,
    notes: null,
    controlledByUserId: null,
    build: {
      classId: 'class-fighter',
      originId: 'origin-acolyte',
      specieId: 'specie-aasimar',
      subclassId: null,
      selectedFeatIds: [],
    },
    progression: {
      currentLevel: 1,
      pendingLevelUps: 0,
    },
    attributes: {
      base: {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
      },
    },
    hitPoints: {
      current: 10,
      max: 10,
      temporary: 0,
    },
    inspiration: false,
    inventory: {
      items: [],
    },
    equipment: {
      bodyArmorItemId: null,
      shieldItemId: null,
      mainHandWeaponId: null,
      offHandWeaponId: null,
    },
    resourcePools: {
      pools: [],
    },
    activeEffects: {
      effects: [],
    },
  },
  'monster-1': {
    id: 'monster-1',
    type: 'NPC',
    monsterId: 'monster-commoner',
    nameOverride: null,
    imageOverride: null,
    notes: null,
    hitPoints: {
      current: 4,
      temporary: 0,
    },
    resourcePools: {
      pools: [],
    },
    activeEffects: {
      effects: [],
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
  PHB2024MONSTERS: [
    {
      id: 'monster-commoner',
      name: ['Plebeu', 'Commoner'],
      type: 'Humanoide',
      challengeRating: '0',
    },
    {
      id: 'monster-wolf',
      name: ['Lobo', 'Wolf'],
      type: 'Besta',
      challengeRating: '1/4',
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

jest.mock('@/features/auth/model/authStore', () => ({
  useAuthStore: jest.fn((selector: (state: unknown) => unknown) =>
    selector({
      user: mockCurrentUserId == null ? null : { id: mockCurrentUserId },
    }),
  ),
}));

jest.mock('@/features/game/model/gameStore', () => ({
  useGameStore: jest.fn((selector: (state: unknown) => unknown) =>
    selector({
      currentGame: mockCurrentGame,
    }),
  ),
}));

jest.mock('@/features/modalManager/model/sessionModalStore', () => ({
  useSessionModalStore: jest.fn((selector: (state: unknown) => unknown) =>
    selector({
      openModal: mockOpenModal,
    }),
  ),
}));

jest.mock('@/entities/character/model/schemas/playerCharacterRuntime.schema', () => ({
  isPlayerCharacterRuntime: (runtimeCharacter: { type?: string } | null | undefined) =>
    runtimeCharacter?.type === 'Player',
}));

jest.mock('@/features/game/model/gameSessionApi', () => ({
  sendGameAddCharacterInventoryItem: (...args: unknown[]) => mockSendGameAddCharacterInventoryItem(...args),
}));

jest.mock('@/shared/ui/Modal', () => ({
  Modal: ({
    isOpen,
    title,
    children,
  }: {
    isOpen: boolean;
    title: string;
    children: React.ReactNode;
  }) =>
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
    mockCurrentGame = {
      owner: { id: 1, name: 'Mestre' },
      players: [{ id: 33, name: 'Jogadora' }],
    };
    mockCurrentUserId = 1;
    mockSendGameAddCharacterInventoryItem.mockResolvedValue({
      payload: { character: null },
    });
  });

  it('renderiza itens e monstros em PT-BR sem expor ids técnicos nos cards', () => {
    render(<CompendiumPanel gameId={1} />);

    expect(screen.getByText('Biblioteca')).toBeInTheDocument();
    expect(screen.getByText('Plebeu')).toBeInTheDocument();
    expect(screen.getByText('Humanoide • CR 0')).toBeInTheDocument();
    expect(screen.getByText('Espada Grande')).toBeInTheDocument();
    expect(screen.getByText('Arma')).toBeInTheDocument();
    expect(screen.queryByText('weapon-espada-grande')).not.toBeInTheDocument();
    expect(screen.queryByText('monster-commoner')).not.toBeInTheDocument();
  });

  it('permite buscar por tipo em inglês e por nome de monstro', () => {
    render(<CompendiumPanel gameId={1} />);

    fireEvent.change(screen.getByPlaceholderText('Buscar item ou monstro'), {
      target: { value: 'weapon' },
    });

    expect(screen.getByText('Espada Grande')).toBeInTheDocument();
    expect(screen.queryByText('Cota de Malha')).not.toBeInTheDocument();
    expect(screen.queryByText('Plebeu')).not.toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Buscar item ou monstro'), {
      target: { value: 'plebeu' },
    });

    expect(screen.getByText('Plebeu')).toBeInTheDocument();
    expect(screen.queryByText('Espada Grande')).not.toBeInTheDocument();
  });

  it('abre a própria ficha do monstro ao clicar em Detalhes', () => {
    render(<CompendiumPanel gameId={1} />);

    const commonerCard = screen.getByText('Plebeu').closest('[draggable="true"]');
    expect(commonerCard).not.toBeNull();

    fireEvent.click(within(commonerCard as HTMLElement).getByRole('button', { name: 'Detalhes' }));

    expect(mockOpenModal).toHaveBeenCalledWith('sheet', { monsterId: 'monster-commoner' });
  });

  it('abre o seletor de personagem para adicionar item usando apenas runtimes Player como alvo', () => {
    render(<CompendiumPanel gameId={1} />);

    fireEvent.click(screen.getAllByRole('button', { name: 'Adicionar' })[0]);

    expect(screen.getByRole('dialog', { name: 'Adicionar Cota de Malha' })).toBeInTheDocument();
    expect(screen.getByText('Goblin')).toBeInTheDocument();
    expect(screen.queryByText('monster-1')).not.toBeInTheDocument();
  });

  it('desabilita o fluxo de adicionar item para quem não é mestre', () => {
    mockCurrentUserId = 33;

    render(<CompendiumPanel gameId={1} />);

    const addButtons = screen.getAllByRole('button', { name: 'Adicionar' });
    expect(addButtons[0]).toBeDisabled();
    expect(
      screen.getByText('Somente o mestre pode arrastar monstros da biblioteca e conceder itens.'),
    ).toBeInTheDocument();
  });
});
