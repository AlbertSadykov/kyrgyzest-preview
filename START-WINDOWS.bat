@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo ==========================================
echo    KYRGYZEST -- React + Tailwind preview
echo ==========================================
echo.
where npm >nul 2>nul
if errorlevel 1 (
  echo Node.js not detected. Install Node.js 20 or later first.
  pause
  exit /b 1
)
if not exist node_modules (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo npm install failed. Check internet and try again.
    pause
    exit /b 1
  )
)
start "" "http://localhost:5173/"
call npm run dev
pause
