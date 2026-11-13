@echo off
echo =======================================================
echo   meelTe Video Generator - Previewing in Browser
echo =======================================================
echo.

cd /d "%~dp0"

if not exist "remotion-project\public\scenes" mkdir "remotion-project\public\scenes"
copy /Y "outputs\MEE-2026-0001\scenes\*.jpg" "remotion-project\public\scenes\"

cd remotion-project
echo Starting Remotion Studio on http://localhost:3000 ...
call npx remotion preview

