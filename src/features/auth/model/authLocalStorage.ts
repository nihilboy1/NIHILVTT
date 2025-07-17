import { User, userSchema } from "./authSchemas";

const USER_STORAGE_KEY = "nihilvtt_user";

export const loadUserFromLocalStorage = (): User | null => {
  try {
    const serializedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (serializedUser === null) {
      return null;
    }
    const user = JSON.parse(serializedUser);

    return userSchema.parse(user);
  } catch (error) {
    console.error("Failed to load user from local storage:", error);
    return null;
  }
};

export const saveUserToLocalStorage = (user: User) => {
  try {
    const serializedUser = JSON.stringify(user);
    localStorage.setItem(USER_STORAGE_KEY, serializedUser);
  } catch (error) {
    console.error("Failed to save user to local storage:", error);
  }
};

export const removeUserFromLocalStorage = () => {
  try {
    localStorage.removeItem(USER_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to remove user from local storage:", error);
  }
};
