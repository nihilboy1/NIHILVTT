import React from "react";
import d20 from "../assets/d20.png";
import detatch from "../assets/detach-svgrepo-com.svg";
import trash from "../assets/trash.svg";
import plusCircle from "../assets/plus-circle.svg";
import editIcon from "../assets/pencil.svg";
import chatIcon from "../assets/chat.svg";
import rulerIcon from "../assets/ruler.svg";
import xIcon from "../assets/x.svg";
import caretLeft from "../assets/caret-left.svg";
import caretRight from "../assets/caret-right.svg";
import handIcon from "../assets/hand.svg"; // Importar hand.svg
import navigationArrowIcon from "../assets/navigation-arrow.svg"; // Importar navigation-arrow.svg
import identificationCard from "../assets/identification-card.svg";
import dotsThreeVertical from "../assets/dots-three-vertical.svg";
import browsers from "../assets/browsers.svg";
import minus from "../assets/minus.svg";
import square from "../assets/square.svg";

export interface IconProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  "aria-hidden"?: boolean;
}

export function EditIcon({ "aria-hidden": ariaHidden, className, width, height }: IconProps) {
  const defaultSize = "w-5 h-5";
  const sizeClass = width && height ? `w-${width} h-${height}` : defaultSize;
  const imgProps: React.ImgHTMLAttributes<HTMLImageElement> & {
    "data-testid": string;
  } = {
    className: `invert ${sizeClass} ${className || ""}`,
    src: editIcon,
    alt: "ícone de edição",
    "data-testid": "edit-icon",
  };

  if (ariaHidden !== undefined) {
    imgProps["aria-hidden"] = ariaHidden;
  }

  return <img {...imgProps} />;
}

export function DiceIcon({ "aria-hidden": ariaHidden, className, width, height }: IconProps) {
  const defaultSize = "w-5 h-5";
  const sizeClass = width && height ? `w-${width} h-${height}` : defaultSize;
  const imgProps: React.ImgHTMLAttributes<HTMLImageElement> & {
    "data-testid": string;
  } = {
    className: `invert ${sizeClass} ${className || ""}`,
    src: d20,
    alt: "dado de vinte lados",
    "data-testid": "dice-icon",
  };

  if (ariaHidden !== undefined) {
    imgProps["aria-hidden"] = ariaHidden;
  }

  return <img {...imgProps} />;
}

export function DeleteIcon({
  "aria-hidden": ariaHidden,
  className,
  width,
  height,
}: IconProps) {
  const defaultSize = "w-5 h-5";
  const sizeClass = width && height ? `w-${width} h-${height}` : defaultSize;
  const imgProps: React.ImgHTMLAttributes<HTMLImageElement> = {
    src: trash,
    alt: "lixeira",
    className: `invert ${sizeClass} ${className || ""}`,
  };

  if (ariaHidden !== undefined) {
    imgProps["aria-hidden"] = ariaHidden;
  }

  return <img {...imgProps} />;
}

export function PlusCircleIcon({
  "aria-hidden": ariaHidden,
  className,
  width,
  height,
}: IconProps) {
  const defaultSize = "w-5 h-5";
  const sizeClass = width && height ? `w-${width} h-${height}` : defaultSize;
  const imgProps: React.ImgHTMLAttributes<HTMLImageElement> = {
    src: plusCircle,
    alt: "adicionar",
    className: `invert ${sizeClass} ${className || ""}`,
  };

  if (ariaHidden !== undefined) {
    imgProps["aria-hidden"] = ariaHidden;
  }

  return <img {...imgProps} />;
}

export function DetatchIcon({
  "aria-hidden": ariaHidden,
  className,
  width,
  height,
}: IconProps) {
  const defaultSize = "w-3 h-3";
  const sizeClass = width && height ? `w-${width} h-${height}` : defaultSize;
  const imgProps: React.ImgHTMLAttributes<HTMLImageElement> = {
    className: `invert ${sizeClass} ${className || ""}`,
    src: detatch,
    alt: "clip de papel partido ao meio",
  };

  if (ariaHidden !== undefined) {
    imgProps["aria-hidden"] = ariaHidden;
  }

  return <img {...imgProps}></img>;
}

export function SelectIcon({
  "aria-hidden": ariaHidden,
  className,
  width,
  height,
}: IconProps) {
  const defaultSize = "w-5 h-5";
  const sizeClass = width && height ? `w-${width} h-${height}` : defaultSize;
  const imgProps: React.ImgHTMLAttributes<HTMLImageElement> = {
    className: `invert ${sizeClass} ${className || ""}`,
    src: navigationArrowIcon,
    alt: "seta de navegação",
  };

  if (ariaHidden !== undefined) {
    imgProps["aria-hidden"] = ariaHidden;
  }

  return <img {...imgProps}></img>;
}

export function PanIcon({ "aria-hidden": ariaHidden, className, width, height }: IconProps) {
  const defaultSize = "w-5 h-5";
  const sizeClass = width && height ? `w-${width} h-${height}` : defaultSize;
  const imgProps: React.ImgHTMLAttributes<HTMLImageElement> = {
    className: `invert ${sizeClass} ${className || ""}`,
    src: handIcon,
    alt: "mão",
  };

  if (ariaHidden !== undefined) {
    imgProps["aria-hidden"] = ariaHidden;
  }

  return <img {...imgProps}></img>;
}

export function ChatBubbleIcon({
  "aria-hidden": ariaHidden,
  className,
  width,
  height,
}: IconProps) {
  const defaultSize = "w-5 h-5";
  const sizeClass = width && height ? `w-${width} h-${height}` : defaultSize;
  const imgProps: React.ImgHTMLAttributes<HTMLImageElement> = {
    className: `invert ${sizeClass} ${className || ""}`,
    src: chatIcon,
    alt: "balão de chat",
  };

  if (ariaHidden !== undefined) {
    imgProps["aria-hidden"] = ariaHidden;
  }

  return <img {...imgProps}></img>;
}

