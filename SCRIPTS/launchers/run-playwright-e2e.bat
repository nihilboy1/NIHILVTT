@echo off
rem Runner dedicado de e2e do frontend.
rem Executa apenas a suite Playwright do FRONTEND.
rem Use este arquivo quando quiser validar fluxos de navegador sem rodar a suite completa.
setlocal

set "ROOT=%~dp0..\..\"

echo [NIHILVTT] Executando suite Playwright do frontend...

call pnpm -C "%ROOT%FRONTEND" e2e
if errorlevel 1 (
  echo [NIHILVTT] Falha na suite Playwright do frontend.
  exit /b 1
)

echo [NIHILVTT] Suite Playwright concluida com sucesso.

endlocal
