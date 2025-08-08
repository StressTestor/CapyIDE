#!/bin/bash
# Pre-flight checks for VS Code fork setup

# Check GitHub CLI installation
if ! command -v gh &> /dev/null; then
  echo "ERROR: GitHub CLI not installed. Download from: https://cli.github.com"
  exit 1
fi

# Check authentication status
auth_status=$(gh auth status 2>&1)
if [[ $auth_status != *"Logged in to github.com"* ]]; then
  echo "ERROR: Not authenticated with GitHub. Run: gh auth login"
  exit 1
fi

# Check fork permissions
user=$(gh api user --jq '.login')
if ! gh api "repos/microsoft/vscode" --jq '.permissions.push' | grep -q true; then
  echo "ERROR: User '$user' doesn't have fork permissions for microsoft/vscode"
  exit 1
fi

echo "Pre-flight checks passed. Ready to run vscode_fork_setup.sh"