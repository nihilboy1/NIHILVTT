import { chatCommandSchema, ChatCommand } from './chatCommands.schema';

export function parseAndValidateChatCommand(input: string): ChatCommand | null {
  if (!input.startsWith('/')) {
    return null; // Not a command
  }

  const parts = input.slice(1).split(' '); // Remove '/' and split by space
  const commandName = parts[0];
  const args = parts.slice(1);

  let parsedCommand: ChatCommand;

  switch (commandName) {
    case 'clear':
    case 'help':
      parsedCommand = { command: commandName, type: 'simpleCommand' };
      break;
    case 'whisper':
      if (args.length >= 2) {
        parsedCommand = {
          command: commandName,
          type: 'textArgumentCommand',
          target: args[0],
          message: args.slice(1).join(' '),
        };
      } else {
        return null; // Invalid whisper command format
      }
      break;
    default:
      return null; // Unknown command
  }

  const result = chatCommandSchema.safeParse(parsedCommand);

  if (result.success) {
    return result.data;
  } else {
    console.warn("Invalid command format detected by Zod:", result.error.flatten());
    return null; // Command did not match schema
  }
}
