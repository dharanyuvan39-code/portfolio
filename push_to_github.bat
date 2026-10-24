@echo off
title Push Portfolio to GitHub
echo ========================================================
echo Pushing Yuvan T's Portfolio to GitHub Repository:
echo https://github.com/25bit064-coder/portfolio.git
echo ========================================================
echo.
"C:\Users\KGCAS\AppData\Local\GitHubDesktop\app-3.5.6\resources\app\git\cmd\git.exe" push -u origin main
echo.
if %errorlevel% equ 0 (
    echo [SUCCESS] Portfolio successfully pushed to GitHub!
) else (
    echo [NOTE] Push requires GitHub authentication.
    echo If this is your first time pushing:
    echo 1. Ensure the repository exists at: https://github.com/25bit064-coder/portfolio
    echo 2. Complete the GitHub login prompt in your browser window.
)
echo.
pause
