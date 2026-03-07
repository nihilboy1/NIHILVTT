import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import type { MonsterNpcCharacter } from '@/entities/character/model/schemas/character.schema';
import { MonsterSheetContent } from '@/widgets/characterSheet/monsterNpcSheet/MonsterSheetContent';

function buildMonsterCharacter(): MonsterNpcCharacter {
  return {
    id: '7fdf8ef4-f6e5-4f38-a903-3f6cb6abbbe5',
    type: 'NPC',
    name: 'Arbusto Desperto',
    image: 'https://i.imgur.com/Tpbf6Zf.png',
    monsterSheetImage: 'https://i.imgur.com/5ly1RRh.png',
    size: 'small',
    notes: 'Despertado por magia, este arbusto ganhou senciencia e a capacidade de se mover.',
    source: 'MM2024',
    hitPointsFormula: '3d6',
    monsterType: 'plant',
    alignment: 'trueNeutral',
    environments: ['forest'],
    languages: ['common', 'any'],
    isFamiliar: false,
    speedSummary: 'walk 20ft',
    senses: {
      passivePerception: 10,
      vision: {
        darkvision: 60,
        blindsight: 30,
      },
    },
    defenses: {
      resistances: ['piercing'],
      vulnerabilities: ['fire'],
      damageImmunities: ['poison'],
      conditionImmunities: ['poisoned'],
    },
    attributes: {
      strength: 3,
      dexterity: 8,
      constitution: 11,
      intelligence: 10,
      wisdom: 10,
      charisma: 6,
    },
    proficiencies: {
      savingThrows: {
        strength: 'none',
        dexterity: 'none',
        constitution: 'none',
        intelligence: 'none',
        wisdom: 'none',
        charisma: 'none',
      },
      skills: {
        acrobatics: 'none',
        animalHandling: 'none',
        arcana: 'none',
        athletics: 'none',
        deception: 'none',
        history: 'none',
        insight: 'none',
        intimidation: 'none',
        investigation: 'none',
        medicine: 'none',
        nature: 'none',
        perception: 'none',
        performance: 'none',
        persuasion: 'none',
        religion: 'none',
        sleightOfHand: 'none',
        stealth: 'none',
        survival: 'none',
      },
    },
    combatStats: {
      maxHp: 10,
      currentHp: 10,
      tempHp: 0,
      armorClass: 9,
      speed: 6,
      shieldEquipped: false,
    },
    actions: [
      {
        id: 'f32d3d5a-bdf9-47d0-a699-d9882f9ffb4a',
        actionId: 'act-attack',
        name: 'Rastrar',
        bonus: 1,
        damage: '1',
        damageType: 'slashing',
        rangeMeters: 1.5,
      },
    ],
    attacks: [],
    equipment: [],
    featuresAndTraits: [
      {
        id: '2d588e69-c601-4491-9f2b-f6ef3f9813e0',
        name: 'Aparencia Falsa',
        description: 'Enquanto permanece imovel, e indistinguivel de um arbusto normal.',
      },
    ],
    challengeRating: 0,
  };
}

describe('MonsterSheetContent', () => {
  it('renderiza os blocos informativos completos do monstro', () => {
    render(<MonsterSheetContent character={buildMonsterCharacter()} />);

    expect(screen.getByText('Informacoes de monstro')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Arbusto Desperto' })).toHaveAttribute(
      'src',
      'https://i.imgur.com/5ly1RRh.png',
    );
    const typeBadge = screen.getByText('Planta');
    const alignmentBadge = screen.getByText('Neutro verdadeiro');
    expect(typeBadge).toBeInTheDocument();
    expect(typeBadge).toHaveClass('monster-badge-tone-type-plant');
    expect(alignmentBadge).toBeInTheDocument();
    expect(alignmentBadge).toHaveClass('monster-badge-tone-alignment-trueneutral');
    expect(screen.getByText('MM2024')).toBeInTheDocument();
    expect(screen.getByText('10/10 (3d6)')).toBeInTheDocument();
    expect(screen.getByText('Deslocamento 6m')).toBeInTheDocument();
    const environmentBadge = screen.getByText('Floresta');
    expect(environmentBadge).toBeInTheDocument();
    expect(environmentBadge).toHaveClass('monster-badge-tone-environment-forest');
    expect(screen.getByText('Comum, Qualquer')).toBeInTheDocument();
    expect(screen.getByText('Nao')).toBeInTheDocument();
    const passiveBadge = screen.getByText('Percepção passiva: 10');
    const darkvisionBadge = screen.getByText('Visao no escuro: 18m');
    const blindsightBadge = screen.getByText('Percepcao as cegas: 9m');
    expect(passiveBadge).toBeInTheDocument();
    expect(passiveBadge).toHaveClass('monster-badge-tone-sense-passive');
    expect(darkvisionBadge).toBeInTheDocument();
    expect(darkvisionBadge).toHaveClass('monster-badge-tone-sense-darkvision');
    expect(blindsightBadge).toBeInTheDocument();
    expect(blindsightBadge).toHaveClass('monster-badge-tone-sense-blindsight');
    expect(screen.getByText('Perfurante')).toBeInTheDocument();
    expect(screen.getByText('Fogo')).toBeInTheDocument();
    expect(screen.getByText('Envenenado')).toBeInTheDocument();
  });
});
