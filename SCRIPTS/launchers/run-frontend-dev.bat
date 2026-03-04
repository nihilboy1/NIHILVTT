@echo off
rem Helper interno de boot.
rem Sobe somente o frontend em modo dev.
rem E usado pelos launchers de reset; nao e o ponto de entrada principal.
setlocal

set "ROOT=%~dp0..\..\"

title NIHILVTT Frontend
call pnpm -C "%ROOT%FRONTEND" dev

endlocal
