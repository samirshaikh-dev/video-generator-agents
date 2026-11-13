@echo off
echo =======================================================
echo   Generating AI Voiceover using Neural TTS (Node.js)
echo =======================================================
echo.

cd /d "%~dp0"
node generate_voice.js

echo.
pause

