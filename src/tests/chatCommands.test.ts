import { findCommand, getAllCommands, CommandContext } from '../lib/chatCommands';

describe('chatCommands', () => {
  let mockRollAndSendMessage: jest.Mock;
  let mockSendMessage: jest.Mock;
  let mockClearMessages: jest.Mock;
  let mockGetAllCommands: jest.Mock;
  let mockCommandContext: CommandContext;

  beforeEach(() => {
    mockRollAndSendMessage = jest.fn();
    mockSendMessage = jest.fn();
    mockClearMessages = jest.fn();
    mockGetAllCommands = jest.fn(() => getAllCommands()); // Retorna os comandos reais
    mockCommandContext = {
      rollAndSendMessage: mockRollAndSendMessage,
      sendMessage: mockSendMessage,
      clearMessages: mockClearMessages,
      getAllCommands: mockGetAllCommands,
    };
  });

  describe('findCommand', () => {
    test('deve encontrar um comando pelo nome exato', () => {
      const command = findCommand('/roll');
      expect(command).toBeDefined();
      expect(command?.name).toBe('/roll');
    });

    test('deve encontrar um comando por um alias', () => {
      const command = findCommand('/cls');
      expect(command).toBeDefined();
      expect(command?.name).toBe('/clear');
    });

    test('deve encontrar um comando ignorando maiúsculas/minúsculas', () => {
      const command = findCommand('/ROLL');
      expect(command).toBeDefined();
      expect(command?.name).toBe('/roll');

      const aliasCommand = findCommand('/ClS');
      expect(aliasCommand).toBeDefined();
      expect(aliasCommand?.name).toBe('/clear');
    });

    test('não deve encontrar um comando inexistente', () => {
      const command = findCommand('/nonexistent');
      expect(command).toBeUndefined();
    });
  });

  describe('getAllCommands', () => {
    test('deve retornar um array de comandos', () => {
      const commands = getAllCommands();
      expect(Array.isArray(commands)).toBe(true);
      expect(commands.length).toBeGreaterThan(0);
    });

    test('deve retornar uma cópia do array de comandos', () => {
      const commands1 = getAllCommands();
      const commands2 = getAllCommands();
      expect(commands1).not.toBe(commands2); // Deve ser uma cópia diferente
      expect(commands1).toEqual(commands2); // Mas com o mesmo conteúdo
    });
  });

  describe('/roll command', () => {
    let rollCommand: any; // Usar 'any' temporariamente para acessar validateArgs e execute

    beforeAll(() => {
      rollCommand = findCommand('/roll');
    });

    test('validateArgs deve retornar null para notação válida', () => {
      expect(rollCommand.validateArgs(['1d6'])).toBeNull();
      expect(rollCommand.validateArgs(['2d10+5'])).toBeNull();
      expect(rollCommand.validateArgs(['100d100-100'])).toBeNull();
    });

    test('validateArgs deve retornar mensagem de erro para notação inválida', () => {
      expect(rollCommand.validateArgs([])).toBe("Falta a notação dos dados. Uso: /roll <XdY>[+/-Z]");
      expect(rollCommand.validateArgs(['d6'])).toBe("Notação de dados inválida. Use XdY ou XdY+/-Z (X, Y entre 1-100). Ex: 2d6+3");
      expect(rollCommand.validateArgs(['1d'])).toBe("Notação de dados inválida. Use XdY ou XdY+/-Z (X, Y entre 1-100). Ex: 2d6+3");
      expect(rollCommand.validateArgs(['abc'])).toBe("Notação de dados inválida. Use XdY ou XdY+/-Z (X, Y entre 1-100). Ex: 2d6+3");
      expect(rollCommand.validateArgs(['1d6x'])).toBe("Notação de dados inválida. Use XdY ou XdY+/-Z (X, Y entre 1-100). Ex: 2d6+3");
      expect(rollCommand.validateArgs(['1d6+'])).toBe("Notação de dados inválida. Use XdY ou XdY+/-Z (X, Y entre 1-100). Ex: 2d6+3");
      expect(rollCommand.validateArgs(['0d6'])).toBe("Dados inválidos. Número de dados (X) e lados (Y) devem ser entre 1 e 100.");
      expect(rollCommand.validateArgs(['101d6'])).toBe("Dados inválidos. Número de dados (X) e lados (Y) devem ser entre 1 e 100.");
      expect(rollCommand.validateArgs(['1d0'])).toBe("Dados inválidos. Número de dados (X) e lados (Y) devem ser entre 1 e 100.");
      expect(rollCommand.validateArgs(['1d101'])).toBe("Dados inválidos. Número de dados (X) e lados (Y) devem ser entre 1 e 100.");
    });

    test('execute deve chamar rollAndSendMessage com a notação correta', () => {
      rollCommand.execute(['1d20'], mockCommandContext);
      expect(mockRollAndSendMessage).toHaveBeenCalledTimes(1);
      expect(mockRollAndSendMessage).toHaveBeenCalledWith('1d20');
    });
  });

  describe('/help command', () => {
    let helpCommand: any;

    beforeAll(() => {
      helpCommand = findCommand('/help');
    });

    test('execute deve listar todos os comandos quando não há argumentos', () => {
      helpCommand.execute([], mockCommandContext);
      expect(mockSendMessage).toHaveBeenCalledTimes(1);
      const message = mockSendMessage.mock.calls[0][0];
      expect(message).toContain('Comandos disponíveis:');
      expect(message).toContain('/roll - <XdY>[+/-Z] - Rola dados com a notação especificada.');
      expect(message).toContain('/help - [nome-do-comando] - Mostra informações sobre os comandos disponíveis.');
      expect(message).toContain('/clear - Limpa o histórico do chat. (Alternativas: /cls)');
    });

    test('execute deve mostrar ajuda para um comando específico', () => {
      helpCommand.execute(['/roll'], mockCommandContext);
      expect(mockSendMessage).toHaveBeenCalledTimes(1);
      const message = mockSendMessage.mock.calls[0][0];
      expect(message).toContain('Ajuda para /roll:');
      expect(message).toContain('Descrição: Rola dados com a notação especificada.');
      expect(message).toContain('Uso: /roll <XdY>[+/-Z]');
    });

    test('execute deve mostrar ajuda para um comando específico usando alias', () => {
      helpCommand.execute(['clear'], mockCommandContext); // Testando com alias sem '/'
      expect(mockSendMessage).toHaveBeenCalledTimes(1);
      const message = mockSendMessage.mock.calls[0][0];
      expect(message).toContain('Ajuda para /clear:');
      expect(message).toContain('Descrição: Limpa o histórico do chat.');
      expect(message).toContain('Alternativas: /cls');
    });

    test('execute deve informar quando o comando não é encontrado', () => {
      helpCommand.execute(['/unknown'], mockCommandContext);
      expect(mockSendMessage).toHaveBeenCalledTimes(1);
      expect(mockSendMessage).toHaveBeenCalledWith('Comando "/unknown" não encontrado. Digite /help para ver todos os comandos.', 'Sistema');
    });
  });

  describe('/clear command', () => {
    let clearCommand: any;

    beforeAll(() => {
      clearCommand = findCommand('/clear');
    });

    test('execute deve chamar clearMessages e enviar mensagem de confirmação', () => {
      clearCommand.execute([], mockCommandContext);
      expect(mockClearMessages).toHaveBeenCalledTimes(1);
      expect(mockSendMessage).toHaveBeenCalledTimes(1);
      expect(mockSendMessage).toHaveBeenCalledWith('Histórico do chat limpo.', 'Sistema');
    });
  });
});
