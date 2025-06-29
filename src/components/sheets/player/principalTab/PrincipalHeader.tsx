import { usePlayerSheet } from "../../../../contexts/CharacterSheetContext";

export function PrincipalHeader() {
  const {
    editingCharacterName,
    setEditingCharacterName,
    editingCharClass,
    setEditingCharClass,
    editingLevel,
    setEditingLevel,
    editingBackground,
    setEditingBackground,
    editingSpecies,
    setEditingSpecies,
    editingSubclass,
    setEditingSubclass,
    proficiencyBonus,
  } = usePlayerSheet();

  return (
    <div className="flex w-full rounded-md  gap-10 mb-2 items-center bg-surface-1 p-2">
      <div id="name" className="flex flex-col ">
        <label
          htmlFor="editingCharacterName"
          className=" text-[1.2rem] font-medium  -mt-1 w-[15rem]"
        >
          NOME DO PERSONAGEM
        </label>
        <input
          id="editingCharacterName"
          type="text"
          value={editingCharacterName}
          onChange={(e) => setEditingCharacterName(e.target.value)}
          className=" w-full p-2 bg-surface-1 border border-surface-2 rounded-md text-[1rem] "
          required
          maxLength={28}
        />
      </div>
      <div id="classAndSubclass" className="flex flex-col gap-1">
        <div>
          <label
            htmlFor="editingCharClass"
            className="block text-[0.6rem] font-medium  w-full"
          >
            CLASSE
          </label>
          <input
            id="editingCharClass"
            type="text"
            value={editingCharClass}
            onChange={(e) => setEditingCharClass(e.target.value)}
            className=" w-full pl-1.5 bg-surface-1 border border-surface-2 rounded-md text-[0.8rem] "
          />
        </div>

        <label
          htmlFor="editingSubclass"
          className="block text-[0.6rem] font-medium  w-full -mb-1"
        >
          SUBCLASSE
        </label>
        <input
          id="editingSubclass"
          type="text"
          value={editingSubclass}
          onChange={(e) => setEditingSubclass(e.target.value)}
          className=" w-full pl-1.5 bg-surface-1 border border-surface-2 rounded-md text-[0.8rem] "
        />
      </div>

      <div id="backgroundAndSpecies" className="flex flex-col gap-1">
        <div>
          <label
            htmlFor="editingBackground"
            className="block text-[0.6rem] font-medium w-full"
          >
            ANTECEDENTE
          </label>
          <input
            id="editingBackground"
            type="text"
            value={editingBackground}
            onChange={(e) => setEditingBackground(e.target.value)}
            className=" w-full pl-1.5 bg-surface-1 border border-surface-2 rounded-md text-[0.8rem] "
          />
        </div>

        <div>
          <label
            htmlFor="editingSpecies"
            className="block text-[0.6rem] font-medium w-full -mb-0.5"
          >
            ESPÉCIE
          </label>
          <input
            id="editingSpecies"
            type="text"
            value={editingSpecies}
            onChange={(e) => setEditingSpecies(e.target.value)}
            className=" w-full pl-1.5 bg-surface-1 border border-surface-2 rounded-md text-[0.8rem] "
          />
        </div>
      </div>

      <div id="levelAndProficiency" className="flex flex-col  w-[5rem]">
        <div>
          <label
            htmlFor="editingLevel"
            className="block text-[0.6rem] font-medium w-full"
          >
            NÍVEL
          </label>
          <input
            id="editingLevel"
            type="number"
            value={editingLevel}
            onChange={(e) => {
              const val = e.target.value;
              if (val.length <= 2) setEditingLevel(val);
            }}
            className="hide-arrows w-full pl-1.5 bg-surface-1 border border-surface-2 rounded-md text-[0.8rem] "
            min="1"
            max="99"
            step="1"
          />
        </div>

        <div>
          <label
            htmlFor="proficiencyBonus"
            className="block text-[0.6rem] font-medium w-full"
          >
            PROF. BÔNUS
          </label>
          <span
            id="proficiencyBonus"
            className="block hide-arrows  pl-1.5 bg-surface-1 border border-surface-2 rounded-md text-[0.8rem] "
          >
            +{proficiencyBonus}
          </span>
        </div>
      </div>
    </div>
  );
}
