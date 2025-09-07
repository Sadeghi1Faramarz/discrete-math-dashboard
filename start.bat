@echo off
TITLE Dashboard Launcher

echo.
echo ===================================================
echo  Starting Discrete Mathematics Dashboard...
echo ===================================================
echo.

REM --- Step 1: Check if the 'build' directory exists ---
IF NOT EXIST .\\build (
    echo [ERROR] 'build' directory not found.
    echo Please run 'npm run build' first to create the production version.
    echo.
    pause
    exit /b
)

REM --- Step 2: Check if 'serve' is installed ---
where serve >nul 2>nul
IF %ERRORLEVEL% NEQ 0 (
    echo [ERROR] The 'serve' command was not found.
    echo Please install it globally by running this command first:
    echo npm install -g serve
    echo.
    pause
    exit /b
)

REM --- Step 3: Start the server and launch the browser ---
echo [INFO] Starting server...
echo [INFO] The browser will open automatically at http://localhost:3000
echo.
echo Press Ctrl+C in this window to stop the server.
echo.

REM Automatically open the default browser after a short delay
timeout /t 2 /nobreak > nul
start http://localhost:3000

REM Start the server (this command will keep the window open)
serve -s build
