import { ReactNode, createContext, useContext } from 'react';

import { EffectsProcessor } from '../hooks/useEffectsProcessor';

const EffectsProcessorContext = createContext<EffectsProcessor | null>(null);

interface CharacterBuilderEffectsProviderProps {
  effectsProcessor: EffectsProcessor;
  children: ReactNode;
}

export function CharacterBuilderEffectsProvider({
  effectsProcessor,
  children,
}: CharacterBuilderEffectsProviderProps) {
  return (
    <EffectsProcessorContext.Provider value={effectsProcessor}>
      {children}
    </EffectsProcessorContext.Provider>
  );
}

export function useCharacterBuilderEffectsProcessor() {
  const context = useContext(EffectsProcessorContext);
  if (!context) {
    throw new Error(
      'useCharacterBuilderEffectsProcessor deve ser usado dentro de CharacterBuilderEffectsProvider.',
    );
  }
  return context;
}

