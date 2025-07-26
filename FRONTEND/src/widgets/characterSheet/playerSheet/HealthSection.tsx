import { useEffect } from 'react';

import { useFormContext, useFieldArray, useWatch } from 'react-hook-form';

import { Character, PlayerCharacter } from '@/entities/character/model/schemas/character.schema';
import { useCharactersStore } from '@/entities/character/model/store';
import { cn } from '@/shared/lib/utils/cn';
import { generateUniqueId } from '@/shared/lib/utils/id/idUtils';
import { DeleteIcon, PlusCircleIcon } from '@/shared/ui/Icons';

export function HealthSection() {
  const { register, control, formState, getValues, setValue } = useFormContext<PlayerCharacter>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'hitDiceEntries',
  });

  const characterId = getValues('id');
  const { updateCharacterHp } = useCharactersStore();

  // Assinatura reativa para o HP na store ZUSTAND
  const storeCurrentHp = useCharactersStore((state) => {
    const character = state.characters.find((c) => c.id === characterId) as Character;
    return character && 'combatStats' in character ? character.combatStats.currentHp : 0;
  });

  // Assinatura reativa para o HP no formulário (REACT-HOOK-FORM)
  const formCurrentHp = useWatch({
    control,
    name: 'combatStats.currentHp',
  });

  // SINCRONIZAÇÃO: Store -> Formulário
  useEffect(() => {
    if (storeCurrentHp !== undefined && storeCurrentHp !== formCurrentHp) {
      console.log(
        "HealthSection: Sincronizando Store -> Formulário",
        "Store HP:",
        storeCurrentHp,
        "Form HP (antes):",
        formCurrentHp
      );
      setValue("combatStats.currentHp", storeCurrentHp, {
        shouldValidate: true,
        shouldDirty: true,
      });
      console.log(
        "HealthSection: HP setado no formulário para",
        storeCurrentHp
      );
    }
  }, [storeCurrentHp, formCurrentHp, setValue]);

  // SINCRONIZAÇÃO: Formulário -> Store
  useEffect(() => {
    if (
      formCurrentHp !== undefined &&
      formCurrentHp !== storeCurrentHp &&
      !formState.errors.combatStats?.currentHp
    ) {
      console.log(
        "HealthSection: Sincronizando Formulário -> Store",
        "Form HP:",
        formCurrentHp,
        "Store HP (antes):",
        storeCurrentHp,
        "Character ID:",
        characterId,
        "Form Errors:",
        formState.errors.combatStats?.currentHp
      );
      updateCharacterHp(characterId, formCurrentHp);
      console.log(
        "HealthSection: updateCharacterHp chamado com",
        formCurrentHp
      );
    }
  }, [
    formCurrentHp,
    storeCurrentHp,
    updateCharacterHp,
    characterId,
    formState.errors.combatStats?.currentHp,
  ]);

  const currentHpError = formState.errors.combatStats?.currentHp?.message;

  const handleAddHitDice = () => {
    append({ id: generateUniqueId(), type: 'd6', quantity: 1 });
  };

  const handleDeleteConfirmation = (index: number) => {
    remove(index);
  };

  return (
    <fieldset
      id="pontos de vida"
      className="bg-surface-1 mt-2 flex flex-col space-y-1.5 rounded-md p-2"
    >
      <legend className="bg-surface-1 rounded p-1 pr-3 pl-2 text-sm font-bold">
        PONTOS DE VIDA
      </legend>

      <div>
        <div>
          <label
            htmlFor="currentHp"
            className={cn('mb-px block text-[0.8rem] font-medium', 'block text-center text-[10px]')}
          >
            ATUAL
          </label>
          <input
            id="currentHp"
            type="number"
            {...register('combatStats.currentHp', { valueAsNumber: true })}
            className={cn(
              'bg-surface-1 border-surface-2 text-text-primary placeholder-text-secondary w-full rounded-md border p-2',
              'hide-arrows text-center',
              currentHpError && 'border-feedback-negative',
            )}
          />
          {currentHpError && (
            <p className="text-feedback-negative mt-1 text-xs">{currentHpError}</p>
          )}
        </div>
        <div className="mt-1.5 flex space-x-1.5">
          <div className="flex-1">
            <label
              htmlFor="tempHp"
              className={cn(
                'mb-px block text-[0.8rem] font-medium',
                'block text-center text-[10px]',
              )}
            >
              TEMPORÁRIO
            </label>
            <input
              id="tempHp"
              type="number"
              {...register('combatStats.tempHp', { valueAsNumber: true })}
              className={cn(
                'bg-surface-1 border-surface-2 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary w-full rounded-md border p-2 focus:ring-1',
                'hide-arrows text-center',
              )}
              min="0"
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="maxHp"
              className={cn(
                'mb-px block text-[0.8rem] font-medium',
                'block text-center text-[10px]',
              )}
            >
              MÁXIMO
            </label>
            <input
              id="maxHp"
              type="number"
              {...register('combatStats.maxHp', { valueAsNumber: true })}
              className={cn(
                'bg-surface-1 border-surface-2 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary w-full rounded-md border p-2 focus:ring-1',
                'hide-arrows text-center',
              )}
              min="1"
            />
          </div>
        </div>
      </div>

      <fieldset className="bg-surface-1 relative flex-1 rounded">
        <legend className="bg-surface-1 rounded text-sm font-bold">Dados de Vida</legend>
        <button
          type="button"
          onClick={handleAddHitDice}
          className="bg-accent-primary text-text-primary hover:bg-accent-secondary absolute right-[50%] -bottom-5.5 flex h-6 w-6 translate-x-1/2 items-center justify-center rounded-[10rem] text-xl font-bold"
        >
          <PlusCircleIcon />
        </button>
        <ul className="flex flex-col">
          {fields.map((field, index) => (
            <li key={field.id} className="mb-2 flex items-center space-x-2">
              <select
                {...register(`hitDiceEntries.${index}.type`)}
                className={cn(
                  'bg-surface-1 border-surface-2 focus:ring-accent-primary focus:border-accent-primary text-text-primary rounded-md border p-1 font-bold focus:ring-1',
                  'w-20',
                )}
              >
                <option value="d4">D4</option>
                <option value="d6">D6</option>
                <option value="d8">D8</option>
                <option value="d10">D10</option>
                <option value="d12">D12</option>
              </select>
              <input
                type="number"
                {...register(`hitDiceEntries.${index}.quantity`, {
                  valueAsNumber: true,
                })}
                className={cn(
                  'bg-surface-1 border-surface-2 focus:ring-accent-primary focus:border-accent-primary text-text-primary placeholder-text-secondary w-full rounded-md border p-1 focus:ring-1',
                  'hide-arrows text-center',
                )}
                min="1"
              />
              <button
                type="button"
                title="Remover dado de vida"
                onClick={() => handleDeleteConfirmation(index)}
                disabled={fields.length === 1}
                className="t hover:text-surface-0 bg-feedback-negative hover:bg-feedback-negative-hover flex items-center justify-center rounded-md p-2 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50"
              >
                <DeleteIcon className="h-5 w-10" />
              </button>
            </li>
          ))}
        </ul>
      </fieldset>
    </fieldset>
  );
}
