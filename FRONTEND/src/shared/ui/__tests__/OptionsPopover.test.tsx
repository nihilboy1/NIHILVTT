import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import { OptionsPopover } from "@/shared/ui/OptionsPopover";

function createTargetRef() {
  const button = document.createElement("button");
  document.body.appendChild(button);
  Object.defineProperty(button, "getBoundingClientRect", {
    configurable: true,
    value: () => ({
      top: 100,
      right: 200,
      left: 100,
      bottom: 150,
      width: 100,
      height: 50,
      x: 100,
      y: 100,
      toJSON: () => ({}),
    }),
  });

  return { current: button } as { current: HTMLElement | null };
}

describe("OptionsPopover", () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = "";
  });

  test("nao deve renderizar o popover quando isOpen e false", () => {
    const targetRef = createTargetRef();

    render(
      <OptionsPopover isOpen={false} onClose={mockOnClose} targetRef={targetRef}>
        <button>Option 1</button>
      </OptionsPopover>,
    );

    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  test("deve renderizar popover e filhos quando isOpen e true", () => {
    const targetRef = createTargetRef();

    render(
      <OptionsPopover isOpen={true} onClose={mockOnClose} targetRef={targetRef}>
        <button>Option 1</button>
        <button>Option 2</button>
      </OptionsPopover>,
    );

    const popover = screen.getByRole("menu");
    expect(popover).toBeInTheDocument();
    expect(popover).toHaveAttribute("aria-orientation", "vertical");
    expect(popover).toHaveStyle("position: fixed");
    expect(popover).toHaveStyle("left: 100px");
    expect(popover).toHaveStyle("top: 158px");
    expect(screen.getByRole("button", { name: "Option 1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Option 2" })).toBeInTheDocument();
  });

  test("deve chamar onClose ao clicar fora", () => {
    const targetRef = createTargetRef();

    render(
      <OptionsPopover isOpen={true} onClose={mockOnClose} targetRef={targetRef}>
        <button>Option 1</button>
      </OptionsPopover>,
    );

    fireEvent.mouseDown(document.body);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("nao deve chamar onClose ao clicar dentro do popover", () => {
    const targetRef = createTargetRef();

    render(
      <OptionsPopover isOpen={true} onClose={mockOnClose} targetRef={targetRef}>
        <button>Option 1</button>
      </OptionsPopover>,
    );

    fireEvent.mouseDown(screen.getByRole("button", { name: "Option 1" }));
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test("nao deve chamar onClose ao clicar no targetRef", () => {
    const targetRef = createTargetRef();

    render(
      <OptionsPopover isOpen={true} onClose={mockOnClose} targetRef={targetRef}>
        <button>Option 1</button>
      </OptionsPopover>,
    );

    fireEvent.mouseDown(targetRef.current as HTMLElement);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test("deve chamar onClose ao pressionar Escape", () => {
    const targetRef = createTargetRef();

    render(
      <OptionsPopover isOpen={true} onClose={mockOnClose} targetRef={targetRef}>
        <button>Option 1</button>
      </OptionsPopover>,
    );

    fireEvent.keyDown(document, { key: "Escape" });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("nao deve chamar onClose ao pressionar outra tecla", () => {
    const targetRef = createTargetRef();

    render(
      <OptionsPopover isOpen={true} onClose={mockOnClose} targetRef={targetRef}>
        <button>Option 1</button>
      </OptionsPopover>,
    );

    fireEvent.keyDown(document, { key: "Enter" });
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test("deve remover listeners ao desmontar", () => {
    const targetRef = createTargetRef();
    const removeEventListenerSpy = jest.spyOn(document, "removeEventListener");

    const { unmount } = render(
      <OptionsPopover isOpen={true} onClose={mockOnClose} targetRef={targetRef}>
        <button>Option 1</button>
      </OptionsPopover>,
    );

    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith("mousedown", expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith("keydown", expect.any(Function));
  });
});
