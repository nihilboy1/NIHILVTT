import { renderHook, act } from '@testing-library/react';
import { useUIState } from './useUIState';
import { Tool, SidebarTab } from '../types';

describe('useUIState', () => {
  it('deve inicializar o estado com valores padrão', () => {
    const { result } = renderHook(() => useUIState());

    expect(result.current.activeTool).toBe(Tool.SELECT);
    expect(result.current.activeSidebarTab).toBe(SidebarTab.CHAT);
    expect(result.current.isToolbarVisible).toBe(true);
    expect(result.current.isRightSidebarVisible).toBe(true);
    expect(result.current.activePopover).toBe(null);
  });

  it('deve definir a ferramenta ativa', () => {
    const { result } = renderHook(() => useUIState());

    act(() => {
      result.current.setActiveTool(Tool.PAN);
    });
    expect(result.current.activeTool).toBe(Tool.PAN);
  });

  it('deve definir a aba da barra lateral ativa', () => {
    const { result } = renderHook(() => useUIState());

    act(() => {
      result.current.setActiveSidebarTab(SidebarTab.TOKENS);
    });
    expect(result.current.activeSidebarTab).toBe(SidebarTab.TOKENS);
  });

  it('deve definir a visibilidade da barra de ferramentas', () => {
    const { result } = renderHook(() => useUIState());

    act(() => {
      result.current.setIsToolbarVisible(false);
    });
    expect(result.current.isToolbarVisible).toBe(false);
  });

  it('deve definir a visibilidade da barra lateral direita', () => {
    const { result } = renderHook(() => useUIState());

    act(() => {
      result.current.setIsRightSidebarVisible(false);
    });
    expect(result.current.isRightSidebarVisible).toBe(false);
  });

  it('deve definir o popover ativo', () => {
    const { result } = renderHook(() => useUIState());

    act(() => {
      result.current.setActivePopover('ruler');
    });
    expect(result.current.activePopover).toBe('ruler');

    act(() => {
      result.current.setActivePopover(null);
    });
    expect(result.current.activePopover).toBe(null);
  });
});
