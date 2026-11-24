@echo off
title Push predX to GitHub
color 0A
cls
echo ========================================================
echo   Connecting predX to GitHub and Pushing Code...
echo ========================================================
echo.
echo Repository: https://github.com/thesameerpasha/predX.git
echo Branch: main
echo.

cd /d "%~dp0"
set "PATH=C:\Program Files\Git\cmd;%PATH%"

echo Running: git push -u origin main
echo.
git push -u origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo   SUCCESS! All files have been pushed to GitHub!
    echo   View your repository at: https://github.com/thesameerpasha/predX
    echo ========================================================
) else (
    echo ========================================================
    echo   Push failed or was cancelled.
    echo ========================================================
)
echo.
pause
