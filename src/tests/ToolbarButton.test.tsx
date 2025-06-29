/// <reference types="@testing-library/jest-dom" />
import { render, screen, fireEvent } from '@testing-library/react';
import { ToolbarButton } from '../components/ui/ToolbarButton';
import React from 'react'; // Re-adicionado para React.createRef

describe('ToolbarButton', () => {
  const defaultProps = {
    label: 'Test Button',
    icon: <span>Icon</span>,
    isActive: false,
    onClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve renderizar o botão com label e ícone', () => {
    render(<ToolbarButton {...defaultProps} />);
    expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument();
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });

  test('deve chamar onClick quando o botão é clicado', () => {
    render(<ToolbarButton {...defaultProps} />);
    fireEvent.click(screen.getByRole('button', { name: 'Test Button' }));
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  test('deve aplicar a classe ativa quando isActive é true e isHideButton é false', () => {
    render(<ToolbarButton {...defaultProps} isActive={true} />);
    const button = screen.getByRole('button', { name: 'Test Button' });
    expect(button).toHaveClass('bg-accent-primary');
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  test('não deve aplicar a classe ativa quando isActive é true e isHideButton é true', () => {
    render(<ToolbarButton {...defaultProps} isActive={true} isHideButton={true} />);
    const button = screen.getByRole('button', { name: 'Test Button' });
    expect(button).not.toHaveClass('bg-accent-primary');
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  test('deve aplicar a classe de toggle quando isToggled é true', () => {
    render(<ToolbarButton {...defaultProps} isToggled={true} />);
    const button = screen.getByRole('button', { name: 'Test Button' });
    expect(button).toHaveClass('bg-accent-secondary');
  });

  test('deve aplicar a classe de hide button quando isHideButton é true', () => {
    render(<ToolbarButton {...defaultProps} isHideButton={true} />);
    const button = screen.getByRole('button', { name: 'Test Button' });
    expect(button).toHaveClass('mt-auto');
  });

  test('deve aplicar a classe hover padrão quando não está ativo, não está toggled e não é hide button', () => {
    render(<ToolbarButton {...defaultProps} isActive={false} isToggled={false} isHideButton={false} />);
    const button = screen.getByRole('button', { name: 'Test Button' });
    expect(button).toHaveClass('hover:bg-accent-primary-hover');
  });

  test('deve ter o atributo title e aria-label definidos corretamente', () => {
    render(<ToolbarButton {...defaultProps} />);
    const button = screen.getByRole('button', { name: 'Test Button' });
    expect(button).toHaveAttribute('title', 'Test Button');
    expect(button).toHaveAttribute('aria-label', 'Test Button');
  });

  test('deve encaminhar o ref corretamente', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<ToolbarButton {...defaultProps} ref={ref} />);
    expect(ref.current).toBeInTheDocument();
    expect(ref.current?.tagName).toBe('BUTTON');
  });
});
