import { ChatState } from "@/features/chat/model/store"; // Importar a interface do store Zustand
import { performDiceRoll } from "@/features/diceRolling/lib/diceUtils";

type SendMessageFn = ChatState['sendMessage'];
type ClearMessagesFn = ChatState['clearMessages'];
type RollAndSendMessageFn = ChatState['rollAndSendMessage'];

/**
 * @interface CommandContext
 * @description Define a interface para o contexto disponível para a execução de comandos.
 * Contém funções para enviar mensagens e rolar dados, além de acessar todos os comandos.
 */
export interface CommandContext {
  sendMessage: SendMessageFn;
  clearMessages: ClearMessagesFn;
  rollAndSendMessage: RollAndSendMessageFn; // Adicionado
  getAllCommands: () => Command[];
}

/**
 * @interface Command
 * @description Define a estrutura de um comando de chat.
 * Cada comando possui um nome, descrição, uso opcional, aliases e uma função de execução.
 */
export interface Command {
  name: string; // O nome principal do comando, ex: "/roll"
  description: string;
  usage?: string; // Exemplo: "/roll <XdY>[+/-Z]"
  aliases?: string[];
  validateArgs?: (args: string[]) => string | null; // Retorna uma mensagem de erro ou null se válido
  execute: (args: string[], context: CommandContext) => void;
}

/**
 * @constant commandsRegistry
 * @description Um registro de todos os comandos de chat disponíveis.
 * Cada objeto Command define um comando que pode ser executado no chat.
 */
const commandsRegistry: Command[] = [
  {
    name: "/roll",
    description: "Rola dados com a notação especificada.",
    usage: "/roll <XdY>[+/-Z]",
    validateArgs: (args: string[]): string | null => {
      if (args.length === 0) {
        return "Falta a notação dos dados. Uso: /roll <XdY>[+/-Z]";
      }
      const notation = args.join(' ');
      const diceNotationRegex = /^(\d{1,3})d(\d{1,3})(([+-])(\d+))?$/i;
      const match = notation.match(diceNotationRegex);
      if (!match) {
        return "Notação de dados inválida. Use XdY ou XdY+/-Z (X, Y entre 1-100). Ex: 2d6+3";
      }
      const numDice = parseInt(match[1]);
      const diceSides = parseInt(match[2]);
      if (numDice < 1 || numDice > 100 || diceSides < 1 || diceSides > 100) {
        return "Dados inválidos. Número de dados (X) e lados (Y) devem ser entre 1 e 100.";
      }
      return null; // Valid
    },
    execute: (_args: string[], context: CommandContext) => {
      const notation = _args.join(' ');
      try {
        const diceRollDetails = performDiceRoll(notation, notation, "Generic");
        context.sendMessage(diceRollDetails);
      } catch (error) {
        context.sendMessage(`Erro ao rolar dados: ${(error as Error).message}`, "Sistema");
      }
    },
  },
  {
    name: "/help",
    description: "Mostra informações sobre os comandos disponíveis.",
    usage: "/help [nome-do-comando]",
    execute: (_args: string[], context: CommandContext) => {
      const allCommands = context.getAllCommands();
      if (_args.length > 0) {
        const commandName = _args[0].startsWith('/') ? _args[0] : `/${_args[0]}`;
        const foundCommand = allCommands.find(cmd => cmd.name === commandName || cmd.aliases?.includes(commandName));
        if (foundCommand) {
          let helpText = `Ajuda para ${foundCommand.name}:\n`;
          helpText += `  Descrição: ${foundCommand.description}\n`;
          if (foundCommand.usage) helpText += `  Uso: ${foundCommand.usage}\n`;
          if (foundCommand.aliases) helpText += `  Alternativas: ${foundCommand.aliases.join(', ')}\n`;
          context.sendMessage(helpText, 'Sistema');
        } else {
          context.sendMessage(`Comando "${commandName}" não encontrado. Digite /help para ver todos os comandos.`, 'Sistema');
        }
      } else {
        const helpText = "Comandos disponíveis:\n\n" +
          allCommands.map(cmd => {
            let entry = `${cmd.name}${cmd.usage ? ` - ${cmd.usage.substring(cmd.name.length).trim()}` : ''} - ${cmd.description}`;
            if(cmd.aliases && cmd.aliases.length > 0) entry += ` (Alternativas: ${cmd.aliases.join(', ')})`;
            return entry;
          }).join('\n');
        context.sendMessage(helpText, 'Sistema');
      }
    },
  },
  {
    name: "/clear",
    description: "Limpa o histórico do chat.",
    aliases: ["/cls"],
    execute: (_args: string[], context: CommandContext) => {
      context.clearMessages();
      context.sendMessage("Histórico do chat limpo.", "Sistema");
    },
  },
];

/**
 * @function findCommand
 * @description Encontra um comando no registro pelo seu nome ou alias.
 * @param {string} commandName - O nome do comando a ser encontrado (ex: "/roll" ou "roll").
 * @returns {Command | undefined} O objeto Command se encontrado, caso contrário, undefined.
 */
export const findCommand = (commandName: string): Command | undefined => {
  const normalizedCmdName = commandName.toLowerCase();
  return commandsRegistry.find(cmd =>
    cmd.name.toLowerCase() === normalizedCmdName ||
    (cmd.aliases && cmd.aliases.some(alias => alias.toLowerCase() === normalizedCmdName))
  );
};

/**
 * @function getAllCommands
 * @description Retorna uma cópia de todos os comandos registrados.
 * @returns {Command[]} Um array de objetos Command.
 */
export const getAllCommands = (): Command[] => {
  return [...commandsRegistry];
};
