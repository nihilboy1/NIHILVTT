import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import {
  ChatBubbleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DeleteIcon,
  DetatchIcon,
  DiceIcon,
  DotsThreeVerticalIcon,
  EditIcon,
  IconProps,
  IdentificationCardIcon,
  MinimizeIcon,
  PageConfigIcon,
  PanIcon,
  PlusCircleIcon,
  RestoreWindowIcon,
  RulerIcon,
  SelectIcon,
  XMarkIcon,
} from "../shared/ui/Icons";

// Helper function to test common icon behaviors
const testIconComponent = (
  Component: React.FC<IconProps>,
  altText: string,
  defaultWidthClass: string = "w-5", // Adicionado parâmetro para largura padrão
  defaultHeightClass: string = "h-5", // Adicionado parâmetro para altura padrão
  testId?: string
) => {
  test(`deve renderizar o ícone ${altText} corretamente`, () => {
    render(<Component />);
    const icon = screen.getByAltText(altText);
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("invert");
    expect(icon).toHaveClass(defaultWidthClass);
    expect(icon).toHaveClass(defaultHeightClass);
    if (testId) {
      expect(icon).toHaveAttribute("data-testid", testId);
    }
  });

  test(`deve aplicar className adicional ao ícone ${altText}`, () => {
    render(<Component className="custom-class" />);
    const icon = screen.getByAltText(altText);
    expect(icon).toHaveClass("custom-class");
  });

  test(`deve aplicar width e height personalizados ao ícone ${altText}`, () => {
    render(<Component width="10" height="10" />);
    const icon = screen.getByAltText(altText);
    expect(icon).toHaveClass("w-10");
    expect(icon).toHaveClass("h-10");
    expect(icon).not.toHaveClass(defaultWidthClass); // Ensure default is not applied
  });

  test(`deve definir aria-hidden como true quando fornecido ao ícone ${altText}`, () => {
    render(<Component aria-hidden={true} />);
    const icon = screen.getByAltText(altText);
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });

  test(`deve definir aria-hidden como false quando fornecido ao ícone ${altText}`, () => {
    render(<Component aria-hidden={false} />);
    const icon = screen.getByAltText(altText);
    expect(icon).toHaveAttribute("aria-hidden", "false");
  });
};

describe("Icon Components", () => {
  testIconComponent(EditIcon, "ícone de edição", "w-5", "h-5", "edit-icon");
  testIconComponent(DiceIcon, "dado de vinte lados", "w-5", "h-5", "dice-icon");
  testIconComponent(DeleteIcon, "lixeira");
  testIconComponent(PlusCircleIcon, "adicionar");
  testIconComponent(DetatchIcon, "clip de papel partido ao meio", "w-3", "h-3"); // Especificar tamanho padrão
  testIconComponent(SelectIcon, "seta de navegação");
  testIconComponent(PanIcon, "mão");
  testIconComponent(ChatBubbleIcon, "balão de chat");
  testIconComponent(RulerIcon, "régua");
  testIconComponent(XMarkIcon, "fechar");
  testIconComponent(ChevronLeftIcon, "seta para a esquerda");
  testIconComponent(ChevronRightIcon, "seta para a direita");
  testIconComponent(IdentificationCardIcon, "cartão de identificação");
  testIconComponent(DotsThreeVerticalIcon, "três pontos verticais");
  testIconComponent(PageConfigIcon, "configurações de página");
  testIconComponent(MinimizeIcon, "minimizar");
  testIconComponent(RestoreWindowIcon, "restaurar janela");
});
