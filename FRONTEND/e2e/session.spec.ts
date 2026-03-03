import { expect, test } from '@playwright/test';

import { buildUser, clearClientSession, registerUser } from './helpers/auth';


test('refresh automático mantém sessão após recarregar a página', async ({ page }) => {
  const user = buildUser('refresh-success');
  await registerUser(page, user);

  await page.reload();

  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByText(new RegExp(`Bem-vindo,\\s*${user.name}#\\d+!`, 'i'))).toBeVisible();
});

test('refresh falho faz logout automático e redireciona para login', async ({ page }) => {
  const user = buildUser('refresh-failure-logout');
  await registerUser(page, user);

  await clearClientSession(page);
  await page.reload();

  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole('heading', { name: /FAZER LOGIN/i })).toBeVisible();
});

test('rota protegida /dashboard redireciona para login sem sessão', async ({ page }) => {
  await page.goto('/login');
  await clearClientSession(page);

  await page.goto('/dashboard');
  await expect(page).toHaveURL(/\/login$/);
});

test('rota protegida /profile redireciona para login sem sessão', async ({ page }) => {
  await page.goto('/login');
  await clearClientSession(page);

  await page.goto('/profile');
  await expect(page).toHaveURL(/\/login$/);
});

test('aviso de sessão não aparece constantemente após login', async ({ page }) => {
  const user = buildUser('session-banner-visible');
  await registerUser(page, user);

  await expect(page).toHaveURL(/\/dashboard$/);

  await expect(page.getByText(/Sua sessão expira em breve/i)).toHaveCount(0);
  await expect(page.getByText(/Sessão expirada\. Tentando renovar automaticamente\./i)).toHaveCount(0);
});
