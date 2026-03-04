@echo off
rem Launcher principal de uso diario.
rem Reinicia backend e frontend sem rodar testes.
rem Use este arquivo quando quiser apenas subir o ambiente rapidamente.
setlocal

set "LAUNCHERS_DIR=%~dp0"
set "BACKEND_TITLE=NIHILVTT Backend"
set "FRONTEND_TITLE=NIHILVTT Frontend"

echo [NIHILVTT] Reiniciando ambiente local...
echo [NIHILVTT] Encerrando instancias antigas...

for %%T in ("%BACKEND_TITLE%" "%FRONTEND_TITLE%") do (
  taskkill /FI "WINDOWTITLE eq %%~T*" /F /T >nul 2>&1
)

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$ports = @(8080, 5173); foreach ($port in $ports) { try { $conns = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction Stop; foreach ($conn in $conns) { if ($conn.OwningProcess -gt 0) { Stop-Process -Id $conn.OwningProcess -Force -ErrorAction SilentlyContinue } } } catch { } }"

timeout /t 1 /nobreak >nul

echo [NIHILVTT] Subindo backend...
start "%BACKEND_TITLE%" cmd /k call "%LAUNCHERS_DIR%run-backend-dev.bat"

echo [NIHILVTT] Subindo frontend...
start "%FRONTEND_TITLE%" cmd /k call "%LAUNCHERS_DIR%run-frontend-dev.bat"

echo [NIHILVTT] Backend e frontend iniciados em janelas separadas.
echo [NIHILVTT] Use reset-safe.bat para gate rapido de smoke tests.
echo [NIHILVTT] Use run-full-tests.bat para rodar a suite completa fora do ciclo de boot.

endlocal
