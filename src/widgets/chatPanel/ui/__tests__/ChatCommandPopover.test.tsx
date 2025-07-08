import { ChatCommandPopover } from "@/widgets/chatPanel/ui/ChatCommandPopover"; // Corrigido o caminho
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import * as chatCommands from "@/widgets/chatPanel/lib/chatCommands"; // Corrigido o caminho

jest.mock("@/widgets/chatPanel/lib/chatCommands"); // Corrigido o caminho do mock

const mockGetAllCommands = chatCommands.getAllCommands as jest.Mock;

const mockGetBoundingClientRect = jest.fn(() => ({
  top: 100,
  right: 200,
  left: 100,
  bottom: 150,
  width: 100,
  height: 50,
  x: 100,
  y: 100,
  toJSON: () => ({}),
}));

let mockContainsImplementation: jest.Mock;

const originalWindowInnerHeight = window.innerHeight;
const originalWindowInnerWidth = window.innerWidth;

describe("ChatCommandPopover", () => {
  const mockOnClose = jest.fn();
  const mockOnCommandSelect = jest.fn();

  const targetInputRef = React.createRef<HTMLInputElement>();

  const defaultCommands = [
    {
      name: "/roll",
      description: "Rola dados",
      usage: "/roll <notation>",
      aliases: ["/r"],
      execute: jest.fn(),
    },
    {
      name: "/whisper",
      description: "Envia uma mensagem privada",
      usage: "/whisper <player> <message>",
      aliases: ["/w"],
      execute: jest.fn(),
    },
    {
      name: "/clear",
      description: "Limpa o histórico do chat",
      usage: "/clear",
      execute: jest.fn(),
    },
    {
      name: "/help",
      description: "Exibe comandos disponíveis",
      usage: "/help",
      execute: jest.fn(),
    },
  ];

  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    targetInputRef: targetInputRef,
    onCommandSelect: mockOnCommandSelect,
    inputValue: "",
  };

  let originalOffsetHeight: PropertyDescriptor | undefined;
  let originalOffsetWidth: PropertyDescriptor | undefined;
  let originalGetBoundingClientRect: PropertyDescriptor | undefined;
  let originalContains: PropertyDescriptor | undefined;
  let originalScrollIntoView: PropertyDescriptor | undefined;

  beforeAll(() => {
    originalOffsetHeight = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      "offsetHeight"
    );
    originalOffsetWidth = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      "offsetWidth"
    );
    originalGetBoundingClientRect = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      "getBoundingClientRect"
    );
    originalContains = Object.getOwnPropertyDescriptor(
      HTMLElement.prototype,
      "contains"
    );
    originalScrollIntoView = Object.getOwnPropertyDescriptor(
      window.HTMLElement.prototype,
      "scrollIntoView"
    );

    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
      configurable: true,
      value: 100,
    });
    Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
      configurable: true,
      value: 200,
    });

    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    Object.defineProperty(HTMLElement.prototype, "getBoundingClientRect", {
      configurable: true,
      value: mockGetBoundingClientRect,
    });

    Object.defineProperty(HTMLElement.prototype, "contains", {
      configurable: true,
      value: function (this: HTMLElement, otherNode: Node | null): boolean {
        if (mockContainsImplementation) {
          return mockContainsImplementation(this, otherNode);
        }

        return originalContains
          ? originalContains.value.call(this, otherNode)
          : false;
      },
    });
  });

  afterAll(() => {
    if (originalOffsetHeight)
      Object.defineProperty(
        HTMLElement.prototype,
        "offsetHeight",
        originalOffsetHeight
      );
    if (originalOffsetWidth)
      Object.defineProperty(
        HTMLElement.prototype,
        "offsetWidth",
        originalOffsetWidth
      );
    if (originalGetBoundingClientRect)
      Object.defineProperty(
        HTMLElement.prototype,
        "getBoundingClientRect",
        originalGetBoundingClientRect
      );
    if (originalContains)
      Object.defineProperty(
        HTMLElement.prototype,
        "contains",
        originalContains
      );
    if (originalScrollIntoView)
      Object.defineProperty(
        window.HTMLElement.prototype,
        "scrollIntoView",
        originalScrollIntoView
      );

    window.innerHeight = originalWindowInnerHeight;
    window.innerWidth = originalWindowInnerWidth;
  });

  beforeEach(() => {
    jest.clearAllMocks();

    mockGetAllCommands.mockReturnValue([
      {
        name: "/roll",
        description: "Rola dados",
        usage: "/roll <notation>",
        aliases: ["/r"],
        execute: jest.fn(),
      },
      {
        name: "/whisper",
        description: "Envia uma mensagem privada",
        usage: "/whisper <player> <message>",
        aliases: ["/w"],
        execute: jest.fn(),
      },
      {
        name: "/clear",
        description: "Limpa o histórico do chat",
        usage: "/clear",
        execute: jest.fn(),
      },
      {
        name: "/help",
        description: "Exibe comandos disponíveis",
        usage: "/help",
        execute: jest.fn(),
      },
    ]);

    mockContainsImplementation = jest
      .fn()
      .mockImplementation((elementInstance, nodeArg) => {
        if (!nodeArg) return false;
        if (elementInstance === nodeArg) return true;
        let currentNode = nodeArg.parentElement;
        while (currentNode) {
          if (currentNode === elementInstance) return true;
          currentNode = currentNode.parentElement;
        }
        return false;
      });

    mockGetBoundingClientRect.mockReturnValue({
      top: 100,
      right: 200,
      left: 100,
      bottom: 150,
      width: 100,
      height: 50,
      x: 100,
      y: 100,
      toJSON: () => ({}),
    });

    window.innerHeight = 600;
    window.innerWidth = 800;
  });

  const renderComponent = (props = {}) => {
    return render(
      <>
        <input ref={targetInputRef} aria-label="Chat Input" />
        <ChatCommandPopover {...defaultProps} {...props} />
      </>
    );
  };

  test("não deve renderizar o popover quando isOpen é false", () => {
    renderComponent({ isOpen: false });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  test("não deve renderizar o popover quando inputValue não começa com /", async () => {
    const { rerender: initialRerender } = renderComponent({
      isOpen: true,
      inputValue: "/r",
    });
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    initialRerender(
      <>
        <input ref={targetInputRef} aria-label="Chat Input" />
        <ChatCommandPopover
          {...defaultProps}
          isOpen={true}
          inputValue="hello"
        />
      </>
    );

    await waitFor(() => {
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });

  test("deve renderizar o popover e sugestões quando isOpen é true e inputValue começa com /", async () => {
    renderComponent({ inputValue: "/r" });
    const popover = screen.getByRole("listbox", {
      name: "Sugestões de comando",
    });
    expect(popover).toBeInTheDocument();
    expect(screen.getByText("/roll")).toBeInTheDocument();
    expect(screen.queryByText("/whisper")).not.toBeInTheDocument();
    expect(screen.queryByText("/clear")).not.toBeInTheDocument();
    await waitFor(() => expect(popover).toHaveStyle("opacity: 1"));
  });

  test('deve exibir "Nenhum comando correspondente." se não houver comandos filtrados', async () => {
    renderComponent({ inputValue: "/xyz" });

    await waitFor(() => {
      const popover = screen.getByRole("listbox", {
        name: "Sugestões de comando",
      });
      expect(popover).toBeInTheDocument();
      expect(
        screen.getByText("Nenhum comando correspondente.")
      ).toBeInTheDocument();
      expect(screen.queryByText("/roll")).not.toBeInTheDocument();
    });
    const popover = screen.getByRole("listbox", {
      name: "Sugestões de comando",
    });
    await waitFor(() => expect(popover).toHaveStyle("opacity: 1"));
  });

  test("deve filtrar comandos por nome", () => {
    renderComponent({ inputValue: "/clear" });
    expect(screen.getByText("/clear")).toBeInTheDocument();
    expect(screen.queryByText("/roll")).not.toBeInTheDocument();
  });

  test("deve filtrar comandos por alias", () => {
    renderComponent({ inputValue: "/w" });
    expect(screen.getByText("/whisper")).toBeInTheDocument();
    expect(screen.queryByText("/roll")).not.toBeInTheDocument();
  });

  test("deve filtrar comandos ignorando argumentos após o comando", () => {
    renderComponent({ inputValue: "/roll 1d20" });
    expect(screen.getByText("/roll")).toBeInTheDocument();
    expect(screen.queryByText("/whisper")).not.toBeInTheDocument();
  });

  test("deve posicionar o popover abaixo do input por padrão", async () => {
    renderComponent({ inputValue: "/roll" });
    const popover = screen.getByRole("listbox");

    await waitFor(() => {
      expect(popover).toHaveStyle("top: 158px");
      expect(popover).toHaveStyle("left: 100px");
    });
  });

  test("deve posicionar o popover acima do input se não houver espaço abaixo", async () => {
    mockGetBoundingClientRect.mockReturnValueOnce({
      top: 500,
      right: 200,
      left: 100,
      bottom: 550,
      width: 100,
      height: 50,
      x: 100,
      y: 500,
      toJSON: () => ({}),
    });
    renderComponent({ inputValue: "/roll" });
    const popover = screen.getByRole("listbox");

    await waitFor(() => {
      expect(popover).toHaveStyle("top: 392px");
    });
  });

  test("deve garantir que o popover não saia do topo da tela (clamping)", async () => {
    mockGetBoundingClientRect.mockReturnValueOnce({
      top: 10,
      right: 200,
      left: 100,
      bottom: 60,
      width: 100,
      height: 50,
      x: 100,
      y: 10,
      toJSON: () => ({}),
    });
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 100,
    });
    renderComponent({ inputValue: "/roll" });
    const popover = screen.getByRole("listbox");

    await waitFor(() => {
      const popoverTopStyle = parseInt(popover.style.top, 10);
      expect(popoverTopStyle).toBeGreaterThanOrEqual(0);
    });
  });

  test("deve garantir que o popover não saia da base da tela (clamping)", async () => {
    mockGetBoundingClientRect.mockReturnValueOnce({
      top: 500,
      right: 200,
      left: 100,
      bottom: 550,
      width: 100,
      height: 50,
      x: 100,
      y: 500,
      toJSON: () => ({}),
    });
    Object.defineProperty(window, "innerHeight", {
      configurable: true,
      value: 560,
    });
    renderComponent({ inputValue: "/roll" });
    const popover = screen.getByRole("listbox");

    await waitFor(() => {
      expect(popover).toHaveStyle("top: 392px");
    });
  });

  test("deve selecionar o próximo comando com ArrowDown quando há múltiplos comandos filtrados", async () => {
    const { getByLabelText, getByRole } = renderComponent({ inputValue: "/" });
    const chatInput = getByLabelText("Chat Input");
    chatInput.focus();
    expect(chatInput).toHaveFocus();

    await waitFor(() =>
      expect(
        getByRole("option", { name: "/roll <notation> Rola dados" })
      ).toHaveAttribute("aria-selected", "true")
    );
    await waitFor(() =>
      expect(
        getByRole("option", {
          name: "/whisper <player> <message> Envia uma mensagem privada",
        })
      ).toHaveAttribute("aria-selected", "false")
    );

    await userEvent.type(chatInput, "{arrowdown}");

    await waitFor(() =>
      expect(
        getByRole("option", { name: "/roll <notation> Rola dados" })
      ).toHaveAttribute("aria-selected", "false")
    );
    await waitFor(() =>
      expect(
        getByRole("option", {
          name: "/whisper <player> <message> Envia uma mensagem privada",
        })
      ).toHaveAttribute("aria-selected", "true")
    );
  });

  test("deve manter a seleção (loop) com ArrowDown quando há apenas um comando filtrado", async () => {
    mockGetAllCommands.mockReturnValue([
      {
        name: "/roll",
        description: "Rola dados",
        usage: "/roll <notation>",
        aliases: ["/r"],
        execute: jest.fn(),
      },
      {
        name: "/unrelated",
        description: "Outro comando",
        usage: "/unrelated",
        aliases: [],
        execute: jest.fn(),
      },
    ]);
    const { getByLabelText, getByRole } = renderComponent({ inputValue: "/r" });
    const chatInput = getByLabelText("Chat Input");
    chatInput.focus();
    expect(chatInput).toHaveFocus();

    await waitFor(() =>
      expect(
        getByRole("option", { name: "/roll <notation> Rola dados" })
      ).toHaveAttribute("aria-selected", "true")
    );

    await userEvent.type(chatInput, "{arrowdown}");

    await waitFor(() =>
      expect(
        getByRole("option", { name: "/roll <notation> Rola dados" })
      ).toHaveAttribute("aria-selected", "true")
    );
  });

  test("deve selecionar o comando anterior com ArrowUp", async () => {
    mockGetAllCommands.mockReturnValue(defaultCommands);
    renderComponent({ inputValue: "/" });
    const chatInput = screen.getByLabelText("Chat Input");
    chatInput.focus();
    expect(chatInput).toHaveFocus();

    await waitFor(() =>
      expect(
        screen.getByRole("option", { name: "/roll <notation> Rola dados" })
      ).toHaveAttribute("aria-selected", "true")
    );
    await waitFor(() =>
      expect(
        screen.getByRole("option", {
          name: "/whisper <player> <message> Envia uma mensagem privada",
        })
      ).toHaveAttribute("aria-selected", "false")
    );

    await userEvent.type(chatInput, "{arrowdown}");
    await waitFor(() =>
      expect(
        screen.getByRole("option", { name: "/roll <notation> Rola dados" })
      ).toHaveAttribute("aria-selected", "false")
    );
    await waitFor(() =>
      expect(
        screen.getByRole("option", {
          name: "/whisper <player> <message> Envia uma mensagem privada",
        })
      ).toHaveAttribute("aria-selected", "true")
    );

    await userEvent.type(chatInput, "{arrowup}");

    await waitFor(() =>
      expect(
        screen.getByRole("option", { name: "/roll <notation> Rola dados" })
      ).toHaveAttribute("aria-selected", "true")
    );
    await waitFor(() =>
      expect(
        screen.getByRole("option", {
          name: "/whisper <player> <message> Envia uma mensagem privada",
        })
      ).toHaveAttribute("aria-selected", "false")
    );
  });

  test("deve chamar onCommandSelect com o nome do comando ao pressionar Enter (sem usage)", async () => {
    const user = userEvent.setup();
    renderComponent({ inputValue: "/clear" });
    const chatInput = screen.getByLabelText("Chat Input");
    chatInput.focus();
    expect(chatInput).toHaveFocus();
    await user.type(chatInput, "{enter}");
    expect(mockOnCommandSelect).toHaveBeenCalledWith("/clear");
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("deve chamar onCommandSelect com o nome do comando + espaço ao pressionar Enter (com usage)", async () => {
    const user = userEvent.setup();
    renderComponent({ inputValue: "/roll" });
    const chatInput = screen.getByLabelText("Chat Input");
    chatInput.focus();
    expect(chatInput).toHaveFocus();
    await user.type(chatInput, "{enter}");
    expect(mockOnCommandSelect).toHaveBeenCalledWith("/roll ");
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("deve chamar onCommandSelect com o nome do comando ao pressionar Tab (sem usage)", async () => {
    const user = userEvent.setup();
    renderComponent({ inputValue: "/clear" });
    const chatInput = screen.getByLabelText("Chat Input");
    chatInput.focus();
    expect(chatInput).toHaveFocus();
    await user.type(chatInput, "{tab}");
    expect(mockOnCommandSelect).toHaveBeenCalledWith("/clear");
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("deve chamar onCommandSelect com o nome do comando + espaço ao pressionar Tab (com usage)", async () => {
    const user = userEvent.setup();
    renderComponent({ inputValue: "/roll" });
    const chatInput = screen.getByLabelText("Chat Input");
    chatInput.focus();
    expect(chatInput).toHaveFocus();
    await user.type(chatInput, "{tab}");
    expect(mockOnCommandSelect).toHaveBeenCalledWith("/roll ");
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("não deve chamar onCommandSelect se não houver comandos filtrados ao pressionar Enter", async () => {
    const user = userEvent.setup();
    renderComponent({ inputValue: "/xyz" });
    const chatInput = screen.getByLabelText("Chat Input");
    chatInput.focus();
    expect(chatInput).toHaveFocus();
    await user.type(chatInput, "{enter}");
    expect(mockOnCommandSelect).not.toHaveBeenCalled();

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test("deve chamar onClose ao pressionar Escape", async () => {
    const user = userEvent.setup();
    renderComponent({ inputValue: "/roll" });
    const chatInput = screen.getByLabelText("Chat Input");
    chatInput.focus();
    expect(chatInput).toHaveFocus();
    await user.type(chatInput, "{escape}");
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("deve chamar onCommandSelect e onClose ao clicar em um item de comando", async () => {
    renderComponent({ inputValue: "/r" });
    await waitFor(() => screen.getByText("/roll"));
    fireEvent.click(screen.getByText("/roll"));
    expect(mockOnCommandSelect).toHaveBeenCalledWith("/roll ");
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("deve chamar onClose ao clicar fora do popover e do targetInputRef", () => {
    renderComponent({ inputValue: "/r" });

    mockContainsImplementation.mockImplementation((element, otherNode) => {
      const popover = screen.queryByRole("listbox");
      const target = targetInputRef.current;

      if (
        otherNode === document.body &&
        (element === popover || element === target)
      ) {
        return false;
      }

      return originalContains
        ? originalContains.value.call(element, otherNode)
        : false;
    });
    fireEvent.mouseDown(document.body);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("não deve chamar onClose ao clicar dentro do popover (but not on an item)", () => {
    renderComponent({ inputValue: "/r" });
    const popover = screen.getByRole("listbox");
    mockContainsImplementation.mockImplementation((element, otherNode) => {
      if (element.getAttribute("role") === "listbox" && otherNode === element) {
        return true;
      }

      return originalContains
        ? originalContains.value.call(element, otherNode)
        : false;
    });
    fireEvent.mouseDown(popover);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test("não deve chamar onClose ao clicar no targetInputRef", () => {
    renderComponent({ inputValue: "/r" });

    mockContainsImplementation.mockImplementation((element, otherNode) => {
      if (
        element === targetInputRef.current &&
        otherNode === targetInputRef.current
      ) {
        return true;
      }

      return originalContains
        ? originalContains.value.call(element, otherNode)
        : false;
    });
    fireEvent.mouseDown(targetInputRef.current!);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test("os event listeners devem ser removidos ao desmontar o componente", () => {
    const removeEventListenerSpy = jest.spyOn(document, "removeEventListener");
    const { unmount } = renderComponent({ inputValue: "/r" });
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "keydown",
      expect.any(Function)
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "mousedown",
      expect.any(Function)
    );
  });
});
