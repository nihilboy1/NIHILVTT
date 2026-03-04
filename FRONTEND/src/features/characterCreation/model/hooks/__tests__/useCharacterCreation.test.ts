import { act, renderHook } from '@testing-library/react';

import { useCharacterCreation } from '../useCharacterCreation';

describe('useCharacterCreation', () => {
  it('bloqueia a criacao local de player de forma explicita', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { result } = renderHook(() => useCharacterCreation());

    act(() => {
      result.current.createPlayerCharacter('Teste');
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Fluxo local bloqueado: criação direta de personagem exige pipeline autoritativo de sessão.',
      { name: 'Teste', characterType: 'Player' },
    );

    consoleErrorSpy.mockRestore();
  });

  it('bloqueia a criacao local de npc de forma explicita', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { result } = renderHook(() => useCharacterCreation());

    act(() => {
      result.current.createMonsterNpc('Plebeu');
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Fluxo local bloqueado: criação direta de NPC exige pipeline autoritativo de sessão.',
      { name: 'Plebeu', characterType: 'NPC' },
    );

    consoleErrorSpy.mockRestore();
  });
});
