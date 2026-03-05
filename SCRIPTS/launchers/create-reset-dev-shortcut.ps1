# Utilitario de conveniencia.
# Recria os atalhos principais do Windows para os launchers diarios do NIHILVTT.
# Hoje gera:
# - "NIHILVTT RESET APP.lnk" -> reset-dev.bat
# - "NIHILVTT PLAYWRIGHT E2E.lnk" -> run-playwright-e2e.bat
# Use este script quando os shortcuts precisarem ser regenerados no Windows.
$ErrorActionPreference = 'Stop'

$launchersDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$scriptsDir = Split-Path -Parent $launchersDir
$root = Split-Path -Parent $scriptsDir
$cmdPath = Join-Path $env:SystemRoot 'System32\cmd.exe'

$resetBatchPath = Join-Path $launchersDir 'reset-dev.bat'
$resetShortcutPath = Join-Path $launchersDir 'NIHILVTT RESET APP.lnk'
$resetIcoPath = Join-Path $scriptsDir 'assets\d20-purple.ico'

$playwrightBatchPath = Join-Path $launchersDir 'run-playwright-e2e.bat'
$playwrightShortcutPath = Join-Path $launchersDir 'NIHILVTT PLAYWRIGHT E2E.lnk'
$playwrightIcoPath = Join-Path $scriptsDir 'assets\playwright-e2e.ico'

if (-not (Test-Path $resetBatchPath)) {
  throw "Arquivo nao encontrado: $resetBatchPath"
}

if (-not (Test-Path $playwrightBatchPath)) {
  throw "Arquivo nao encontrado: $playwrightBatchPath"
}

if (-not (Test-Path $resetIcoPath)) {
  throw "Icone nao encontrado: $resetIcoPath"
}

if (-not (Test-Path $playwrightIcoPath)) {
  throw "Icone nao encontrado: $playwrightIcoPath"
}

$wshShell = New-Object -ComObject WScript.Shell

$resetShortcut = $wshShell.CreateShortcut($resetShortcutPath)
$resetShortcut.TargetPath = $cmdPath
$resetShortcut.Arguments = "/c `"$resetBatchPath`""
$resetShortcut.WorkingDirectory = $root
$resetShortcut.IconLocation = "$resetIcoPath,0"
$resetShortcut.WindowStyle = 1
$resetShortcut.Description = 'Reinicia backend e frontend do NIHILVTT'
$resetShortcut.Save()

$playwrightShortcut = $wshShell.CreateShortcut($playwrightShortcutPath)
$playwrightShortcut.TargetPath = $cmdPath
$playwrightShortcut.Arguments = "/c `"$playwrightBatchPath`""
$playwrightShortcut.WorkingDirectory = $root
$playwrightShortcut.IconLocation = "$playwrightIcoPath,0"
$playwrightShortcut.WindowStyle = 1
$playwrightShortcut.Description = 'Executa a suite Playwright do frontend do NIHILVTT'
$playwrightShortcut.Save()

Write-Host "Atalho criado em: $resetShortcutPath"
Write-Host "Icone usado: $resetIcoPath"
Write-Host "Atalho criado em: $playwrightShortcutPath"
Write-Host "Icone usado: $playwrightIcoPath"
