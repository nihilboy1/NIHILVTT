import { chatCommandSchema, ChatCommand } from '../schemas/chatCommands.schema';

export function parseAndValidateChatCommand(input: string): ChatCommand | null {
  if (!input.startsWith('/')) {
    return null; // Not a command
  }

  const parts = input.slice(1).split(' '); // Remove '/' and split by space
  const commandName = parts[0];
  const args = parts.slice(1);

  let parsedCommand: any = { command: commandName };

  switch (commandName) {
    case 'clear':
    case 'help':
      parsedCommand.type = 'simpleCommand';
      break;
    case 'whisper':
      if (args.length >= 2) {
        parsedCommand.type = 'textArgumentCommand';
        parsedCommand.target = args[0];
        parsedCommand.message = args.slice(1).join(' ');
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
