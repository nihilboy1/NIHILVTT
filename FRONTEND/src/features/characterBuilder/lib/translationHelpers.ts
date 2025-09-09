/**
 * Mapeamento de habilidades (skills) para nomes em português
 */
const skillTranslations: Record<string, string> = {
  acrobatics: 'Acrobacia',
  animalHandling: 'Lidar com Animais',
  arcana: 'Arcanismo',
  athletics: 'Atletismo',
  deception: 'Enganação',
  history: 'História',
  insight: 'Intuição',
  intimidation: 'Intimidação',
  investigation: 'Investigação',
  medicine: 'Medicina',
  nature: 'Natureza',
  perception: 'Percepção',
  performance: 'Atuação',
  persuasion: 'Persuasão',
  religion: 'Religião',
  sleightOfHand: 'Prestidigitação',
  stealth: 'Furtividade',
  survival: 'Sobrevivência',
  initiative: 'Iniciativa',
  // Adicione outras habilidades conforme necessário
};

/**
 * Obtém a tradução em português para um nome de habilidade (skill)
 * @param skillKey Chave da habilidade em inglês (camelCase)
 * @returns Nome traduzido da habilidade ou a própria chave se não encontrado
 */
export function getSkillNameTranslation(skillKey: string): string {
  return skillTranslations[skillKey] || skillKey;
}

/**
 * Mapeamento de atributos para nomes em português
 */
const attributeTranslations: Record<string, string> = {
  strength: 'Força',
  dexterity: 'Destreza',
  constitution: 'Constituição',
  intelligence: 'Inteligência',
  wisdom: 'Sabedoria',
  charisma: 'Carisma',
};

/**
 * Obtém a tradução em português para um nome de atributo
 * @param attributeKey Chave do atributo em inglês (lowercase)
 * @returns Nome traduzido do atributo ou a própria chave se não encontrado
 */
export function getAttributeNameTranslation(attributeKey: string): string {
  return attributeTranslations[attributeKey] || attributeKey;
}
