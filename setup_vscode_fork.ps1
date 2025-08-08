# Master script for VS Code fork setup (PowerShell)

# Run pre-flight checks
.\preflight_checks.ps1
if (-not $?) {
    Write-Error "Pre-flight checks failed. Aborting."
    exit 1
}

# Execute fork setup
Write-Host "Starting VS Code fork process..."
.\vscode_fork_setup.ps1

# Verify setup
Set-Location vscode
$currentBranch = git branch --show-current
if ($currentBranch -eq "capyide-integration") {
    Write-Host "✅ VS Code fork setup completed successfully" -ForegroundColor Green
    Write-Host "Integration branch: $currentBranch"
} else {
    Write-Error "❌ Setup failed. Check output for errors."
    exit 1
}