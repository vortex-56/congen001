# PowerShell script to replace public asset paths with /congen001/ prefix
Get-ChildItem -Path .\public -Recurse -Include *.html,*.css,*.js | ForEach-Object {
    $path = $_.FullName
    (Get-Content $path -Raw) -replace "https?://www\.congen\.com\.pe//public/","/congen001/" -replace "\.\\02-Productos.*?_files/","/congen001/" | Set-Content $path -Force
    Write-Host "Patched: $path"
}
Write-Host "Done"
