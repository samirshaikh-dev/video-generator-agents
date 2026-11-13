@echo off
echo =======================================================
echo   meelTe Video Generator - Rendering 25s Bakery Reel
echo =======================================================
echo.

cd /d "%~dp0"

echo [1/4] Generating AI Voiceover narration...
if not exist "remotion-project\public\audio" mkdir "remotion-project\public\audio"
node generate_voice.js

echo.
echo [2/4] Setting up scene assets in Remotion public folder...
if not exist "remotion-project\public\scenes" mkdir "remotion-project\public\scenes"
copy /Y "outputs\MEE-2026-0001\scenes\*.jpg" "remotion-project\public\scenes\"

echo.
echo [3/4] Rendering 1080x1920 MP4 Video (750 frames at 30fps)...
cd remotion-project
call npx remotion render MeelteBakeryReel "..\meelte_bakery_reel.mp4"

cd ..
echo.
if exist "meelte_bakery_reel.mp4" (
    echo =======================================================
    echo [4/4] SUCCESS! Video generated at:
    echo %~dp0meelte_bakery_reel.mp4
    echo =======================================================
) else (
    echo [!] Render did not complete. Please see terminal logs above.
)
echo.
pause
