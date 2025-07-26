import { act, renderHook } from "@testing-library/react";

import { useCommandHistory } from "../useCommandHistory";

describe("useCommandHistory", () => {
  it("deve inicializar com um histórico vazio por padrão", () => {
    const { result } = renderHook(() => useCommandHistory());
    expect(result.current.commandHistory).toEqual([]);
  });

  it("deve inicializar com o histórico fornecido", () => {
    const initialHistory = ["cmd1", "cmd2"];
    const { result } = renderHook(() => useCommandHistory(initialHistory));
    expect(result.current.commandHistory).toEqual(initialHistory);
  });

  it("deve adicionar um comando ao histórico", () => {
    const { result } = renderHook(() => useCommandHistory());
    act(() => {
      result.current.addCommandToHistory("test command");
    });
    expect(result.current.commandHistory).toEqual(["test command"]);
  });

  it("deve adicionar múltiplos comandos ao histórico", () => {
    const { result } = renderHook(() => useCommandHistory());
    act(() => {
      result.current.addCommandToHistory("cmd1");
      result.current.addCommandToHistory("cmd2");
    });
    expect(result.current.commandHistory).toEqual(["cmd2", "cmd1"]);
  });

  it("não deve adicionar comandos duplicados, movendo o existente para o topo", () => {
    const { result } = renderHook(() => useCommandHistory(["cmd1", "cmd2"]));
    act(() => {
      result.current.addCommandToHistory("cmd1");
    });
    expect(result.current.commandHistory).toEqual(["cmd1", "cmd2"]);

    act(() => {
      result.current.addCommandToHistory("cmd2");
    });
    expect(result.current.commandHistory).toEqual(["cmd2", "cmd1"]);
  });

  it("deve limitar o histórico ao tamanho máximo", () => {
    const initialHistory = Array.from({ length: 50 }, (_, i) => `cmd${i}`);
    const { result } = renderHook(() => useCommandHistory(initialHistory));
    act(() => {
      result.current.addCommandToHistory("new command");
    });
    expect(result.current.commandHistory.length).toBe(50);
    expect(result.current.commandHistory[0]).toBe("new command");
    expect(result.current.commandHistory).not.toContain("cmd49"); // O mais antigo (último do initialHistory) deve ter sido removido
  });

  it("deve navegar para cima no histórico", () => {
    const { result } = renderHook(() => useCommandHistory(["cmd1", "cmd2"]));
    act(() => {
      result.current.addCommandToHistory("cmd3"); // History: ['cmd3', 'cmd1', 'cmd2']
    });

    let navigatedCommand;
    act(() => {
      navigatedCommand = result.current.navigateHistory("up", "");
    });
    expect(navigatedCommand).toBe("cmd3");

    act(() => {
      navigatedCommand = result.current.navigateHistory("up", "current input");
    });
    expect(navigatedCommand).toBe("cmd1");

    act(() => {
      navigatedCommand = result.current.navigateHistory("up", "current input");
    });
    expect(navigatedCommand).toBe("cmd2");

    // Tentar navegar além do histórico deve retornar o último comando
    act(() => {
      navigatedCommand = result.current.navigateHistory("up", "current input");
    });
    expect(navigatedCommand).toBe("cmd2");
  });

  it("deve navegar para baixo no histórico", () => {
    const { result } = renderHook(() => useCommandHistory(["cmd1", "cmd2"]));
    act(() => {
      result.current.addCommandToHistory("cmd3"); // History: ['cmd3', 'cmd1', 'cmd2']
    });

    // Navegar para cima para entrar no histórico
    act(() => {
      result.current.navigateHistory("up", ""); // cmd3
    });
    act(() => {
      result.current.navigateHistory("up", ""); // cmd1
    });
    act(() => {
      result.current.navigateHistory("up", ""); // cmd2
    });

    let navigatedCommand;
    act(() => {
      navigatedCommand = result.current.navigateHistory("down", "");
    });
    expect(navigatedCommand).toBe("cmd1");

    act(() => {
      navigatedCommand = result.current.navigateHistory("down", "");
    });
    expect(navigatedCommand).toBe("cmd3");

    // Navegar para baixo até o "comando atual"
    act(() => {
      navigatedCommand = result.current.navigateHistory("down", "");
    });
    expect(navigatedCommand).toBe(""); // Deve retornar o comando digitado antes de navegar

    // Tentar navegar para baixo além do "comando atual" deve retornar null
    act(() => {
      navigatedCommand = result.current.navigateHistory("down", "");
    });
    expect(navigatedCommand).toBeNull();
  });

  it("deve salvar o comando atual antes de navegar para cima e restaurá-lo ao navegar para baixo completamente", () => {
    const { result } = renderHook(() => useCommandHistory(["cmd1", "cmd2"]));
    act(() => {
      result.current.addCommandToHistory("cmd3"); // History: ['cmd3', 'cmd1', 'cmd2']
    });

    let navigatedCommand;
    act(() => {
      navigatedCommand = result.current.navigateHistory(
        "up",
        "my current input"
      );
    });
    expect(navigatedCommand).toBe("cmd3");

    act(() => {
      navigatedCommand = result.current.navigateHistory("up", "still typing");
    });
    expect(navigatedCommand).toBe("cmd1");

    act(() => {
      navigatedCommand = result.current.navigateHistory("down", "from history");
    });
    expect(navigatedCommand).toBe("cmd3");

    act(() => {
      navigatedCommand = result.current.navigateHistory("down", "from history");
    });
    expect(navigatedCommand).toBe("my current input"); // Deve restaurar o input original

    act(() => {
      navigatedCommand = result.current.navigateHistory("down", "from history");
    });
    expect(navigatedCommand).toBeNull(); // Não há mais para onde navegar para baixo
  });

  it("deve resetar a navegação do histórico", () => {
    const { result } = renderHook(() => useCommandHistory(["cmd1", "cmd2"]));
    act(() => {
      result.current.addCommandToHistory("cmd3"); // History: ['cmd3', 'cmd1', 'cmd2']
    });

    act(() => {
      result.current.navigateHistory("up", ""); // cmd3
    });
    act(() => {
      result.current.navigateHistory("up", ""); // cmd1
    });

    act(() => {
      result.current.resetHistoryNavigation();
    });

    // Após reset, navegar para cima deve começar do topo novamente
    let navigatedCommand;
    act(() => {
      navigatedCommand = result.current.navigateHistory(
        "up",
        "new input after reset"
      );
    });
    expect(navigatedCommand).toBe("cmd3");
  });

  it("deve lidar com histórico vazio ao navegar para cima", () => {
    const { result } = renderHook(() => useCommandHistory([]));
    let navigatedCommand;
    act(() => {
      navigatedCommand = result.current.navigateHistory("up", "empty");
    });
    expect(navigatedCommand).toBeNull();
  });

  it("deve lidar com histórico vazio ao navegar para baixo", () => {
    const { result } = renderHook(() => useCommandHistory([]));
    let navigatedCommand;
    act(() => {
      navigatedCommand = result.current.navigateHistory("down", "empty");
    });
    expect(navigatedCommand).toBeNull();
  });
});
