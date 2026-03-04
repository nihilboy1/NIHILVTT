@echo off
rem Helper interno de boot.
rem Sobe somente o backend Spring Boot.
rem E usado pelos launchers de reset; nao e o ponto de entrada principal.
setlocal

set "ROOT=%~dp0..\..\"

title NIHILVTT Backend
call mvn -f "%ROOT%BACKEND-JAVA\pom.xml" spring-boot:run

endlocal
