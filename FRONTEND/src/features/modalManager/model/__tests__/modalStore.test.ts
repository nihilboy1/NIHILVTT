import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react'; // Importar renderHook de @testing-library/react

import { useSessionModalStore } from '../sessionModalStore';

describe('useSessionModalStore', () => {
  // Resetar o estado do store antes de cada teste
  beforeEach(() => {
    act(() => {
      useSessionModalStore.setState({ modalStack: [] });
    });
  });

  it('deve inicializar com uma pilha de modais vazia', () => {
    const { result } = renderHook(() => useSessionModalStore());
    expect(result.current.modalStack).toEqual([]);
  });

  it('deve adicionar um modal à pilha com openModal', () => {
    const { result } = renderHook(() => useSessionModalStore());
    act(() => {
      result.current.openModal('testModal', { prop1: 'value1' });
    });
    expect(result.current.modalStack.length).toBe(1);
    expect(result.current.modalStack[0].name).toBe('testModal');
    expect(result.current.modalStack[0].props).toEqual({ prop1: 'value1' });
    expect(result.current.modalStack[0].id).toBeDefined();
  });

  it('deve adicionar múltiplos modais à pilha', () => {
    const { result } = renderHook(() => useSessionModalStore());
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
    const { result } = renderHook(() => useSessionModalStore());
    act(() => {
      result.current.openModal('modalA');
      result.current.openModal('modalB');
    });
    expect(result.current.modalStack[0].id).not.toBe(result.current.modalStack[1].id);
  });

  it('deve reutilizar o modal "sheet" existente e atualizar suas props', () => {
    const { result } = renderHook(() => useSessionModalStore());
    act(() => {
      result.current.openModal('sheet', { id: 'sheet1' });
    });
    expect(result.current.modalStack.length).toBe(1);
    expect(result.current.modalStack[0].name).toBe('sheet');

    act(() => {
      result.current.openModal('sheet', { id: 'sheet2' }); // Tenta abrir outro modal 'sheet'
    });
    expect(result.current.modalStack.length).toBe(1); // A pilha deve continuar com 1 modal
    expect(result.current.modalStack[0].props).toEqual({ id: 'sheet2' }); // O sheet existente deve ser atualizado
  });

  it('deve abrir um modal "sheet" se outro tipo de modal estiver aberto', () => {
    const { result } = renderHook(() => useSessionModalStore());
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

  it('deve permitir configurar dismissible ao abrir um modal', () => {
    const { result } = renderHook(() => useSessionModalStore());

    act(() => {
      result.current.openModal('modal1', { locked: true }, false);
    });

    expect(result.current.modalStack).toHaveLength(1);
    expect(result.current.modalStack[0].dismissible).toBe(false);
    expect(result.current.modalStack[0].props).toEqual({ locked: true });
  });

  it('deve atualizar as props e o dismissible ao reutilizar o modal "sheet"', () => {
    const { result } = renderHook(() => useSessionModalStore());

    act(() => {
      result.current.openModal('sheet', { id: 'sheet1' }, true);
    });

    expect(result.current.modalStack[0].dismissible).toBe(true);

    act(() => {
      result.current.openModal('sheet', { id: 'sheet2' }, false);
    });

    expect(result.current.modalStack).toHaveLength(1);
    expect(result.current.modalStack[0].props).toEqual({ id: 'sheet2' });
    expect(result.current.modalStack[0].dismissible).toBe(false);
  });

  it('deve remover o último modal da pilha com closeModal', () => {
    const { result } = renderHook(() => useSessionModalStore());
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
    const { result } = renderHook(() => useSessionModalStore());
    act(() => {
      result.current.closeModal();
    });
    expect(result.current.modalStack.length).toBe(0);
  });

  it('deve remover a última ocorrência de um modal pelo nome com closeModalByName', () => {
    const { result } = renderHook(() => useSessionModalStore());

    act(() => {
      result.current.openModal('modal1', { order: 1 });
      result.current.openModal('sheet', { id: 'sheet1' });
      result.current.openModal('modal1', { order: 2 });
    });

    act(() => {
      result.current.closeModalByName('modal1');
    });

    expect(result.current.modalStack).toHaveLength(2);
    expect(result.current.modalStack[0].name).toBe('modal1');
    expect(result.current.modalStack[0].props).toEqual({ order: 1 });
    expect(result.current.modalStack[1].name).toBe('sheet');
  });

  it('não deve alterar a pilha se closeModalByName receber um nome ausente', () => {
    const { result } = renderHook(() => useSessionModalStore());

    act(() => {
      result.current.openModal('modal1');
      result.current.openModal('modal2');
    });

    act(() => {
      result.current.closeModalByName('sheet');
    });

    expect(result.current.modalStack).toHaveLength(2);
    expect(result.current.modalStack[0].name).toBe('modal1');
    expect(result.current.modalStack[1].name).toBe('modal2');
  });

  it('deve atualizar as props do modal no topo da pilha com updateModalProps', () => {
    const { result } = renderHook(() => useSessionModalStore());
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
    const { result } = renderHook(() => useSessionModalStore());
    act(() => {
      result.current.updateModalProps({ anyProp: 'anyValue' });
    });
    expect(result.current.modalStack.length).toBe(0);
  });
});
