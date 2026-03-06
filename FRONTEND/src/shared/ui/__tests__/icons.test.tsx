import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { DeleteIcon, DetatchIcon, DiceIcon, EditIcon } from '../Icons';

describe('Icon Components', () => {
  describe('EditIcon', () => {
    it('should render and apply className', () => {
      render(<EditIcon className="custom-class" data-testid="edit-icon" />);
      const icon = screen.getByTestId('edit-icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('custom-class');
    });

    it('should apply size', () => {
      render(<EditIcon size={10} data-testid="edit-icon" />);
      const icon = screen.getByTestId('edit-icon');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('DiceIcon', () => {
    it('should render with correct alt text', () => {
      render(<DiceIcon />);
      const icon = screen.getByAltText('Dado de vinte lados');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('invert');
    });

    it('should apply size', () => {
      render(<DiceIcon size={10} />);
      const icon = screen.getByAltText('Dado de vinte lados');
      expect(icon).toHaveClass('w-10');
      expect(icon).toHaveClass('h-10');
    });
  });

  describe('DetatchIcon', () => {
    it('should render and apply className', () => {
      render(<DetatchIcon className="custom-class" />);
      const icon = screen.getByTestId('svgr-mock');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('custom-class');
    });

    it('should apply size', () => {
      render(<DetatchIcon size={10} />);
      const icon = screen.getByTestId('svgr-mock');
      expect(icon).toHaveClass('w-10');
      expect(icon).toHaveClass('h-10');
    });
  });

  describe('DeleteIcon', () => {
    it('should render', () => {
      render(<DeleteIcon data-testid="delete-icon" />);
      const icon = screen.getByTestId('delete-icon');
      expect(icon).toBeInTheDocument();
    });
  });
});
