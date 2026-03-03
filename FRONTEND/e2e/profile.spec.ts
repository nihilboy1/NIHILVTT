import { expect, Page, test } from '@playwright/test';

import { buildUser, DELETE_PHRASE, registerUser } from './helpers/auth';

const ONE_PIXEL_PNG_BASE64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO0wA1sAAAAASUVORK5CYII=';

async function uploadAvatarAndCrop(page: Page, file: { name: string; mimeType: string; buffer: Buffer }) {
  await page.locator('input[type="file"]').setInputFiles(file);
  await page.getByRole('button', { name: /Confirmar enquadramento/i }).click();
}

async function confirmSaveAvatar(page: Page, currentPassword: string) {
  await page.getByRole('button', { name: /Salvar foto/i }).click();

  const savePasswordInput = page.locator('input[name="save_avatar_password"]');
  await expect(savePasswordInput).toBeVisible();
  await savePasswordInput.click();
  await savePasswordInput.fill(currentPassword);

  await page.getByRole('button', { name: /Confirmar e salvar/i }).click();
  await expect(savePasswordInput).toBeHidden({ timeout: 15000 });
}

test('profile update com senha atual inválida mostra erro no modal', async ({ page }) => {
  const user = buildUser('profile-update-invalid-password');
  await registerUser(page, user);

  await page.getByRole('button', { name: 'Perfil' }).click();
  await expect(page).toHaveURL(/\/profile$/);

  await page.locator('input[type="text"]:visible').first().fill(`${user.name} Editado`);
  const saveChangesButton = page.getByRole('button', { name: /SALVAR ALTERAÇÕES/i });
  await expect(saveChangesButton).toBeEnabled();
  await saveChangesButton.click();

  const savePasswordInput = page.locator('input[name="save_profile_password"]');
  await savePasswordInput.click();
  await savePasswordInput.fill('senha-errada');

  await page.getByRole('button', { name: /Confirmar e salvar/i }).click();

  await expect(page.getByText(/senha atual inválida/i)).toBeVisible();
});

test('delete account exige frase e senha no modal', async ({ page }) => {
  const user = buildUser('delete-account-requires-phrase');
  await registerUser(page, user);

  await page.getByRole('button', { name: 'Perfil' }).click();
  await expect(page).toHaveURL(/\/profile$/);

  await page.getByRole('button', { name: /EXCLUIR CONTA PERMANENTEMENTE/i }).click();

  const deleteButton = page.getByRole('button', { name: /Excluir permanentemente/i });
  await expect(deleteButton).toBeDisabled();

  const deletePasswordInput = page.locator('input[name="delete_password_input"]');
  await deletePasswordInput.click();
  await deletePasswordInput.fill(user.password);

  await deleteButton.click();

  await expect(page.getByText(/texto de confirmação está incorreto/i)).toBeVisible();
});

test('update profile com senha correta salva nome com sucesso', async ({ page }) => {
  const user = buildUser('profile-update-success');
  const updatedName = `${user.name} Novo`;
  await registerUser(page, user);

  await page.getByRole('button', { name: 'Perfil' }).click();
  await expect(page).toHaveURL(/\/profile$/);

  await page.locator('input[type="text"]:visible').first().fill(updatedName);
  await page.getByRole('button', { name: /SALVAR ALTERAÇÕES/i }).click();

  const savePasswordInput = page.locator('input[name="save_profile_password"]');
  await savePasswordInput.click();
  await savePasswordInput.fill(user.password);

  await page.getByRole('button', { name: /Confirmar e salvar/i }).click();

  await expect(page.getByText(/perfil atualizado com sucesso/i)).toBeVisible();
  await expect(page.locator('input[type="text"]:visible').first()).toHaveValue(updatedName);
});

