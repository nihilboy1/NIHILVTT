"use client";

import React, { useState, useMemo } from 'react';
import { X, Users, Sword, BookOpen, Dices, Crown, Shield, Zap, Eye, User, Target, Swords, Crosshair, Package, Coins } from 'lucide-react';
import { 
  type PlayerCharacter, 
  type FightingStyle,
  type EquipmentItem,
  speciesDefinitions,
  classDefinitions,
  backgroundDefinitions,
  fightingStyles,
  fighterStartingEquipment,
  soldierBackgroundEquipment,
  getAbilityModifier,
  calculateHitPointsAtLevel,
  calculateArmorClass
} from '../lib/character-schemas';

interface CharacterStep {
  id: string;
  title: string;
  completed: boolean;
}

interface CharacterCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (character: PlayerCharacter) => void;
}

export function CharacterCreationModal({ isOpen, onClose, onComplete }: CharacterCreationModalProps) {
  const [currentStep, setCurrentStep] = useState('species');
  const [characterName, setCharacterName] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedBackground, setSelectedBackground] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<'Medium' | 'Small'>('Medium');
  const [selectedFightingStyle, setSelectedFightingStyle] = useState<FightingStyle | null>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedHumanSkill, setSelectedHumanSkill] = useState<string | null>(null);
  const [selectedClassEquipment, setSelectedClassEquipment] = useState<'A' | 'B' | 'C' | null>(null);
  const [selectedBackgroundEquipment, setSelectedBackgroundEquipment] = useState<'A' | 'B' | null>(null);
  const [abilityScores, setAbilityScores] = useState({
    strength: 15,
    dexterity: 14,
    constitution: 13,
    intelligence: 12,
    wisdom: 10,
    charisma: 8
  });

  const steps: CharacterStep[] = useMemo(() => [
    { id: 'species', title: 'Species', completed: !!selectedSpecies },
    { id: 'class', title: 'Class', completed: !!selectedClass },
    { id: 'background', title: 'Background', completed: !!selectedBackground },
    { id: 'fighting-style', title: 'Fighting Style', completed: !!selectedFightingStyle },
    { id: 'equipment', title: 'Equipment', completed: !!selectedClassEquipment && !!selectedBackgroundEquipment },
    { id: 'skills', title: 'Skills', completed: selectedSkills.length >= 2 && !!selectedHumanSkill },
    { id: 'abilities', title: 'Ability Scores', completed: true }
  ], [selectedSpecies, selectedClass, selectedBackground, selectedFightingStyle, selectedClassEquipment, selectedBackgroundEquipment, selectedSkills, selectedHumanSkill]);

  const generateEquipment = (): EquipmentItem[] => {
    const equipment: EquipmentItem[] = [];
    
    // Add class equipment
    if (selectedClassEquipment) {
      const classEquipment = fighterStartingEquipment[`option${selectedClassEquipment}` as keyof typeof fighterStartingEquipment];
      classEquipment.forEach((item: any) => {
        equipment.push({
          id: crypto.randomUUID(),
          name: item.name,
          type: item.type as any,
          quantity: item.quantity || 1,
          equipped: item.type === 'armor' && item.armorType !== 'shield',
          weight: item.weight,
          properties: item.properties,
          armorClass: item.armorClass,
          armorType: item.armorType as any,
          damage: item.damage,
          damageType: item.damageType,
          weaponType: item.weaponType as any,
          range: item.range,
          value: item.value,
          currency: item.currency as any
        });
      });
    }
    
    // Add background equipment
    if (selectedBackgroundEquipment) {
      const backgroundEquipment = soldierBackgroundEquipment[`option${selectedBackgroundEquipment}` as keyof typeof soldierBackgroundEquipment];
      backgroundEquipment.forEach((item: any) => {
        // Don't duplicate items (like arrows, quiver)
        const existingItem = equipment.find(e => e.name === item.name);
        if (existingItem && item.quantity) {
          existingItem.quantity += item.quantity;
        } else if (!existingItem) {
          equipment.push({
            id: crypto.randomUUID(),
            name: item.name,
            type: item.type as any,
            quantity: item.quantity || 1,
            equipped: false,
            weight: item.weight,
            properties: item.properties,
            armorClass: item.armorClass,
            armorType: item.armorType as any,
            damage: item.damage,
            damageType: item.damageType,
            weaponType: item.weaponType as any,
            range: item.range,
            value: item.value,
            currency: item.currency as any
          });
        }
      });
    }
    
    return equipment;
  };

  const generateCharacter = (): PlayerCharacter => {
    const constitutionModifier = getAbilityModifier(abilityScores.constitution);
    const maxHp = calculateHitPointsAtLevel('fighter', 1, constitutionModifier);
    const equipment = generateEquipment();

    // Set up skill proficiencies
    const skillProficiencies: Record<string, 'none' | 'proficient' | 'expertise'> = {
      acrobatics: 'none', animalHandling: 'none', arcana: 'none', athletics: 'none',
      deception: 'none', history: 'none', insight: 'none', intimidation: 'none',
      investigation: 'none', medicine: 'none', nature: 'none', perception: 'none',
      performance: 'none', persuasion: 'none', religion: 'none', sleightOfHand: 'none',
      stealth: 'none', survival: 'none'
    };

    // Background skills (Soldier)
    skillProficiencies.athletics = 'proficient';
    skillProficiencies.intimidation = 'proficient';

    // Class skills (Fighter - 2 choices)
    selectedSkills.forEach(skill => {
      if (skillProficiencies[skill as keyof typeof skillProficiencies] !== undefined) {
        skillProficiencies[skill as keyof typeof skillProficiencies] = 'proficient';
      }
    });

    // Human skill (1 additional choice)
    if (selectedHumanSkill && skillProficiencies[selectedHumanSkill as keyof typeof skillProficiencies] !== undefined) {
      skillProficiencies[selectedHumanSkill as keyof typeof skillProficiencies] = 'proficient';
    }

    // Set up saving throw proficiencies (Fighter)
    const savingThrowProficiencies: Record<string, 'none' | 'proficient' | 'expertise'> = {
      strength: 'proficient',
      dexterity: 'none',
      constitution: 'proficient',
      intelligence: 'none',
      wisdom: 'none',
      charisma: 'none'
    };

    // Calculate AC based on equipment
    const tempCharacter = {
      attributes: abilityScores,
      equipment,
      fightingStyle: selectedFightingStyle
    };
    const armorClass = calculateArmorClass(tempCharacter);

    return {
      id: crypto.randomUUID(),
      name: characterName || 'New Fighter',
      image: '/placeholder-character.jpg',
      size: selectedSize,
      notes: '',
      type: 'Player',
      level: 1,
      inspiration: true, // Humans gain Heroic Inspiration on Long Rest
      species: 'Human',
      charClass: 'Fighter',
      background: 'Soldier',
      attributes: abilityScores,
      proficiencies: {
        savingThrows: savingThrowProficiencies as any,
        skills: skillProficiencies as any
      },
      combatStats: {
        maxHp,
        currentHp: maxHp,
        armorClass,
        speed: 30
      },
      hitDiceEntries: [{
        id: crypto.randomUUID(),
        type: 'd10',
        quantity: 1
      }],
      equipment,
      fightingStyle: selectedFightingStyle || undefined,
      weaponMasteries: [], // Will be selected later
      secondWindUses: {
        current: 2,
        max: 2
      },
      classFeatures: [
        {
          id: crypto.randomUUID(),
          name: 'Fighting Style',
          description: fightingStyles[selectedFightingStyle || 'defense'].description,
          level: 1
        },
        {
          id: crypto.randomUUID(),
          name: 'Second Wind',
          description: 'As a Bonus Action, you can regain 1d10 + 1 Hit Points. You can use this feature twice, regaining uses on Short or Long Rest.',
          level: 1,
          uses: {
            current: 2,
            max: 2,
            per: 'short-rest'
          }
        },
        {
          id: crypto.randomUUID(),
          name: 'Weapon Mastery',
          description: 'You can use the mastery properties of 3 kinds of Simple or Martial weapons.',
          level: 1
        }
      ],
      feats: [
        {
          id: crypto.randomUUID(),
          name: 'Savage Attacker',
          description: 'Once per turn when you roll damage for a melee weapon attack, you can reroll the weapon\'s damage dice and use either total.',
          source: 'Soldier Background'
        }
      ]
    };
  };

  const canCreateCharacter = () => {
    return selectedSpecies && selectedClass && selectedBackground && 
           selectedFightingStyle && selectedClassEquipment && selectedBackgroundEquipment &&
           selectedSkills.length >= 2 && selectedHumanSkill;
  };

  const handleCreateCharacter = () => {
    if (canCreateCharacter()) {
      const character = generateCharacter();
      onComplete(character);
    }
  };

  const availableFighterSkills = [
    'acrobatics', 'animalHandling', 'athletics', 'history', 
    'insight', 'intimidation', 'persuasion', 'perception', 'survival'
  ];

  const availableHumanSkills = [
    'acrobatics', 'animalHandling', 'arcana', 'athletics', 'deception', 'history',
    'insight', 'intimidation', 'investigation', 'medicine', 'nature', 'perception',
    'performance', 'persuasion', 'religion', 'sleightOfHand', 'stealth', 'survival'
  ].filter(skill => 
    skill !== 'athletics' && // Already from background
    skill !== 'intimidation' && // Already from background
    !selectedSkills.includes(skill) // Not already selected for Fighter
  );

  const renderEquipmentOption = (option: any[], optionLabel: string, isSelected: boolean, onSelect: () => void) => (
    <div
      className={`p-4 rounded-lg border cursor-pointer transition-all ${isSelected ? 'ring-2' : 'hover:border-[var(--rpg-accent-secondary)]'}`}
      style={{ 
        backgroundColor: 'var(--rpg-surface-0)', 
        borderColor: isSelected ? 'var(--rpg-accent-primary)' : 'var(--rpg-accent-secondary)',
        ringColor: isSelected ? 'var(--rpg-accent-primary)' : undefined,
        color: 'var(--rpg-text-primary)'
      }}
      onClick={onSelect}
    >
      <h4 className="font-iceberg text-base mb-3">Option {optionLabel}</h4>
      <div className="space-y-1">
        {option.map((item: any, index: number) => (
          <div key={index} className="flex justify-between text-sm font-work-sans">
            <span>{item.quantity && item.quantity > 1 ? `${item.quantity}x ` : ''}{item.name}</span>
            {item.armorClass && <span className="opacity-60">AC {item.armorClass}</span>}
            {item.damage && <span className="opacity-60">{item.damage} {item.damageType}</span>}
          </div>
        ))}
      </div>
    </div>
  );

  const renderCharacterSummary = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div 
            className="p-2 rounded-md"
            style={{ backgroundColor: 'var(--rpg-accent-primary)' }}
          >
            <User className="w-5 h-5" />
          </div>
          <h2 className="font-iceberg text-xl" style={{ color: 'var(--rpg-text-primary)' }}>
            Character Summary
          </h2>
        </div>

        {/* Character Name Input */}
        <div>
          <label className="font-iceberg text-sm opacity-80" style={{ color: 'var(--rpg-text-primary)' }}>
            Character Name
          </label>
          <input
            type="text"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            placeholder="Enter character name"
            className="w-full mt-1 px-3 py-2 rounded-lg border font-work-sans"
            style={{
              backgroundColor: 'var(--rpg-surface-0)',
              borderColor: 'var(--rpg-accent-secondary)',
              color: 'var(--rpg-text-primary)'
            }}
          />
        </div>

        {/* Character Build Summary */}
        {selectedSpecies && (
          <div 
            className="p-4 rounded-lg border"
            style={{ 
              backgroundColor: 'var(--rpg-surface-0)', 
              borderColor: 'var(--rpg-accent-secondary)',
              color: 'var(--rpg-text-primary)'
            }}
          >
            <h3 className="font-iceberg text-base mb-2">Build Overview</h3>
            <div className="space-y-1 text-sm font-work-sans opacity-80">
              <div>Species: {selectedSpecies}</div>
              <div>Class: {selectedClass}</div>
              <div>Background: {selectedBackground}</div>
              <div>Size: {selectedSize}</div>
              {selectedFightingStyle && <div>Fighting Style: {fightingStyles[selectedFightingStyle].name}</div>}
              {selectedClassEquipment && <div>Class Equipment: Option {selectedClassEquipment}</div>}
              {selectedBackgroundEquipment && <div>Background Equipment: Option {selectedBackgroundEquipment}</div>}
            </div>
          </div>
        )}

        {/* Equipment Preview */}
        {selectedClassEquipment && selectedBackgroundEquipment && (
          <div 
            className="p-4 rounded-lg border"
            style={{ 
              backgroundColor: 'var(--rpg-surface-0)', 
              borderColor: 'var(--rpg-accent-secondary)',
              color: 'var(--rpg-text-primary)'
            }}
          >
            <h3 className="font-iceberg text-base mb-2">Starting Equipment</h3>
            <div className="max-h-24 overflow-y-auto">
              {generateEquipment().map((item, index) => (
                <div key={index} className="text-sm font-work-sans opacity-80 flex justify-between">
                  <span>{item.quantity > 1 ? `${item.quantity}x ` : ''}{item.name}</span>
                  {item.armorClass && <span>AC {item.armorClass}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ability Scores Preview */}
        <div 
          className="p-4 rounded-lg border"
          style={{ 
            backgroundColor: 'var(--rpg-surface-0)', 
            borderColor: 'var(--rpg-accent-secondary)',
            color: 'var(--rpg-text-primary)'
          }}
        >
          <h3 className="font-iceberg text-base mb-2">Ability Scores</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {Object.entries(abilityScores).map(([ability, score]) => (
              <div key={ability} className="flex justify-between">
                <span className="capitalize font-work-sans">{ability}:</span>
                <span className="font-work-sans">{score} ({getAbilityModifier(score) >= 0 ? '+' : ''}{getAbilityModifier(score)})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Summary */}
        {(selectedSkills.length > 0 || selectedHumanSkill) && (
          <div 
            className="p-4 rounded-lg border"
            style={{ 
              backgroundColor: 'var(--rpg-surface-0)', 
              borderColor: 'var(--rpg-accent-secondary)',
              color: 'var(--rpg-text-primary)'
            }}
          >
            <h3 className="font-iceberg text-base mb-2">Skill Proficiencies</h3>
            <div className="flex flex-wrap gap-1">
              <span className="px-2 py-1 rounded text-xs font-work-sans" style={{ backgroundColor: 'var(--rpg-accent-secondary)', color: 'var(--rpg-surface-0)' }}>
                Athletics (Background)
              </span>
              <span className="px-2 py-1 rounded text-xs font-work-sans" style={{ backgroundColor: 'var(--rpg-accent-secondary)', color: 'var(--rpg-surface-0)' }}>
                Intimidation (Background)
              </span>
              {selectedSkills.map(skill => (
                <span key={skill} className="px-2 py-1 rounded text-xs font-work-sans capitalize" style={{ backgroundColor: 'var(--rpg-accent-primary)', color: 'var(--rpg-text-primary)' }}>
                  {skill.replace(/([A-Z])/g, ' $1').trim()} (Class)
                </span>
              ))}
              {selectedHumanSkill && (
                <span className="px-2 py-1 rounded text-xs font-work-sans capitalize" style={{ backgroundColor: 'var(--rpg-positive)', color: 'var(--rpg-surface-0)' }}>
                  {selectedHumanSkill.replace(/([A-Z])/g, ' $1').trim()} (Human)
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch (currentStep) {
      case 'species':
        return (
          <div className="space-y-6">
            <h2 className="font-iceberg text-2xl" style={{ color: 'var(--rpg-text-primary)' }}>
              Choose Your Species
            </h2>
            
            <div className="grid grid-cols-1 gap-4">
              <div
                className={`p-6 rounded-lg border cursor-pointer transition-all ${selectedSpecies === 'Human' ? 'ring-2' : 'hover:border-[var(--rpg-accent-secondary)]'}`}
                style={{ 
                  backgroundColor: 'var(--rpg-surface-0)', 
                  borderColor: selectedSpecies === 'Human' ? 'var(--rpg-accent-primary)' : 'var(--rpg-accent-secondary)',
                  ringColor: selectedSpecies === 'Human' ? 'var(--rpg-accent-primary)' : undefined,
                  color: 'var(--rpg-text-primary)'
                }}
                onClick={() => setSelectedSpecies('Human')}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div style={{ backgroundColor: 'var(--rpg-accent-primary)' }} className="p-3 rounded-md">
                    <Crown className="w-6 h-6" />
                  </div>
                  <h3 className="font-iceberg text-xl">Human</h3>
                </div>
                <p className="font-work-sans text-sm opacity-80 mb-4 leading-relaxed">
                  {speciesDefinitions.human.description}
                </p>
                <div className="space-y-2">
                  <h4 className="font-iceberg text-sm">Species Traits:</h4>
                  <div className="flex flex-wrap gap-2">
                    {speciesDefinitions.human.traits.map(trait => (
                      <span key={trait.name} className="px-3 py-1 rounded text-sm font-work-sans" style={{ backgroundColor: 'var(--rpg-accent-secondary)', color: 'var(--rpg-surface-0)' }}>
                        {trait.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Size Selection */}
            {selectedSpecies === 'Human' && (
              <div className="mt-6">
                <h3 className="font-iceberg text-lg mb-3" style={{ color: 'var(--rpg-text-primary)' }}>Choose Your Size</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['Medium', 'Small'].map(size => (
                    <div
                      key={size}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedSize === size ? 'ring-2' : 'hover:border-[var(--rpg-accent-secondary)]'}`}
                      style={{ 
                        backgroundColor: 'var(--rpg-surface-0)', 
                        borderColor: selectedSize === size ? 'var(--rpg-accent-primary)' : 'var(--rpg-accent-secondary)',
                        ringColor: selectedSize === size ? 'var(--rpg-accent-primary)' : undefined,
                        color: 'var(--rpg-text-primary)'
                      }}
                      onClick={() => setSelectedSize(size as 'Medium' | 'Small')}
                    >
                      <h4 className="font-iceberg text-base">{size}</h4>
                      <p className="font-work-sans text-sm opacity-80">
                        {size === 'Medium' ? '4-7 feet tall' : '2-4 feet tall'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'class':
        return (
          <div className="space-y-6">
            <h2 className="font-iceberg text-2xl" style={{ color: 'var(--rpg-text-primary)' }}>
              Choose Your Class
            </h2>
            
            <div className="grid grid-cols-1 gap-4">
              <div
                className={`p-6 rounded-lg border cursor-pointer transition-all ${selectedClass === 'Fighter' ? 'ring-2' : 'hover:border-[var(--rpg-accent-secondary)]'}`}
                style={{ 
                  backgroundColor: 'var(--rpg-surface-0)', 
                  borderColor: selectedClass === 'Fighter' ? 'var(--rpg-accent-primary)' : 'var(--rpg-accent-secondary)',
                  ringColor: selectedClass === 'Fighter' ? 'var(--rpg-accent-primary)' : undefined,
                  color: 'var(--rpg-text-primary)'
                }}
                onClick={() => setSelectedClass('Fighter')}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div style={{ backgroundColor: 'var(--rpg-accent-primary)' }} className="p-3 rounded-md">
                    <Sword className="w-6 h-6" />
                  </div>
                  <h3 className="font-iceberg text-xl">Fighter</h3>
                </div>
                <p className="font-work-sans text-sm opacity-80 mb-4 leading-relaxed">
                  {classDefinitions.fighter.description}
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="font-iceberg opacity-90">Hit Die: </span>
                    <span className="font-work-sans">{classDefinitions.fighter.hitDie}</span>
                  </div>
                  <div>
                    <span className="font-iceberg opacity-90">Primary Ability: </span>
                    <span className="font-work-sans">{classDefinitions.fighter.primaryAbility.join(' or ')}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-iceberg text-sm">Proficiencies:</h4>
                  <div className="text-sm font-work-sans opacity-80">
                    <div>Weapons: Simple and Martial weapons</div>
                    <div>Armor: Light, Medium, and Heavy armor and Shields</div>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-iceberg text-sm mb-2">Level 1 Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {classDefinitions.fighter.features[1].map(feature => (
                      <span key={feature.name} className="px-3 py-1 rounded text-sm font-work-sans" style={{ backgroundColor: 'var(--rpg-accent-secondary)', color: 'var(--rpg-surface-0)' }}>
                        {feature.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'background':
        return (
          <div className="space-y-6">
            <h2 className="font-iceberg text-2xl" style={{ color: 'var(--rpg-text-primary)' }}>
              Choose Your Background
            </h2>
            
            <div className="grid grid-cols-1 gap-4">
              <div
                className={`p-6 rounded-lg border cursor-pointer transition-all ${selectedBackground === 'Soldier' ? 'ring-2' : 'hover:border-[var(--rpg-accent-secondary)]'}`}
                style={{ 
                  backgroundColor: 'var(--rpg-surface-0)', 
                  borderColor: selectedBackground === 'Soldier' ? 'var(--rpg-accent-primary)' : 'var(--rpg-accent-secondary)',
                  ringColor: selectedBackground === 'Soldier' ? 'var(--rpg-accent-primary)' : undefined,
                  color: 'var(--rpg-text-primary)'
                }}
                onClick={() => setSelectedBackground('Soldier')}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div style={{ backgroundColor: 'var(--rpg-accent-primary)' }} className="p-3 rounded-md">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="font-iceberg text-xl">Soldier</h3>
                </div>
                <p className="font-work-sans text-sm opacity-80 mb-4 leading-relaxed">
                  {backgroundDefinitions.soldier.description}
                </p>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-iceberg text-sm mb-2">Skill Proficiencies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {backgroundDefinitions.soldier.skillProficiencies.map(skill => (
                        <span key={skill} className="px-3 py-1 rounded text-sm font-work-sans capitalize" style={{ backgroundColor: 'var(--rpg-accent-secondary)', color: 'var(--rpg-surface-0)' }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-iceberg text-sm mb-2">Feat:</h4>
                    <span className="px-3 py-1 rounded text-sm font-work-sans" style={{ backgroundColor: 'var(--rpg-positive)', color: 'var(--rpg-surface-0)' }}>
                      {backgroundDefinitions.soldier.feat}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'fighting-style':
        return (
          <div className="space-y-6">
            <h2 className="font-iceberg text-2xl" style={{ color: 'var(--rpg-text-primary)' }}>
              Choose Your Fighting Style
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(fightingStyles).map(([key, style]) => {
                const icons = {
                  defense: <Shield className="w-6 h-6" />,
                  dueling: <Sword className="w-6 h-6" />,
                  'great-weapon-fighting': <Swords className="w-6 h-6" />,
                  archery: <Target className="w-6 h-6" />,
                  protection: <Shield className="w-6 h-6" />,
                  'two-weapon-fighting': <Swords className="w-6 h-6" />
                };

                return (
                  <div
                    key={key}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedFightingStyle === key ? 'ring-2' : 'hover:border-[var(--rpg-accent-secondary)]'}`}
                    style={{ 
                      backgroundColor: 'var(--rpg-surface-0)', 
                      borderColor: selectedFightingStyle === key ? 'var(--rpg-accent-primary)' : 'var(--rpg-accent-secondary)',
                      ringColor: selectedFightingStyle === key ? 'var(--rpg-accent-primary)' : undefined,
                      color: 'var(--rpg-text-primary)'
                    }}
                    onClick={() => setSelectedFightingStyle(key as FightingStyle)}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div style={{ backgroundColor: 'var(--rpg-accent-primary)' }} className="p-2 rounded-md">
                        {icons[key as keyof typeof icons]}
                      </div>
                      <h3 className="font-iceberg text-base">{style.name}</h3>
                    </div>
                    <p className="font-work-sans text-sm opacity-80 leading-relaxed">
                      {style.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'equipment':
        return (
          <div className="space-y-8">
            <h2 className="font-iceberg text-2xl" style={{ color: 'var(--rpg-text-primary)' }}>
              Choose Your Starting Equipment
            </h2>
            
            {/* Fighter Equipment */}
            <div>
              <h3 className="font-iceberg text-lg mb-4" style={{ color: 'var(--rpg-text-primary)' }}>
                Fighter Starting Equipment
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {renderEquipmentOption(
                  fighterStartingEquipment.optionA,
                  'A',
                  selectedClassEquipment === 'A',
                  () => setSelectedClassEquipment('A')
                )}
                {renderEquipmentOption(
                  fighterStartingEquipment.optionB,
                  'B',
                  selectedClassEquipment === 'B',
                  () => setSelectedClassEquipment('B')
                )}
                {renderEquipmentOption(
                  fighterStartingEquipment.optionC,
                  'C',
                  selectedClassEquipment === 'C',
                  () => setSelectedClassEquipment('C')
                )}
              </div>
            </div>

            {/* Background Equipment */}
            <div>
              <h3 className="font-iceberg text-lg mb-4" style={{ color: 'var(--rpg-text-primary)' }}>
                Soldier Background Equipment
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderEquipmentOption(
                  soldierBackgroundEquipment.optionA,
                  'A',
                  selectedBackgroundEquipment === 'A',
                  () => setSelectedBackgroundEquipment('A')
                )}
                {renderEquipmentOption(
                  soldierBackgroundEquipment.optionB,
                  'B',
                  selectedBackgroundEquipment === 'B',
                  () => setSelectedBackgroundEquipment('B')
                )}
              </div>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-6">
            <h2 className="font-iceberg text-2xl" style={{ color: 'var(--rpg-text-primary)' }}>
              Choose Your Skills
            </h2>
            
            {/* Fighter Skills */}
            <div>
              <h3 className="font-iceberg text-lg mb-3" style={{ color: 'var(--rpg-text-primary)' }}>
                Fighter Skills (Choose 2)
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {availableFighterSkills.map(skill => (
                  <div
                    key={skill}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedSkills.includes(skill) ? 'ring-2' : 'hover:border-[var(--rpg-accent-secondary)]'}`}
                    style={{ 
                      backgroundColor: 'var(--rpg-surface-0)', 
                      borderColor: selectedSkills.includes(skill) ? 'var(--rpg-accent-primary)' : 'var(--rpg-accent-secondary)',
                      ringColor: selectedSkills.includes(skill) ? 'var(--rpg-accent-primary)' : undefined,
                      color: 'var(--rpg-text-primary)'
                    }}
                    onClick={() => {
                      if (selectedSkills.includes(skill)) {
                        setSelectedSkills(prev => prev.filter(s => s !== skill));
                      } else if (selectedSkills.length < 2) {
                        setSelectedSkills(prev => [...prev, skill]);
                      }
                    }}
                  >
                    <span className="font-work-sans text-sm capitalize">
                      {skill.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Human Bonus Skill */}
            <div>
              <h3 className="font-iceberg text-lg mb-3" style={{ color: 'var(--rpg-text-primary)' }}>
                Human Bonus Skill (Choose 1)
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {availableHumanSkills.map(skill => (
                  <div
                    key={skill}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedHumanSkill === skill ? 'ring-2' : 'hover:border-[var(--rpg-accent-secondary)]'}`}
                    style={{ 
                      backgroundColor: 'var(--rpg-surface-0)', 
                      borderColor: selectedHumanSkill === skill ? 'var(--rpg-positive)' : 'var(--rpg-accent-secondary)',
                      ringColor: selectedHumanSkill === skill ? 'var(--rpg-positive)' : undefined,
                      color: 'var(--rpg-text-primary)'
                    }}
                    onClick={() => setSelectedHumanSkill(skill)}
                  >
                    <span className="font-work-sans text-sm capitalize">
                      {skill.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Already Proficient Skills */}
            <div>
              <h3 className="font-iceberg text-lg mb-3" style={{ color: 'var(--rpg-text-primary)' }}>
                Background Skills (Already Proficient)
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-2 rounded text-sm font-work-sans" style={{ backgroundColor: 'var(--rpg-accent-secondary)', color: 'var(--rpg-surface-0)' }}>
                  Athletics
                </span>
                <span className="px-3 py-2 rounded text-sm font-work-sans" style={{ backgroundColor: 'var(--rpg-accent-secondary)', color: 'var(--rpg-surface-0)' }}>
                  Intimidation
                </span>
              </div>
            </div>
          </div>
        );

      case 'abilities':
      default:
        return (
          <div className="space-y-6">
            <h2 className="font-iceberg text-2xl" style={{ color: 'var(--rpg-text-primary)' }}>
              Ability Scores
            </h2>
            <p className="font-work-sans text-sm opacity-80" style={{ color: 'var(--rpg-text-primary)' }}>
              These are the standard ability scores for a starting Fighter optimized for combat effectiveness.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {Object.entries(abilityScores).map(([ability, score]) => (
                <div
                  key={ability}
                  className="p-4 rounded-lg border"
                  style={{ 
                    backgroundColor: 'var(--rpg-surface-0)', 
                    borderColor: 'var(--rpg-accent-secondary)',
                    color: 'var(--rpg-text-primary)'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div style={{ backgroundColor: 'var(--rpg-accent-primary)' }} className="p-2 rounded-md">
                        <Dices className="w-5 h-5" />
                      </div>
                      <h3 className="font-iceberg capitalize">{ability}</h3>
                    </div>
                    <div>
                      <div style={{ backgroundColor: 'var(--rpg-accent-secondary)', color: 'var(--rpg-surface-0)' }} className="px-3 py-2 rounded text-lg font-iceberg">
                        {score}
                      </div>
                      <div className="text-xs font-work-sans opacity-60 text-center mt-1">
                        {getAbilityModifier(score) >= 0 ? '+' : ''}{getAbilityModifier(score)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 backdrop-blur-sm"
        style={{ backgroundColor: 'rgba(17, 17, 17, 0.8)' }}
        onClick={onClose}
      />
      
      <div 
        className="relative w-full max-w-7xl max-h-[90vh] rounded-xl border overflow-hidden"
        style={{ 
          backgroundColor: 'var(--rpg-surface-1)', 
          borderColor: 'var(--rpg-accent-secondary)' 
        }}
      >
        <div 
          className="flex items-center justify-between p-6 border-b"
          style={{ borderColor: 'var(--rpg-accent-secondary)' }}
        >
          <h1 className="font-iceberg text-2xl" style={{ color: 'var(--rpg-text-primary)' }}>
            Create Human Fighter
          </h1>
          <button
            onClick={onClose}
            className="p-2 rounded-full transition-all hover:bg-opacity-20"
            style={{ 
              backgroundColor: 'transparent',
              color: 'var(--rpg-text-primary)'
            }}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex h-[60vh]">
          {/* Left Navigation with Scroll */}
          <div 
            className="w-64 p-6 border-r overflow-y-auto"
            style={{ borderColor: 'var(--rpg-accent-secondary)' }}
          >
            <div className="space-y-3">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`w-full p-4 rounded-lg text-left transition-all font-iceberg flex items-center justify-between ${
                    currentStep === step.id ? '' : 'hover:bg-opacity-10'
                  }`}
                  style={{
                    backgroundColor: currentStep === step.id 
                      ? 'var(--rpg-accent-primary)' 
                      : 'transparent',
                    color: 'var(--rpg-text-primary)',
                  }}
                >
                  <span>{step.title}</span>
                  {step.completed && (
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: 'var(--rpg-positive)' }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            {renderContent()}
          </div>

          <div 
            className="w-80 p-6 border-l overflow-y-auto"
            style={{ borderColor: 'var(--rpg-accent-secondary)' }}
          >
            {renderCharacterSummary()}
          </div>
        </div>

        <div 
          className="flex items-center justify-end gap-4 p-6 border-t"
          style={{ borderColor: 'var(--rpg-accent-secondary)' }}
        >
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg transition-all font-iceberg hover:bg-opacity-10"
            style={{ 
              backgroundColor: 'transparent',
              color: 'var(--rpg-text-primary)',
              border: `1px solid var(--rpg-accent-secondary)`
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleCreateCharacter}
            disabled={!canCreateCharacter()}
            className="px-6 py-2 rounded-lg transition-all font-iceberg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              backgroundColor: 'var(--rpg-positive)',
              color: 'var(--rpg-surface-0)'
            }}
          >
            Create Character
          </button>
        </div>
      </div>
    </div>
  );
}