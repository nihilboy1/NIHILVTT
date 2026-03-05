import { expect, Locator, Page, test } from '@playwright/test';

import { buildUser, registerUser } from './helpers/auth';

async function createGameAndEnter(page: Page, title: string) {
  await page.goto('/games/new');
  await expect(page.getByRole('heading', { name: /Criar Novo Jogo/i })).toBeVisible();

  await page.getByLabel('Nome do jogo').fill(title);
  const createGameRequestPromise = page.waitForRequest(
    (request) => request.url() === 'http://localhost:8080/games' && request.method() === 'POST',
  );
  const createGameResponsePromise = page.waitForResponse(
    (response) => response.url() === 'http://localhost:8080/games' && response.request().method() === 'POST',
  );
  await page.getByRole('button', { name: 'CRIAR JOGO' }).click();
  const createGameRequest = await createGameRequestPromise;
  const createGameResponse = await createGameResponsePromise;

  if (!createGameResponse.ok()) {
    const requestHeaders = await createGameRequest.allHeaders();
    throw new Error(
      `Falha ao criar jogo via UI: status=${createGameResponse.status()} auth=${requestHeaders.authorization ?? 'missing'} body=${await createGameResponse.text()}`,
    );
  }

  await expect(page).toHaveURL(/\/game\/\d+$/);
  await expect(page.getByRole('button', { name: /Esconder Barra Lateral Direita/i })).toBeVisible();
}

async function openCompendium(page: Page) {
  await page.getByRole('tab', { name: 'Biblioteca' }).click();
  await expect(page.getByRole('tabpanel', { name: 'Biblioteca' })).toBeVisible();
}

async function getBoardLocator(page: Page) {
  const board = page.getByRole('img').filter({ hasText: '0,0' });
  await expect(board).toBeVisible();
  return board;
}

async function spawnMonsterFromCompendium(page: Page, board: Locator, monsterName: string) {
  await page.getByTitle(new RegExp(`Arraste ${monsterName} para o tabuleiro\\.$`, 'i')).dragTo(board);
}

async function openMonsterDetails(page: Page, monsterName: string) {
  const monsterCard = page.getByTitle(new RegExp(`Arraste ${monsterName} para o tabuleiro\\.$`, 'i'));
  await expect(monsterCard).toBeVisible();
  await monsterCard.getByRole('button', { name: 'Detalhes' }).click();
}

async function moveTokenByOffset(page: Page, tokenName: string, offsetX: number, offsetY: number) {
  const token = page.locator('g.board-token-group').filter({ hasText: tokenName }).first();
  await expect(token).toBeVisible();

  const box = await token.boundingBox();
  if (!box) {
    throw new Error(`Não foi possível obter o bounding box do token "${tokenName}".`);
  }

  const startX = box.x + box.width / 2;
  const startY = box.y + box.height / 2;
  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(startX + offsetX, startY + offsetY, { steps: 12 });
  await page.mouse.up();
}

async function marqueeSelectAllTokens(page: Page) {
  const tokens = page.locator('g.board-token-group');
  const tokenCount = await tokens.count();
  if (tokenCount < 2) {
    throw new Error('A seleção por marquee exige ao menos dois tokens no tabuleiro.');
  }

  const boxes = await Promise.all(
    Array.from({ length: tokenCount }, async (_, index) => {
      const box = await tokens.nth(index).boundingBox();
      if (!box) {
        throw new Error(`Não foi possível obter o bounding box do token ${index}.`);
      }
      return box;
    }),
  );

  const startX = Math.min(...boxes.map((box) => box.x)) - 20;
  const startY = Math.min(...boxes.map((box) => box.y)) - 20;
  const endX = Math.max(...boxes.map((box) => box.x + box.width)) + 20;
  const endY = Math.max(...boxes.map((box) => box.y + box.height)) + 20;

  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(endX, endY, { steps: 16 });
  await page.mouse.up();
}

async function bootstrapCombatScene(page: Page) {
  const user = buildUser('cmb');
  await registerUser(page, user);

  await createGameAndEnter(page, `Mesa E2E ${Date.now()}`);
  await openCompendium(page);

  const board = await getBoardLocator(page);
  await spawnMonsterFromCompendium(page, board, 'Abutre');
  await spawnMonsterFromCompendium(page, board, 'Águia');
  await expect(page.locator('g.board-token-group')).toHaveCount(2);
}

test('biblioteca abre ficha de monstro canônica (SSOT)', async ({ page }) => {
  await bootstrapCombatScene(page);

  await openMonsterDetails(page, 'Águia');
  const monsterDialog = page.getByRole('dialog', { name: 'Águia' });
  await expect(monsterDialog).toBeVisible();
  await expect(monsterDialog.getByText('CR', { exact: true })).toBeVisible();
  await expect(monsterDialog.getByText('Ações', { exact: true })).toBeVisible();
  await expect(monsterDialog.getByText('Garras', { exact: true })).toBeVisible();
});

test('mestre consegue instanciar monstros, gerenciar HP e iniciar combate', async ({ page }) => {
  test.setTimeout(90_000);
  await bootstrapCombatScene(page);

  await page.locator('g.board-token-group').filter({ hasText: 'Abutre' }).first().click({ force: true });
  const hpDialog = page.getByRole('dialog', { name: 'Controle de Vida' });
  await expect(hpDialog).toBeVisible();
  const currentHpBefore = Number.parseInt(
    (await page.getByTestId('current-hp-display').innerText()).trim(),
    10,
  );
  expect(Number.isNaN(currentHpBefore)).toBe(false);
  await expect(page.getByTestId('temp-hp-display')).toHaveText('0');

  await page.getByRole('button', { name: 'Aplicar dano' }).click();
  await expect(page.getByTestId('current-hp-display')).toHaveText(String(Math.max(0, currentHpBefore - 1)));

  await page.getByRole('spinbutton', { name: 'Quantidade para aplicar' }).fill('3');
  await page.getByRole('button', { name: 'Conceder HP temporário' }).click();
  await expect(page.getByTestId('temp-hp-display')).toHaveText('3');

  await moveTokenByOffset(page, 'Águia', 140, 110);
  await marqueeSelectAllTokens(page);

  await expect(page.getByRole('button', { name: 'Iniciar combate' })).toBeVisible();
  await page.getByRole('button', { name: 'Iniciar combate' }).click();

  await expect(page.getByText('Combate ativo')).toBeVisible();
  await expect(page.getByText(/Rodada 1/i)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Próximo turno' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Encerrar' })).toBeVisible();
});

test('combate ativo persiste após reload com estado autoritativo', async ({ page }) => {
  test.setTimeout(90_000);
  await bootstrapCombatScene(page);

  await moveTokenByOffset(page, 'Águia', 140, 110);
  await marqueeSelectAllTokens(page);
  await page.getByRole('button', { name: 'Iniciar combate' }).click();

  await expect(page.getByText('Combate ativo')).toBeVisible();
  await expect(page.getByText(/Rodada 1/i)).toBeVisible();

  await page.reload();

  await expect(page).toHaveURL(/\/game\/\d+$/);
  await expect(page.locator('g.board-token-group')).toHaveCount(2);
  await expect(page.getByText('Combate ativo')).toBeVisible();
  await expect(page.getByText(/Rodada 1/i)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Próximo turno' })).toBeVisible();
});
