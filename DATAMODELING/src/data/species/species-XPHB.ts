import { Specie } from "../../domain/specie/specie.schema";

export const species: Specie[] = [
  {
    id: "specie-aasimar",
    name: ["Aasimar", "Aasimar"],
    source: "LDJ2024",
    creatureType: "humanoid",
    size: "medium",
    speed: { unit: "ft", walk: 30 },
    senses: { vision: { darkvision: 60 }, passivePerception: 10 },
    defenses: { resistances: ["necrotic", "radiant"] },
    description:
      "Aasimars são descendentes celestiais com poderes divinos e habilidades de cura e luz.",
    effects: [],
    traits: [
      {
        name: "Resistência Celestial",
        description: "Você tem Resistência a dano Necrótico e dano Radiante.",
      },
      {
        name: "Visão no Escuro",
        description:
          "Você tem Visão no Escuro com alcance de 18 metros (60 pés).",
      },
      {
        name: "Mãos Curadoras",
        description:
          "Como uma ação Mágica, você toca uma criatura e rola um número de d4s igual ao seu Bônus de Proficiência. A criatura recupera uma quantidade de Pontos de Vida igual ao total rolado. Depois de usar essa característica, você não pode usá-la novamente até terminar um Descanso Longo.",
      },
      {
        name: "Portador de Luz",
        description:
          "Você conhece o truque Luz. Carisma é sua habilidade de conjuração para ele.",
      },
      {
        name: "Revelação Celestial",
        description:
          "Quando você atinge o nível 3 de personagem, pode se transformar como uma Ação Bônus usando uma das opções abaixo (escolha a opção cada vez que se transformar). A transformação dura 1 minuto ou até você terminá-la (sem necessidade de ação). Depois de se transformar, você não pode fazer isso novamente até terminar um Descanso Longo. Uma vez em cada um dos seus turnos antes do fim da transformação, você pode causar dano extra a um alvo quando causar dano a ele com um ataque ou magia. O dano extra é igual ao seu Bônus de Proficiência, e o tipo do dano extra é Necrótico para Mortalha Necrótica ou Radiante para Asas Celestiais e Radiância Interior. As opções de transformação são: Asas Celestiais (asas espectrais dão a você Deslocamento de Voo igual ao seu Deslocamento), Radiância Interior (você emite Luz Brilhante em um raio de 3 metros e Luz Fraca por mais 3 metros adicionais, e cada criatura em um raio de 3 metros sofre dano Radiante igual ao seu Bônus de Proficiência no final dos seus turnos), ou Mortalha Necrótica (inimigos em um raio de 3 metros devem ser bem-sucedidos em um teste de resistência de Carisma [CD 8 + modificador de CAR + Bônus de Proficiência] ou ficam Amedrontados até o final do seu próximo turno).",
      },
    ],
  },
  {
    id: "specie-dragonborn",
    name: ["Draconato", "Dragonborn"],
    source: "LDJ2024",
    creatureType: "humanoid",
    size: "medium",
    speed: { unit: "ft", walk: 30 },
    senses: { vision: { darkvision: 60 }, passivePerception: 10 },
    description:
      "Draconatos são descendentes de dragões, com habilidades elementais baseadas em sua linhagem dracônica. Existem várias variantes de Draconatos, cada uma com resistências elementais diferentes, dependendo da cor do dragão ancestral.",
    effects: [],
    traits: [
      {
        name: "Ancestralidade Dracônica",
        description:
          "Sua linhagem provém de um dragão progenitor. Sua ancestralidade específica (Preto, Azul, Latão, Bronze, Cobre, Ouro, Verde, Vermelho, Prata ou Branco) determina sua resistência a dano, o tipo de dano da sua Arma de Sopro e a aparência das suas asas quando você usa Voo Dracônico.",
      },
      {
        name: "Arma de Sopro",
        description:
          "Quando você realiza a ação de Ataque no seu turno, pode substituir um dos seus ataques por uma exalação de energia mágica em um Cone de 4,5 metros (15 pés) ou uma Linha de 9 metros (30 pés) com 1,5 metros (5 pés) de largura (escolha a forma cada vez). Cada criatura na área deve fazer um teste de resistência de Destreza (CD 8 mais seu modificador de Constituição e Bônus de Proficiência). Em caso de falha, uma criatura sofre 1d10 de dano do tipo determinado por sua característica de Ancestralidade Dracônica. Em caso de sucesso, uma criatura sofre metade do dano. Este dano aumenta em 1d10 quando você alcança os níveis de personagem 5 (2d10), 11 (3d10) e 17 (4d10). Você pode usar esta Arma de Sopro um número de vezes igual ao seu Bônus de Proficiência e recupera todos os usos gastos quando termina um Descanso Longo.",
      },
      {
        name: "Resistência a Dano",
        description:
          "Você tem Resistência ao tipo de dano determinado por sua característica de Ancestralidade Dracônica. Por exemplo, se você tem ancestralidade de Dragão Preto, você tem resistência a dano de Ácido.",
      },
      {
        name: "Visão no Escuro",
        description:
          "Você tem Visão no Escuro com alcance de 18 metros (60 pés).",
      },
      {
        name: "Voo Dracônico",
        description:
          "Quando você alcança o nível 5 de personagem, pode canalizar magia dracônica para obter voo temporário. Como uma Ação Bônus, você faz crescer asas espectrais em suas costas que duram 10 minutos ou até você retrair as asas (sem necessidade de ação) ou ficar com a condição Incapacitado. Durante esse tempo, você tem Deslocamento de Voo igual ao seu Deslocamento. Suas asas parecem ser feitas da mesma energia da sua Arma de Sopro. Depois de usar essa característica, você não pode usá-la novamente até terminar um Descanso Longo.",
      },
      {
        name: "Variantes de Draconato",
        description:
          "Existem múltiplas variantes de Draconatos baseadas na ancestralidade dracônica: Draconato Preto (resistência a Ácido), Draconato Azul (resistência a Elétrico), Draconato de Latão (resistência a Fogo), Draconato de Bronze (resistência a Elétrico), Draconato de Cobre (resistência a Ácido), Draconato de Ouro (resistência a Fogo), Draconato Verde (resistência a Veneno), Draconato Vermelho (resistência a Fogo), Draconato de Prata (resistência a Frio) e Draconato Branco (resistência a Frio). Cada variante tem resistência ao seu respectivo tipo de dano e sua Arma de Sopro causa dano desse tipo.",
      },
      {
        name: "Draconato Preto",
        description:
          "Como um Draconato Preto, sua arma de sopro causa dano de Ácido e você tem resistência a dano de Ácido. Suas asas parecem ser feitas da mesma energia ácida da sua Arma de Sopro.",
      },
      {
        name: "Draconato Azul",
        description:
          "Como um Draconato Azul, sua arma de sopro causa dano Elétrico e você tem resistência a dano Elétrico. Suas asas parecem ser feitas de energia elétrica crepitante.",
      },
      {
        name: "Draconato de Latão",
        description:
          "Como um Draconato de Latão, sua arma de sopro causa dano de Fogo e você tem resistência a dano de Fogo. Suas asas parecem ser feitas de chamas da cor de latão.",
      },
      {
        name: "Draconato de Bronze",
        description:
          "Como um Draconato de Bronze, sua arma de sopro causa dano Elétrico e você tem resistência a dano Elétrico. Suas asas parecem ser feitas de energia elétrica com tons de bronze.",
      },
      {
        name: "Draconato de Cobre",
        description:
          "Como um Draconato de Cobre, sua arma de sopro causa dano de Ácido e você tem resistência a dano de Ácido. Suas asas parecem ser feitas de energia ácida da cor de cobre.",
      },
      {
        name: "Draconato de Ouro",
        description:
          "Como um Draconato de Ouro, sua arma de sopro causa dano de Fogo e você tem resistência a dano de Fogo. Suas asas parecem ser feitas de chamas douradas.",
      },
      {
        name: "Draconato Verde",
        description:
          "Como um Draconato Verde, sua arma de sopro causa dano de Veneno e você tem resistência a dano de Veneno. Suas asas parecem ser feitas de energia tóxica verde.",
      },
      {
        name: "Draconato Vermelho",
        description:
          "Como um Draconato Vermelho, sua arma de sopro causa dano de Fogo e você tem resistência a dano de Fogo. Suas asas parecem ser feitas de chamas carmesim.",
      },
      {
        name: "Draconato de Prata",
        description:
          "Como um Draconato de Prata, sua arma de sopro causa dano de Frio e você tem resistência a dano de Frio. Suas asas parecem ser feitas de energia gélida com tons prateados.",
      },
      {
        name: "Draconato Branco",
        description:
          "Como um Draconato Branco, sua arma de sopro causa dano de Frio e você tem resistência a dano de Frio. Suas asas parecem ser feitas de gelo cristalino.",
      },
    ],
  },
  {
    id: "specie-dwarf",
    name: ["Anão", "Dwarf"],
    source: "LDJ2024",
    creatureType: "humanoid",
    size: "medium",
    speed: { unit: "ft", walk: 30 },
    senses: { vision: { darkvision: 120 }, passivePerception: 10 },
    defenses: { resistances: ["poison"] },
    description:
      "Anões são conhecidos por sua resistência e habilidades em combate.",
    effects: [],
    traits: [
      {
        name: "Visão no Escuro",
        description:
          "Você tem Visão no Escuro com alcance de 36 metros (120 pés).",
      },
      {
        name: "Resiliência Anã",
        description:
          "Você tem Resistência a dano de Veneno. Você também tem Vantagem em testes de resistência que fizer para evitar ou terminar a condição Envenenado.",
      },
      {
        name: "Robustez Anã",
        description:
          "Seu máximo de Pontos de Vida aumenta em 1, e aumenta em 1 novamente sempre que você ganha um nível.",
      },
      {
        name: "Astúcia com Pedras",
        description:
          "Como uma Ação Bônus, você ganha Sentido Sísmico com alcance de 18 metros (60 pés) por 10 minutos. Você precisa estar em uma superfície de pedra ou tocando uma superfície de pedra para usar este Sentido Sísmico. A pedra pode ser natural ou trabalhada. Você pode usar esta Ação Bônus um número de vezes igual ao seu Bônus de Proficiência e recupera todos os usos gastos quando termina um Descanso Longo.",
      },
    ],
  },
  {
    id: "specie-elf",
    name: ["Elfo", "Elf"],
    source: "LDJ2024",
    creatureType: "humanoid",
    size: "medium",
    speed: { unit: "ft", walk: 30 },
    senses: { vision: { darkvision: 60 }, passivePerception: 10 },
    description:
      "Elfos são criaturas ágeis e místicas com forte conexão com a magia.",
    effects: [],
    traits: [
      {
        name: "Visão no Escuro",
        description:
          "Você tem Visão no Escuro com alcance de 18 metros (60 pés).",
      },
      {
        name: "Linhagem Élfica",
        description:
          "Você faz parte de uma linhagem que lhe concede habilidades sobrenaturais. Sua linhagem específica (Drow, Alto Elfo ou Elfo da Floresta) fornece habilidades especiais, incluindo truques e magias únicos que se tornam disponíveis nos níveis 3 e 5. Inteligência, Sabedoria ou Carisma é sua habilidade de conjuração para essas magias (escolha a habilidade quando selecionar sua linhagem).",
      },
      {
        name: "Ancestralidade Feérica",
        description:
          "Você tem Vantagem em testes de resistência que fizer para evitar ou terminar a condição Encantado.",
      },
      {
        name: "Sentidos Aguçados",
        description:
          "Você tem proficiência na perícia Intuição, Percepção ou Sobrevivência.",
      },
      {
        name: "Transe",
        description:
          "Você não precisa dormir, e a magia não pode fazê-lo adormecer. Você pode terminar um Descanso Longo em 4 horas se passar essas horas em uma meditação semelhante a um transe, durante a qual mantém a consciência.",
      },
      {
        name: "Linhagem Drow",
        description:
          "Como um Elfo com a Linhagem Drow, o alcance da sua Visão no Escuro aumenta para 36 metros (120 pés) e você conhece o truque Luzes Dançantes. Quando você atinge o nível 3 de personagem, aprende a magia Fogo Feérico. Quando atinge o nível 5 de personagem, também aprende a magia Escuridão. Você sempre tem essas magias preparadas e pode conjurar cada uma delas uma vez sem gastar um espaço de magia por Descanso Longo.",
      },
      {
        name: "Linhagem de Alto Elfo",
        description:
          "Como um Elfo com a Linhagem de Alto Elfo, você conhece o truque Prestidigitação. Sempre que terminar um Descanso Longo, pode substituir esse truque por um truque diferente da lista de magias de Mago. Quando você atinge o nível 3 de personagem, aprende a magia Detectar Magia. Quando atinge o nível 5 de personagem, também aprende a magia Passo Nebuloso. Você sempre tem essas magias preparadas e pode conjurar cada uma delas uma vez sem gastar um espaço de magia por Descanso Longo.",
      },
      {
        name: "Linhagem de Elfo da Floresta",
        description:
          "Como um Elfo com a Linhagem de Elfo da Floresta, seu Deslocamento aumenta para 10,5 metros (35 pés) e você conhece o truque Artesanato Druídico. Quando você atinge o nível 3 de personagem, aprende a magia Passos Longos. Quando atinge o nível 5 de personagem, também aprende a magia Passar sem Deixar Rastros. Você sempre tem essas magias preparadas e pode conjurar cada uma delas uma vez sem gastar um espaço de magia por Descanso Longo.",
      },
    ],
  },
  {
    id: "specie-gnome",
    name: ["Gnomo", "Gnome"],
    source: "LDJ2024",
    creatureType: "humanoid",
    size: "small",
    speed: { unit: "ft", walk: 30 },
    senses: { vision: { darkvision: 60 }, passivePerception: 10 },
    description:
      "Gnomos são criaturas pequenas e engenhosas conhecidas por sua curiosidade e talentos mágicos.",
    effects: [],
    traits: [
      {
        name: "Visão no Escuro",
        description:
          "Você tem Visão no Escuro com alcance de 18 metros (60 pés).",
      },
      {
        name: "Astúcia Gnômica",
        description:
          "Você tem Vantagem em testes de resistência de Inteligência, Sabedoria e Carisma.",
      },
      {
        name: "Linhagem Gnômica",
        description:
          "Você faz parte de uma linhagem que lhe concede habilidades sobrenaturais. Sua linhagem (Gnomo da Floresta ou Gnomo das Rochas) fornece habilidades mágicas especiais. Inteligência, Sabedoria ou Carisma é sua habilidade de conjuração para as magias que você conjura com suas características de linhagem (escolha a habilidade quando selecionar sua linhagem).",
      },
      {
        name: "Linhagem de Gnomo da Floresta",
        description:
          "Você conhece o truque Ilusão Menor. Você também sempre tem a magia Falar com Animais preparada. Pode conjurá-la sem gastar um espaço de magia um número de vezes igual ao seu Bônus de Proficiência e recupera todos os usos gastos quando termina um Descanso Longo. Você também pode usar quaisquer espaços de magia que tenha para conjurar a magia.",
      },
      {
        name: "Linhagem de Gnomo das Rochas",
        description:
          "Você conhece os truques Consertar e Prestidigitação. Além disso, pode gastar 10 minutos conjurando Prestidigitação para criar um dispositivo mecânico Minúsculo (CA 5, 1 PV), como um brinquedo, acendedor de fogo ou caixa de música. Quando você cria o dispositivo, determina sua função escolhendo um efeito da Prestidigitação; o dispositivo produz esse efeito sempre que você ou outra criatura usar uma Ação Bônus para ativá-lo com um toque. Se o efeito escolhido tiver opções dentro dele, você escolhe uma dessas opções para o dispositivo quando o cria. Por exemplo, se escolher o efeito de acender-apagar do truque, você determina se o dispositivo acende ou apaga fogo; o dispositivo não faz ambos. Você pode ter três desses dispositivos existindo ao mesmo tempo, e cada um se desfaz 8 horas após sua criação ou quando você o desmonta com um toque como uma ação de Utilizar.",
      },
    ],
  },
  {
    id: "specie-goliath",
    name: ["Golias", "Goliath"],
    source: "LDJ2024",
    creatureType: "humanoid",
    size: "medium",
    speed: { unit: "ft", walk: 35 },
    senses: { passivePerception: 10 },
    description:
      "Golias são seres de grande porte descendentes de gigantes, com habilidades sobrenaturais baseadas em sua ancestralidade.",
    effects: [],
    traits: [
      {
        name: "Ancestralidade de Gigante",
        description:
          "Você é descendente de Gigantes. Sua ancestralidade específica de gigante (Nuvem, Fogo, Gelo, Colina, Pedra ou Tempestade) concede a você uma dádiva sobrenatural que pode usar um número de vezes igual ao seu Bônus de Proficiência, e você recupera todos os usos gastos quando termina um Descanso Longo.",
      },
      {
        name: "Forma Grande",
        description:
          "A partir do nível 5 de personagem, você pode mudar seu tamanho para Grande como uma Ação Bônus se estiver em um espaço suficientemente grande. Esta transformação dura 10 minutos ou até você terminá-la (sem necessidade de ação). Durante esse tempo, você tem Vantagem em testes de Força, e seu Deslocamento aumenta em 3 metros (10 pés). Depois de usar essa característica, você não pode usá-la novamente até terminar um Descanso Longo.",
      },
      {
        name: "Estrutura Poderosa",
        description:
          "Você tem Vantagem em qualquer teste de habilidade que fizer para terminar a condição Agarrado. Você também conta como um tamanho maior ao determinar sua capacidade de carga.",
      },
      {
        name: "Ancestralidade de Gigante das Nuvens",
        description:
          "Como um Golias com ancestralidade de Gigante das Nuvens, você ganha a habilidade Salto das Nuvens: Como uma Ação Bônus, você se teletransporta magicamente até 9 metros (30 pés) para um espaço desocupado que possa ver. Você pode usar essa característica um número de vezes igual ao seu Bônus de Proficiência e recupera todos os usos gastos quando termina um Descanso Longo.",
      },
      {
        name: "Ancestralidade de Gigante do Fogo",
        description:
          "Como um Golias com ancestralidade de Gigante do Fogo, você ganha a habilidade Queimadura do Fogo: Quando você acerta um alvo com uma jogada de ataque e causa dano a ele, pode também causar 1d10 de dano de Fogo a esse alvo. Você pode usar essa característica um número de vezes igual ao seu Bônus de Proficiência e recupera todos os usos gastos quando termina um Descanso Longo.",
      },
      {
        name: "Ancestralidade de Gigante do Gelo",
        description:
          "Como um Golias com ancestralidade de Gigante do Gelo, você ganha a habilidade Calafrio do Gelo: Quando você acerta um alvo com uma jogada de ataque e causa dano a ele, pode também causar 1d6 de dano de Frio a esse alvo e reduzir seu Deslocamento em 3 metros (10 pés) até o início do seu próximo turno. Você pode usar essa característica um número de vezes igual ao seu Bônus de Proficiência e recupera todos os usos gastos quando termina um Descanso Longo.",
      },
      {
        name: "Ancestralidade de Gigante das Colinas",
        description:
          "Como um Golias com ancestralidade de Gigante das Colinas, você ganha a habilidade Tombo da Colina: Quando você acerta uma criatura Grande ou menor com uma jogada de ataque e causa dano a ela, pode dar a esse alvo a condição Caído. Você pode usar essa característica um número de vezes igual ao seu Bônus de Proficiência e recupera todos os usos gastos quando termina um Descanso Longo.",
      },
      {
        name: "Ancestralidade de Gigante da Pedra",
        description:
          "Como um Golias com ancestralidade de Gigante da Pedra, você ganha a habilidade Resistência da Pedra: Quando você sofre dano, pode usar uma Reação para rolar 1d12. Adicione seu modificador de Constituição ao número rolado e reduza o dano por esse total. Você pode usar essa característica um número de vezes igual ao seu Bônus de Proficiência e recupera todos os usos gastos quando termina um Descanso Longo.",
      },
      {
        name: "Ancestralidade de Gigante da Tempestade",
        description:
          "Como um Golias com ancestralidade de Gigante da Tempestade, você ganha a habilidade Trovão da Tempestade: Quando você sofre dano de uma criatura a até 18 metros (60 pés) de você, pode usar uma Reação para causar 1d8 de dano de Trovão a essa criatura. Você pode usar essa característica um número de vezes igual ao seu Bônus de Proficiência e recupera todos os usos gastos quando termina um Descanso Longo.",
      },
    ],
  },
  {
    id: "specie-halfling",
    name: ["Halfling", "Halfling"],
    source: "LDJ2024",
    creatureType: "humanoid",
    size: "small",
    speed: { unit: "ft", walk: 30 },
    senses: { passivePerception: 10 },
    description:
      "Halflings são criaturas pequenas e ágeis, conhecidas por sua sorte extraordinária e habilidade para passar despercebidas.",
    effects: [],
    traits: [
      {
        name: "Corajoso",
        description:
          "Você tem Vantagem em testes de resistência que fizer para evitar ou terminar a condição Amedrontado.",
      },
      {
        name: "Agilidade de Halfling",
        description:
          "Você pode se mover através do espaço de qualquer criatura que seja um tamanho maior que você, mas não pode parar no mesmo espaço.",
      },
      {
        name: "Sorte",
        description:
          "Quando você rola um 1 no d20 de um Teste d20, pode rolar o dado novamente e deve usar o novo resultado.",
      },
      {
        name: "Furtividade Natural",
        description:
          "Você pode realizar a ação de Esconder-se mesmo quando estiver obscurecido apenas por uma criatura que seja pelo menos um tamanho maior que você.",
      },
    ],
  },
  {
    id: "specie-human",
    name: ["Humano", "Human"],
    source: "LDJ2024",
    creatureType: "humanoid",
    size: "medium",
    speed: { unit: "ft", walk: 30 },
    senses: { passivePerception: 10 },
    description:
      "Humanos são conhecidos por sua versatilidade e adaptabilidade, capazes de aprender diversas habilidades.",
    effects: [],
    traits: [
      {
        name: "Engenhoso",
        description:
          "Você ganha Inspiração Heroica sempre que termina um Descanso Longo.",
      },
      {
        name: "Habilidoso",
        description: "Você ganha proficiência em uma perícia de sua escolha.",
      },
      {
        name: "Versátil",
        description: "Você ganha um talento de Origem de sua escolha.",
      },
    ],
  },
  {
    id: "specie-orc",
    name: ["Orc", "Orc"],
    source: "LDJ2024",
    creatureType: "humanoid",
    size: "medium",
    speed: { unit: "ft", walk: 30 },
    senses: { vision: { darkvision: 120 }, passivePerception: 10 },
    description:
      "Orcs são guerreiros poderosos com força incomum e grande resistência. São conhecidos por sua ferocidade em combate e capacidade de absorver golpes severos.",
    effects: [],
    traits: [
      {
        name: "Surto de Adrenalina",
        description:
          "Você pode realizar a ação de Disparada como uma Ação Bônus. Quando fizer isso, você ganha um número de Pontos de Vida Temporários igual ao seu Bônus de Proficiência. Você pode usar essa característica um número de vezes igual ao seu Bônus de Proficiência e recupera todos os usos gastos quando termina um Descanso Curto ou Longo.",
      },
      {
        name: "Visão no Escuro",
        description:
          "Você tem Visão no Escuro com alcance de 36 metros (120 pés).",
      },
      {
        name: "Resistência Implacável",
        description:
          "Quando você é reduzido a 0 Pontos de Vida, mas não é morto instantaneamente, pode cair para 1 Ponto de Vida em vez disso. Depois de usar essa característica, você não pode usá-la novamente até terminar um Descanso Longo.",
      },
    ],
  },
  {
    id: "specie-tiefling",
    name: ["Tiefling", "Tiefling"],
    source: "LDJ2024",
    creatureType: "humanoid",
    size: "medium",
    speed: { unit: "ft", walk: 30 },
    senses: { vision: { darkvision: 60 }, passivePerception: 10 },
    description:
      "Tieflings são humanoides com ancestralidade infernal, manifestando diversos traços demoníacos e poderes sobrenaturais baseados em seu legado.",
    effects: [],
    traits: [
      {
        name: "Visão no Escuro",
        description:
          "Você tem Visão no Escuro com alcance de 18 metros (60 pés).",
      },
      {
        name: "Legado Diabólico",
        description:
          "Você é o receptor de um legado que lhe concede habilidades sobrenaturais. Seu legado específico (Abissal, Ctônico ou Infernal) fornece resistência a um tipo específico de dano, um truque e magias adicionais nos níveis 3 e 5. Inteligência, Sabedoria ou Carisma é sua habilidade de conjuração para essas magias (escolha a habilidade quando selecionar seu legado).",
      },
      {
        name: "Presença Sobrenatural",
        description:
          "Você conhece o truque Taumaturgia. Quando o conjura com esta característica, a magia usa a mesma habilidade de conjuração que você usa para sua Característica de Legado Diabólico.",
      },
      {
        name: "Legado Abissal",
        description:
          "Como um Tiefling com o Legado Abissal, você tem Resistência a dano de Veneno e conhece o truque Borrifada Venenosa. No nível 3, você aprende Raio de Doença e no nível 5, aprende Imobilizar Pessoa. Você sempre tem essas magias preparadas e pode conjurar cada uma delas uma vez sem gastar um espaço de magia por Descanso Longo.",
      },
      {
        name: "Legado Ctônico",
        description:
          "Como um Tiefling com o Legado Ctônico, você tem Resistência a dano Necrótico e conhece o truque Toque Gélido. No nível 3, você aprende Vida Falsa e no nível 5, aprende Raio de Enfraquecimento. Você sempre tem essas magias preparadas e pode conjurar cada uma delas uma vez sem gastar um espaço de magia por Descanso Longo.",
      },
      {
        name: "Legado Infernal",
        description:
          "Como um Tiefling com o Legado Infernal, você tem Resistência a dano de Fogo e conhece o truque Rajada de Fogo. No nível 3, você aprende Represália Infernal e no nível 5, aprende Escuridão. Você sempre tem essas magias preparadas e pode conjurar cada uma delas uma vez sem gastar um espaço de magia por Descanso Longo.",
      },
    ],
  },
];