test('avatar upload com imagem válida salva com sucesso', async ({ page }) => {
  const user = buildUser('avatar-upload-success');
  await registerUser(page, user);

  await page.getByRole('button', { name: 'Perfil' }).click();
  await expect(page).toHaveURL(/\/profile$/);

  await uploadAvatarAndCrop(page, {
    name: 'avatar.png',
    mimeType: 'image/png',
    buffer: Buffer.from(ONE_PIXEL_PNG_BASE64, 'base64'),
  });

  await confirmSaveAvatar(page, user.password);

  await expect(page.getByText(/foto de perfil atualizada com sucesso/i)).toBeVisible();
  await expect(page.getByAltText('Avatar')).toHaveAttribute('src', /\/media\/avatars\//i);
});

test('avatar removido salva com sucesso', async ({ page }) => {
  const user = buildUser('avatar-remove-success');
  await registerUser(page, user);

  await page.getByRole('button', { name: 'Perfil' }).click();
  await expect(page).toHaveURL(/\/profile$/);

  await uploadAvatarAndCrop(page, {
    name: 'avatar.png',
    mimeType: 'image/png',
    buffer: Buffer.from(ONE_PIXEL_PNG_BASE64, 'base64'),
  });
  await confirmSaveAvatar(page, user.password);

  await page.getByRole('button', { name: /Remover Foto/i }).click();
  await confirmSaveAvatar(page, user.password);

  await expect(page.getByText(/foto de perfil atualizada com sucesso/i)).toBeVisible();
  await expect(page.getByText(/Sem foto/i)).toBeVisible();
});

test('avatar com tipo inválido mostra erro', async ({ page }) => {
  const user = buildUser('avatar-invalid-type');
  await registerUser(page, user);

  await page.getByRole('button', { name: 'Perfil' }).click();
  await expect(page).toHaveURL(/\/profile$/);

  await page.locator('input[type="file"]').setInputFiles({
    name: 'avatar.txt',
    mimeType: 'text/plain',
    buffer: Buffer.from('not-an-image', 'utf-8'),
  });

  await expect(page.getByText(/Selecione um arquivo de imagem válido/i)).toBeVisible();
});

test('avatar acima de 3MB mostra erro', async ({ page }) => {
  const user = buildUser('avatar-too-large');
  await registerUser(page, user);

  await page.getByRole('button', { name: 'Perfil' }).click();
  await expect(page).toHaveURL(/\/profile$/);

  await page.locator('input[type="file"]').setInputFiles({
    name: 'avatar-large.png',
    mimeType: 'image/png',
    buffer: Buffer.alloc(3_100_000, 1),
  });

  await expect(page.getByText(/A imagem deve ter no máximo 3MB/i)).toBeVisible();
});

test('modal de delete suporta navegação por teclado e fecha com Escape', async ({ page }) => {
  const user = buildUser('delete-modal-keyboard');
  await registerUser(page, user);

  await page.getByRole('button', { name: 'Perfil' }).click();
  await expect(page).toHaveURL(/\/profile$/);

  const triggerButton = page.getByRole('button', { name: /EXCLUIR CONTA PERMANENTEMENTE/i });
  await triggerButton.focus();
  await expect(triggerButton).toBeFocused();
  await page.keyboard.press('Enter');

  const modal = page.getByRole('dialog', { name: /Confirmar exclusão de conta/i });
  const closeButton = page.getByRole('button', { name: /Fechar modal/i });
  const cancelButton = page.getByRole('button', { name: /^Cancelar$/i });

  await expect(modal).toBeVisible();
  await expect(closeButton).toBeFocused();

  await page.keyboard.press('Shift+Tab');
  await expect(cancelButton).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(closeButton).toBeFocused();

  await page.keyboard.press('Escape');
  await expect(modal).toBeHidden();
  await expect(triggerButton).toBeVisible();
});

test('delete account com senha e frase corretas remove conta', async ({ page }) => {
  const user = buildUser('delete-account-success');
  await registerUser(page, user);

  await page.getByRole('button', { name: 'Perfil' }).click();
  await expect(page).toHaveURL(/\/profile$/);

  await page.getByRole('button', { name: /EXCLUIR CONTA PERMANENTEMENTE/i }).click();

  const deletePasswordInput = page.locator('input[name="delete_password_input"]');
  await deletePasswordInput.click();
  await deletePasswordInput.fill(user.password);

  await page.locator('label:has-text("Digite exatamente") + input').fill(DELETE_PHRASE);
  await page.getByRole('button', { name: /Excluir permanentemente/i }).click();

  await expect(page).toHaveURL(/\/login$/);

  await page.getByLabel('Email').fill(user.email);
  await page.locator('#password').fill(user.password);
  await page.getByRole('button', { name: 'ENTRAR' }).click();
  await expect(page.getByText(/credenciais inválidas/i)).toBeVisible();
});