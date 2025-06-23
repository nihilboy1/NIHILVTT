import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TabButton from './TabButton';
import { DiceIcon } from '../icons'; // Importe um ícone de exemplo
import { SidebarTab } from '../../types';

describe('TabButton', () => {
  const mockOnClick = jest.fn();
  const defaultProps = {
    tab: SidebarTab.CHAT,
    label: 'Chat',
    icon: <DiceIcon />,
    isActive: false,
    onClick: mockOnClick,
  };

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  // Renderização Básica
  test('deve renderizar o botão com o label e ícone corretos', () => {
    render(<TabButton {...defaultProps} />);
    expect(screen.getByRole('tab', { name: 'Chat' })).toBeInTheDocument();
    expect(screen.getByText('Chat')).toBeInTheDocument();
    expect(screen.getByTestId('dice-icon')).toBeInTheDocument(); // Assumindo que DiceIcon tem data-testid="dice-icon"
  });

  test('deve ter os atributos ARIA corretos', () => {
    render(<TabButton {...defaultProps} />);
    const button = screen.getByRole('tab', { name: 'Chat' });
    expect(button).toHaveAttribute('role', 'tab');
    expect(button).toHaveAttribute('id', `tab-${SidebarTab.CHAT.toLowerCase()}`);
    expect(button).toHaveAttribute('aria-controls', `tabpanel-${SidebarTab.CHAT.toLowerCase()}`);
  });

  // Estado Ativo (isActive={true})
  test('deve aplicar classes de estilo para o estado ativo', () => {
    render(<TabButton {...defaultProps} isActive={true} />);
    const button = screen.getByRole('tab', { name: 'Chat' });
    expect(button).toHaveClass('bg-theme-input-bg');
    expect(button).toHaveClass('text-theme-accent-primary');
    expect(button).toHaveClass('border-b-2');
    expect(button).toHaveClass('border-theme-accent-primary');
    expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  // Estado Inativo (isActive={false})
  test('deve aplicar classes de estilo para o estado inativo', () => {
    render(<TabButton {...defaultProps} isActive={false} />);
    const button = screen.getByRole('tab', { name: 'Chat' });
    expect(button).toHaveClass('text-theme-text-secondary');
    expect(button).toHaveClass('hover:text-theme-foreground');
    expect(button).toHaveClass('hover:bg-theme-input-bg');
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  // Interação de Clique
  test('deve chamar a função onClick quando clicado', () => {
    render(<TabButton {...defaultProps} />);
    const button = screen.getByRole('tab', { name: 'Chat' });
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  // Propriedades do Ícone
  test('deve clonar o elemento do ícone com as classes corretas', () => {
    // Para testar isso, precisamos de um ícone que possamos inspecionar
    // Vamos criar um mock simples para o ícone que aceita className
    const MockIcon = ({ className }: { className?: string }) => (
      <svg data-testid="mock-icon" className={className} />
    );
    render(<TabButton {...defaultProps} icon={<MockIcon />} />);
    const iconElement = screen.getByTestId('mock-icon');
    expect(iconElement).toHaveClass('w-5');
    expect(iconElement).toHaveClass('h-5');
    expect(iconElement).toHaveClass('mb-1');
  });
});
