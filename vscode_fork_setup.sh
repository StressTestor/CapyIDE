#!/bin/bash
# Fork VS Code and create integration branch for CapyIDE

# Authenticate with GitHub
gh auth login

# Fork microsoft/vscode repository
gh repo fork microsoft/vscode --clone=true --remote=true

# Navigate to cloned repository
cd vscode

# Create and switch to integration branch
git checkout -b capyide-integration

# Configure upstream remote
git remote add upstream https://github.com/microsoft/vscode.git

# Set branch tracking
git branch -u upstream/main

echo "VS Code fork created:"
echo "• Forked repository: $(gh repo view --json nameWithOwner -q '.nameWithOwner')"
echo "• Integration branch: capyide-integration"
echo "• Upstream configured: microsoft/vscode"