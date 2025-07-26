Cenário 3: Efeitos Contínuos e Concentração
O Desafio Peculiar: Muitas magias e habilidades (como a Fúria do Bárbaro) aplicam um efeito que dura por um tempo, pode ser interrompido (Concentração) ou concede habilidades temporárias.

Inspiração BG3: A UI mostra claramente os ícones de status para Bless, Rage, Concentrating, etc.

Análise da Estrutura Atual: Nosso ApplyConditionOutcomeSchema é ótimo para condições padrão (Caído, Atordoado). Mas como modelamos "Concentrando em Bless"?

💡 Proposta de Melhoria: Adicionar um array activeEffects ao CharacterSchema.

// Um novo schema
export const ActiveEffectSchema = z.object({
id: z.string(),
sourceId: z.string(), // O ID da magia ou item que causou o efeito
sourceName: z.string(),
duration: z.object({ value: z.number(), unit: z.string() }),
isConcentration: z.boolean().default(false),
// O que este efeito FAZ? Ele concede... efeitos! (Recursivo e poderoso)
grantedEffects: z.array(EffectSchema),
});

// Em um futuro `CharacterSchema`
const CharacterSchema = z.object({
// ...
// NOVO: Uma lista de todos os efeitos temporários ativos no personagem.
activeEffects: z.array(ActiveEffectSchema),
});

Como Facilitaria no VTT:

Quando um Clérigo conjura Bless, o motor do jogo adiciona um ActiveEffect em cada alvo. Este efeito contém isConcentration: true e grantedEffects: [{ type: "passive_grantBonus", on: "attackRoll", value: "1d4" }].

O "Computador de Estado" do seu VTT, ao calcular os stats de um personagem, não olharia apenas para os itens equipados, mas também para os grantedEffects de todos os activeEffects.

Se o Clérigo tomar dano, o motor do jogo verifica se ele tem um efeito com isConcentration: true e força um teste de resistência de Constituição. Se falhar, o ActiveEffect é removido de todos os alvos.

Cenário 4: Consumo de Recursos (Cargas, Slots de Magia, Pontos de Ki)
O Desafio Peculiar: Habilidades consomem recursos diferentes: um item mágico tem cargas, um Monge tem pontos de Ki, um Mago tem slots de magia.

Inspiração BG3: A UI mostra claramente todos os recursos disponíveis para o personagem.

Análise da Estrutura Atual: O price no nosso activation é uma string. Isso é um pouco vago e inflexível.

💡 Proposta de Melhoria: Tornar o price um objeto mais estruturado.

// Em schemas/actions.schema.ts (dentro de ActionParametersSchema)
activation: z.object({
type: ActionTypeEnum,
// NOVO: 'cost' é mais descritivo que 'price'
cost: z.object({
amount: z.number(),
resource: z.string(), // "spellSlotL1", "kiPoint", "itemCharge", "rageCharge"
}),
trigger: z.string().optional(),
}).optional(),

Como Facilitaria no VTT:

O CharacterSchema teria um objeto resources: { spellSlotL1: 4, kiPoint: 5, ... }.

Antes de executar uma ação, o motor do jogo verificaria o activation.cost. Ele olharia o resource (ex: "kiPoint"), a amount (ex: 1) e verificaria se o personagem tem esse recurso disponível no seu objeto resources. Se tiver, ele executa a ação e subtrai o custo.