export function RulerIcon({ "aria-hidden": ariaHidden, className, width, height }: IconProps) {
  const defaultSize = "w-5 h-5";
  const sizeClass = width && height ? `w-${width} h-${height}` : defaultSize;
  const imgProps: React.ImgHTMLAttributes<HTMLImageElement> = {
    className: `invert ${sizeClass} ${className || ""}`,
    src: rulerIcon,
    alt: "régua",
  };

  if (ariaHidden !== undefined) {
    imgProps["aria-hidden"] = ariaHidden;
  }

  return <img {...imgProps}></img>;
}

export function XMarkIcon({ "aria-hidden": ariaHidden, className, width, height }: IconProps) {
  const defaultSize = "w-5 h-5";
  const sizeClass = width && height ? `w-${width} h-${height}` : defaultSize;
  const imgProps: React.ImgHTMLAttributes<HTMLImageElement> = {
    className: `invert ${sizeClass} ${className || ""}`,
    src: xIcon,
    alt: "fechar",
  };

  if (ariaHidden !== undefined) {
    imgProps["aria-hidden"] = ariaHidden;
  }

  return <img {...imgProps}></img>;
}

export function ChevronLeftIcon({
  "aria-hidden": ariaHidden,
  className,
  width,
  height,
}: IconProps) {
  const defaultSize = "w-5 h-5";
  const sizeClass = width && height ? `w-${width} h-${height}` : defaultSize;
  const imgProps: React.ImgHTMLAttributes<HTMLImageElement> = {
    className: `invert ${sizeClass} ${className || ""}`,
    src: caretLeft,
    alt: "seta para a esquerda",
  };

  if (ariaHidden !== undefined) {
    imgProps["aria-hidden"] = ariaHidden;
  }

  return <img {...imgProps}></img>;
}

export function ChevronRightIcon({
  "aria-hidden": ariaHidden,
  className,
  width,
  height,
}: IconProps) {
  const defaultSize = "w-5 h-5";
  const sizeClass = width && height ? `w-${width} h-${height}` : defaultSize;
  const imgProps: React.ImgHTMLAttributes<HTMLImageElement> = {
    className: `invert ${sizeClass} ${className || ""}`,
    src: caretRight,
    alt: "seta para a direita",
  };

  if (ariaHidden !== undefined) {
    imgProps["aria-hidden"] = ariaHidden;
  }

  return <img {...imgProps}></img>;
}

export function IdentificationCardIcon({
  "aria-hidden": ariaHidden,
  className,
  width,
  height,
}: IconProps) {
  const defaultSize = "w-5 h-5";
  const sizeClass = width && height ? `w-${width} h-${height}` : defaultSize;
  const imgProps: React.ImgHTMLAttributes<HTMLImageElement> = {
    className: `invert ${sizeClass} ${className || ""}`,
    src: identificationCard,
    alt: "cartão de identificação",
  };

  if (ariaHidden !== undefined) {
    imgProps["aria-hidden"] = ariaHidden;
  }

  return <img {...imgProps}></img>;
}

export function DotsThreeVerticalIcon({
  "aria-hidden": ariaHidden,
  className,
  width,
  height,
}: IconProps) {
  const defaultSize = "w-5 h-5";
  const sizeClass = width && height ? `w-${width} h-${height}` : defaultSize;
  const imgProps: React.ImgHTMLAttributes<HTMLImageElement> = {
    className: `invert ${sizeClass} ${className || ""}`,
    src: dotsThreeVertical,
    alt: "três pontos verticais",
  };

  if (ariaHidden !== undefined) {
    imgProps["aria-hidden"] = ariaHidden;
  }

  return <img {...imgProps}></img>;
}

export function PageConfigIcon({
  "aria-hidden": ariaHidden,
  className,
  width,
  height,
}: IconProps) {
  const defaultSize = "w-5 h-5";
  const sizeClass = width && height ? `w-${width} h-${height}` : defaultSize;
  const imgProps: React.ImgHTMLAttributes<HTMLImageElement> = {
    className: `invert ${sizeClass} ${className || ""}`,
    src: browsers,
    alt: "configurações de página",
  };

  if (ariaHidden !== undefined) {
    imgProps["aria-hidden"] = ariaHidden;
  }

  return <img {...imgProps}></img>;
}

export function MinimizeIcon({
  "aria-hidden": ariaHidden,
  className,
  width,
  height,
}: IconProps) {
  const defaultSize = "w-5 h-5";
  const sizeClass = width && height ? `w-${width} h-${height}` : defaultSize;
  const imgProps: React.ImgHTMLAttributes<HTMLImageElement> = {
    className: `invert ${sizeClass} ${className || ""}`,
    src: minus,
    alt: "minimizar",
  };

  if (ariaHidden !== undefined) {
    imgProps["aria-hidden"] = ariaHidden;
  }

  return <img {...imgProps}></img>;
}

export function RestoreWindowIcon({
  "aria-hidden": ariaHidden,
  className,
  width,
  height,
}: IconProps) {
  const defaultSize = "w-5 h-5";
  const sizeClass = width && height ? `w-${width} h-${height}` : defaultSize;
  const imgProps: React.ImgHTMLAttributes<HTMLImageElement> = {
    className: `invert ${sizeClass} ${className || ""}`,
    src: square,
    alt: "restaurar janela",
  };

  if (ariaHidden !== undefined) {
    imgProps["aria-hidden"] = ariaHidden;
  }

  return <img {...imgProps}></img>;
}
