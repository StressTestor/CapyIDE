#!/bin/bash
# Master script for VS Code fork setup

# Run pre-flight checks
if ! ./preflight_checks.sh; then
  echo "Pre-flight checks failed. Aborting."
  exit 1
fi

# Execute fork setup
echo "Starting VS Code fork process..."
./vscode_fork_setup.sh

# Verify setup
cd vscode
if git branch --show-current | grep -q "capyide-integration"; then
  echo "✅ VS Code fork setup completed successfully"
  echo "Integration branch: $(git branch --show-current)"
else
  echo "❌ Setup failed. Check output for errors."
  exit 1
fi