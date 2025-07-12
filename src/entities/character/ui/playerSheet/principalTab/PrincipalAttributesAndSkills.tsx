// src/entities/character/ui/playerSheet/principalTab/PrincipalAttributesAndSkills.tsx

import { AttributeBlock } from "./AttributeBlock";
import { SkillProficiencyItem } from "./SkillProficiencyItem";
import { ProficiencyPath } from '../../../model/schemas/character.schema';


// 1. A NOVA FONTE DA VERDADE PARA A UI
// Em vez de um SKILLS_CONFIG genérico, criamos um objeto de configuração explícito.
// As chaves ('strength', 'dexterity', etc.) correspondem aos nomes no schema Zod.
const ATTRIBUTES_CONFIG = {
  strength: { label: "Força", skills: [{ key: "athletics", label: "Atletismo" }] },
  dexterity: { label: "Destreza", skills: [{ key: "acrobatics", label: "Acrobacia" }, { key: "sleightOfHand", label: "Prestidigitação" }, { key: "stealth", label: "Furtividade" }] },
  constitution: { label: "Constituição", skills: [] },
  intelligence: { label: "Inteligência", skills: [{ key: "arcana", label: "Arcanismo" }, { key: "history", label: "História" }, { key: "investigation", label: "Investigação" }, { key: "nature", label: "Natureza" }, { key: "religion", label: "Religião" }] },
  wisdom: { label: "Sabedoria", skills: [{ key: "animalHandling", label: "Adestrar Animais" }, { key: "insight", label: "Intuição" }, { key: "medicine", label: "Medicina" }, { key: "perception", label: "Percepção" }, { key: "survival", label: "Sobrevivência" }] },
  charisma: { label: "Carisma", skills: [{ key: "deception", label: "Enganação" }, { key: "intimidation", label: "Intimidação" }, { key: "performance", label: "Atuação" }, { key: "persuasion", label: "Persuasão" }] },
} as const; // 'as const' ajuda o TypeScript a inferir os tipos mais estritos possíveis

// Definimos um tipo para as chaves do nosso objeto de configuração
type AttributeName = keyof typeof ATTRIBUTES_CONFIG;

interface PrincipalAttributesAndSkillsProps {
  className?: string;
}

export function PrincipalAttributesAndSkills({ className }: PrincipalAttributesAndSkillsProps) {
  // 2. Note que removemos o useFormContext daqui.
  // Os componentes filhos (`AttributeBlock`, `SkillProficiencyItem`) serão responsáveis
  // por chamar `useFormContext` eles mesmos. Isso limpa o componente pai.

  return (
    <div className={`flex flex-col space-y-2 rounded-md ${className}`}>
      {/* 3. Iteramos sobre as chaves da nossa nova configuração */}
      {(Object.keys(ATTRIBUTES_CONFIG) as AttributeName[]).map((attrName) => {

        const { label, skills } = ATTRIBUTES_CONFIG[attrName];

        const savingThrowInfo = {
          key: attrName,
          label: `Salva-guarda de ${label}`,
          isSavingThrow: true,
        };

        const allSkills = [savingThrowInfo, ...skills.map(s => ({ ...s, isSavingThrow: false }))];

        return (
          <div
            key={attrName}
            className="flex flex-col space-y-2 p-3 rounded bg-surface-1 w-[14rem]"
            aria-label="bloco de atributo externo"
          >
            <AttributeBlock name={`attributes.${attrName}`} label={label} />
            
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
