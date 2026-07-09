param(
    [string]$RepoPath = ".",
    [string]$Drive = "Z",
    [string]$Commands = "git status"
)

# Resolve full path
try {
    $full = (Resolve-Path -Path $RepoPath -ErrorAction Stop).ProviderPath
} catch {
    Write-Error "Could not resolve path: $RepoPath"
    exit 1
}

$driveLetter = "${Drive}:" # e.g. Z:\

if (Get-PSDrive -Name $Drive -ErrorAction SilentlyContinue) {
    Write-Host "Drive ${Drive}: already exists. Choose another drive letter or remove the existing mapping." -ForegroundColor Yellow
    exit 1
}

Write-Host "Mapping $full to ${Drive}:" -ForegroundColor Green
subst "${Drive}:" "$full"
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to create subst. Try running PowerShell as Administrator or choose another drive letter."
    exit 1
}

try {
    Push-Location "${Drive}:"
    Write-Host "Current location: $(Get-Location)" -ForegroundColor Cyan
    Write-Host "Running commands: $Commands" -ForegroundColor Cyan
    Invoke-Expression $Commands
} finally {
    Pop-Location -ErrorAction SilentlyContinue
    Write-Host "Removing mapping ${Drive}:" -ForegroundColor Green
    subst "${Drive}:" /D
}

Write-Host "Done." -ForegroundColor Green
