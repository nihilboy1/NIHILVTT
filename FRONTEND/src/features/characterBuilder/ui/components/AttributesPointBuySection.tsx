import { ATTRIBUTE_LIST } from '@/shared/constants/characterData/attributes';
import { BuilderButton } from '@/shared/ui/BuilderButton';
import { XMarkIcon } from '@/shared/ui/Icons';
import { Tooltip } from '@/shared/ui/Tooltip';

import { usePointBuy } from '../../model/hooks/usePointBuy';

import { AttributeSelector } from './AttributeSelector';

interface AttributesPointBuyProps {
  attributes: import('@/shared/constants/characterData/attributes').Attributes;
  onAttributesChange: (
    attributes: import('@/shared/constants/characterData/attributes').Attributes,
  ) => void;
}

export function AttributesPointBuySection({
  attributes,
  onAttributesChange,
}: AttributesPointBuyProps) {
  const {
    attributes: currentAttributes,
    remainingPoints,
    handleAttributeChange,
    handleReset,
  } = usePointBuy(attributes, onAttributesChange);

  return (
    <div className="flex flex-col space-y-8">
      {/* Seção de informações do Point Buy */}
      <div
        className="w-full rounded-lg border p-4"
        style={{ backgroundColor: 'var(--color-surface-1)', borderColor: 'var(--color-surface-2)' }}
      >
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-xl font-medium" style={{ color: 'var(--color-text-primary)' }}>
            Sistema Point Buy
          </h3>
          <div
            className="inline-flex items-center gap-2 rounded-sm px-4 py-2 font-medium"
            style={{
              backgroundColor:
                remainingPoints < 0
                  ? 'var(--color-feedback-negative)'
                  : remainingPoints === 0
                    ? 'var(--color-feedback-positive)'
                    : 'var(--color-accent-primary)',
              color: 'var(--color-surface-0)',
            }}
          >
            <span className="text-surface-0 text-sm">
              {remainingPoints < 0
                ? `${Math.abs(remainingPoints)} pontos excedidos`
                : remainingPoints === 0
                  ? `Todos os pontos usados!`
                  : `${remainingPoints} pontos restantes`}
            </span>
            {remainingPoints === 0 ? (
              <span className="text-surface-0">✓</span>
            ) : remainingPoints > 0 ? (
              <span className="text-surface-0">!</span>
            ) : (
              <XMarkIcon className="text-surface-0" size={1.5} />
            )}
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <p style={{ color: 'var(--color-text-secondary)' }}>
            <span className="font-bold">Você deve usar todos os 27 pontos</span> para distribuir
            entre seus atributos. Os valores começam em 8 (sem custo) e podem ir até 15.
          </p>
          <Tooltip
            content={
              <>
                <p className="mb-2 text-xs font-medium">
                  No sistema Point Buy, cada valor de atributo tem um custo específico em pontos:
                </p>
                <p className="text-xs">Valor 8 (mod -1): 0 pontos</p>
                <p className="text-xs">Valor 9 (mod -1): 1 ponto</p>
                <p className="text-xs">Valor 10 (mod +0): 2 pontos</p>
                <p className="text-xs">Valor 11 (mod +0): 3 pontos</p>
                <p className="text-xs">Valor 12 (mod +1): 4 pontos</p>
                <p className="text-xs">Valor 13 (mod +1): 5 pontos</p>
                <p className="text-xs">Valor 14 (mod +2): 7 pontos</p>
                <p className="text-xs">Valor 15 (mod +2): 9 pontos</p>
              </>
            }
            width="200px"
            position="top"
          />
        </div>
      </div>

      {/* Grade de seletores de atributos */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ATTRIBUTE_LIST.map((attribute) => (
          <AttributeSelector
            key={attribute.id}
            name={attribute.name}
            abbr={attribute.abbr}
            value={currentAttributes[attribute.id]}
            onChange={(value) => handleAttributeChange(attribute.id, value)}
            isDisabled={remainingPoints < 0}
          />
        ))}
      </div>

      {/* Botão de reset */}
      <div className="flex justify-center pt-4">
        <BuilderButton
          onClick={handleReset}
          variant="outline"
          className="flex items-center gap-2 px-6"
          style={{
            borderColor: 'var(--color-surface-2)',
            color: 'var(--color-text-primary)',
          }}
        >
          <XMarkIcon size={1.5} />
          Reiniciar Pontos
        </BuilderButton>
      </div>
    </div>
  );
}
