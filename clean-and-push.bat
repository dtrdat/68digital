@echo off
chcp 65001 > nul
echo ========================================================
echo DANG DON DEP VA PUSH LAI BAN SIEU NHE (CHI ~8MB)
echo ========================================================

echo.
echo [1/4] Chuyen toan bo video cu va anh cu khong dung vao _archive...
if not exist "_archive\legacy_assets" mkdir "_archive\legacy_assets"
move /Y "assets\videos" "_archive\legacy_assets\" 2>nul
move /Y "assets\brand\phatdat-*" "_archive\legacy_assets\" 2>nul
move /Y "assets\hero\hero-ecosystem-*" "_archive\legacy_assets\" 2>nul
move /Y "assets\hero\skyscraper-*" "_archive\legacy_assets\" 2>nul
move /Y "assets\hero\hero-banner-*" "_archive\legacy_assets\" 2>nul
move /Y "assets\media" "_archive\legacy_assets\" 2>nul

echo.
echo [2/4] Sao chep 2 anh 3D so 68 moi vao assets/hero...
copy /Y "C:\Users\dangd\.gemini\antigravity-ide\brain\baf0fbc8-c35c-4b51-8c70-506023070433\hero_68digital_3d_1789618044408.jpg" "assets\hero\hero-68digital-dark.jpg"
copy /Y "C:\Users\dangd\.gemini\antigravity-ide\brain\baf0fbc8-c35c-4b51-8c70-506023070433\hero_68digital_light_1789618089184.jpg" "assets\hero\hero-68digital-light.jpg"

echo.
echo [3/4] Reset Git va commit lai CHI NHUNG TEP DANG DUNG...
git update-ref -d HEAD
git add .
git commit -m "Deploy 68DIGITAL: Clean lightweight production build"

echo.
echo [4/4] Ghi de commit sach len GitHub dtrdat/68digital...
git push -f origin main

echo.
echo ========================================================
echo HOAN TAT! Repo tren GitHub da duoc lam sach, chi con ~8MB!
echo ========================================================
pause
