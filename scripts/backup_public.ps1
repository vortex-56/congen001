param(
    [string]$PublicDir = "public",
    [string]$BackupDir = "public\\legacy_html_backup"
)

Write-Host "Backing up legacy HTML exports from '$PublicDir' to '$BackupDir'..."

if (-not (Test-Path $PublicDir)) {
    Write-Error "Public directory '$PublicDir' does not exist."
    exit 1
}

if (-not (Test-Path $BackupDir)) {
    New-Item -ItemType Directory -Path $BackupDir -Force | Out-Null
}

# Move .html files in the public root (excluding index.html) and associated *_files dirs
Get-ChildItem -Path $PublicDir -File -Filter "*.html" | ForEach-Object {
    if ($_.Name -ieq 'index.html') { return }
    $dest = Join-Path $BackupDir $_.Name
    Write-Host "Moving file: $($_.FullName) -> $dest"
    Move-Item -Path $_.FullName -Destination $dest -Force

    # try to move associated folder like "page_files" or "*_files"
    $folderName = [System.IO.Path]::GetFileNameWithoutExtension($_.Name) + "_files"
    $folderPath = Join-Path $PublicDir $folderName
    if (Test-Path $folderPath) {
        $destFolder = Join-Path $BackupDir $folderName
        Write-Host "Moving folder: $folderPath -> $destFolder"
        Move-Item -Path $folderPath -Destination $destFolder -Force
    }
}

Write-Host "Backup complete. Files moved into: $BackupDir"
