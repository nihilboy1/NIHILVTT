@echo off
setlocal

set "LAUNCHERS_DIR=%~dp0"
set "SCRIPTS_DIR=%LAUNCHERS_DIR%..\"
set "ROOT=%SCRIPTS_DIR%..\"

echo [NIHILVTT] Reiniciando ambiente local...
echo [NIHILVTT] Encerrando instancias antigas...

for %%T in ("NIHILVTT Backend" "NIHILVTT Frontend") do (
  taskkill /FI "WINDOWTITLE eq %%~T*" /F /T >nul 2>&1
)

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$ports = @(8080, 5173); foreach ($port in $ports) { try { $conns = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction Stop; foreach ($conn in $conns) { if ($conn.OwningProcess -gt 0) { Stop-Process -Id $conn.OwningProcess -Force -ErrorAction SilentlyContinue } } } catch { } }"

timeout /t 1 /nobreak >nul

echo [NIHILVTT] Subindo backend...
start "NIHILVTT Backend" cmd /c "title NIHILVTT Backend && cd /d "%ROOT%BACKEND-JAVA" && mvn spring-boot:run"

echo [NIHILVTT] Subindo frontend...
start "NIHILVTT Frontend" cmd /c "title NIHILVTT Frontend && cd /d "%ROOT%FRONTEND" && pnpm dev"

echo [NIHILVTT] Backend e frontend iniciados em janelas separadas.
echo [NIHILVTT] As janelas fecham automaticamente quando os processos terminam.
echo [NIHILVTT] Portas padrao limpas: backend 8080, frontend 5173.

endlocal
