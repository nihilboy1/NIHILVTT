import { render, screen, fireEvent } from '@testing-library/react';
import DeathSaveCheckboxGroup from './DeathSaveCheckboxGroup';

describe('DeathSaveCheckboxGroup', () => {
  const defaultProps = {
    onChange: jest.fn(),
    label: 'Sucessos',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('deve renderizar o label corretamente', () => {
    render(<DeathSaveCheckboxGroup {...defaultProps} count={0} type="success" />);
    expect(screen.getByText('Sucessos')).toBeInTheDocument();
  });

  test('deve renderizar 3 checkboxes', () => {
    render(<DeathSaveCheckboxGroup {...defaultProps} count={0} type="success" />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(3);
  });

  test('deve marcar os checkboxes corretos para count = 0', () => {
    render(<DeathSaveCheckboxGroup {...defaultProps} count={0} type="success" />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
    expect(checkboxes[2]).not.toBeChecked();
  });

  test('deve marcar os checkboxes corretos para count = 1', () => {
    render(<DeathSaveCheckboxGroup {...defaultProps} count={1} type="success" />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
    expect(checkboxes[2]).not.toBeChecked();
  });

  test('deve marcar os checkboxes corretos para count = 2', () => {
    render(<DeathSaveCheckboxGroup {...defaultProps} count={2} type="failure" />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).toBeChecked();
    expect(checkboxes[2]).not.toBeChecked();
  });

  test('deve marcar os checkboxes corretos para count = 3', () => {
    render(<DeathSaveCheckboxGroup {...defaultProps} count={3} type="success" />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).toBeChecked();
    expect(checkboxes[2]).toBeChecked();
  });

  test('deve chamar onChange com o valor correto ao marcar um checkbox', () => {
    render(<DeathSaveCheckboxGroup {...defaultProps} count={0} type="success" />);
    const checkbox1 = screen.getByLabelText('success 1');
    fireEvent.click(checkbox1);
    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onChange).toHaveBeenCalledWith(1);
  });

  test('deve chamar onChange com o valor correto ao desmarcar um checkbox', () => {
    render(<DeathSaveCheckboxGroup {...defaultProps} count={2} type="failure" />);
    const checkbox2 = screen.getByLabelText('failure 2');
    fireEvent.click(checkbox2); // Clicar no segundo checkbox quando 2 estão marcados deve desmarcar o segundo e o terceiro
    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onChange).toHaveBeenCalledWith(1); // Espera-se que o count vá para 1
  });

  test('deve chamar onChange com o valor correto ao marcar o terceiro checkbox', () => {
    render(<DeathSaveCheckboxGroup {...defaultProps} count={2} type="success" />);
    const checkbox3 = screen.getByLabelText('success 3');
    fireEvent.click(checkbox3);
    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onChange).toHaveBeenCalledWith(3);
  });

  test('deve ter aria-label correto para cada checkbox', () => {
    render(<DeathSaveCheckboxGroup {...defaultProps} count={0} type="success" />);
    expect(screen.getByLabelText('success 1')).toBeInTheDocument();
    expect(screen.getByLabelText('success 2')).toBeInTheDocument();
    expect(screen.getByLabelText('success 3')).toBeInTheDocument();
  });

  test('deve ter aria-label correto para o tipo "failure"', () => {
    render(<DeathSaveCheckboxGroup {...defaultProps} count={0} type="failure" />);
    expect(screen.getByLabelText('failure 1')).toBeInTheDocument();
    expect(screen.getByLabelText('failure 2')).toBeInTheDocument();
    expect(screen.getByLabelText('failure 3')).toBeInTheDocument();
  });
});
