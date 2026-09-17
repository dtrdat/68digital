@echo off
chcp 65001 > nul
echo ========================================================
echo DANG CHUAN BI VA PUSH CODE LEN GITHUB: dtrdat/68digital
echo ========================================================

echo.
echo [1/5] Sao chep hinh anh 3D so 68 vao assets/hero...
copy /Y "C:\Users\dangd\.gemini\antigravity-ide\brain\baf0fbc8-c35c-4b51-8c70-506023070433\hero_68digital_3d_1789618044408.jpg" "assets\hero\hero-68digital-dark.jpg"
copy /Y "C:\Users\dangd\.gemini\antigravity-ide\brain\baf0fbc8-c35c-4b51-8c70-506023070433\hero_68digital_light_1789618089184.jpg" "assets\hero\hero-68digital-light.jpg"

echo.
echo [2/5] Git add cac tep tin can thiet (da bo qua _archive va video cu)...
git add .

echo.
echo [3/5] Tao commit...
git commit -m "Deploy 68DIGITAL landing page and brand ecosystem"

echo.
echo [4/5] Chuyen nhanh chinh sang main...
git branch -M main

echo.
echo [5/5] Dang push code len GitHub dtrdat/68digital...
git push -u origin main

echo.
echo ========================================================
echo HOAN TAT! Ma nguon da duoc day len https://github.com/dtrdat/68digital
echo ========================================================
pause
