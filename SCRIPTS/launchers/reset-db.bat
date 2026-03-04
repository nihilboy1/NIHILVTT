@echo off
rem Utilitario de manutencao local.
rem Encerra backend/frontend, limpa e recria o banco H2 de desenvolvimento.
rem Nao reabre o ambiente automaticamente.
setlocal

set "LAUNCHERS_DIR=%~dp0"
set "SCRIPTS_DIR=%LAUNCHERS_DIR%..\"
set "ROOT=%SCRIPTS_DIR%..\"

echo [NIHILVTT] Resetando banco local...
echo [NIHILVTT] Encerrando instancias antigas...

for %%T in ("NIHILVTT Backend" "NIHILVTT Frontend") do (
  taskkill /FI "WINDOWTITLE eq %%~T*" /F /T >nul 2>&1
)

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$ports = @(8080, 5173); foreach ($port in $ports) { try { $conns = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction Stop; foreach ($conn in $conns) { if ($conn.OwningProcess -gt 0) { Stop-Process -Id $conn.OwningProcess -Force -ErrorAction SilentlyContinue } } } catch { } }"

timeout /t 1 /nobreak >nul

echo [NIHILVTT] Limpando e recriando o banco local H2...
cd /d "%ROOT%BACKEND-JAVA"
mvn "-Dflyway.cleanDisabled=false" "-Dflyway.url=jdbc:h2:file:./data/nihilvtt;MODE=PostgreSQL;AUTO_SERVER=TRUE" "-Dflyway.user=sa" "-Dflyway.password=sa" flyway:clean flyway:migrate

if errorlevel 1 (
  echo [NIHILVTT] Falha ao resetar o banco.
  exit /b 1
)

echo [NIHILVTT] Banco local resetado com sucesso.

echo [NIHILVTT] Nenhum backend/frontend foi reaberto automaticamente.

endlocal
