# PowerShell script to clean legacy assets and force push ultra-lightweight build

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "DANG DON DEP VA PUSH LAI BAN SIEU NHE (CHI ~8MB)" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

# 1. Chuyen video cu va file cu vao _archive
New-Item -ItemType Directory -Force -Path "_archive\legacy_assets" | Out-Null
Move-Item -Path "assets\videos" -Destination "_archive\legacy_assets\" -Force -ErrorAction SilentlyContinue
Move-Item -Path "assets\brand\phatdat-*" -Destination "_archive\legacy_assets\" -Force -ErrorAction SilentlyContinue
Move-Item -Path "assets\hero\hero-ecosystem-*" -Destination "_archive\legacy_assets\" -Force -ErrorAction SilentlyContinue
Move-Item -Path "assets\hero\skyscraper-*" -Destination "_archive\legacy_assets\" -Force -ErrorAction SilentlyContinue
Move-Item -Path "assets\hero\hero-banner-*" -Destination "_archive\legacy_assets\" -Force -ErrorAction SilentlyContinue
Move-Item -Path "assets\media" -Destination "_archive\legacy_assets\" -Force -ErrorAction SilentlyContinue

# 2. Sao chep 2 anh 3D so 68 moi vao assets/hero
Copy-Item -Path "C:\Users\dangd\.gemini\antigravity-ide\brain\baf0fbc8-c35c-4b51-8c70-506023070433\hero_68digital_3d_1789618044408.jpg" -Destination "assets\hero\hero-68digital-dark.jpg" -Force
Copy-Item -Path "C:\Users\dangd\.gemini\antigravity-ide\brain\baf0fbc8-c35c-4b51-8c70-506023070433\hero_68digital_light_1789618089184.jpg" -Destination "assets\hero\hero-68digital-light.jpg" -Force

# 3. Reset commit 141MB cu va commit lai ban sach
git update-ref -d HEAD
git add .
git commit -m "Deploy 68DIGITAL: Clean lightweight production build"

# 4. Ghi de ban sach len GitHub dtrdat/68digital
git push -f origin main

Write-Host "========================================================" -ForegroundColor Green
Write-Host "HOAN TAT! Repo tren GitHub da duoc lam sach, chi con ~8MB!" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green
