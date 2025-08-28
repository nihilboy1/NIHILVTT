"use client";

import React, { useState } from 'react';
import { X, Sword, Heart, Zap, Shield, Target, TrendingUp, Plus } from 'lucide-react';
import { 
  type PlayerCharacter,
  classDefinitions,
  getAbilityModifier,
  calculateHitPointsAtLevel,
  getProficiencyBonus
} from '../lib/character-schemas';

interface LevelUpStep {
  id: string;
  title: string;
  completed: boolean;
}

interface LevelUpModalProps {
  character: PlayerCharacter;
  isOpen: boolean;
  onClose: () => void;
  onLevelUpComplete: (updatedCharacter: PlayerCharacter) => void;
}

// Fighter Subclasses
const fighterSubclasses = {
  champion: {
    name: 'Champion',
    description: 'The archetypal Champion focuses on the development of raw physical power honed to deadly perfection.',
    features: {
      3: {
        name: 'Improved Critical',
        description: 'Your weapon attacks score a critical hit on a roll of 19 or 20.'
      }
    }
  },
  battle_master: {
    name: 'Battle Master',
    description: 'Battle Masters employ martial techniques passed down through generations.',
    features: {
      3: {
        name: 'Combat Superiority',
        description: 'You gain 4 superiority dice (d8) and learn 3 maneuvers. You regain superiority dice on a Short or Long Rest.'
      }
    }
  },
  eldritch_knight: {
    name: 'Eldritch Knight',
    description: 'Eldritch Knights combine martial prowess with magical ability.',
    features: {
      3: {
        name: 'Spellcasting',
        description: 'You gain the ability to cast spells. You know 2 cantrips and have 2 1st-level spell slots.'
      }
    }
  }
};

