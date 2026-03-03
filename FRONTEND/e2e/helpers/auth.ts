import { expect, Page } from '@playwright/test';

export type TestUser = {
  name: string;
  email: string;
  password: string;
};

export const DELETE_PHRASE = 'eu desejo excluir minha conta';

export function buildUser(prefix: string): TestUser {
  const nonce = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return {
    name: `${prefix}-${nonce}`,
    email: `${prefix}-${nonce}@test.com`,
    password: '12345678',
  };
}

export async function goToRegister(page: Page) {
  await page.goto('/register');
  await expect(page.getByRole('heading', { name: 'CRIAR CONTA' })).toBeVisible();
}

export async function registerUser(page: Page, user: TestUser) {
  await goToRegister(page);
  await page.getByLabel('Nome').fill(user.name);
  await page.getByLabel('Email').fill(user.email);
  await page.locator('#password').fill(user.password);
  await page.locator('#confirmPassword').fill(user.password);
  await page.locator('#terms').check();
  await page.getByRole('button', { name: 'REGISTRAR' }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
}

export async function clearClientSession(page: Page) {
  await page.context().clearCookies();
}
