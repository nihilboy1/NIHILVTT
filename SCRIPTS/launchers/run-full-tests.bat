@echo off
rem Runner de validacao completa.
rem Executa a suite inteira de testes (backend + frontend unitario + frontend e2e).
rem Nao sobe servidor; use fora do ciclo de boot para verificacao pesada.
setlocal

set "ROOT=%~dp0..\..\"

echo [NIHILVTT] Executando suite completa de testes...

echo [NIHILVTT] Etapa 1/2: backend...
call mvn -f "%ROOT%BACKEND-JAVA\pom.xml" test
if errorlevel 1 (
  echo [NIHILVTT] Falha na suite completa do backend.
  exit /b 1
)

echo [NIHILVTT] Etapa 2/2: frontend (unitarios + e2e)...
call pnpm -C "%ROOT%FRONTEND" test:front:all
if errorlevel 1 (
  echo [NIHILVTT] Falha na suite completa do frontend.
  exit /b 1
)

echo [NIHILVTT] Suite completa concluida com sucesso.

endlocal
