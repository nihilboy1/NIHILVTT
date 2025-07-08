import { HPControlModal } from "@/features/characterUpdateHp/ui/HPControlModal";
import useDismissable from "@/shared/lib/hooks/useDismissable";
import { calculateNewHP } from "@/shared/lib/utils/hpUtils";
import "@testing-library/jest-dom";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // Import userEvent
import { PlayerCharacter } from "@/shared/api/types";
import { defaultAttributes, defaultSavingThrows, defaultSkills } from "@/shared/config/sheetDefaults";

// Mock do hook useDismissable
jest.mock("../shared/lib/hooks/useDismissable");
const mockUseDismissable = useDismissable as jest.MockedFunction<
  typeof useDismissable
>;

// Mock da função calculateNewHP
jest.mock("../shared/lib/utils/hpUtils");
const mockCalculateNewHP = calculateNewHP as jest.MockedFunction<
  typeof calculateNewHP
>;

describe("HPControlModal", () => {
  const mockOnClose = jest.fn();
  const mockOnHPChange = jest.fn();
  const mockOnRemoveFromBoard = jest.fn();
  const mockOnMakeIndependent = jest.fn();

  const defaultCharacter: PlayerCharacter = {
    id: "char-1",
    name: "Hero",
    type: "Player",
    size: "medium",
    image: "test-image.png",
    notes: "",
    level: 1,
    xp: 0,
    inspiration: false,
    hitDiceUsed: 0,
    hitDiceMax: 1,
    deathSavesSuccesses: 0,
    deathSavesFailures: 0,
    hitDiceEntries: [],
    attributes: defaultAttributes,
    proficiencyBonus: 2,
    proficiencies: {
      savingThrows: defaultSavingThrows,
      skills: defaultSkills,
    },
    combatStats: {
      maxHp: 100,
      currentHp: 100,
      armorClass: 15,
      speed: 30,
      initiative: 10,
      passivePerception: 10,
      shieldEquipped: false,
    },
    actions: [],
    attacks: [],
    equipment: [],
    featuresAndTraits: [],
  };

  const defaultProps = {
    tokenId: "instance-1", // ID da instância do token no tabuleiro
    character: { ...defaultCharacter }, // A ficha de personagem
    anchorPoint: { x: 100, y: 100 },
    isOpen: true,
    onClose: mockOnClose,
    onHPChange: mockOnHPChange,
    onRemoveFromBoard: mockOnRemoveFromBoard,
    onMakeIndependent: mockOnMakeIndependent,
  };

  let dismissCallback: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    dismissCallback = jest.fn(); // Inicializa como um mock function
    // Garante que o mock de useDismissable não chame onClose por padrão
    mockUseDismissable.mockImplementation((_ref, isOpen, callback) => {
      if (isOpen) {
        // Quando o hook é chamado e o modal está aberto, armazena a callback real
        // para que possamos chamá-la manualmente no teste.
        dismissCallback.mockImplementation(callback);
      }
    });
    // Mock padrão para calculateNewHP para retornar o valor parseado
    mockCalculateNewHP.mockImplementation((inputValue, _currentHP, maxHP) => {
      const trimmedInput = inputValue.trim();
      let newCalculatedHP: number;

      if (trimmedInput.startsWith("+") || trimmedInput.startsWith("-")) {
        const isPositive = trimmedInput.startsWith("+");
        const valueStr = trimmedInput.substring(1);
        const value = parseInt(valueStr, 10);

        if (!isNaN(value) && value >= 0) {
          newCalculatedHP = isPositive
            ? _currentHP + value
            : _currentHP - value;
        } else {
          return null;
        }
      } else {
        const value = parseInt(trimmedInput, 10);
        if (!isNaN(value)) {
          newCalculatedHP = value;
        } else {
          return null;
        }
      }
      return Math.max(0, Math.min(newCalculatedHP, maxHP));
    });
  });

  // Renderização Inicial
  test("deve renderizar o modal quando isOpen é true e dados são válidos", () => {
    render(<HPControlModal {...defaultProps} />);
    expect(
      screen.getByRole("dialog", { name: "Controle de Vida" })
    ).toBeInTheDocument();
    // O input de HP é inicializado com o maxHp do character, não currentHp
    expect(screen.getByLabelText("Vida Atual")).toHaveValue(
      String(defaultProps.character.combatStats.maxHp)
    );
    expect(screen.getByTestId("max-hp-display")).toHaveTextContent(
      String(defaultProps.character.combatStats.maxHp)
    ); // Usar data-testid
    expect(screen.getByTitle("Tornar Token Independente")).toBeInTheDocument();
    expect(screen.getByTitle("Remover do Tabuleiro")).toBeInTheDocument();
  });

  test("deve focar no input de HP quando o modal abre", async () => {
    render(<HPControlModal {...defaultProps} />);
    await waitFor(() => {
      expect(screen.getByLabelText("Vida Atual")).toHaveFocus();
    });
  });

  test("não deve renderizar o modal quando isOpen é false", () => {
    render(<HPControlModal {...defaultProps} isOpen={false} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("não deve renderizar o modal se tokenId for nulo", () => {
    render(<HPControlModal {...defaultProps} tokenId={null} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("deve chamar onClose se character for nulo e modal estiver aberto", () => {
    render(<HPControlModal {...defaultProps} character={null} />);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  // Interação com Input de HP
  test("deve atualizar o HP ao digitar um valor válido e pressionar Enter", async () => {
    // Mock calculateNewHP para retornar o valor esperado
    mockCalculateNewHP.mockImplementation((inputValue, maxHP) => {
      const value = parseInt(inputValue, 10);
      return Math.max(0, Math.min(value, maxHP));
    });

    render(<HPControlModal {...defaultProps} />);
    const hpInput = screen.getByLabelText("Vida Atual");
    fireEvent.change(hpInput, { target: { value: "60" } });
    await act(async () => {
      fireEvent.keyDown(hpInput, { key: "Enter" });
    });

    // O currentHP passado para calculateNewHP será o valor atual do input (que é o maxHp do character inicialmente)
    // ou o valor digitado se o input já tiver sido alterado.
    // Para este teste, o input é 100 (maxHp inicial), então 60 é o valor digitado.
    expect(mockCalculateNewHP).toHaveBeenCalledWith("60", defaultProps.character.combatStats.currentHp, defaultProps.character.combatStats.maxHp);
    expect(mockOnHPChange).toHaveBeenCalledWith("instance-1", 60); // Passar tokenId
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(hpInput).toHaveValue("60");
  });

  test("deve atualizar o HP ao digitar um valor com operador de soma e pressionar Enter", async () => {
    mockCalculateNewHP.mockReturnValue(defaultProps.character.combatStats.currentHp + 5); // currentHP (100) + 5
    render(<HPControlModal {...defaultProps} />);
    const hpInput = screen.getByLabelText("Vida Atual");
    fireEvent.change(hpInput, { target: { value: "+5" } });
    await act(async () => {
      fireEvent.keyDown(hpInput, { key: "Enter" });
    });

    expect(mockCalculateNewHP).toHaveBeenCalledWith("+5", defaultProps.character.combatStats.currentHp, defaultProps.character.combatStats.maxHp);
    expect(mockOnHPChange).toHaveBeenCalledWith("instance-1", 105);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(hpInput).toHaveValue("105");
  });

  test("deve atualizar o HP ao digitar um valor com operador de subtração e pressionar Enter", async () => {
    mockCalculateNewHP.mockReturnValue(defaultProps.character.combatStats.currentHp - 5); // currentHP (100) - 5
    render(<HPControlModal {...defaultProps} />);
    const hpInput = screen.getByLabelText("Vida Atual");
    fireEvent.change(hpInput, { target: { value: "-5" } });
    await act(async () => {
      fireEvent.keyDown(hpInput, { key: "Enter" });
    });

    expect(mockCalculateNewHP).toHaveBeenCalledWith("-5", defaultProps.character.combatStats.currentHp, defaultProps.character.combatStats.maxHp);
    expect(mockOnHPChange).toHaveBeenCalledWith("instance-1", 95);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(hpInput).toHaveValue("95");
  });

  test("deve limitar o HP ao maxHP ao digitar um valor muito alto", async () => {
    mockCalculateNewHP.mockReturnValue(defaultProps.character.combatStats.maxHp); // Limita a 100
    render(<HPControlModal {...defaultProps} />);
    const hpInput = screen.getByLabelText("Vida Atual");
    fireEvent.change(hpInput, { target: { value: "200" } });
    await act(async () => {
      fireEvent.keyDown(hpInput, { key: "Enter" });
    });

    expect(mockCalculateNewHP).toHaveBeenCalledWith("200", defaultProps.character.combatStats.currentHp, defaultProps.character.combatStats.maxHp);
    expect(mockOnHPChange).toHaveBeenCalledWith("instance-1", 100);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(hpInput).toHaveValue("100");
  });

  test("deve limitar o HP a 0 ao digitar um valor muito baixo", async () => {
    mockCalculateNewHP.mockReturnValue(0); // Limita a 0
    render(<HPControlModal {...defaultProps} />);
    const hpInput = screen.getByLabelText("Vida Atual");
    fireEvent.change(hpInput, { target: { value: "-100" } });
    await act(async () => {
      fireEvent.keyDown(hpInput, { key: "Enter" });
    });

    expect(mockCalculateNewHP).toHaveBeenCalledWith("-100", defaultProps.character.combatStats.currentHp, defaultProps.character.combatStats.maxHp);
    expect(mockOnHPChange).toHaveBeenCalledWith("instance-1", 0);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(hpInput).toHaveValue("0");
  });

  test("não deve chamar onHPChange e deve reverter o input para HP atual se a entrada for inválida", async () => {
    mockCalculateNewHP.mockReturnValue(null); // Simula entrada inválida
    render(<HPControlModal {...defaultProps} />);
    const hpInput = screen.getByLabelText("Vida Atual");
    fireEvent.change(hpInput, { target: { value: "abc" } });
    await act(async () => {
      fireEvent.keyDown(hpInput, { key: "Enter" });
    });

    expect(mockCalculateNewHP).toHaveBeenCalledWith("abc", defaultProps.character.combatStats.currentHp, defaultProps.character.combatStats.maxHp);
    expect(mockOnHPChange).not.toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(hpInput).toHaveValue(String(defaultProps.character.combatStats.maxHp)); // Reverte para o HP atual (maxHp inicial)
  });

  test("deve chamar onClose ao pressionar Escape no input", async () => {
    render(<HPControlModal {...defaultProps} />);
    const hpInput = screen.getByLabelText("Vida Atual");
    await act(async () => {
      fireEvent.keyDown(hpInput, { key: "Escape" });
    });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockOnHPChange).not.toHaveBeenCalled(); // Não deve salvar ao pressionar Escape
  });

  test("deve chamar handleSubmit no blur do input, mas não onClose", async () => {
    const user = userEvent.setup();
    render(<HPControlModal {...defaultProps} />);
    const hpInput = screen.getByLabelText("Vida Atual");

    // Use userEvent to interact
    await user.clear(hpInput);
    await user.type(hpInput, "55");

    // Simulate blur, e.g., by tabbing away
    await user.tab();

    // Wrap assertions in waitFor
    await waitFor(() => {
      expect(mockCalculateNewHP).toHaveBeenCalledWith("55", defaultProps.character.combatStats.currentHp, defaultProps.character.combatStats.maxHp); // Ensure calculateNewHP is called correctly
      expect(mockOnHPChange).toHaveBeenCalledWith("instance-1", 55);
    });
    // Assert that onClose was not called, outside waitFor as it's an immediate check post-blur
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  // Interação com Botões
  test("deve chamar onRemoveFromBoard quando o botão de remover é clicado", () => {
    render(<HPControlModal {...defaultProps} />);
    fireEvent.click(screen.getByTitle("Remover do Tabuleiro"));
    expect(mockOnRemoveFromBoard).toHaveBeenCalledWith("instance-1");
    expect(mockOnClose).not.toHaveBeenCalled(); // onClose é tratado pelo componente pai
  });

  test("deve chamar onMakeIndependent quando o botão de tornar independente é clicado", () => {
    render(<HPControlModal {...defaultProps} />);
    fireEvent.click(screen.getByTitle("Tornar Token Independente"));
    expect(mockOnMakeIndependent).toHaveBeenCalledWith("instance-1");
    expect(mockOnClose).not.toHaveBeenCalled(); // onClose é tratado pelo componente pai
  });

  // Comportamento de Fechamento (Dismiss)
  test("deve chamar handleCloseAndSave quando useDismissable é acionado", async () => {
    render(<HPControlModal {...defaultProps} />);
    // Simula o acionamento do dismiss
    act(() => {
      dismissCallback(); // Chama a callback armazenada
    });

    // Aguarda a próxima atualização do DOM para garantir que os efeitos foram processados
    await waitFor(() => {
      expect(mockCalculateNewHP).toHaveBeenCalledTimes(1); // Chamado por handleSubmit
      expect(mockOnHPChange).toHaveBeenCalledTimes(1); // Chamado por handleSubmit
      expect(mockOnClose).toHaveBeenCalledTimes(1); // Chamado por handleCloseAndSave
    });
  });

  // Sincronização de HP
  test("deve sincronizar o input com character.maxHp quando character muda e modal está aberto", () => {
    const { rerender } = render(<HPControlModal {...defaultProps} />);
    const hpInput = screen.getByLabelText("Vida Atual");
    expect(hpInput).toHaveValue(String(defaultProps.character.combatStats.maxHp));

    const updatedCharacter = { ...defaultCharacter, combatStats: { ...defaultCharacter.combatStats, maxHp: 75 } };
    rerender(<HPControlModal {...defaultProps} character={updatedCharacter} />);

    expect(hpInput).toHaveValue("75");
  });
});
