import { User } from './authSchemas';

const defaultUser: User & { password: string } = {
  id: 'user-default',
  name: 'Samuel',
  email: 'samuelseve1@gmail.com',
  password: 'accacc2',
};

const mockUsers: (User & { password: string })[] = [defaultUser];

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
// Em features/auth/model/authSlice.ts

export async function updateUser(
  userId: string,
  updates: { name?: string; password?: string; currentPassword?: string },
) {
  return new Promise<User>((resolve, reject) => {
    setTimeout(() => {
      // 1. Encontrar o usuário
      const userIndex = mockUsers.findIndex((user) => user.id === userId);
      if (userIndex === -1) {
        return reject(new Error('User not found.'));
      }

      // 2. Verificar a senha atual PRIMEIRO (para QUALQUER alteração)
      if (!updates.currentPassword) {
        return reject(new Error('A senha atual é obrigatória.'));
      }

      const user = mockUsers[userIndex];
      if (user.password !== updates.currentPassword) {
        // ESTA É A VERIFICAÇÃO QUE ESTAVA FALHANDO
        return reject(new Error('Senha atual inválida.'));
      }

      // 3. Se a senha atual for válida, APLICAR as atualizações
      let userWasUpdated = false;

      // Atualizar o nome, se fornecido
      if (updates.name) {
        user.name = updates.name;
        userWasUpdated = true;
      }

      // Atualizar a senha, se fornecida
      if (updates.password) {
        user.password = updates.password;
        userWasUpdated = true;
      }

      // Se nenhuma atualização foi pedida, retorne um erro (caso de segurança)
      if (!userWasUpdated) {
        return reject(new Error('Nenhuma informação para atualizar foi fornecida.'));
      }

      // 4. Salvar o usuário atualizado e resolver a promessa
      mockUsers[userIndex] = user;

      // Retorna o usuário sem a senha, como uma API real faria
      const { ...userToReturn } = user;
      resolve(userToReturn);
    }, 1000);
  });
}

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
