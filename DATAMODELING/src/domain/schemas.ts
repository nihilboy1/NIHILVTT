// src/domain/schemas.ts

// ============================================================================
// HUB CENTRAL E ORQUESTRADOR DE SCHEMAS
// ============================================================================
// Este ficheiro é o "maestro" e o "hub" central. Ele monta todos os schemas
// e os exporta como um único objeto para resolver dependências circulares
// complexas de forma limpa e previsível.
// ----------------------------------------------------------------------------

// --- Passo 1: Importar dependências e fábricas ---
import { ActionIdEnum } from "./action/actions.data.js";
import { ActionParametersSchema } from "./action/actions.schema.js";
import { createEffectSchemas } from "../shared/effects.schema.js";
import { createSpellSchemas } from "./spell/spells.schema.js";
// Importa todos os exports de outcomes para dentro de um "namespace"
import * as outcomes from "../shared/outcomes.schema.js";

// --- Passo 2: Construir os Efeitos ---
// Chamamos a fábrica de efeitos, injetando as dependências do domínio.
const effects = createEffectSchemas({
  ActionIdEnum,
  ActionParametersSchema,
});

// --- Passo 3: Construir as Magias ---
// Usamos o EffectSchema recém-criado para construir os schemas de magia.
const spells = createSpellSchemas({ EffectSchema: effects.EffectSchema });

// --- Passo 4: Exportação Final ---

// Agrupamos TODOS os schemas num único objeto "Schemas".
// Esta é a fonte única de verdade (Single Source of Truth) para a aplicação.
// Qualquer ficheiro que precise de um schema (especialmente de forma lazy)
// deve importar este objeto.
export const Schemas = {
  ...outcomes,
  ...effects,
  ...spells,
};

// Para conveniência e para manter o seu script de validação funcionando
// sem alterações, exportamos o schema principal de forma nomeada.
export const FinalSpellDataSchema = spells.FinalSpellDataSchema;
