import { usePlayerCharacter } from '@/entities/character/lib/hooks/usePlayerCharacter';
import {
  CharacterTypeEnum,
  characterTypeTranslations,
} from '@/entities/character/model/schemas/character.schema';
import { PlayerCharacterViewModel } from '@/entities/character/model/view-models/playerCharacterViewModel';

interface PlayerSheetConfigTabProps {
  characterId: string;
  viewModel: PlayerCharacterViewModel | null;
}

export function PlayerSheetConfigTab({ characterId, viewModel }: PlayerSheetConfigTabProps) {
  const character = usePlayerCharacter(characterId);
  const imageValue = viewModel?.image?.trim() ? viewModel.image : 'Sem imagem configurada.';

  return (
    <div className="hide-scrollbar flex h-full min-h-0 flex-col space-y-3 overflow-y-auto rounded-lg bg-surface-1/75 p-2.5">
      <div className="rounded-lg bg-surface-0/30 p-2.5">
        <p className="mb-1 block text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-text-secondary">
          URL da Imagem do Personagem
        </p>
        <div className="rounded-md bg-surface-1 px-2.5 py-2 text-sm text-text-primary break-all">
          {imageValue}
        </div>
      </div>
      <div className="rounded-lg bg-surface-0/30 p-2.5">
        <p className="mb-1 block text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-text-secondary">
          Tamanho do Personagem (Tabuleiro)
        </p>
        <div className="rounded-md bg-surface-1 px-2.5 py-2 text-sm text-text-primary">
          {character?.size ?? '1x1'}
        </div>
      </div>
      <div className="rounded-lg bg-surface-0/30 p-2.5">
        <p className="mb-1 block text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-text-secondary">
          Tipo do Personagem
        </p>
        <div className="rounded-md bg-surface-1 px-2.5 py-2 text-sm text-text-primary opacity-80">
          {characterTypeTranslations[CharacterTypeEnum.enum.Player]}
        </div>
      </div>
    </div>
  );
}
