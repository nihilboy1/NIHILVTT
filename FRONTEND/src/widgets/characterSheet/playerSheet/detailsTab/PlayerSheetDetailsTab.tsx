import { PlayerCharacterViewModel } from '@/entities/character/model/view-models/playerCharacterViewModel';

interface PlayerSheetDetailsTabProps {
  viewModel: PlayerCharacterViewModel | null;
}

export function PlayerSheetDetailsTab({ viewModel }: PlayerSheetDetailsTabProps) {
  const notes = viewModel?.notes?.trim() ? viewModel.notes : 'Nenhuma nota registrada.';

  return (
    <div className="hide-scrollbar flex h-full min-h-0 flex-col space-y-3 overflow-y-auto rounded-lg bg-surface-1/75 p-2.5">
      <div className="rounded-lg bg-surface-0/30 p-2.5">
        <p className="mb-1 block text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-text-secondary">
          Notas do Personagem
        </p>
        <div className="min-h-[8rem] rounded-md bg-surface-1 px-2.5 py-2 text-sm text-text-primary whitespace-pre-wrap">
          {notes}
        </div>
      </div>
      <div className="rounded-lg bg-surface-0/30 p-2.5">
        <p className="mb-1 block text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-text-secondary">
          Inspiração
        </p>
        <div className="inline-flex rounded-full bg-surface-1 px-2.5 py-1 text-[0.76rem] font-semibold tracking-[0.04em] text-text-primary">
          {viewModel?.inspiration ? 'Ativa' : 'Inativa'}
        </div>
      </div>
      <p className="mt-2 text-center text-xs italic text-text-secondary">
        Outras informações de história, magias, etc. (Em desenvolvimento)
      </p>
    </div>
  );
}
