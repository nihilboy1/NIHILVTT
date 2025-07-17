import { User } from "./authSchemas";

const mockUsers: (User & { password: string })[] = [];

export const registerUser = async (
  userData: Omit<User, "id"> & { password: string }
) => {
  return new Promise<User>((resolve, reject) => {
    setTimeout(() => {
      if (mockUsers.some((user) => user.email === userData.email)) {
        reject(new Error("Email already registered."));
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
};

export const loginUser = async (
  credentials: Pick<User, "email"> & { password: string }
) => {
  return new Promise<User>((resolve, reject) => {
    setTimeout(() => {
      const userFound = mockUsers.find(
        (user) =>
          user.email === credentials.email &&
          user.password === credentials.password
      );

      if (userFound) {
        resolve({
          id: userFound.id,
          name: userFound.name,
          email: userFound.email,
        });
      } else {
        reject(new Error("Invalid credentials."));
      }
    }, 1000);
  });
};

export const updateUser = async (
  userId: string,
  updates: { name?: string; password?: string; currentPassword?: string }
) => {
  return new Promise<User>((resolve, reject) => {
    setTimeout(() => {
      const userIndex = mockUsers.findIndex((user) => user.id === userId);
      if (userIndex === -1) {
        reject(new Error("User not found."));
        return;
      }

      const user = mockUsers[userIndex];

      if (updates.password && updates.currentPassword) {
        if (user.password !== updates.currentPassword) {
          reject(new Error("Senha atual inválida."));
          return;
        }
        user.password = updates.password;
      } else if (updates.password && !updates.currentPassword) {
        reject(new Error("A senha atual é obrigatória para alterar a senha."));
        return;
      }

      if (updates.name) {
        user.name = updates.name;
      }

      mockUsers[userIndex] = user;

      resolve(user);
    }, 1000);
  });
};

export const deleteUser = async (userId: string) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      const initialLength = mockUsers.length;
      const updatedUsers = mockUsers.filter((user) => user.id !== userId);
      if (updatedUsers.length === initialLength) {
        reject(new Error("User not found."));
      } else {
        mockUsers.splice(0, mockUsers.length, ...updatedUsers);
        resolve();
      }
    }, 1000);
  });
};
