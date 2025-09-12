/**
 * Mapeamento de habilidades (skills) para nomes em português
 */
const skillTranslations: Record<string, string> = {
  acrobatics: 'Acrobacia',
  animalHandling: 'Adestrar Animais',
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
 * Mapeamento de ferramentas para nomes em português
 */
const toolTranslations: Record<string, string> = {
  'tool-calligraphers-supplies': 'Kit de Caligrafia',
  'tool-thieves-tools': 'Ferramentas de Ladrão',
  'tool-herbalism-kit': 'Kit de Herbalismo',
  'tool-navigators-tools': 'Ferramentas de Navegação',
  'tool-smiths-tools': 'Ferramentas de Ferreiro',
  'tool-carpenters-tools': 'Ferramentas de Carpinteiro',
  'tool-masons-tools': 'Ferramentas de Pedreiro',
  'tool-disguise-kit': 'Kit de Disfarce',
  'tool-forgery-kit': 'Kit de Falsificação',
  'tool-gaming-set': 'Conjunto de Jogo',
  'tool-musical-instrument': 'Instrumento Musical',
  // Adicione outras ferramentas conforme necessário
};

/**
 * Obtém a tradução em português para um nome de ferramenta
 * @param toolKey Chave da ferramenta em inglês
 * @returns Nome traduzido da ferramenta ou a própria chave se não encontrado
 */
export function getToolNameTranslation(toolKey: string): string {
  return toolTranslations[toolKey] || toolKey;
}

/**
 * Mapeamento de tipos de proficiência para nomes em português
 */
const proficiencyTypeTranslations: Record<string, string> = {
  skill: 'Perícia',
  tool: 'Ferramenta',
  weaponType: 'Tipo de Arma',
  armorType: 'Tipo de Armadura',
  musicalInstrument: 'Instrumento Musical',
  savingThrow: 'Teste de Resistência',
};

/**
 * Obtém a tradução em português para um tipo de proficiência
 * @param proficiencyType Tipo de proficiência em inglês
 * @returns Nome traduzido do tipo ou a própria chave se não encontrado
 */
export function getProficiencyTypeTranslation(proficiencyType: string): string {
  return proficiencyTypeTranslations[proficiencyType] || proficiencyType;
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
