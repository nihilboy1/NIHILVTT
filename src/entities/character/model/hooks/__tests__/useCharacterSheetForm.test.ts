import { useCharacterSheetForm } from "@/entities/character/model/hooks/useCharacterSheetForm";
import { CharacterType, MonsterNPCCharacter, PlayerCharacter } from "@/shared/api/types";
import {
  DEFAULT_TOKEN_HP,
  DEFAULT_TOKEN_SIZE,
} from "@/shared/config/constants";
import { DEFAULT_TOKEN_IMAGE } from "@/shared/config/sheetDefaults";
import { act, renderHook } from "@testing-library/react";

// Mock para a classe Image, para evitar erros de ambiente de teste
const mockImage = {
  onload: jest.fn(),
  onerror: jest.fn(),
  src: "",
  width: 0,
  height: 0,
};
Object.defineProperty(global, "Image", {
  writable: true,
  value: jest.fn(() => mockImage),
});

describe("useCharacterSheetForm", () => {
  const mockOnSave = jest.fn();

  beforeEach(() => {
    mockOnSave.mockClear();
    mockImage.onload = jest.fn();
    mockImage.onerror = jest.fn();
    mockImage.src = "";
    mockImage.width = 0;
    mockImage.height = 0;
  });

  it("deve inicializar com valores padrão quando initialCharacterData é nulo", () => {
    const { result } = renderHook(() =>
      useCharacterSheetForm({ initialCharacterData: null, onSave: mockOnSave })
    );

    expect(result.current.editingCharacterName).toBe("");
    expect(result.current.editingCharacterImage).toBe(DEFAULT_TOKEN_IMAGE);
    expect(result.current.editingCharacterSize).toBe(DEFAULT_TOKEN_SIZE);
    expect(result.current.editingCharacterType).toBeNull();
    expect(result.current.editingMaxHp).toBe(String(DEFAULT_TOKEN_HP));
    expect(result.current.editingCharacterNotes).toBe("");
    expect(result.current.editingInspiration).toBe(false);
    expect(result.current.hasCharacterSheetChanged).toBe(false);
  });

  it("deve inicializar com os dados do personagem fornecidos", () => {
    const initialCharacter: MonsterNPCCharacter = {
      id: "123",
      name: "Test Character",
      image: "http://example.com/image.png",
      size: "2x2",
      type: CharacterType.MONSTER_NPC,
      notes: "Some notes",
      challengeRating: 5,
      attributes: { strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10 },
      proficiencyBonus: 2,
      proficiencies: {
        savingThrows: { strength: false, dexterity: false, constitution: false, intelligence: false, wisdom: false, charisma: false },
        skills: { acrobatics: false, animalHandling: false, arcana: false, athletics: false, deception: false, history: false, insight: false, intimidation: false, investigation: false, medicine: false, nature: false, perception: false, performance: false, persuasion: false, religion: false, sleightOfHand: false, stealth: false, survival: false },
      },
      combatStats: {
        maxHp: 100,
        currentHp: 50,
        armorClass: 10,
        speed: 30,
      },
    };
    const { result } = renderHook(() =>
      useCharacterSheetForm({
        initialCharacterData: initialCharacter,
        onSave: mockOnSave,
      })
    );

    expect(result.current.editingCharacterName).toBe("Test Character");
    expect(result.current.editingCharacterImage).toBe(
      "http://example.com/image.png"
    );
    expect(result.current.editingCharacterSize).toBe("2x2");
    expect(result.current.editingCharacterType).toBe(CharacterType.MONSTER_NPC);
    expect(result.current.editingMaxHp).toBe("100");
    expect(result.current.editingCharacterNotes).toBe("Some notes");
    expect(result.current.editingInspiration).toBe(false); // Monster/NPC não tem inspiração
    expect(result.current.hasCharacterSheetChanged).toBe(false);
  });

  it("deve inicializar inspiration corretamente para PlayerCharacter", () => {
    const playerCharacter: PlayerCharacter = {
      id: "player1",
      name: "Player One",
      image: DEFAULT_TOKEN_IMAGE,
      size: DEFAULT_TOKEN_SIZE,
      type: CharacterType.PLAYER,
      notes: "",
      inspiration: true,
      level: 1,
      attributes: { strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10 },
      proficiencyBonus: 2,
      proficiencies: {
        savingThrows: { strength: false, dexterity: false, constitution: false, intelligence: false, wisdom: false, charisma: false },
        skills: { acrobatics: false, animalHandling: false, arcana: false, athletics: false, deception: false, history: false, insight: false, intimidation: false, investigation: false, medicine: false, nature: false, perception: false, performance: false, persuasion: false, religion: false, sleightOfHand: false, stealth: false, survival: false },
      },
      combatStats: {
        maxHp: 20,
        currentHp: 20,
        armorClass: 10,
        speed: 30,
      },
    };
    const { result } = renderHook(() =>
      useCharacterSheetForm({
        initialCharacterData: playerCharacter,
        onSave: mockOnSave,
      })
    );
    expect(result.current.editingInspiration).toBe(true);

    const playerCharacterNoInspiration = {
      ...playerCharacter,
      inspiration: false,
    };
    const { result: result2 } = renderHook(() =>
      useCharacterSheetForm({
        initialCharacterData: playerCharacterNoInspiration,
        onSave: mockOnSave,
      })
    );
    expect(result2.current.editingInspiration).toBe(false);
  });

  it("deve atualizar hasCharacterSheetChanged quando os campos são alterados", () => {
    const initialCharacter: MonsterNPCCharacter = {
      id: "123",
      name: "Test Character",
      image: DEFAULT_TOKEN_IMAGE,
      size: DEFAULT_TOKEN_SIZE,
      type: CharacterType.MONSTER_NPC,
      notes: "Some notes",
      challengeRating: 5,
      attributes: { strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10 },
      proficiencyBonus: 2,
      proficiencies: {
        savingThrows: { strength: false, dexterity: false, constitution: false, intelligence: false, wisdom: false, charisma: false },
        skills: { acrobatics: false, animalHandling: false, arcana: false, athletics: false, deception: false, history: false, insight: false, intimidation: false, investigation: false, medicine: false, nature: false, perception: false, performance: false, persuasion: false, religion: false, sleightOfHand: false, stealth: false, survival: false },
      },
      combatStats: {
        maxHp: 100,
        currentHp: 50,
        armorClass: 10,
        speed: 30,
      },
    };
    const { result } = renderHook(() =>
      useCharacterSheetForm({
        initialCharacterData: initialCharacter,
        onSave: mockOnSave,
      })
    );

    expect(result.current.hasCharacterSheetChanged).toBe(false);

    act(() => {
      result.current.setEditingCharacterName("New Name");
    });
    expect(result.current.hasCharacterSheetChanged).toBe(true);

    act(() => {
      result.current.setEditingCharacterName("Test Character"); // Volta ao original
    });
    expect(result.current.hasCharacterSheetChanged).toBe(false);

    act(() => {
      result.current.setEditingMaxHp("40");
    });
    expect(result.current.hasCharacterSheetChanged).toBe(true);
  });

  it("deve chamar onSave com os dados atualizados para um personagem existente", async () => {
    const initialCharacter: MonsterNPCCharacter = {
      id: "123",
      name: "Old Name",
      image: DEFAULT_TOKEN_IMAGE,
      size: DEFAULT_TOKEN_SIZE,
      type: CharacterType.MONSTER_NPC,
      notes: "Old notes",
      challengeRating: 5,
      attributes: { strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10 },
      proficiencyBonus: 2,
      proficiencies: {
        savingThrows: { strength: false, dexterity: false, constitution: false, intelligence: false, wisdom: false, charisma: false },
        skills: { acrobatics: false, animalHandling: false, arcana: false, athletics: false, deception: false, history: false, insight: false, intimidation: false, investigation: false, medicine: false, nature: false, perception: false, performance: false, persuasion: false, religion: false, sleightOfHand: false, stealth: false, survival: false },
      },
      combatStats: {
        maxHp: 100,
        currentHp: 50,
        armorClass: 10,
        speed: 30,
      },
    };
    const { result } = renderHook(() =>
      useCharacterSheetForm({
        initialCharacterData: initialCharacter,
        onSave: mockOnSave,
      })
    );

    act(() => {
      result.current.setEditingCharacterName("New Name");
      result.current.setEditingMaxHp("45");
      result.current.setEditingCharacterNotes("New notes");
    });

    await act(async () => {
      await result.current.handleSave({
        preventDefault: () => {},
      } as React.FormEvent);
    });

    expect(mockOnSave).toHaveBeenCalledTimes(1);
    expect(mockOnSave).toHaveBeenCalledWith({
      name: "New Name",
      image: DEFAULT_TOKEN_IMAGE,
      size: DEFAULT_TOKEN_SIZE,
      type: CharacterType.MONSTER_NPC,
      maxHp: 45,
      notes: "New notes",
    });
  });

  it("deve chamar onSave com os dados para um novo personagem (initialCharacterData nulo)", async () => {
    const { result } = renderHook(() =>
      useCharacterSheetForm({ initialCharacterData: null, onSave: mockOnSave })
    );

    act(() => {
      result.current.setEditingCharacterName("New Character");
      result.current.setEditingCharacterType(CharacterType.PLAYER);
      result.current.setEditingMaxHp("10");
    });

    await act(async () => {
      await result.current.handleSave({
        preventDefault: () => {},
      } as React.FormEvent);
    });

    expect(mockOnSave).toHaveBeenCalledTimes(1);
    expect(mockOnSave).toHaveBeenCalledWith({
      name: "New Character",
      image: DEFAULT_TOKEN_IMAGE,
      size: DEFAULT_TOKEN_SIZE,
      type: CharacterType.PLAYER,
      maxHp: 10,
      notes: "",
      inspiration: false, // Padrão para novo PlayerCharacter
    });
  });

  it("não deve chamar onSave se o nome do personagem estiver vazio", async () => {
    const initialCharacter: MonsterNPCCharacter = {
      id: "123",
      name: "Old Name",
      image: DEFAULT_TOKEN_IMAGE,
      size: DEFAULT_TOKEN_SIZE,
      type: CharacterType.MONSTER_NPC,
      notes: "Old notes",
      challengeRating: 5,
      attributes: { strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10 },
      proficiencyBonus: 2,
      proficiencies: {
        savingThrows: { strength: false, dexterity: false, constitution: false, intelligence: false, wisdom: false, charisma: false },
        skills: { acrobatics: false, animalHandling: false, arcana: false, athletics: false, deception: false, history: false, insight: false, intimidation: false, investigation: false, medicine: false, nature: false, perception: false, performance: false, persuasion: false, religion: false, sleightOfHand: false, stealth: false, survival: false },
      },
      combatStats: {
        maxHp: 100,
        currentHp: 50,
        armorClass: 10,
        speed: 30,
      },
    };
    const { result } = renderHook(() =>
      useCharacterSheetForm({
        initialCharacterData: initialCharacter,
        onSave: mockOnSave,
      })
    );

    act(() => {
      result.current.setEditingCharacterName("");
    });

    // Mock alert para evitar que ele apareça durante o teste
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    await act(async () => {
      await result.current.handleSave({
        preventDefault: () => {},
      } as React.FormEvent);
    });

    expect(mockOnSave).not.toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledWith(
      "O nome do personagem não pode estar vazio."
    );
    alertMock.mockRestore();
  });

  it("não deve chamar onSave se initialCharacterData for nulo e editingCharacterType for nulo", async () => {
    const { result } = renderHook(() =>
      useCharacterSheetForm({ initialCharacterData: null, onSave: mockOnSave })
    );

    act(() => {
      result.current.setEditingCharacterName("New Character");
      // editingCharacterType permanece nulo
    });

    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    await act(async () => {
      await result.current.handleSave({
        preventDefault: () => {},
      } as React.FormEvent);
    });

    expect(mockOnSave).not.toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledWith(
      "Erro: O tipo do personagem deve ser selecionado."
    );
    alertMock.mockRestore();
  });

  it("não deve chamar onSave com valores de HP inválidos", async () => {
    const initialCharacter: MonsterNPCCharacter = {
      id: "123",
      name: "Test Character",
      image: DEFAULT_TOKEN_IMAGE,
      size: DEFAULT_TOKEN_SIZE,
      type: CharacterType.MONSTER_NPC,
      notes: "Old notes",
      challengeRating: 5,
      attributes: { strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10 },
      proficiencyBonus: 2,
      proficiencies: {
        savingThrows: { strength: false, dexterity: false, constitution: false, intelligence: false, wisdom: false, charisma: false },
        skills: { acrobatics: false, animalHandling: false, arcana: false, athletics: false, deception: false, history: false, insight: false, intimidation: false, investigation: false, medicine: false, nature: false, perception: false, performance: false, persuasion: false, religion: false, sleightOfHand: false, stealth: false, survival: false },
      },
      combatStats: {
        maxHp: 100,
        currentHp: 50,
        armorClass: 10,
        speed: 30,
      },
    };
    const { result } = renderHook(() =>
      useCharacterSheetForm({
        initialCharacterData: initialCharacter,
        onSave: mockOnSave,
      })
    );
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    // Teste: maxHp <= 0
    act(() => {
      result.current.setEditingMaxHp("0");
    });
    await act(async () => {
      await result.current.handleSave({
        preventDefault: () => {},
      } as React.FormEvent);
    });
    expect(mockOnSave).not.toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledWith(
      "Valores de HP inválidos. Vida Máxima deve ser > 0."
    );
    alertMock.mockRestore();
  });

  it("deve validar o tamanho da imagem e chamar onSave se for válido", async () => {
    const initialCharacter: MonsterNPCCharacter = {
      id: "123",
      name: "Test Character",
      image: "http://example.com/valid-image.png",
      size: DEFAULT_TOKEN_SIZE,
      type: CharacterType.MONSTER_NPC,
      notes: "Old notes",
      challengeRating: 5,
      attributes: { strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10 },
      proficiencyBonus: 2,
      proficiencies: {
        savingThrows: { strength: false, dexterity: false, constitution: false, intelligence: false, wisdom: false, charisma: false },
        skills: { acrobatics: false, animalHandling: false, arcana: false, athletics: false, deception: false, history: false, insight: false, intimidation: false, investigation: false, medicine: false, nature: false, perception: false, performance: false, persuasion: false, religion: false, sleightOfHand: false, stealth: false, survival: false },
      },
      combatStats: {
        maxHp: 100,
        currentHp: 50,
        armorClass: 10,
        speed: 30,
      },
    };
    const { result } = renderHook(() =>
      useCharacterSheetForm({
        initialCharacterData: initialCharacter,
        onSave: mockOnSave,
      })
    );

    act(() => {
      result.current.setEditingCharacterImage(
        "http://example.com/valid-image.png"
      );
    });

    // Simula o carregamento bem-sucedido da imagem com dimensões válidas
    mockImage.width = 100;
    mockImage.height = 100;

    const promise = act(async () => {
      await result.current.handleSave({
        preventDefault: () => {},
      } as React.FormEvent);
    });

    // Dispara o onload da imagem
    mockImage.onload();
    await promise;

    expect(mockOnSave).toHaveBeenCalledTimes(1);
    expect(mockOnSave).toHaveBeenCalledWith(
      expect.objectContaining({
        image: "http://example.com/valid-image.png",
      })
    );
  });

  it("não deve chamar onSave se a imagem for muito grande", async () => {
    const initialCharacter: MonsterNPCCharacter = {
      id: "123",
      name: "Test Character",
      image: "http://example.com/large-image.png",
      size: DEFAULT_TOKEN_SIZE,
      type: CharacterType.MONSTER_NPC,
      notes: "Old notes",
      challengeRating: 5,
      attributes: { strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10 },
      proficiencyBonus: 2,
      proficiencies: {
        savingThrows: { strength: false, dexterity: false, constitution: false, intelligence: false, wisdom: false, charisma: false },
        skills: { acrobatics: false, animalHandling: false, arcana: false, athletics: false, deception: false, history: false, insight: false, intimidation: false, investigation: false, medicine: false, nature: false, perception: false, performance: false, persuasion: false, religion: false, sleightOfHand: false, stealth: false, survival: false },
      },
      combatStats: {
        maxHp: 100,
        currentHp: 50,
        armorClass: 10,
        speed: 30,
      },
    };
    const { result } = renderHook(() =>
      useCharacterSheetForm({
        initialCharacterData: initialCharacter,
        onSave: mockOnSave,
      })
    );

    act(() => {
      result.current.setEditingCharacterImage(
        "http://example.com/large-image.png"
      );
    });

    mockImage.width = 600; // Maior que MAX_IMAGE_DIMENSION (500)
    mockImage.height = 600;

    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    const promise = act(async () => {
      await result.current.handleSave({
        preventDefault: () => {},
      } as React.FormEvent);
    });

    // Dispara o onload da imagem
    mockImage.onload();
    await promise;

    expect(mockOnSave).not.toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledWith(
      expect.stringContaining("A imagem é muito grande.")
    );
    alertMock.mockRestore();
  });

  it("não deve chamar onSave se a imagem não puder ser carregada", async () => {
    const initialCharacter: MonsterNPCCharacter = {
      id: "123",
      name: "Test Character",
      image: "http://example.com/invalid-image.png",
      size: DEFAULT_TOKEN_SIZE,
      type: CharacterType.MONSTER_NPC,
      notes: "Old notes",
      challengeRating: 5,
      attributes: { strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10 },
      proficiencyBonus: 2,
      proficiencies: {
        savingThrows: { strength: false, dexterity: false, constitution: false, intelligence: false, wisdom: false, charisma: false },
        skills: { acrobatics: false, animalHandling: false, arcana: false, athletics: false, deception: false, history: false, insight: false, intimidation: false, investigation: false, medicine: false, nature: false, perception: false, performance: false, persuasion: false, religion: false, sleightOfHand: false, stealth: false, survival: false },
      },
      combatStats: {
        maxHp: 100,
        currentHp: 50,
        armorClass: 10,
        speed: 30,
      },
    };
    const { result } = renderHook(() =>
      useCharacterSheetForm({
        initialCharacterData: initialCharacter,
        onSave: mockOnSave,
      })
    );

    act(() => {
      result.current.setEditingCharacterImage(
        "http://example.com/invalid-image.png"
      );
    });

    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    const promise = act(async () => {
      await result.current.handleSave({
        preventDefault: () => {},
      } as React.FormEvent);
    });

    // Dispara o onerror da imagem
    mockImage.onerror();
    await promise;

    expect(mockOnSave).not.toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledWith(
      expect.stringContaining("Não foi possível carregar a imagem.")
    );
    alertMock.mockRestore();
  });

  it("deve usar DEFAULT_TOKEN_IMAGE se a imagem for uma string vazia", async () => {
    const initialCharacter: MonsterNPCCharacter = {
      id: "123",
      name: "Test Character",
      image: "http://example.com/image.png",
      size: DEFAULT_TOKEN_SIZE,
      type: CharacterType.MONSTER_NPC,
      notes: "Old notes",
      challengeRating: 5,
      attributes: { strength: 10, dexterity: 10, constitution: 10, intelligence: 10, wisdom: 10, charisma: 10 },
      proficiencyBonus: 2,
      proficiencies: {
        savingThrows: { strength: false, dexterity: false, constitution: false, intelligence: false, wisdom: false, charisma: false },
        skills: { acrobatics: false, animalHandling: false, arcana: false, athletics: false, deception: false, history: false, insight: false, intimidation: false, investigation: false, medicine: false, nature: false, perception: false, performance: false, persuasion: false, religion: false, sleightOfHand: false, stealth: false, survival: false },
      },
      combatStats: {
        maxHp: 100,
        currentHp: 50,
        armorClass: 10,
        speed: 30,
      },
    };
    const { result } = renderHook(() =>
      useCharacterSheetForm({
        initialCharacterData: initialCharacter,
        onSave: mockOnSave,
      })
    );

    act(() => {
      result.current.setEditingCharacterImage("");
    });

    await act(async () => {
      await result.current.handleSave({
        preventDefault: () => {},
      } as React.FormEvent);
    });

    expect(mockOnSave).toHaveBeenCalledTimes(1);
    expect(mockOnSave).toHaveBeenCalledWith(
      expect.objectContaining({
        image: DEFAULT_TOKEN_IMAGE,
      })
    );
  });
});
