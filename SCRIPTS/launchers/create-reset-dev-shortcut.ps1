# Utilitario de conveniencia.
# Recria o atalho "NIHILVTT RESET APP.lnk" apontando para reset-dev.bat.
# Use este script quando o shortcut precisar ser regenerado no Windows.
$ErrorActionPreference = 'Stop'

$launchersDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$scriptsDir = Split-Path -Parent $launchersDir
$root = Split-Path -Parent $scriptsDir
$batchPath = Join-Path $launchersDir 'reset-dev.bat'
$shortcutPath = Join-Path $launchersDir 'NIHILVTT RESET APP.lnk'
$cmdPath = Join-Path $env:SystemRoot 'System32\cmd.exe'
$icoPath = Join-Path $scriptsDir 'assets\d20-purple.ico'

if (-not (Test-Path $batchPath)) {
  throw "Arquivo nao encontrado: $batchPath"
}

if (-not (Test-Path $icoPath)) {
  throw "Icone nao encontrado: $icoPath"
}

$wshShell = New-Object -ComObject WScript.Shell
$shortcut = $wshShell.CreateShortcut($shortcutPath)
$shortcut.TargetPath = $cmdPath
$shortcut.Arguments = "/c `"$batchPath`""
$shortcut.WorkingDirectory = $root
$shortcut.IconLocation = "$icoPath,0"
$shortcut.WindowStyle = 1
$shortcut.Description = 'Reinicia backend e frontend do NIHILVTT'
$shortcut.Save()

Write-Host "Atalho criado em: $shortcutPath"
Write-Host "Icone usado: $icoPath"
