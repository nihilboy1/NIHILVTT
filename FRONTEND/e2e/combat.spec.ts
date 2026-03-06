import { expect, Locator, Page, test } from '@playwright/test';

import { buildUser, registerUser } from './helpers/auth';

type SpawnedToken = {
  tokenId: string;
};

async function createGameAndEnter(page: Page, title: string) {
  await page.goto('/games/new');
  await expect(page.getByRole('heading', { name: /Criar Novo Jogo/i })).toBeVisible();

  await page.getByLabel('Nome do jogo').fill(title);
  const createGameRequestPromise = page.waitForRequest(
    (request) => request.url() === 'http://localhost:8080/games' && request.method() === 'POST',
  );
  const createGameResponsePromise = page.waitForResponse(
    (response) =>
      response.url() === 'http://localhost:8080/games' && response.request().method() === 'POST',
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
  const board = page.getByRole('application', { name: /Tabuleiro do jogo/i });
  await expect(board).toBeVisible();
  return board;
}

async function getBoardCenter(board: Locator) {
  const box = await board.boundingBox();
  if (!box) {
    throw new Error('Nao foi possivel obter o bounding box do tabuleiro.');
  }

  return {
    x: box.x + box.width / 2,
    y: box.y + box.height / 2,
  };
}

async function spawnMonsterFromCompendium(
  page: Page,
  board: Locator,
  monsterName: string,
): Promise<SpawnedToken> {
  const spawnResponsePromise = page.waitForResponse(
    (response) =>
      /\/games\/\d+\/session\/monsters$/.test(response.url()) &&
      response.request().method() === 'POST' &&
      response.status() === 201,
  );

  await page
    .getByTitle(new RegExp(`Arraste ${monsterName} para o tabuleiro\\.$`, 'i'))
    .dragTo(board);

  const spawnResponse = await spawnResponsePromise;
  const spawnPayload = (await spawnResponse.json()) as {
    payload?: { token?: { id?: string } };
  };
  const tokenId = spawnPayload.payload?.token?.id;
  if (typeof tokenId !== 'string' || tokenId.trim().length === 0) {
    throw new Error(`Spawn de ${monsterName} retornou payload sem tokenId.`);
  }

  return { tokenId };
}

async function openMonsterDetails(page: Page, monsterName: string) {
  const monsterCard = page.getByTitle(
    new RegExp(`Arraste ${monsterName} para o tabuleiro\\.$`, 'i'),
  );
  await expect(monsterCard).toBeVisible();
  await monsterCard.getByRole('button', { name: 'Detalhes' }).click();
}

async function dragTopTokenFromBoardCenter(
  page: Page,
  board: Locator,
  offsetX: number,
  offsetY: number,
) {
  const center = await getBoardCenter(board);

  const moveTokenResponsePromise = page.waitForResponse(
    (response) =>
      /\/games\/\d+\/session\/tokens\/move$/.test(response.url()) &&
      response.request().method() === 'POST' &&
      response.ok(),
  );

  const startX = center.x;
  const startY = center.y;
  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(startX + offsetX, startY + offsetY, { steps: 12 });
  await page.mouse.up();

  await moveTokenResponsePromise;
}

async function marqueeSelectAroundBoardCenter(
  page: Page,
  board: Locator,
  movedTokenOffsetX: number,
  movedTokenOffsetY: number,
) {
  const center = await getBoardCenter(board);

  const startX = center.x - 70;
  const startY = center.y - 70;
  const endX = center.x + movedTokenOffsetX + 120;
  const endY = center.y + movedTokenOffsetY + 120;

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
  const vulture = await spawnMonsterFromCompendium(page, board, 'Abutre');
  const eagle = await spawnMonsterFromCompendium(page, board, 'Águia');

  return {
    board,
    tokenIds: [vulture.tokenId, eagle.tokenId],
  };
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
  const { board } = await bootstrapCombatScene(page);

  const movedTokenOffsetX = 180;
  const movedTokenOffsetY = 120;
  await dragTopTokenFromBoardCenter(page, board, movedTokenOffsetX, movedTokenOffsetY);

  const center = await getBoardCenter(board);
  await page.mouse.click(center.x, center.y);

  const hpDialog = page.getByRole('dialog', { name: 'Controle de Vida' });
  await expect(hpDialog).toBeVisible();
  const currentHpBefore = Number.parseInt(
    (await page.getByTestId('current-hp-display').innerText()).trim(),
    10,
  );
  expect(Number.isNaN(currentHpBefore)).toBe(false);
  await expect(page.getByTestId('temp-hp-display')).toHaveText('0');

  await page.getByRole('button', { name: 'Aplicar dano' }).click();
  await expect(page.getByTestId('current-hp-display')).toHaveText(
    String(Math.max(0, currentHpBefore - 1)),
  );

  await page.getByRole('spinbutton', { name: 'Quantidade para aplicar' }).fill('3');
  await page.getByRole('button', { name: 'Conceder HP temporário' }).click();
  await expect(page.getByTestId('temp-hp-display')).toHaveText('3');

  await marqueeSelectAroundBoardCenter(page, board, movedTokenOffsetX, movedTokenOffsetY);

  await expect(page.getByRole('button', { name: 'Iniciar combate' })).toBeVisible();
  await page.getByRole('button', { name: 'Iniciar combate' }).click();

  await expect(page.getByText('Combate ativo')).toBeVisible();
  await expect(page.getByText(/Rodada 1/i)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Próximo turno' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Encerrar' })).toBeVisible();
});

test('combate ativo persiste após reload com estado autoritativo', async ({ page }) => {
  test.setTimeout(90_000);
  const { board } = await bootstrapCombatScene(page);

  const movedTokenOffsetX = 180;
  const movedTokenOffsetY = 120;
  await dragTopTokenFromBoardCenter(page, board, movedTokenOffsetX, movedTokenOffsetY);

  await marqueeSelectAroundBoardCenter(page, board, movedTokenOffsetX, movedTokenOffsetY);
  await page.getByRole('button', { name: 'Iniciar combate' }).click();

  await expect(page.getByText('Combate ativo')).toBeVisible();
  await expect(page.getByText(/Rodada 1/i)).toBeVisible();

  await page.reload();

  await expect(page).toHaveURL(/\/game\/\d+$/);
  await expect(page.getByText('Combate ativo')).toBeVisible();
  await expect(page.getByText(/Rodada 1/i)).toBeVisible();
  await expect(page.getByText('Abutre', { exact: true })).toBeVisible();
  await expect(page.getByText('Águia', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Próximo turno' })).toBeVisible();
});
