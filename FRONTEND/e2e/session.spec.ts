import { expect, test } from '@playwright/test';

import { buildUser, clearClientSession, registerUser } from './helpers/auth';

async function createGameAndEnter(page: import('@playwright/test').Page, title: string) {
  await page.goto('/games/new');
  await expect(page.getByRole('heading', { name: /Criar Novo Jogo/i })).toBeVisible();

  await page.getByLabel('Nome do jogo').fill(title);
  await page.getByRole('button', { name: 'CRIAR JOGO' }).click();

  await expect(page).toHaveURL(/\/game\/\d+$/);
  await expect(page.getByLabel(/Esconder Barra Lateral Direita/i)).toBeVisible();
}


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

test('mesa recém-criada mantém sessão vazia após recarregar', async ({ page }) => {
  const user = buildUser('game-refresh-empty');
  await registerUser(page, user);

  await createGameAndEnter(page, `Mesa ${user.name}`);

  await page.reload();

  await expect(page).toHaveURL(/\/game\/\d+$/);
  await expect(page.getByLabel(/Esconder Barra Lateral Direita/i)).toBeVisible();
  await expect(page.getByLabel(/Entrada de mensagem do chat/i)).toBeVisible();
});

test('chat da mesa persiste após recarregar a página', async ({ page }) => {
  const user = buildUser('game-refresh-chat');
  await registerUser(page, user);

  const message = `mensagem-e2e-${Date.now()}`;
  await createGameAndEnter(page, `Mesa ${user.name}`);

  await page.getByLabel(/Entrada de mensagem do chat/i).fill(message);
  await page.getByRole('button', { name: /^Enviar$/i }).click();

  await expect(page.getByText(message)).toBeVisible();

  await page.reload();

  await expect(page).toHaveURL(/\/game\/\d+$/);
  await expect(page.getByText(message)).toBeVisible();
});
