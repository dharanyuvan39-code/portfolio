@echo off
title Push Portfolio to GitHub
echo ========================================================
echo Pushing Yuvan T's Portfolio to GitHub Repository:
echo https://github.com/dharanyuvan39-code/portfolio.git
echo ========================================================
echo.
git push -u origin main
echo.
if %errorlevel% equ 0 (
    echo [SUCCESS] Portfolio successfully pushed to GitHub!
) else (
    echo [NOTE] Push failed.
    echo Ensure you are connected to the internet and authenticated.
)
echo.
pause
