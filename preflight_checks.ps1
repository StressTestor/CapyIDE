# Pre-flight checks for VS Code fork setup (PowerShell)

# Check GitHub CLI installation
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Error "ERROR: GitHub CLI not installed. Download from: https://cli.github.com"
    exit 1
}

# Check authentication status
$authStatus = gh auth status 2>&1
if (-not ($authStatus -match "Logged in to github.com")) {
    Write-Error "ERROR: Not authenticated with GitHub. Run: gh auth login"
    exit 1
}

# Check fork permissions
$user = gh api user --jq '.login'
$permissions = gh api "repos/microsoft/vscode" --jq '.permissions.push'
if ($permissions -ne "true") {
    Write-Error "ERROR: User '$user' doesn't have fork permissions for microsoft/vscode"
    exit 1
}

Write-Host "Pre-flight checks passed. Ready to run vscode_fork_setup.ps1"