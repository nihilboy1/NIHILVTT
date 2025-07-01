// src/entities/character/lib/utils/sheetUtils.ts

/**
 * Calcula o modificador de atributo com base no valor do atributo.
 * @param attributeValue O valor numérico do atributo (ex: 14).
 * @returns O modificador de atributo (ex: 2 para 14).
 */
export function getModifier(attributeValue: number): number {
  return Math.floor((attributeValue - 10) / 2);
}

/**
 * Calcula o bônus de proficiência com base no nível do personagem.
 * @param level O nível do personagem.
 * @returns O bônus de proficiência.
 */
export function getProficiencyBonus(level: number): number {
  // Regra padrão de D&D 5e: 2 + (nível - 1) / 4, arredondado para cima
  // Nível 1-4: +2
  // Nível 5-8: +3
  // Nível 9-12: +4
  // Nível 13-16: +5
  // Nível 17-20: +6
  return Math.ceil(1 + level / 4);
}

/**
 * Calcula o bônus total de uma perícia.
 * @param isProficient Indica se o personagem é proficiente na perícia.
 * @param attributeModifier O modificador do atributo base da perícia.
 * @param proficiencyBonus O bônus de proficiência do personagem.
 * @returns O bônus total da perícia.
 */
export function getSkillBonus(
  isProficient: boolean,
  attributeModifier: number,
  proficiencyBonus: number
): number {
  return attributeModifier + (isProficient ? proficiencyBonus : 0);
}

/**
 * Calcula o valor da iniciativa.
 * @param dexterityModifier O modificador de Destreza do personagem.
 * @returns O valor da iniciativa.
 */
export function getInitiative(dexterityModifier: number): number {
  return dexterityModifier; // Em D&D 5e, a iniciativa é o modificador de Destreza
}

/**
 * Calcula o valor da Percepção Passiva.
 * @param wisdomModifier O modificador de Sabedoria do personagem.
 * @param perceptionProficiency Indica se o personagem é proficiente em Percepção.
 * @param proficiencyBonus O bônus de proficiência do personagem.
 * @returns O valor da Percepção Passiva.
 */
export function getPassivePerception(
  wisdomModifier: number,
  perceptionProficiency: boolean,
  proficiencyBonus: number
): number {
  return 10 + wisdomModifier + (perceptionProficiency ? proficiencyBonus : 0);
}
