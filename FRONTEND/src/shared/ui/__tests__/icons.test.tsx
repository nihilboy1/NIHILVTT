import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import {
  DeleteIcon,
  DetatchIcon,
  DiceIcon,
  EditIcon,
} from "../Icons";

describe("Icon Components", () => {
  // Test for a react-icons based component
  describe("EditIcon", () => {
    it("should render and apply className", () => {
      render(<EditIcon className="custom-class" />);
      const icon = screen.getByRole("img", { hidden: true });
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("custom-class");
    });

    it("should apply size", () => {
      render(<EditIcon size={10} />);
      const icon = screen.getByRole("img", { hidden: true });
      expect(icon).toBeInTheDocument();
    });
  });

  // Test for an Icon-wrapped component (<img>)
  describe("DiceIcon", () => {
    it("should render with correct alt text", () => {
      render(<DiceIcon />);
      const icon = screen.getByAltText("dado de vinte lados");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("invert");
    });

    it("should apply size", () => {
      render(<DiceIcon size={10} />);
      const icon = screen.getByAltText("dado de vinte lados");
      expect(icon).toHaveClass("w-10");
      expect(icon).toHaveClass("h-10");
    });
  });

  // Test for an Icon-wrapped component (SVG?react)
  describe("DetatchIcon", () => {
    it("should render and apply className", () => {
      render(<DetatchIcon className="custom-class" />);
      const icon = screen.getByAltText("Ícone de desanexar");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("custom-class");
    });

    it("should apply size", () => {
      render(<DetatchIcon size={10} />);
      const icon = screen.getByAltText("Ícone de desanexar");
      expect(icon).toHaveClass("w-10");
      expect(icon).toHaveClass("h-10");
    });
  });

  // A simple test for another react-icons component
  describe("DeleteIcon", () => {
    it("should render", () => {
      render(<DeleteIcon />);
      const icon = screen.getByRole("img", { hidden: true });
      expect(icon).toBeInTheDocument();
    });
  });
});
