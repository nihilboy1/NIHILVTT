import { expect, test } from '@playwright/test';

import { buildUser, registerUser } from './helpers/auth';

test('login inválido mostra mensagem de erro', async ({ page }) => {
  await page.goto('/login');

  await page.getByLabel('Email').fill('nobody@test.com');
  await page.locator('#password').fill('senha-errada');
  await page.getByRole('button', { name: 'ENTRAR' }).click();

  await expect(page.getByText(/credenciais inválidas/i)).toBeVisible();
});

test('registro + acesso ao dashboard', async ({ page }) => {
  const user = buildUser('signup');
  await registerUser(page, user);
  await expect(page.getByText(new RegExp(`Bem-vindo,\\s*${user.name}#\\d+!`, 'i'))).toBeVisible();
});

test('logout envia para login', async ({ page }) => {
  const user = buildUser('logout');
  await registerUser(page, user);

  await page.getByRole('button', { name: 'Perfil' }).click();
  await expect(page).toHaveURL(/\/profile$/);

  await page.getByRole('button', { name: /Sair da conta/i }).click();
  await expect(page).toHaveURL(/\/login$/);
});
