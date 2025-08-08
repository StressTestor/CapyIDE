# Fork VS Code and create integration branch for CapyIDE (PowerShell)

# Authenticate with GitHub
gh auth login

# Fork microsoft/vscode repository
gh repo fork microsoft/vscode --clone=true --remote=true

# Navigate to cloned repository
Set-Location vscode

# Create and switch to integration branch
git checkout -b capyide-integration

# Configure upstream remote
git remote add upstream https://github.com/microsoft/vscode.git

# Set branch tracking
git branch -u upstream/main

Write-Host "VS Code fork created:"
Write-Host "• Forked repository: $(gh repo view --json nameWithOwner -q '.nameWithOwner')"
Write-Host "• Integration branch: capyide-integration"
Write-Host "• Upstream configured: microsoft/vscode"