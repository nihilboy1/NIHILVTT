import { renderHook, act } from '@testing-library/react';
import { useModalStateManagement } from '../useModalStateManagement';

describe('useModalStateManagement', () => {
  it('deve inicializar com uma pilha de modais vazia', () => {
    const { result } = renderHook(() => useModalStateManagement());
    expect(result.current.modalStack).toEqual([]);
  });

  it('deve adicionar um modal à pilha com openModal', () => {
    const { result } = renderHook(() => useModalStateManagement());
    act(() => {
      result.current.openModal('testModal', { prop1: 'value1' });
    });
    expect(result.current.modalStack.length).toBe(1);
    expect(result.current.modalStack[0].name).toBe('testModal');
    expect(result.current.modalStack[0].props).toEqual({ prop1: 'value1' });
    expect(result.current.modalStack[0].id).toBeDefined();
  });

  it('deve adicionar múltiplos modais à pilha', () => {
    const { result } = renderHook(() => useModalStateManagement());
    act(() => {
      result.current.openModal('modal1');
    });
    act(() => {
      result.current.openModal('modal2', { data: 123 });
    });
    expect(result.current.modalStack.length).toBe(2);
    expect(result.current.modalStack[0].name).toBe('modal1');
    expect(result.current.modalStack[1].name).toBe('modal2');
  });

  it('deve gerar um ID único para cada modal', () => {
    const { result } = renderHook(() => useModalStateManagement());
    act(() => {
      result.current.openModal('modalA');
      result.current.openModal('modalB');
    });
    expect(result.current.modalStack[0].id).not.toBe(result.current.modalStack[1].id);
  });

  it('não deve abrir um modal "sheet" se já houver um aberto', () => {
    const { result } = renderHook(() => useModalStateManagement());
    act(() => {
      result.current.openModal('sheet', { id: 'sheet1' });
    });
    expect(result.current.modalStack.length).toBe(1);
    expect(result.current.modalStack[0].name).toBe('sheet');

    act(() => {
      result.current.openModal('sheet', { id: 'sheet2' }); // Tenta abrir outro modal 'sheet'
    });
    expect(result.current.modalStack.length).toBe(1); // A pilha deve continuar com 1 modal
    expect(result.current.modalStack[0].props).toEqual({ id: 'sheet1' }); // Deve ser o primeiro modal 'sheet'
  });

  it('deve abrir um modal "sheet" se outro tipo de modal estiver aberto', () => {
    const { result } = renderHook(() => useModalStateManagement());
    act(() => {
      result.current.openModal('otherModal');
    });
    expect(result.current.modalStack.length).toBe(1);

    act(() => {
      result.current.openModal('sheet');
    });
    expect(result.current.modalStack.length).toBe(2);
    expect(result.current.modalStack[0].name).toBe('otherModal');
    expect(result.current.modalStack[1].name).toBe('sheet');
  });

  it('deve remover o último modal da pilha com closeModal', () => {
    const { result } = renderHook(() => useModalStateManagement());
    act(() => {
      result.current.openModal('modal1');
      result.current.openModal('modal2');
    });
    expect(result.current.modalStack.length).toBe(2);

    act(() => {
      result.current.closeModal();
    });
    expect(result.current.modalStack.length).toBe(1);
    expect(result.current.modalStack[0].name).toBe('modal1');
  });

  it('não deve fazer nada se closeModal for chamado em uma pilha vazia', () => {
    const { result } = renderHook(() => useModalStateManagement());
    act(() => {
      result.current.closeModal();
    });
    expect(result.current.modalStack.length).toBe(0);
  });

  it('deve atualizar as props do modal no topo da pilha com updateModalProps', () => {
    const { result } = renderHook(() => useModalStateManagement());
    act(() => {
      result.current.openModal('modal1', { count: 0 });
      result.current.openModal('modal2', { text: 'hello' });
    });
    expect(result.current.modalStack[1].props).toEqual({ text: 'hello' });

    act(() => {
      result.current.updateModalProps({ text: 'world', newProp: true });
    });
    expect(result.current.modalStack[1].props).toEqual({ text: 'world', newProp: true });
    expect(result.current.modalStack[0].props).toEqual({ count: 0 }); // O modal de baixo não deve ser afetado
  });

  it('não deve fazer nada se updateModalProps for chamado em uma pilha vazia', () => {
    const { result } = renderHook(() => useModalStateManagement());
    act(() => {
      result.current.updateModalProps({ anyProp: 'anyValue' });
    });
    expect(result.current.modalStack.length).toBe(0);
  });
});
