@echo off
rem Launcher com gate rapido de seguranca.
rem Roda um subconjunto critico de smoke tests e so depois sobe backend e frontend.
rem Use este arquivo quando quiser um reset com validacao rapida antes do boot.
setlocal

set "LAUNCHERS_DIR=%~dp0"
set "ROOT=%~dp0..\..\"
set "BACKEND_TITLE=NIHILVTT Backend"
set "FRONTEND_TITLE=NIHILVTT Frontend"

echo [NIHILVTT] Reiniciando ambiente local com smoke gate...
echo [NIHILVTT] Encerrando instancias antigas...

for %%T in ("%BACKEND_TITLE%" "%FRONTEND_TITLE%") do (
  taskkill /FI "WINDOWTITLE eq %%~T*" /F /T >nul 2>&1
)

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$ports = @(8080, 5173); foreach ($port in $ports) { try { $conns = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction Stop; foreach ($conn in $conns) { if ($conn.OwningProcess -gt 0) { Stop-Process -Id $conn.OwningProcess -Force -ErrorAction SilentlyContinue } } } catch { } }"

timeout /t 1 /nobreak >nul

echo [NIHILVTT] Executando smoke tests do backend...
call mvn -f "%ROOT%BACKEND-JAVA\pom.xml" test "-Dtest=SessionCharacterPayloadValidatorTest,GameSessionCommandServiceMonsterDuplicationTest,GameSessionCommandServiceRemoveTokensTest,GameSessionCommandServiceOwnershipTest"
if errorlevel 1 (
  echo [NIHILVTT] Falha nos testes do backend. Ambiente nao sera reaberto.
  exit /b 1
)

echo [NIHILVTT] Executando smoke tests do frontend...
call pnpm -C "%ROOT%FRONTEND" test -- --runInBand ^
  "src/features/game/model/__tests__/gameSessionHydrator.test.ts" ^
  "src/features/game/model/__tests__/gameSessionEventHandlers.test.ts" ^
  "src/features/modalManager/model/__tests__/modalStore.test.ts" ^
  "src/features/characterCreation/model/hooks/__tests__/useCharacterCreation.test.ts" ^
  "src/widgets/compendiumPanel/ui/__tests__/CompendiumPanel.test.tsx" ^
  "src/features/characterUpdateHp/ui/__tests__/HPControlModal.test.tsx" ^
  "src/shared/ui/__tests__/Modal.test.tsx"
if errorlevel 1 (
  echo [NIHILVTT] Falha nos testes do frontend. Ambiente nao sera reaberto.
  exit /b 1
)

echo [NIHILVTT] Subindo backend...
start "%BACKEND_TITLE%" cmd /k call "%LAUNCHERS_DIR%run-backend-dev.bat"

echo [NIHILVTT] Subindo frontend...
start "%FRONTEND_TITLE%" cmd /k call "%LAUNCHERS_DIR%run-frontend-dev.bat"

echo [NIHILVTT] Smoke tests passaram. Backend e frontend iniciados.

endlocal
