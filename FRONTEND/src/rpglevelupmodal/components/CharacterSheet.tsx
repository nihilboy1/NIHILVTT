"use client";

import React from 'react';
import { Heart, Shield, Zap, User, Sword, BookOpen, Dices, TrendingUp, Edit, Eye, Star, Target, Wind, Package, Coins, ArmorIcon as Armor } from 'lucide-react';
import { 
  type PlayerCharacter,
  getAbilityModifier,
  getProficiencyBonus,
  calculateArmorClass,
  fightingStyles
} from '../lib/character-schemas';

interface CharacterSheetProps {
  character: PlayerCharacter;
  onLevelUp: () => void;
  onEdit: () => void;
}

export function CharacterSheet({ character, onLevelUp, onEdit }: CharacterSheetProps) {
  const getSkillModifier = (skill: string, ability: keyof typeof character.attributes): number => {
    const abilityMod = getAbilityModifier(character.attributes[ability]);
    const proficiency = character.proficiencies.skills[skill as keyof typeof character.proficiencies.skills];
    const profBonus = getProficiencyBonus(character.level);
    
    if (proficiency === 'proficient') return abilityMod + profBonus;
    if (proficiency === 'expertise') return abilityMod + (profBonus * 2);
    return abilityMod;
  };

  const getSavingThrowModifier = (ability: keyof typeof character.attributes): number => {
    const abilityMod = getAbilityModifier(character.attributes[ability]);
    const proficiency = character.proficiencies.savingThrows[ability];
    const profBonus = getProficiencyBonus(character.level);
    
    if (proficiency === 'proficient') return abilityMod + profBonus;
    if (proficiency === 'expertise') return abilityMod + (profBonus * 2);
    return abilityMod;
  };

  const formatModifier = (modifier: number): string => {
    return modifier >= 0 ? `+${modifier}` : `${modifier}`;
  };

  const getEquipmentByType = (type: string) => {
    return character.equipment?.filter(item => item.type === type) || [];
  };

  const getTotalGold = () => {
    const goldItems = character.equipment?.filter(item => 
      item.type === 'currency' && item.currency === 'gp'
    ) || [];
    return goldItems.reduce((total, item) => total + (item.value || 0), 0);
  };

  const getEquippedArmor = () => {
    return character.equipment?.find(item => 
      item.type === 'armor' && item.equipped && item.armorType !== 'shield'
    );
  };

  const getEquippedShield = () => {
    return character.equipment?.find(item => 
      item.type === 'armor' && item.equipped && item.armorType === 'shield'
    );
  };

  const renderAttributeCard = (attribute: keyof typeof character.attributes, icon: React.ReactNode) => {
    const score = character.attributes[attribute];
    const modifier = getAbilityModifier(score);
    const savingThrow = getSavingThrowModifier(attribute);
    const isPrimaryAbility = (character.charClass === 'Fighter' && (attribute === 'strength' || attribute === 'dexterity'));

    return (
      <div 
        className={`p-4 rounded-lg border text-center ${isPrimaryAbility ? 'ring-1' : ''}`}
        style={{ 
          backgroundColor: 'var(--rpg-surface-0)', 
          borderColor: 'var(--rpg-accent-secondary)',
          color: 'var(--rpg-text-primary)',
          ringColor: isPrimaryAbility ? 'var(--rpg-positive)' : undefined
        }}
      >
        <div 
          className="p-2 rounded-md mx-auto mb-2 w-fit"
          style={{ backgroundColor: isPrimaryAbility ? 'var(--rpg-positive)' : 'var(--rpg-accent-primary)' }}
        >
          {icon}
        </div>
        <h3 className="font-iceberg text-sm mb-1 capitalize">{attribute}</h3>
        <div 
          className="text-xl font-iceberg mb-1"
          style={{ color: 'var(--rpg-accent-secondary)' }}
        >
          {score}
        </div>
        <div className="text-sm font-work-sans opacity-80">
          {formatModifier(modifier)}
        </div>
        <div className="text-xs font-work-sans opacity-60 mt-1">
          Save: {formatModifier(savingThrow)}
          {character.proficiencies.savingThrows[attribute] === 'proficient' && 
            <span className="ml-1" style={{ color: 'var(--rpg-positive)' }}>●</span>
          }
        </div>
      </div>
    );
  };

  const skillsList: Array<{key: string, label: string, ability: keyof typeof character.attributes}> = [
    { key: 'acrobatics', label: 'Acrobatics', ability: 'dexterity' },
    { key: 'animalHandling', label: 'Animal Handling', ability: 'wisdom' },
    { key: 'arcana', label: 'Arcana', ability: 'intelligence' },
    { key: 'athletics', label: 'Athletics', ability: 'strength' },
    { key: 'deception', label: 'Deception', ability: 'charisma' },
    { key: 'history', label: 'History', ability: 'intelligence' },
    { key: 'insight', label: 'Insight', ability: 'wisdom' },
    { key: 'intimidation', label: 'Intimidation', ability: 'charisma' },
    { key: 'investigation', label: 'Investigation', ability: 'intelligence' },
    { key: 'medicine', label: 'Medicine', ability: 'wisdom' },
    { key: 'nature', label: 'Nature', ability: 'intelligence' },
    { key: 'perception', label: 'Perception', ability: 'wisdom' },
    { key: 'performance', label: 'Performance', ability: 'charisma' },
    { key: 'persuasion', label: 'Persuasion', ability: 'charisma' },
    { key: 'religion', label: 'Religion', ability: 'intelligence' },
    { key: 'sleightOfHand', label: 'Sleight of Hand', ability: 'dexterity' },
    { key: 'stealth', label: 'Stealth', ability: 'dexterity' },
    { key: 'survival', label: 'Survival', ability: 'wisdom' }
  ];

  return (
    <div 
      className="min-h-screen p-6"
      style={{ backgroundColor: 'var(--rpg-surface-0)' }}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div 
          className="p-6 rounded-lg border"
          style={{ 
            backgroundColor: 'var(--rpg-surface-1)', 
            borderColor: 'var(--rpg-accent-secondary)',
            color: 'var(--rpg-text-primary)'
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div 
                className="p-3 rounded-md"
                style={{ backgroundColor: 'var(--rpg-accent-primary)' }}
              >
                <User className="w-8 h-8" />
              </div>
              <div>
                <h1 className="font-iceberg text-3xl">{character.name}</h1>
                <p className="font-work-sans text-lg opacity-80">
                  Level {character.level} {character.species} {character.charClass}
                </p>
                {character.subclass && (
                  <p className="font-work-sans text-base opacity-60">
                    {character.subclass} Archetype
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onEdit}
                className="px-4 py-2 rounded-lg transition-all font-iceberg hover:bg-opacity-10"
                style={{ 
                  backgroundColor: 'transparent',
                  color: 'var(--rpg-text-primary)',
                  border: `1px solid var(--rpg-accent-secondary)`
                }}
              >
                <Edit className="w-4 h-4 mr-2 inline" />
                Edit
              </button>
              <button
                onClick={onLevelUp}
                className="px-4 py-2 rounded-lg transition-all font-iceberg hover:opacity-90"
                style={{ 
                  backgroundColor: 'var(--rpg-positive)',
                  color: 'var(--rpg-surface-0)'
                }}
              >
                <TrendingUp className="w-4 h-4 mr-2 inline" />
                Level Up
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <div>
              <span className="font-iceberg text-sm opacity-80">Background:</span>
              <p className="font-work-sans">{character.background}</p>
            </div>
            <div>
              <span className="font-iceberg text-sm opacity-80">Size:</span>
              <p className="font-work-sans">{character.size}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-iceberg text-sm opacity-80">Inspiration:</span>
              {character.inspiration ? (
                <Star className="w-4 h-4" style={{ color: 'var(--rpg-positive)' }} />
              ) : (
                <Star className="w-4 h-4 opacity-30" />
              )}
            </div>
            <div>
              <span className="font-iceberg text-sm opacity-80">Proficiency Bonus:</span>
              <p className="font-work-sans">+{getProficiencyBonus(character.level)}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Attributes & Combat */}
          <div className="space-y-6">
            {/* Attributes */}
            <div 
              className="p-6 rounded-lg border"
              style={{ 
                backgroundColor: 'var(--rpg-surface-1)', 
                borderColor: 'var(--rpg-accent-secondary)',
                color: 'var(--rpg-text-primary)'
              }}
            >
              <h2 className="font-iceberg text-xl mb-4">Ability Scores</h2>
              <div className="grid grid-cols-2 gap-3">
                {renderAttributeCard('strength', <Sword className="w-5 h-5" />)}
                {renderAttributeCard('dexterity', <Zap className="w-5 h-5" />)}
                {renderAttributeCard('constitution', <Heart className="w-5 h-5" />)}
                {renderAttributeCard('intelligence', <BookOpen className="w-5 h-5" />)}
                {renderAttributeCard('wisdom', <Eye className="w-5 h-5" />)}
                {renderAttributeCard('charisma', <Star className="w-5 h-5" />)}
              </div>
            </div>

            {/* Combat Stats */}
            <div 
              className="p-6 rounded-lg border"
              style={{ 
                backgroundColor: 'var(--rpg-surface-1)', 
                borderColor: 'var(--rpg-accent-secondary)',
                color: 'var(--rpg-text-primary)'
              }}
            >
              <h2 className="font-iceberg text-xl mb-4">Combat Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg"
                  style={{ backgroundColor: 'var(--rpg-surface-0)' }}
                >
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5" style={{ color: 'var(--rpg-positive)' }} />
                    <span className="font-iceberg">Hit Points</span>
                  </div>
                  <span className="font-work-sans">
                    {character.combatStats.currentHp} / {character.combatStats.maxHp}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg"
                  style={{ backgroundColor: 'var(--rpg-surface-0)' }}
                >
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5" style={{ color: 'var(--rpg-accent-secondary)' }} />
                    <div>
                      <span className="font-iceberg">Armor Class</span>
                      {getEquippedArmor() && (
                        <div className="text-xs opacity-60 font-work-sans">
                          {getEquippedArmor()?.name}
                          {getEquippedShield() && ` + ${getEquippedShield()?.name}`}
                          {character.fightingStyle === 'defense' && getEquippedArmor() && ' + Defense'}
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="font-work-sans">{character.combatStats.armorClass}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg"
                  style={{ backgroundColor: 'var(--rpg-surface-0)' }}
                >
                  <div className="flex items-center gap-3">
                    <Wind className="w-5 h-5" style={{ color: 'var(--rpg-accent-primary)' }} />
                    <span className="font-iceberg">Speed</span>
                  </div>
                  <span className="font-work-sans">{character.combatStats.speed} ft</span>
                </div>
              </div>
            </div>

            {/* Hit Dice */}
            <div 
              className="p-6 rounded-lg border"
              style={{ 
                backgroundColor: 'var(--rpg-surface-1)', 
                borderColor: 'var(--rpg-accent-secondary)',
                color: 'var(--rpg-text-primary)'
              }}
            >
              <h2 className="font-iceberg text-xl mb-4">Hit Dice</h2>
              <div className="space-y-2">
                {character.hitDiceEntries.map((entry) => (
                  <div 
                    key={entry.id}
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ backgroundColor: 'var(--rpg-surface-0)' }}
                  >
                    <div className="flex items-center gap-3">
                      <Dices className="w-5 h-5" style={{ color: 'var(--rpg-accent-primary)' }} />
                      <span className="font-iceberg">{entry.type}</span>
                    </div>
                    <span className="font-work-sans">{entry.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Class Resources */}
            <div 
              className="p-6 rounded-lg border"
              style={{ 
                backgroundColor: 'var(--rpg-surface-1)', 
                borderColor: 'var(--rpg-accent-secondary)',
                color: 'var(--rpg-text-primary)'
              }}
            >
              <h2 className="font-iceberg text-xl mb-4">Class Resources</h2>
              <div className="space-y-3">
                {character.secondWindUses && (
                  <div className="flex items-center justify-between p-3 rounded-lg"
                    style={{ backgroundColor: 'var(--rpg-surface-0)' }}
                  >
                    <div className="flex items-center gap-3">
                      <Heart className="w-5 h-5" style={{ color: 'var(--rpg-positive)' }} />
                      <span className="font-iceberg">Second Wind</span>
                    </div>
                    <span className="font-work-sans">
                      {character.secondWindUses.current} / {character.secondWindUses.max}
                    </span>
                  </div>
                )}
                
                {character.actionSurgeUses && (
                  <div className="flex items-center justify-between p-3 rounded-lg"
                    style={{ backgroundColor: 'var(--rpg-surface-0)' }}
                  >
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5" style={{ color: 'var(--rpg-accent-primary)' }} />
                      <span className="font-iceberg">Action Surge</span>
                    </div>
                    <span className="font-work-sans">
                      {character.actionSurgeUses.current} / {character.actionSurgeUses.max}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Middle Column - Skills */}
          <div 
            className="p-6 rounded-lg border"
            style={{ 
              backgroundColor: 'var(--rpg-surface-1)', 
              borderColor: 'var(--rpg-accent-secondary)',
              color: 'var(--rpg-text-primary)'
            }}
          >
            <h2 className="font-iceberg text-xl mb-4">Skills</h2>
            <div className="space-y-2">
              {skillsList.map((skill) => {
                const modifier = getSkillModifier(skill.key, skill.ability);
                const proficiency = character.proficiencies.skills[skill.key as keyof typeof character.proficiencies.skills];
                
                return (
                  <div 
                    key={skill.key}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-opacity-50 transition-all"
                    style={{ backgroundColor: 'var(--rpg-surface-0)' }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{
                        backgroundColor: proficiency === 'none' ? 'transparent' : 
                                        proficiency === 'proficient' ? 'var(--rpg-accent-secondary)' : 
                                        'var(--rpg-positive)',
                        border: proficiency === 'none' ? '1px solid var(--rpg-accent-secondary)' : 'none'
                      }} />
                      <span className="font-work-sans text-sm">{skill.label}</span>
                      <span className="font-work-sans text-xs opacity-60 uppercase">
                        ({skill.ability.substring(0, 3)})
                      </span>
                    </div>
                    <span className="font-work-sans text-sm">{formatModifier(modifier)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Features & Equipment */}
          <div className="space-y-6">
            {/* Equipment */}
            <div 
              className="p-6 rounded-lg border"
              style={{ 
                backgroundColor: 'var(--rpg-surface-1)', 
                borderColor: 'var(--rpg-accent-secondary)',
                color: 'var(--rpg-text-primary)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-iceberg text-xl">Equipment</h2>
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4" style={{ color: 'var(--rpg-positive)' }} />
                  <span className="font-work-sans text-sm">{getTotalGold()} GP</span>
                </div>
              </div>

              {/* Weapons */}
              {getEquipmentByType('weapon').length > 0 && (
                <div className="mb-4">
                  <h3 className="font-iceberg text-base mb-2 flex items-center gap-2">
                    <Sword className="w-4 h-4" />
                    Weapons
                  </h3>
                  <div className="space-y-2">
                    {getEquipmentByType('weapon').map((item) => (
                      <div 
                        key={item.id}
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: 'var(--rpg-surface-0)' }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-work-sans text-sm">
                              {item.quantity > 1 ? `${item.quantity}x ` : ''}{item.name}
                            </span>
                            {item.damage && (
                              <div className="text-xs opacity-60 font-work-sans">
                                {item.damage} {item.damageType} • {item.weaponType}
                                {item.range && ` • Range: ${item.range}`}
                              </div>
                            )}
                          </div>
                          {item.properties && item.properties.length > 0 && (
                            <div className="text-xs opacity-60">
                              {item.properties.join(', ')}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Armor */}
              {getEquipmentByType('armor').length > 0 && (
                <div className="mb-4">
                  <h3 className="font-iceberg text-base mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Armor & Shields
                  </h3>
                  <div className="space-y-2">
                    {getEquipmentByType('armor').map((item) => (
                      <div 
                        key={item.id}
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: 'var(--rpg-surface-0)' }}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-work-sans text-sm">
                              {item.name}
                              {item.equipped && (
                                <span className="ml-2 px-1 py-0.5 rounded text-xs" style={{ backgroundColor: 'var(--rpg-positive)', color: 'var(--rpg-surface-0)' }}>
                                  Equipped
                                </span>
                              )}
                            </span>
                            {item.armorClass && (
                              <div className="text-xs opacity-60 font-work-sans">
                                AC {item.armorClass} • {item.armorType} armor
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Other Gear */}
              {(getEquipmentByType('gear').length > 0 || getEquipmentByType('tool').length > 0 || getEquipmentByType('consumable').length > 0) && (
                <div className="mb-4">
                  <h3 className="font-iceberg text-base mb-2 flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Gear & Tools
                  </h3>
                  <div className="space-y-2">
                    {[...getEquipmentByType('gear'), ...getEquipmentByType('tool'), ...getEquipmentByType('consumable')].map((item) => (
                      <div 
                        key={item.id}
                        className="p-3 rounded-lg"
                        style={{ backgroundColor: 'var(--rpg-surface-0)' }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-work-sans text-sm">
                            {item.quantity > 1 ? `${item.quantity}x ` : ''}{item.name}
                          </span>
                          <span className="text-xs opacity-60 capitalize">{item.type}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Class Features */}
            <div 
              className="p-6 rounded-lg border"
              style={{ 
                backgroundColor: 'var(--rpg-surface-1)', 
                borderColor: 'var(--rpg-accent-secondary)',
                color: 'var(--rpg-text-primary)'
              }}
            >
              <h2 className="font-iceberg text-xl mb-4">Class Features</h2>
              <div className="space-y-4">
                {character.classFeatures?.map((feature) => (
                  <div 
                    key={feature.id}
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: 'var(--rpg-surface-0)' }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-iceberg text-base">{feature.name}</h3>
                      {feature.uses && (
                        <span className="px-2 py-1 rounded text-xs font-work-sans" 
                          style={{ backgroundColor: 'var(--rpg-accent-primary)', color: 'var(--rpg-text-primary)' }}>
                          {feature.uses.current}/{feature.uses.max}
                        </span>
                      )}
                    </div>
                    <p className="font-work-sans text-sm opacity-80 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}

                {/* Fighting Style */}
                {character.fightingStyle && (
                  <div 
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: 'var(--rpg-surface-0)' }}
                  >
                    <h3 className="font-iceberg text-base mb-2">
                      Fighting Style: {fightingStyles[character.fightingStyle].name}
                    </h3>
                    <p className="font-work-sans text-sm opacity-80 leading-relaxed">
                      {fightingStyles[character.fightingStyle].description}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Feats */}
            {character.feats && character.feats.length > 0 && (
              <div 
                className="p-6 rounded-lg border"
                style={{ 
                  backgroundColor: 'var(--rpg-surface-1)', 
                  borderColor: 'var(--rpg-accent-secondary)',
                  color: 'var(--rpg-text-primary)'
                }}
              >
                <h2 className="font-iceberg text-xl mb-4">Feats</h2>
                <div className="space-y-4">
                  {character.feats.map((feat) => (
                    <div 
                      key={feat.id}
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: 'var(--rpg-surface-0)' }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-iceberg text-base">{feat.name}</h3>
                        <span className="px-2 py-1 rounded text-xs font-work-sans" 
                          style={{ backgroundColor: 'var(--rpg-positive)', color: 'var(--rpg-surface-0)' }}>
                          {feat.source}
                        </span>
                      </div>
                      <p className="font-work-sans text-sm opacity-80 leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Species Traits */}
            <div 
              className="p-6 rounded-lg border"
              style={{ 
                backgroundColor: 'var(--rpg-surface-1)', 
                borderColor: 'var(--rpg-accent-secondary)',
                color: 'var(--rpg-text-primary)'
              }}
            >
              <h2 className="font-iceberg text-xl mb-4">Species Traits</h2>
              <div className="space-y-4">
                <div 
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: 'var(--rpg-surface-0)' }}
                >
                  <h3 className="font-iceberg text-base mb-2">Resourceful</h3>
                  <p className="font-work-sans text-sm opacity-80 leading-relaxed">
                    You gain Heroic Inspiration whenever you finish a Long Rest.
                  </p>
                </div>
                
                <div 
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: 'var(--rpg-surface-0)' }}
                >
                  <h3 className="font-iceberg text-base mb-2">Skillful</h3>
                  <p className="font-work-sans text-sm opacity-80 leading-relaxed">
                    You gain proficiency in one skill of your choice.
                  </p>
                </div>
                
                <div 
                  className="p-4 rounded-lg"
                  style={{ backgroundColor: 'var(--rpg-surface-0)' }}
                >
                  <h3 className="font-iceberg text-base mb-2">Versatile</h3>
                  <p className="font-work-sans text-sm opacity-80 leading-relaxed">
                    You gain an Origin feat of your choice.
                  </p>
                </div>
              </div>
            </div>

            {/* Background Feature */}
            <div 
              className="p-6 rounded-lg border"
              style={{ 
                backgroundColor: 'var(--rpg-surface-1)', 
                borderColor: 'var(--rpg-accent-secondary)',
                color: 'var(--rpg-text-primary)'
              }}
            >
              <h2 className="font-iceberg text-xl mb-4">Background Feature</h2>
              <div 
                className="p-4 rounded-lg"
                style={{ backgroundColor: 'var(--rpg-surface-0)' }}
              >
                <h3 className="font-iceberg text-base mb-2">Military Rank</h3>
                <p className="font-work-sans text-sm opacity-80 leading-relaxed">
                  You have a military rank from your career as a soldier. Soldiers loyal to your former military organization still recognize your authority and influence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}