@echo off
rem Launcher principal de uso diario.
rem Reinicia backend e frontend sem rodar testes.
rem Use este arquivo quando quiser apenas subir o ambiente rapidamente.
setlocal

set "LAUNCHERS_DIR=%~dp0"
set "ROOT=%LAUNCHERS_DIR%..\..\"
for %%I in ("%ROOT%") do set "ROOT=%%~fI"
set "BACKEND_TITLE=NIHILVTT Backend"
set "FRONTEND_TITLE=NIHILVTT Frontend"
set "BACKEND_LOG=%ROOT%backend.log"
set "BACKEND_LOG_MAX_LINES=12000"

echo [NIHILVTT] Reiniciando ambiente local...
echo [NIHILVTT] Encerrando instancias antigas...

for %%T in ("%BACKEND_TITLE%" "%FRONTEND_TITLE%") do (
  taskkill /FI "WINDOWTITLE eq %%~T*" /F /T >nul 2>&1
)

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$ports = @(8080, 5173); foreach ($port in $ports) { try { $conns = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction Stop; foreach ($conn in $conns) { if ($conn.OwningProcess -gt 0) { Stop-Process -Id $conn.OwningProcess -Force -ErrorAction SilentlyContinue } } } catch { } }"

timeout /t 1 /nobreak >nul

echo [NIHILVTT] Preparando backend.log (max %BACKEND_LOG_MAX_LINES% linhas)...
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$logPath = '%BACKEND_LOG%'; $maxLines = %BACKEND_LOG_MAX_LINES%; if (Test-Path -LiteralPath $logPath) { $lineCount = (Get-Content -LiteralPath $logPath | Measure-Object -Line).Lines; if ($lineCount -gt $maxLines) { Get-Content -LiteralPath $logPath -Tail $maxLines | Set-Content -LiteralPath $logPath -Encoding UTF8 } } else { New-Item -ItemType File -Path $logPath -Force | Out-Null }"

echo [NIHILVTT] Subindo backend...
start "%BACKEND_TITLE%" powershell -NoExit -NoProfile -ExecutionPolicy Bypass -Command ^
  "$root = '%ROOT%'; $logPath = '%BACKEND_LOG%'; Set-Location -LiteralPath $root; $pomPath = Join-Path $root 'BACKEND-JAVA\pom.xml'; mvn -f $pomPath spring-boot:run *>&1 | Tee-Object -FilePath $logPath -Append"

echo [NIHILVTT] Subindo frontend...
start "%FRONTEND_TITLE%" powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$host.UI.RawUI.WindowTitle = '%FRONTEND_TITLE%'; $root = '%ROOT%'; Set-Location -LiteralPath (Join-Path $root 'FRONTEND'); pnpm dev"

echo [NIHILVTT] Backend e frontend iniciados em janelas separadas.
echo [NIHILVTT] Log do backend: %BACKEND_LOG%
echo [NIHILVTT] Use reset-safe.bat para gate rapido de smoke tests.
echo [NIHILVTT] Use run-full-tests.bat para rodar a suite completa fora do ciclo de boot.

endlocal
