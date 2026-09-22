@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is required. Install Node.js 22 LTS, then try again.
  pause
  exit /b 1
)
if not exist "node_modules\vite\bin\vite.js" (
  call npm ci
  if errorlevel 1 (
    echo Dependency installation failed. Check your internet connection.
    pause
    exit /b 1
  )
)
call npm run validate:data
if errorlevel 1 (
  echo Lens data validation failed. See the message above.
  pause
  exit /b 1
)
echo Open http://127.0.0.1:5173/ in your browser.
echo Keep this window open. Press Ctrl+C to stop.
call npm run dev -- --open
if errorlevel 1 pause
