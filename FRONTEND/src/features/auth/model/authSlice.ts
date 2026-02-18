import { User } from './authSchemas';

const defaultUser: User & { password: string } = {
  id: 'user-default',
  name: 'Samuel',
  email: 'samuelseve1@gmail.com',
  password: 'accacc2',
};

const mockUsers: (User & { password: string })[] = [defaultUser];

// Fluxo de registro:
// 1) Simula latência de API.
// 2) Verifica se já existe usuário com o mesmo email.
// 3) Se não existir, cria o usuário e salva no "banco" em memória.
// 4) Retorna apenas os dados públicos (sem senha).
export async function registerUser(userData: Omit<User, 'id'> & { password: string }) {
  return new Promise<User>((resolve, reject) => {
    setTimeout(() => {
      if (mockUsers.some((user) => user.email === userData.email)) {
        reject(new Error('Email already registered.'));
      } else {
        const newUser: User & { password: string } = {
          id: `user-${Date.now()}`,
          name: userData.name,
          email: userData.email,
          password: userData.password,
        };
        mockUsers.push(newUser);
        resolve({ id: newUser.id, name: newUser.name, email: newUser.email });
      }
    }, 1000);
  });
}

// Fluxo de login:
// 1) Simula latência de API.
// 2) Procura usuário por email + senha.
// 3) Se encontrar, retorna os dados públicos para sessão.
// 4) Se não encontrar, rejeita com erro de credenciais inválidas.
export async function loginUser(credentials: Pick<User, 'email'> & { password: string }) {
  return new Promise<User>((resolve, reject) => {
    setTimeout(() => {
      const userFound = mockUsers.find(
        (user) => user.email === credentials.email && user.password === credentials.password,
      );

      if (userFound) {
        resolve({
          id: userFound.id,
          name: userFound.name,
          email: userFound.email,
        });
      } else {
        reject(new Error('Invalid credentials.'));
      }
    }, 1000);
  });
}

// Fluxo de atualização de usuário:
// 1) Simula latência de API.
// 2) Valida se o usuário existe.
// 3) Exige e valida a senha atual antes de qualquer mudança.
// 4) Aplica updates de nome e/ou senha.
// 5) Se não houver campos para atualizar, retorna erro.
// 6) Persiste no "banco" em memória e retorna os dados atualizados.
export async function updateUser(
  userId: string,
  updates: { name?: string; password?: string; currentPassword?: string },
) {
  return new Promise<User>((resolve, reject) => {
    setTimeout(() => {
      // 1) Encontrar o usuário.
      const userIndex = mockUsers.findIndex((user) => user.id === userId);
      if (userIndex === -1) {
        return reject(new Error('User not found.'));
      }

      // 2) Verificar a senha atual primeiro (para qualquer alteração).
      if (!updates.currentPassword) {
        return reject(new Error('A senha atual é obrigatória.'));
      }

      const user = mockUsers[userIndex];
      if (user.password !== updates.currentPassword) {
        return reject(new Error('Senha atual inválida.'));
      }

      // 3) Aplicar as atualizações solicitadas.
      let userWasUpdated = false;

      if (updates.name) {
        user.name = updates.name;
        userWasUpdated = true;
      }

      if (updates.password) {
        user.password = updates.password;
        userWasUpdated = true;
      }

      if (!userWasUpdated) {
        return reject(new Error('Nenhuma informação para atualizar foi fornecida.'));
      }

      // 4) Persistir no array em memória e responder.
      mockUsers[userIndex] = user;
      const { ...userToReturn } = user;
      resolve(userToReturn);
    }, 1000);
  });
}

// Fluxo de exclusão de usuário:
// 1) Simula latência de API.
// 2) Remove o usuário alvo da lista em memória.
// 3) Se nenhum usuário for removido, retorna erro de não encontrado.
// 4) Se remover, resolve sem payload.
export async function deleteUser(userId: string) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      const initialLength = mockUsers.length;
      const updatedUsers = mockUsers.filter((user) => user.id !== userId);
      if (updatedUsers.length === initialLength) {
        reject(new Error('User not found.'));
      } else {
        mockUsers.splice(0, mockUsers.length, ...updatedUsers);
        resolve();
      }
    }, 1000);
  });
}
