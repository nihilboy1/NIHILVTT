"use client";

import { useState } from "react";
import { CharacterCreationModal } from "./components/CharacterCreationModal";
import { CharacterSheet } from "./components/CharacterSheet";
import { LevelUpModal } from "./components/LevelUpModal";
import { type PlayerCharacter } from "./lib/character-schemas";

export default function App() {
  const [currentCharacter, setCurrentCharacter] = useState<PlayerCharacter | null>(null);
  const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const handleCharacterCreated = (character: PlayerCharacter) => {
    setCurrentCharacter(character);
    setIsCreationModalOpen(false);
  };

  const handleLevelUp = () => {
    setIsLevelUpModalOpen(true);
  };

  const handleLevelUpComplete = (updatedCharacter: PlayerCharacter) => {
    setCurrentCharacter(updatedCharacter);
    setIsLevelUpModalOpen(false);
  };

  const handleEdit = () => {
    setIsCreationModalOpen(true);
  };

  const handleNewCharacter = () => {
    setCurrentCharacter(null);
    setIsCreationModalOpen(true);
  };

  // Show character sheet if we have a character
  if (currentCharacter) {
    return (
      <>
        <CharacterSheet 
          character={currentCharacter}
          onLevelUp={handleLevelUp}
          onEdit={handleEdit}
        />
        
        {/* Level Up Modal */}
        {isLevelUpModalOpen && (
          <LevelUpModal 
            character={currentCharacter}
            isOpen={isLevelUpModalOpen}
            onClose={() => setIsLevelUpModalOpen(false)}
            onLevelUpComplete={handleLevelUpComplete}
          />
        )}
        
        {/* Edit Character Modal */}
        <CharacterCreationModal 
          isOpen={isCreationModalOpen}
          onClose={() => setIsCreationModalOpen(false)}
          onComplete={handleCharacterCreated}
        />
      </>
    );
  }

  // Show character creation landing page
  return (
    <div 
      className="min-h-screen flex items-center justify-center p-8"
      style={{ backgroundColor: 'var(--rpg-surface-0)' }}
    >
      <div className="text-center space-y-8">
        <div>
          <h1 
            className="text-4xl font-iceberg mb-4"
            style={{ color: 'var(--rpg-text-primary)' }}
          >
            D&D 2024 Character System
          </h1>
          <p 
            className="text-lg font-work-sans opacity-80 max-w-2xl mx-auto"
            style={{ color: 'var(--rpg-text-primary)' }}
          >
            Create and manage your D&D 2024 characters with accurate rules implementation for Human Fighter progression from level 1 to 3
          </p>
        </div>

        <button
          onClick={handleNewCharacter}
          className="px-8 py-4 rounded-lg transition-all font-iceberg text-lg hover:opacity-90 hover:scale-105"
          style={{ 
            backgroundColor: 'var(--rpg-accent-primary)',
            color: 'var(--rpg-text-primary)',
            border: `2px solid var(--rpg-accent-secondary)`
          }}
        >
          Create Human Fighter
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-6xl">
          <div 
            className="p-6 rounded-lg border"
            style={{ 
              backgroundColor: 'var(--rpg-surface-1)', 
              borderColor: 'var(--rpg-accent-secondary)',
              color: 'var(--rpg-text-primary)'
            }}
          >
            <h3 className="font-iceberg text-xl mb-3">D&D 2024 Rules</h3>
            <p className="font-work-sans opacity-80">
              Accurate implementation of D&D 2024 Player's Handbook rules including Human species traits, Fighter class features, and Soldier background.
            </p>
          </div>

          <div 
            className="p-6 rounded-lg border"
            style={{ 
              backgroundColor: 'var(--rpg-surface-1)', 
              borderColor: 'var(--rpg-accent-secondary)',
              color: 'var(--rpg-text-primary)'
            }}
          >
            <h3 className="font-iceberg text-xl mb-3">Fighter Progression</h3>
            <p className="font-work-sans opacity-80">
              Complete level progression from 1 to 3 with Fighting Styles, Action Surge, Tactical Mind, and Fighter Subclass selection.
            </p>
          </div>

          <div 
            className="p-6 rounded-lg border"
            style={{ 
              backgroundColor: 'var(--rpg-surface-1)', 
              borderColor: 'var(--rpg-accent-secondary)',
              color: 'var(--rpg-text-primary)'
            }}
          >
            <h3 className="font-iceberg text-xl mb-3">Accurate Calculations</h3>
            <p className="font-work-sans opacity-80">
              Proper ability modifiers, skill proficiencies, saving throws, and hit point calculations with level progression.
            </p>
          </div>
        </div>

        <div className="mt-12 p-6 rounded-lg border max-w-4xl mx-auto"
          style={{ 
            backgroundColor: 'var(--rpg-surface-1)', 
            borderColor: 'var(--rpg-accent-secondary)',
            color: 'var(--rpg-text-primary)'
          }}
        >
          <h3 className="font-iceberg text-xl mb-4">Features Included</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-work-sans">
            <div>
              <h4 className="font-iceberg opacity-90 mb-2">Human Traits</h4>
              <ul className="opacity-80 space-y-1">
                <li>• Resourceful</li>
                <li>• Skillful</li>
                <li>• Versatile</li>
                <li>• Size choice</li>
              </ul>
            </div>
            <div>
              <h4 className="font-iceberg opacity-90 mb-2">Fighter Features</h4>
              <ul className="opacity-80 space-y-1">
                <li>• Fighting Style</li>
                <li>• Second Wind</li>
                <li>• Action Surge</li>
                <li>• Weapon Mastery</li>
              </ul>
            </div>
            <div>
              <h4 className="font-iceberg opacity-90 mb-2">Soldier Background</h4>
              <ul className="opacity-80 space-y-1">
                <li>• Savage Attacker feat</li>
                <li>• Athletics & Intimidation</li>
                <li>• Gaming Set proficiency</li>
                <li>• Military equipment</li>
              </ul>
            </div>
            <div>
              <h4 className="font-iceberg opacity-90 mb-2">Level 3 Subclasses</h4>
              <ul className="opacity-80 space-y-1">
                <li>• Champion</li>
                <li>• Battle Master</li>
                <li>• Eldritch Knight</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <CharacterCreationModal 
        isOpen={isCreationModalOpen}
        onClose={() => setIsCreationModalOpen(false)}
        onComplete={handleCharacterCreated}
      />
    </div>
  );
}