export function LevelUpModal({ character, isOpen, onClose, onLevelUpComplete }: LevelUpModalProps) {
  const [currentStep, setCurrentStep] = useState('hitpoints');
  const [hpGain, setHpGain] = useState(0);
  const [selectedSubclass, setSelectedSubclass] = useState<string | null>(null);
  const [newWeaponMastery, setNewWeaponMastery] = useState<string | null>(null);

  const targetLevel = character.level + 1;
  const canLevelUp = targetLevel <= 20;

  if (!canLevelUp) {
    return null; // Character is already max level
  }

  const steps: LevelUpStep[] = [
    { id: 'hitpoints', title: 'Hit Points', completed: hpGain > 0 },
    { id: 'features', title: 'Class Features', completed: targetLevel !== 3 || !!selectedSubclass },
    { id: 'summary', title: 'Summary', completed: false }
  ];

  const rollHitPoints = () => {
    // For Fighter: 1d10 + Con modifier
    const constitutionModifier = getAbilityModifier(character.attributes.constitution);
    const roll = Math.floor(Math.random() * 10) + 1; // 1d10
    const total = roll + constitutionModifier;
    setHpGain(Math.max(1, total)); // Minimum 1 HP gain
  };

  const takeAverageHitPoints = () => {
    // For Fighter: 6 (average of d10) + Con modifier
    const constitutionModifier = getAbilityModifier(character.attributes.constitution);
    const total = 6 + constitutionModifier;
    setHpGain(Math.max(1, total)); // Minimum 1 HP gain
  };

  const completeLevelUp = () => {
    const updatedCharacter: PlayerCharacter = {
      ...character,
      level: targetLevel,
      combatStats: {
        ...character.combatStats,
        maxHp: character.combatStats.maxHp + hpGain,
        currentHp: character.combatStats.currentHp + hpGain
      }
    };

    // Add new class features based on level
    const newFeatures = [...(character.classFeatures || [])];

    if (targetLevel === 2) {
      // Add Action Surge and Tactical Mind
      newFeatures.push(
        {
          id: crypto.randomUUID(),
          name: 'Action Surge',
          description: 'You can take one additional action on your turn. Once per Short or Long Rest.',
          level: 2,
          uses: {
            current: 1,
            max: 1,
            per: 'short-rest' as const
          }
        },
        {
          id: crypto.randomUUID(),
          name: 'Tactical Mind',
          description: 'When you fail an ability check, you can expend a use of Second Wind to add 1d10 to the check.',
          level: 2
        }
      );

      updatedCharacter.actionSurgeUses = {
        current: 1,
        max: 1
      };
    }

    if (targetLevel === 3 && selectedSubclass) {
      // Add Subclass feature
      const subclassData = fighterSubclasses[selectedSubclass as keyof typeof fighterSubclasses];
      newFeatures.push({
        id: crypto.randomUUID(),
        name: subclassData.features[3].name,
        description: subclassData.features[3].description,
        level: 3
      });

      updatedCharacter.subclass = subclassData.name;
    }

    updatedCharacter.classFeatures = newFeatures;

    // Add new hit dice
    const newHitDiceEntries = [...character.hitDiceEntries];
    newHitDiceEntries[0] = {
      ...newHitDiceEntries[0],
      quantity: targetLevel
    };
    updatedCharacter.hitDiceEntries = newHitDiceEntries;

    onLevelUpComplete(updatedCharacter);
  };

  const renderContent = () => {
    switch (currentStep) {
      case 'hitpoints':
        return (
          <div className="space-y-6">
            <h2 className="font-iceberg text-2xl" style={{ color: 'var(--rpg-text-primary)' }}>
              Increase Hit Points
            </h2>
            <p className="font-work-sans text-sm opacity-80" style={{ color: 'var(--rpg-text-primary)' }}>
              Choose how to determine your hit point increase for level {targetLevel}.
            </p>
            
            <div className="grid grid-cols-1 gap-4">
              <div 
                className="p-6 rounded-lg border cursor-pointer transition-all hover:border-[var(--rpg-accent-secondary)]"
                style={{ 
                  backgroundColor: 'var(--rpg-surface-0)', 
                  borderColor: 'var(--rpg-accent-secondary)',
                  color: 'var(--rpg-text-primary)'
                }}
                onClick={rollHitPoints}
              >
                <div className="flex items-center gap-4">
                  <Heart className="w-8 h-8" style={{ color: 'var(--rpg-positive)' }} />
                  <div>
                    <h3 className="font-iceberg text-lg">Roll for Hit Points</h3>
                    <p className="font-work-sans text-sm opacity-80">
                      Roll 1d10 + {getAbilityModifier(character.attributes.constitution)} (Constitution modifier)
                    </p>
                  </div>
                </div>
              </div>

              <div 
                className="p-6 rounded-lg border cursor-pointer transition-all hover:border-[var(--rpg-accent-secondary)]"
                style={{ 
                  backgroundColor: 'var(--rpg-surface-0)', 
                  borderColor: 'var(--rpg-accent-secondary)',
                  color: 'var(--rpg-text-primary)'
                }}
                onClick={takeAverageHitPoints}
              >
                <div className="flex items-center gap-4">
                  <Shield className="w-8 h-8" style={{ color: 'var(--rpg-accent-secondary)' }} />
                  <div>
                    <h3 className="font-iceberg text-lg">Take Average</h3>
                    <p className="font-work-sans text-sm opacity-80">
                      Gain {6 + getAbilityModifier(character.attributes.constitution)} hit points (6 + Constitution modifier)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {hpGain > 0 && (
              <div 
                className="p-4 rounded-lg border"
                style={{ 
                  backgroundColor: 'var(--rpg-positive)', 
                  borderColor: 'var(--rpg-positive)',
                  color: 'var(--rpg-surface-0)'
                }}
              >
                <div className="flex items-center gap-3">
                  <Plus className="w-6 h-6" />
                  <span className="font-iceberg text-lg">You gained {hpGain} hit points!</span>
                </div>
              </div>
            )}
          </div>
        );
      
      case 'features':
        if (targetLevel === 2) {
          return (
            <div className="space-y-6">
              <h2 className="font-iceberg text-2xl" style={{ color: 'var(--rpg-text-primary)' }}>
                Level 2 Features
              </h2>
              <div className="space-y-4">
                <div 
                  className="p-6 rounded-lg border"
                  style={{ 
                    backgroundColor: 'var(--rpg-surface-0)', 
                    borderColor: 'var(--rpg-accent-secondary)',
                    color: 'var(--rpg-text-primary)'
                  }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <Zap className="w-8 h-8" style={{ color: 'var(--rpg-accent-primary)' }} />
                    <h3 className="font-iceberg text-xl">Action Surge</h3>
                  </div>
                  <p className="font-work-sans text-sm opacity-80 leading-relaxed mb-4">
                    You can push yourself beyond your normal limits for a moment. On your turn, you can take one additional action, except the Magic action.
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded text-sm font-work-sans" style={{ backgroundColor: 'var(--rpg-accent-secondary)', color: 'var(--rpg-surface-0)' }}>
                      1 use per Short/Long Rest
                    </span>
                  </div>
                </div>

                <div 
                  className="p-6 rounded-lg border"
                  style={{ 
                    backgroundColor: 'var(--rpg-surface-0)', 
                    borderColor: 'var(--rpg-accent-secondary)',
                    color: 'var(--rpg-text-primary)'
                  }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <Target className="w-8 h-8" style={{ color: 'var(--rpg-accent-secondary)' }} />
                    <h3 className="font-iceberg text-xl">Tactical Mind</h3>
                  </div>
                  <p className="font-work-sans text-sm opacity-80 leading-relaxed">
                    You have a mind for tactics on and off the battlefield. When you fail an ability check, you can expend a use of your Second Wind to push yourself toward success. Rather than regaining Hit Points, you roll 1d10 and add the number rolled to the ability check, potentially turning it into a success.
                  </p>
                </div>
              </div>
            </div>
          );
        }

        if (targetLevel === 3) {
          return (
            <div className="space-y-6">
              <h2 className="font-iceberg text-2xl" style={{ color: 'var(--rpg-text-primary)' }}>
                Choose Fighter Subclass
              </h2>
              <p className="font-work-sans text-sm opacity-80" style={{ color: 'var(--rpg-text-primary)' }}>
                At 3rd level, you choose an archetype that defines your fighting style.
              </p>
              
              <div className="grid grid-cols-1 gap-4">
                {Object.entries(fighterSubclasses).map(([key, subclass]) => (
                  <div
                    key={key}
                    className={`p-6 rounded-lg border cursor-pointer transition-all ${selectedSubclass === key ? 'ring-2' : 'hover:border-[var(--rpg-accent-secondary)]'}`}
                    style={{ 
                      backgroundColor: 'var(--rpg-surface-0)', 
                      borderColor: selectedSubclass === key ? 'var(--rpg-accent-primary)' : 'var(--rpg-accent-secondary)',
                      ringColor: selectedSubclass === key ? 'var(--rpg-accent-primary)' : undefined,
                      color: 'var(--rpg-text-primary)'
                    }}
                    onClick={() => setSelectedSubclass(key)}
                  >
                    <h3 className="font-iceberg text-xl mb-3">{subclass.name}</h3>
                    <p className="font-work-sans text-sm opacity-80 leading-relaxed mb-4">
                      {subclass.description}
                    </p>
                    <div 
                      className="p-4 rounded-lg"
                      style={{ backgroundColor: 'var(--rpg-surface-1)' }}
                    >
                      <h4 className="font-iceberg text-base mb-2">{subclass.features[3].name}</h4>
                      <p className="font-work-sans text-sm opacity-80">
                        {subclass.features[3].description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        return (
          <div className="space-y-6">
            <h2 className="font-iceberg text-2xl" style={{ color: 'var(--rpg-text-primary)' }}>
              Level {targetLevel} Features
            </h2>
            <p className="font-work-sans text-sm opacity-80" style={{ color: 'var(--rpg-text-primary)' }}>
              No new features at this level.
            </p>
          </div>
        );
      
      case 'summary':
      default:
        return (
          <div className="space-y-6">
            <h2 className="font-iceberg text-2xl" style={{ color: 'var(--rpg-text-primary)' }}>
              Level Up Summary
            </h2>
            
            <div className="space-y-4">
              <div 
                className="p-4 rounded-lg border"
                style={{ 
                  backgroundColor: 'var(--rpg-surface-0)', 
                  borderColor: 'var(--rpg-accent-secondary)',
                  color: 'var(--rpg-text-primary)'
                }}
              >
                <h3 className="font-iceberg text-lg mb-2">Character Advancement</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-work-sans">Level:</span>
                    <span className="font-work-sans">{character.level} → {targetLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-work-sans">Hit Points:</span>
                    <span className="font-work-sans">{character.combatStats.maxHp} → {character.combatStats.maxHp + hpGain}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-work-sans">Proficiency Bonus:</span>
                    <span className="font-work-sans">+{getProficiencyBonus(character.level)} → +{getProficiencyBonus(targetLevel)}</span>
                  </div>
                  {targetLevel === 3 && selectedSubclass && (
                    <div className="flex justify-between">
                      <span className="font-work-sans">Subclass:</span>
                      <span className="font-work-sans">{fighterSubclasses[selectedSubclass as keyof typeof fighterSubclasses].name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* New Features Summary */}
              {(targetLevel === 2 || (targetLevel === 3 && selectedSubclass)) && (
                <div 
                  className="p-4 rounded-lg border"
                  style={{ 
                    backgroundColor: 'var(--rpg-surface-0)', 
                    borderColor: 'var(--rpg-positive)',
                    color: 'var(--rpg-text-primary)'
                  }}
                >
                  <h3 className="font-iceberg text-lg mb-2">New Features</h3>
                  <div className="space-y-2">
                    {targetLevel === 2 && (
                      <>
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4" style={{ color: 'var(--rpg-accent-primary)' }} />
                          <span className="font-work-sans text-sm">Action Surge</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4" style={{ color: 'var(--rpg-accent-secondary)' }} />
                          <span className="font-work-sans text-sm">Tactical Mind</span>
                        </div>
                      </>
                    )}
                    {targetLevel === 3 && selectedSubclass && (
                      <div className="flex items-center gap-2">
                        <Sword className="w-4 h-4" style={{ color: 'var(--rpg-positive)' }} />
                        <span className="font-work-sans text-sm">
                          {fighterSubclasses[selectedSubclass as keyof typeof fighterSubclasses].features[3].name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
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
        className="relative w-full max-w-6xl max-h-[90vh] rounded-xl border overflow-hidden"
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
            Level Up: {character.name} (Level {character.level} → {targetLevel})
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
          <div 
            className="w-80 p-6 border-r"
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
          {currentStep === 'summary' && (
            <button
              onClick={completeLevelUp}
              disabled={!hpGain || (targetLevel === 3 && !selectedSubclass)}
              className="px-6 py-2 rounded-lg transition-all font-iceberg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: 'var(--rpg-positive)',
                color: 'var(--rpg-surface-0)'
              }}
            >
              <TrendingUp className="w-4 h-4 mr-2 inline" />
              Complete Level Up
            </button>
          )}
        </div>
      </div>
    </div>
  );
}