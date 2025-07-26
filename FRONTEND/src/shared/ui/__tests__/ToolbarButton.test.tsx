/// <reference types="@testing-library/jest-dom" />
import React from "react"; // Re-adicionado para React.createRef

import { fireEvent, render, screen } from "@testing-library/react";

import { ToolbarButton } from "@/shared/ui/ToolbarButton";

describe("ToolbarButton", () => {
  const defaultProps = {
    label: "Test Button",
    icon: <span>Icon</span>,
    onClick: jest.fn(),
    variant: "default" as const,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("deve renderizar o botão com label e ícone", () => {
    render(<ToolbarButton {...defaultProps} />);
    expect(
      screen.getByRole("button", { name: "Test Button" })
    ).toBeInTheDocument();
    expect(screen.getByText("Icon")).toBeInTheDocument();
  });

  test("deve chamar onClick quando o botão é clicado", () => {
    render(<ToolbarButton {...defaultProps} />);
    fireEvent.click(screen.getByRole("button", { name: "Test Button" }));
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  test("deve aplicar a classe ativa quando variant é 'active'", () => {
    render(<ToolbarButton {...defaultProps} variant="active" />);
    const button = screen.getByRole("button", { name: "Test Button" });
    expect(button).toHaveClass("bg-accent-primary");
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  test("não deve aplicar a classe ativa quando variant é 'hide'", () => {
    render(<ToolbarButton {...defaultProps} variant="hide" />);
    const button = screen.getByRole("button", { name: "Test Button" });
    expect(button).not.toHaveClass("bg-accent-primary");
    expect(button).toHaveAttribute("aria-pressed", "false"); // aria-pressed is false for 'hide' variant
  });

  test("deve aplicar a classe de toggle quando variant é 'toggled'", () => {
    render(<ToolbarButton {...defaultProps} variant="toggled" />);
    const button = screen.getByRole("button", { name: "Test Button" });
    expect(button).toHaveClass("bg-accent-secondary");
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  test("deve aplicar a classe de hide button quando variant é 'hide'", () => {
    render(<ToolbarButton {...defaultProps} variant="hide" />);
    const button = screen.getByRole("button", { name: "Test Button" });
    expect(button).toHaveClass("mt-auto");
  });

  test("deve aplicar a classe hover padrão quando variant é 'default'", () => {
    render(<ToolbarButton {...defaultProps} variant="default" />);
    const button = screen.getByRole("button", { name: "Test Button" });
    expect(button).toHaveClass("hover:bg-accent-primary-hover");
  });

  test("deve ter o atributo title e aria-label definidos corretamente", () => {
    render(<ToolbarButton {...defaultProps} />);
    const button = screen.getByRole("button", { name: "Test Button" });
    expect(button).toHaveAttribute("title", "Test Button");
    expect(button).toHaveAttribute("aria-label", "Test Button");
  });

  test("deve encaminhar o ref corretamente", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<ToolbarButton {...defaultProps} ref={ref} />);
    expect(ref.current).toBeInTheDocument();
    expect(ref.current?.tagName).toBe("BUTTON");
  });
});
