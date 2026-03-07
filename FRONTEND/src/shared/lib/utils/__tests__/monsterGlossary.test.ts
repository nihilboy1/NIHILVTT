import {
  convertFeetToMetersDisplay,
  replaceFeetTokensWithMeters,
  translateMonsterListToPtBr,
  translateMonsterTermToPtBr,
  translateSpeedSummaryToPtBr,
} from '@/shared/lib/utils/monsterGlossary';

describe('monsterGlossary', () => {
  it('traduz termos canonicos de monstro para PT-BR', () => {
    expect(translateMonsterTermToPtBr('forest')).toBe('Floresta');
    expect(translateMonsterTermToPtBr('darkvision')).toBe('Visao no escuro');
    expect(translateMonsterTermToPtBr('trueNeutral')).toBe('Neutro verdadeiro');
    expect(translateMonsterTermToPtBr('piercing')).toBe('Perfurante');
  });

  it('traduz listas canonicas para PT-BR', () => {
    expect(translateMonsterListToPtBr(['common', 'any'])).toBe('Comum, Qualquer');
    expect(
      translateMonsterListToPtBr([
        'blinded',
        'charmed',
        'deafened',
        'grappled',
        'frightened',
        'invisible',
        'paralyzed',
        'petrified',
        'poisoned',
        'prone',
        'restrained',
        'stunned',
        'unconscious',
      ]),
    ).toBe(
      'Cego, Enfeiticado, Surdo, Agarrado, Amedrontado, Invisivel, Paralisado, Petrificado, Envenenado, Caido, Contido, Atordoado, Inconsciente',
    );
    expect(translateMonsterTermToPtBr('paralysed')).toBe('Paralisado');
  });

  it('traduz resumo de velocidade para PT-BR', () => {
    expect(translateSpeedSummaryToPtBr('walk 20ft, climb 10ft')).toBe(
      'Deslocamento 6m, Escalada 3m',
    );
  });

  it('converte feet para metros para exibicao de UI', () => {
    expect(convertFeetToMetersDisplay(5)).toBe('1.5m');
    expect(replaceFeetTokensWithMeters('alcance 30ft')).toBe('alcance 9m');
  });

  it('falha cedo quando termo nao esta no glossario canonico', () => {
    expect(() => translateMonsterTermToPtBr('unknownTerm')).toThrow(
      'Violacao de contrato de glossario',
    );
  });
});
