# Скачивает фото автомобилей и шрифты в папки сайта.
# Запуск в терминале VS Code из папки сайта:
#   powershell -ExecutionPolicy Bypass -File tools\download-assets.ps1
# Уже скачанные файлы пропускаются, поэтому команду можно запускать повторно.
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$root = Split-Path -Parent $PSScriptRoot
$list = Get-Content -Raw -Encoding UTF8 (Join-Path $PSScriptRoot 'assets-manifest.json') | ConvertFrom-Json
$ok = 0; $skip = 0; $failed = @()
foreach ($item in $list) {
  $dest = Join-Path $root ($item.path -replace '/', '\')
  if ((Test-Path $dest) -and ((Get-Item $dest).Length -gt 0)) { $skip++; continue }
  New-Item -ItemType Directory -Force -Path (Split-Path -Parent $dest) | Out-Null
  try {
    Invoke-WebRequest -Uri $item.url -OutFile $dest -UseBasicParsing -UserAgent 'Mozilla/5.0'
    $ok++; Write-Host "OK  $($item.path)"
  } catch {
    if (Test-Path $dest) { Remove-Item $dest -Force }
    $failed += $item.path; Write-Host "ERR $($item.path): $($_.Exception.Message)"
  }
}
Write-Host "Downloaded: $ok, already there: $skip, errors: $($failed.Count)"
