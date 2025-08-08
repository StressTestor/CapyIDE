# Manual VS Code Fork Setup Guide

Follow these steps to set up the VS Code fork for CapyIDE integration:

## 1. Fork VS Code Repository
1. Go to [VS Code GitHub repository](https://github.com/microsoft/vscode)
2. Click the "Fork" button in the top-right corner
3. Select your account as the destination for the fork

## 2. Clone Your Fork Locally
```powershell
# Replace YOUR-USERNAME with your GitHub username
git clone https://github.com/StressTestor/vscode.git
cd vscode
```

## 3. Create Integration Branch
```powershell
git checkout -b capyide-integration
```

## 4. Configure Upstream Remote
```powershell
git remote add upstream https://github.com/microsoft/vscode.git
git fetch upstream
```

## 5. Set Upstream Tracking
```powershell
git branch -u upstream/main
```

## 6. Verify Setup
```powershell
git branch --show-current  # Should show 'capyide-integration'
git remote -v              # Should show 'origin' (your fork) and 'upstream' (microsoft/vscode)
```

## 7. Initial Commit (Optional)
```powershell
# Create an initial commit to mark the starting point
echo "# CapyIDE Integration Branch" > README-CAPYIDE.md
git add README-CAPYIDE.md
git commit -m "chore: initial commit for CapyIDE integration"
```

Now you're ready to begin implementing CapyIDE memory hooks in the VS Code fork.