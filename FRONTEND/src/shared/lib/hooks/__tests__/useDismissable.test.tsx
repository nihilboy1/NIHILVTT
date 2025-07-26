import { useRef } from "react";

import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {useDismissable} from "../useDismissable";

// Componente de teste para envolver o hook useDismissable
interface TestComponentProps {
  isOpen: boolean;
  onClose: () => void;
  ignoredClass?: string;
}

function TestComponent({ isOpen, onClose, ignoredClass }: TestComponentProps) {
  const ref = useRef<HTMLDivElement>(null);
  useDismissable(ref, isOpen, onClose, ignoredClass);

  return (
    <div>
      <div ref={ref} data-testid="dismissable-element">
        Conteúdo do elemento dismissable
      </div>
      <div data-testid="outside-element">
        Conteúdo fora do elemento dismissable
      </div>
    </div>
  );
};

describe("useDismissable", () => {
  let mockOnClose: jest.Mock;

  beforeEach(() => {
    mockOnClose = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve chamar onClose quando um clique ocorre fora do elemento", async () => {
    render(<TestComponent isOpen={true} onClose={mockOnClose} />);

    const outsideElement = screen.getByTestId("outside-element");
    await userEvent.click(outsideElement);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("não deve chamar onClose quando um clique ocorre dentro do elemento", async () => {
    render(<TestComponent isOpen={true} onClose={mockOnClose} />);

    const dismissableElement = screen.getByTestId("dismissable-element");
    await userEvent.click(dismissableElement);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("deve chamar onClose quando a tecla Escape é pressionada", async () => {
    render(<TestComponent isOpen={true} onClose={mockOnClose} />);

    await userEvent.keyboard("{Escape}");

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("não deve chamar onClose quando outra tecla é pressionada", async () => {
    render(<TestComponent isOpen={true} onClose={mockOnClose} />);

    await userEvent.keyboard("{Enter}");

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("não deve chamar onClose quando isOpen é false", async () => {
    render(<TestComponent isOpen={false} onClose={mockOnClose} />);

    const outsideElement = screen.getByTestId("outside-element");
    await userEvent.click(outsideElement);
    await userEvent.keyboard("{Escape}");

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("deve ignorar cliques em elementos com a classe ignorada", async () => {
    render(
      <TestComponent
        isOpen={true}
        onClose={mockOnClose}
        ignoredClass="ignored-class"
      />
    );

    const ignoredElement = document.createElement("button");
    ignoredElement.className = "ignored-class";
    document.body.appendChild(ignoredElement);

    await userEvent.click(ignoredElement);

    expect(mockOnClose).not.toHaveBeenCalled();

    document.body.removeChild(ignoredElement); // Limpar o elemento adicionado
  });

  it("deve remover listeners quando o componente é desmontado", () => {
    const { unmount } = render(
      <TestComponent isOpen={true} onClose={mockOnClose} />
    );

    const addSpy = jest.spyOn(document, "addEventListener");
    const removeSpy = jest.spyOn(document, "removeEventListener");

    // Simular um clique para garantir que os listeners foram adicionados
    fireEvent.mouseDown(document.body);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    mockOnClose.mockClear();

    unmount();

    // Após o unmount, os listeners devem ter sido removidos
    expect(removeSpy).toHaveBeenCalledWith("mousedown", expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith("keydown", expect.any(Function));

    // Clicar novamente para garantir que o callback não é mais chamado
    fireEvent.mouseDown(document.body);
    expect(mockOnClose).not.toHaveBeenCalled();

    addSpy.mockRestore();
    removeSpy.mockRestore();
  });

  it("deve chamar onClose quando um clique ocorre fora do elemento e não em um elemento ignorado, mesmo com ignoredClass fornecida", async () => {
    render(
      <TestComponent
        isOpen={true}
        onClose={mockOnClose}
        ignoredClass="ignored-class"
      />
    );

    const ignoredElement = document.createElement("button");
    ignoredElement.className = "another-class"; // Uma classe diferente da ignorada
    document.body.appendChild(ignoredElement);

    const outsideElement = screen.getByTestId("outside-element");
    await userEvent.click(outsideElement);

    expect(mockOnClose).toHaveBeenCalledTimes(1);

    document.body.removeChild(ignoredElement); // Limpar o elemento adicionado
  });
});
