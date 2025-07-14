// src/entities/character/ui/playerSheet/principalTab/PrincipalAttributesAndSkills.tsx

import { AttributeBlock } from "./AttributeBlock";
import { SkillProficiencyItem } from "./SkillProficiencyItem";
import { Character, ProficiencyPath } from "../../../model/schemas/character.schema";
import { DiceFormula } from "@/shared/api/types";
import { useFormContext } from "react-hook-form"; // 1. PRECISAMOS DO FORM CONTEXT AQUI

// 1. A NOVA FONTE DA VERDADE PARA A UI
// Em vez de um SKILLS_CONFIG genérico, criamos um objeto de configuração explícito.
// As chaves ('strength', 'dexterity', etc.) correspondem aos nomes no schema Zod.
const ATTRIBUTES_CONFIG = {
  strength: {
    label: "Força",
    skills: [{ key: "athletics", label: "Atletismo" }],
  },
  dexterity: {
    label: "Destreza",
    skills: [
      { key: "acrobatics", label: "Acrobacia" },
      { key: "sleightOfHand", label: "Prestidigitação" },
      { key: "stealth", label: "Furtividade" },
    ],
  },
  constitution: { label: "Constituição", skills: [] },
  intelligence: {
    label: "Inteligência",
    skills: [
      { key: "arcana", label: "Arcanismo" },
      { key: "history", label: "História" },
      { key: "investigation", label: "Investigação" },
      { key: "nature", label: "Natureza" },
      { key: "religion", label: "Religião" },
    ],
  },
  wisdom: {
    label: "Sabedoria",
    skills: [
      { key: "animalHandling", label: "Adestrar Animais" },
      { key: "insight", label: "Intuição" },
      { key: "medicine", label: "Medicina" },
      { key: "perception", label: "Percepção" },
      { key: "survival", label: "Sobrevivência" },
    ],
  },
  charisma: {
    label: "Carisma",
    skills: [
      { key: "deception", label: "Enganação" },
      { key: "intimidation", label: "Intimidação" },
      { key: "performance", label: "Atuação" },
      { key: "persuasion", label: "Persuasão" },
    ],
  },
} as const; // 'as const' ajuda o TypeScript a inferir os tipos mais estritos possíveis

// Definimos um tipo para as chaves do nosso objeto de configuração
type AttributeName = keyof typeof ATTRIBUTES_CONFIG;

interface PrincipalAttributesAndSkillsProps {
  className?: string;
  onAttributeRoll: (formula: DiceFormula, attributeLabel: string) => void; // NOVO
}

export function PrincipalAttributesAndSkills({
  className,
  onAttributeRoll,
}: PrincipalAttributesAndSkillsProps) {
  // 2. Note que removemos o useFormContext daqui.
  // Os componentes filhos (`AttributeBlock`, `SkillProficiencyItem`) serão responsáveis
  // por chamar `useFormContext` eles mesmos. Isso limpa o componente pai.
  const { watch } = useFormContext<Character>();

  return (
    <div className={`flex flex-col space-y-2 rounded-md ${className}`}>
      {/* 3. Iteramos sobre as chaves da nossa nova configuração */}
      {(Object.keys(ATTRIBUTES_CONFIG) as AttributeName[]).map((attrName) => {
        const { label, skills } = ATTRIBUTES_CONFIG[attrName];

        // 3. DENTRO DO LOOP, OBSERVAMOS O VALOR E CALCULAMOS O MODIFICADOR
        const attrValue = watch(`attributes.${attrName}`);
        const modifier = attrValue ? Math.floor((attrValue - 10) / 2) : 0;

        // 4. AQUI ESTÁ A MÁGICA: CRIAMOS A FUNÇÃO SIMPLES PARA O FILHO
        const handleRoll = () => {
          const formula: DiceFormula = `1d20${
            modifier >= 0 ? "+" : ""
          }${modifier}`;
          // E dentro dela, chamamos a função complexa do pai com os dados corretos
          onAttributeRoll(formula, label);
        };

        const savingThrowInfo = {
          key: attrName,
          label: `Salva-guarda de ${label}`,
          isSavingThrow: true,
        };

        const allSkills = [
          savingThrowInfo,
          ...skills.map((s) => ({ ...s, isSavingThrow: false })),
        ];

        return (
          <div
            key={attrName}
            className="flex flex-col space-y-2 p-3 rounded bg-surface-1 w-[14rem]"
            aria-label="bloco de atributo externo"
          >
            <AttributeBlock
              name={`attributes.${attrName}`}
              label={label}
              onRoll={handleRoll}
            />

            <div className="mt-1.5 space-y-0.5">
              {allSkills.map((skillInfo) => {
                // 4. Construímos o `name` do campo de forma segura
                const fieldName = skillInfo.isSavingThrow
                  ? `proficiencies.savingThrows.${skillInfo.key}`
                  : `proficiencies.skills.${skillInfo.key}`;

                return (
                  <SkillProficiencyItem
                    key={skillInfo.key}
                    skillLabel={skillInfo.label}
                    // O tipo exato que o `name` precisa ter é definido pelo componente filho
                    name={fieldName as ProficiencyPath} // Usamos 'as any' temporariamente para desabilitar o erro aqui, pois a correção é no filho
                    parentAttributeName={`attributes.${attrName}`}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
